import { PAGE_SIZE } from "@/lib/constants";
import type { Page, Student } from "@/modules/students/types";
import type { StudentInput, StudentSelfInput } from "@/modules/students/schemas";
import { getDb, likePattern, newId } from "@/server/db";

type StudentRow = {
  id: string;
  user_id: string | null;
  student_code: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: Student["gender"];
  grade: string;
  guardian_name: string;
  guardian_phone: string;
  address: string;
  status: Student["status"];
  created_at: string;
  updated_at: string;
};

const toStudent = (row: StudentRow): Student => ({
  id: row.id,
  userId: row.user_id,
  studentCode: row.student_code,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone,
  dateOfBirth: row.date_of_birth,
  gender: row.gender,
  grade: row.grade,
  guardianName: row.guardian_name,
  guardianPhone: row.guardian_phone,
  address: row.address,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const newStudentCode = () => `STU-${Math.floor(100000 + Math.random() * 900000)}`;

async function first(sql: string, value: string): Promise<Student | null> {
  const row = await getDb().prepare(sql).bind(value).first<StudentRow>();
  return row ? toStudent(row) : null;
}

export const studentsRepo = {
  findById: (id: string) => first("SELECT * FROM students WHERE id = ?", id),
  findByUserId: (userId: string) => first("SELECT * FROM students WHERE user_id = ?", userId),
  findByEmail: (email: string) => first("SELECT * FROM students WHERE email = ?", email),

  async list(query: { search?: string; grade?: string; status?: string; page: number }): Promise<Page<Student>> {
    const where: string[] = [];
    const values: unknown[] = [];
    if (query.search) {
      where.push("(full_name LIKE ?1 ESCAPE '\\' OR email LIKE ?1 ESCAPE '\\' OR student_code LIKE ?1 ESCAPE '\\')");
      values.push(likePattern(query.search));
    }
    if (query.grade) {
      where.push(`grade = ?${values.length + 1}`);
      values.push(query.grade);
    }
    if (query.status) {
      where.push(`status = ?${values.length + 1}`);
      values.push(query.status);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const db = getDb();
    const totalRow = await db.prepare(`SELECT COUNT(*) AS total FROM students ${clause}`).bind(...values).first<{ total: number }>();
    const n = values.length;
    const rows = await db
      .prepare(`SELECT * FROM students ${clause} ORDER BY created_at DESC, full_name LIMIT ?${n + 1} OFFSET ?${n + 2}`)
      .bind(...values, PAGE_SIZE, (query.page - 1) * PAGE_SIZE)
      .all<StudentRow>();
    return { items: rows.results.map(toStudent), total: totalRow?.total ?? 0, page: query.page, pageSize: PAGE_SIZE };
  },

  /** Retries with a fresh code in the (rare) case two students draw the same random code. */
  async create(input: Partial<StudentInput> & { fullName: string; email: string }, userId: string | null) {
    const id = newId();
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        await getDb()
          .prepare(
            `INSERT INTO students (id, user_id, student_code, full_name, email, phone, date_of_birth, gender, grade,
               guardian_name, guardian_phone, address, status)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          )
          .bind(
            id, userId, newStudentCode(), input.fullName, input.email, input.phone ?? "", input.dateOfBirth ?? "",
            input.gender ?? "", input.grade ?? "", input.guardianName ?? "", input.guardianPhone ?? "",
            input.address ?? "", input.status ?? "active",
          )
          .run();
        return id;
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        if (!message.includes("student_code")) throw error;
      }
    }
    throw new Error("Could not generate a unique student code");
  },

  async linkUser(id: string, userId: string) {
    await getDb().prepare("UPDATE students SET user_id = ? WHERE id = ?").bind(userId, id).run();
  },

  async update(id: string, input: StudentInput) {
    await getDb()
      .prepare(
        `UPDATE students SET full_name = ?, email = ?, phone = ?, date_of_birth = ?, gender = ?, grade = ?,
           guardian_name = ?, guardian_phone = ?, address = ?, status = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(
        input.fullName, input.email, input.phone, input.dateOfBirth, input.gender, input.grade,
        input.guardianName, input.guardianPhone, input.address, input.status, id,
      )
      .run();
  },

  async updateSelf(id: string, input: StudentSelfInput) {
    await getDb()
      .prepare(
        `UPDATE students SET phone = ?, guardian_name = ?, guardian_phone = ?, address = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(input.phone, input.guardianName, input.guardianPhone, input.address, id)
      .run();
  },

  async remove(id: string) {
    await getDb().prepare("DELETE FROM students WHERE id = ?").bind(id).run();
  },

  async counts() {
    const row = await getDb()
      .prepare("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active FROM students")
      .first<{ total: number; active: number | null }>();
    return { students: row?.total ?? 0, activeStudents: row?.active ?? 0 };
  },
};
