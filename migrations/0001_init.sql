-- Student Management System: initial schema (Cloudflare D1 / SQLite).

CREATE TABLE users (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student')),
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'disabled')),
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_users_role_status ON users (role, status);

CREATE TABLE students (
  id             TEXT PRIMARY KEY,
  user_id        TEXT UNIQUE REFERENCES users (id) ON DELETE SET NULL,
  student_code   TEXT NOT NULL UNIQUE,
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  phone          TEXT NOT NULL DEFAULT '',
  date_of_birth  TEXT NOT NULL DEFAULT '',
  gender         TEXT NOT NULL DEFAULT '' CHECK (gender IN ('', 'female', 'male', 'other')),
  grade          TEXT NOT NULL DEFAULT '',
  guardian_name  TEXT NOT NULL DEFAULT '',
  guardian_phone TEXT NOT NULL DEFAULT '',
  address        TEXT NOT NULL DEFAULT '',
  status         TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_students_grade_status ON students (grade, status);

CREATE TABLE results (
  id          TEXT PRIMARY KEY,
  student_id  TEXT NOT NULL REFERENCES students (id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,
  term        TEXT NOT NULL,
  score       INTEGER NOT NULL CHECK (score >= 0),
  max_score   INTEGER NOT NULL DEFAULT 100 CHECK (max_score > 0),
  remarks     TEXT NOT NULL DEFAULT '',
  recorded_by TEXT REFERENCES users (id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_results_student ON results (student_id);

-- Brute-force protection for login (see server/auth/attempts.ts).
CREATE TABLE login_attempts (
  email        TEXT PRIMARY KEY,
  fails        INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL
);
