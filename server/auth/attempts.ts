import { getDb } from "@/server/db";
import { HttpError } from "@/server/http";

const MAX_FAILS = 5;
const WINDOW_SECONDS = 15 * 60;
const now = () => Math.floor(Date.now() / 1000);

/** Blocks an email for 15 minutes after 5 wrong passwords (slows down password guessing). */
export async function assertNotLocked(email: string): Promise<void> {
  const row = await getDb()
    .prepare("SELECT fails, window_start FROM login_attempts WHERE email = ?")
    .bind(email)
    .first<{ fails: number; window_start: number }>();
  if (row && row.fails >= MAX_FAILS && now() - row.window_start < WINDOW_SECONDS) {
    throw new HttpError(429, "locked", "Too many failed attempts. Please wait 15 minutes and try again.");
  }
}

export async function recordFailure(email: string): Promise<void> {
  const stamp = now();
  await getDb()
    .prepare(
      `INSERT INTO login_attempts (email, fails, window_start) VALUES (?1, 1, ?2)
       ON CONFLICT(email) DO UPDATE SET
         fails = CASE WHEN ?2 - window_start >= ?3 THEN 1 ELSE fails + 1 END,
         window_start = CASE WHEN ?2 - window_start >= ?3 THEN ?2 ELSE window_start END`,
    )
    .bind(email, stamp, WINDOW_SECONDS)
    .run();
}

export async function clearFailures(email: string): Promise<void> {
  await getDb().prepare("DELETE FROM login_attempts WHERE email = ?").bind(email).run();
}
