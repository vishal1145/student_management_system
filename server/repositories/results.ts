import type { Result } from "@/modules/results/types";
import type { ResultInput } from "@/modules/results/schemas";
import { getDb, newId } from "@/server/db";

type ResultRow = {
  id: string;
  student_id: string;
  subject: string;
  term: string;
  score: number;
  max_score: number;
  remarks: string;
  created_at: string;
};

const toResult = (row: ResultRow): Result => ({
  id: row.id,
  studentId: row.student_id,
  subject: row.subject,
  term: row.term,
  score: row.score,
  maxScore: row.max_score,
  remarks: row.remarks,
  createdAt: row.created_at,
});

export const resultsRepo = {
  async listForStudent(studentId: string): Promise<Result[]> {
    const rows = await getDb()
      .prepare("SELECT * FROM results WHERE student_id = ? ORDER BY created_at DESC, subject")
      .bind(studentId)
      .all<ResultRow>();
    return rows.results.map(toResult);
  },

  async create(studentId: string, input: ResultInput, recordedBy: string) {
    await getDb()
      .prepare(
        "INSERT INTO results (id, student_id, subject, term, score, max_score, remarks, recorded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(newId(), studentId, input.subject, input.term, input.score, input.maxScore, input.remarks, recordedBy)
      .run();
  },

  async remove(id: string) {
    const outcome = await getDb().prepare("DELETE FROM results WHERE id = ?").bind(id).run();
    return (outcome.meta.changes ?? 0) > 0;
  },

  async count() {
    const row = await getDb().prepare("SELECT COUNT(*) AS total FROM results").first<{ total: number }>();
    return row?.total ?? 0;
  },
};
