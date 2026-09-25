import type { Role, UserStatus } from "@/lib/constants";
import { PAGE_SIZE } from "@/lib/constants";
import type { SessionUser } from "@/modules/auth/types";
import type { ManagedUser } from "@/modules/users/types";
import type { Page } from "@/modules/students/types";
import { getDb, likePattern, newId } from "@/server/db";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
  status: UserStatus;
  created_at: string;
};

export const toSessionUser = (row: UserRow): SessionUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  status: row.status,
});

const toManagedUser = (row: UserRow): ManagedUser => ({ ...toSessionUser(row), createdAt: row.created_at });

export const usersRepo = {
  findByEmail: (email: string) =>
    getDb().prepare("SELECT * FROM users WHERE email = ?").bind(email).first<UserRow>(),

  findById: (id: string) => getDb().prepare("SELECT * FROM users WHERE id = ?").bind(id).first<UserRow>(),

  async create(input: { name: string; email: string; passwordHash: string; role: Role; status: UserStatus }) {
    const id = newId();
    await getDb()
      .prepare("INSERT INTO users (id, name, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(id, input.name, input.email, input.passwordHash, input.role, input.status)
      .run();
    return id;
  },

  async list(query: { search?: string; role?: string; status?: string; page: number }): Promise<Page<ManagedUser>> {
    const where: string[] = [];
    const values: unknown[] = [];
    if (query.search) {
      where.push("(name LIKE ? ESCAPE '\\' OR email LIKE ? ESCAPE '\\')");
      values.push(likePattern(query.search), likePattern(query.search));
    }
    if (query.role) {
      where.push("role = ?");
      values.push(query.role);
    }
    if (query.status) {
      where.push("status = ?");
      values.push(query.status);
    }
    const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const db = getDb();
    const totalRow = await db.prepare(`SELECT COUNT(*) AS total FROM users ${clause}`).bind(...values).first<{ total: number }>();
    const rows = await db
      .prepare(`SELECT * FROM users ${clause} ORDER BY (status = 'pending') DESC, created_at DESC LIMIT ? OFFSET ?`)
      .bind(...values, PAGE_SIZE, (query.page - 1) * PAGE_SIZE)
      .all<UserRow>();
    return { items: rows.results.map(toManagedUser), total: totalRow?.total ?? 0, page: query.page, pageSize: PAGE_SIZE };
  },

  async update(id: string, changes: { role?: Role; status?: UserStatus }) {
    await getDb()
      .prepare("UPDATE users SET role = COALESCE(?, role), status = COALESCE(?, status) WHERE id = ?")
      .bind(changes.role ?? null, changes.status ?? null, id)
      .run();
  },

  async remove(id: string) {
    await getDb().prepare("DELETE FROM users WHERE id = ?").bind(id).run();
  },

  async counts() {
    const row = await getDb()
      .prepare(
        `SELECT COUNT(*) AS users,
                SUM(CASE WHEN role = 'teacher' AND status = 'pending' THEN 1 ELSE 0 END) AS pending
         FROM users`,
      )
      .first<{ users: number; pending: number | null }>();
    return { users: row?.users ?? 0, pendingTeachers: row?.pending ?? 0 };
  },
};
