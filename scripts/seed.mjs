// Seeds demo accounts + sample students into D1.
//   node scripts/seed.mjs --local     (local dev database)
//   node scripts/seed.mjs --remote    (deployed Cloudflare database)
// Passwords are NEVER stored in the repo. Put SEED_*_EMAIL / SEED_*_PASSWORD in the git-ignored
// file ".seed.env" (see .seed.env.example) or pass them as env vars. If a password is missing, a
// strong random one is generated and printed once. Re-running resets the demo passwords.
import { execFileSync } from "node:child_process";
import { pbkdf2Sync, randomBytes, randomInt, randomUUID } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

try {
  process.loadEnvFile(".seed.env");
} catch {
  /* no .seed.env file: fall back to real environment variables */
}

const target = process.argv.includes("--remote") ? "--remote" : "--local";
const q = (value) => `'${String(value).replace(/'/g, "''")}'`;

function strongPassword() {
  const pick = (chars) => chars[randomInt(chars.length)];
  const all = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%";
  const parts = [pick("ABCDEFGHJKLMNPQRSTUVWXYZ"), pick("abcdefghjkmnpqrstuvwxyz"), pick("23456789"), pick("!@#$%")];
  while (parts.length < 14) parts.push(pick(all));
  return parts.sort(() => randomInt(3) - 1).join("");
}

function hash(password) {
  const salt = randomBytes(16);
  const derived = pbkdf2Sync(password, salt, 100_000, 32, "sha256");
  return `pbkdf2$100000$${salt.toString("base64")}$${derived.toString("base64")}`;
}

const accounts = [
  { role: "admin", name: "Asha Verma", email: process.env.SEED_ADMIN_EMAIL ?? "admin@gmail.com", password: process.env.SEED_ADMIN_PASSWORD },
  { role: "teacher", name: "Rohan Mehta", email: process.env.SEED_TEACHER_EMAIL ?? "teacher@gmail.com", password: process.env.SEED_TEACHER_PASSWORD },
  { role: "student", name: "Priya Sharma", email: process.env.SEED_STUDENT_EMAIL ?? "student@gmail.com", password: process.env.SEED_STUDENT_PASSWORD },
].map((account) => ({ ...account, password: account.password ?? strongPassword() }));

const sampleStudents = [
  ["Aarav Patel", "aarav.patel@example.com", "9876500001", "2011-04-12", "male", "8", "Nikhil Patel", "9876511001", "12 Lake View Road, Pune"],
  ["Ananya Iyer", "ananya.iyer@example.com", "9876500002", "2010-09-03", "female", "9", "Lakshmi Iyer", "9876511002", "44 Temple Street, Chennai"],
  ["Kabir Singh", "kabir.singh@example.com", "9876500003", "2012-01-27", "male", "7", "Harpreet Singh", "9876511003", "7 Model Town, Delhi"],
  ["Meera Nair", "meera.nair@example.com", "9876500004", "2009-11-19", "female", "10", "Suresh Nair", "9876511004", "3 Beach Road, Kochi"],
  ["Ishaan Gupta", "ishaan.gupta@example.com", "9876500005", "2008-06-30", "male", "11", "Rekha Gupta", "9876511005", "88 Civil Lines, Jaipur"],
  ["Diya Reddy", "diya.reddy@example.com", "9876500006", "2011-12-05", "female", "8", "Venkat Reddy", "9876511006", "21 Jubilee Hills, Hyderabad"],
];

const sql = [];
for (const a of accounts) {
  sql.push(
    `INSERT INTO users (id, name, email, password_hash, role, status) VALUES (${q(randomUUID())}, ${q(a.name)}, ${q(a.email)}, ${q(hash(a.password))}, ${q(a.role)}, 'active')
     ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, status = 'active', role = excluded.role;`,
  );
}
const demoStudent = accounts.find((a) => a.role === "student");
sql.push(
  `INSERT OR IGNORE INTO students (id, user_id, student_code, full_name, email, phone, date_of_birth, gender, grade, guardian_name, guardian_phone, address)
   SELECT ${q(randomUUID())}, id, 'STU-100000', ${q(demoStudent.name)}, ${q(demoStudent.email)}, '9876500000', '2010-02-14', 'female', '9', 'Sunita Sharma', '9876511000', '15 Green Park, Mumbai'
   FROM users WHERE email = ${q(demoStudent.email)};`,
);
sampleStudents.forEach(([name, email, phone, dob, gender, grade, guardian, guardianPhone, address], index) => {
  sql.push(
    `INSERT OR IGNORE INTO students (id, student_code, full_name, email, phone, date_of_birth, gender, grade, guardian_name, guardian_phone, address)
     VALUES (${q(randomUUID())}, ${q(`STU-10${1000 + index}`)}, ${q(name)}, ${q(email)}, ${q(phone)}, ${q(dob)}, ${q(gender)}, ${q(grade)}, ${q(guardian)}, ${q(guardianPhone)}, ${q(address)});`,
  );
});
const sampleResults = [["Mathematics", "Term 1", 86], ["Science", "Term 1", 78], ["English", "Term 1", 91], ["Mathematics", "Term 2", 90]];
for (const [subject, term, score] of sampleResults) {
  sql.push(
    `INSERT INTO results (id, student_id, subject, term, score, max_score, remarks)
     SELECT ${q(randomUUID())}, id, ${q(subject)}, ${q(term)}, ${score}, 100, 'Good progress'
     FROM students WHERE email = ${q(demoStudent.email)}
       AND NOT EXISTS (SELECT 1 FROM results r WHERE r.student_id = students.id AND r.subject = ${q(subject)} AND r.term = ${q(term)});`,
  );
}

const file = join(mkdtempSync(join(tmpdir(), "sms-seed-")), "seed.sql");
writeFileSync(file, sql.join("\n"));
const npx = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(npx, ["wrangler", "d1", "execute", "DB", target, `--file=${file}`], { stdio: "inherit", shell: process.platform === "win32" });

console.log("\nDemo logins (shown once, save them):");
for (const a of accounts) console.log(`  ${a.role.padEnd(8)} ${a.email}   ${a.password}`);
