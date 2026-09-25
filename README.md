# Campus Ledger: Student Management System

Signup, login and logout with three roles (Admin, Teacher, Student), each with its own dashboard.
Built with Next.js 16, TypeScript, Tailwind CSS 4, Zod and Cloudflare D1 (SQLite).

## Run it locally

```bash
npm install
cp .dev.vars.example .dev.vars        # then put a long random value in AUTH_SECRET
cp .seed.env.example .seed.env        # then choose demo emails and passwords
npm run db:migrate:local              # creates the tables in the local D1 database
npm run db:seed:local                 # creates demo Admin / Teacher / Student + sample students
npm run dev                           # http://localhost:3000
```

Demo logins come from `.seed.env`. If a password is left out, a strong random one is generated and printed once.
No password or key is stored in the code or in Git (`.dev.vars` and `.seed.env` are git-ignored).

More detail: `docs/REQUIREMENTS_CHECKLIST.md` (every point from the QA sheet, with where it is built) and
`docs/DESIGN_SYSTEM.md` (fonts, sizes, colours, spacing).

## Deploy to Cloudflare (later)

```bash
npx wrangler d1 create student-management-db     # copy the database_id into wrangler.jsonc
npm run db:migrate:remote
npx wrangler secret put AUTH_SECRET               # paste a long random string
npm run db:seed:remote                            # demo logins for the submission
npm run deploy
```

OpenNext for Cloudflare works best on Linux/macOS or WSL. If `npm run deploy` misbehaves on Windows, run it from WSL.

## Roles and decisions

| Role | Can | Cannot |
| --- | --- | --- |
| Admin | See every student, approve / disable / delete users, change roles, delete students | Change or delete their own account |
| Teacher | Add and edit students, record and delete results, search and filter | Delete students, manage users |
| Student | See own profile and results, edit own phone / guardian / address | See anyone else, change class, status or email |

- Public signup creates **students** (active immediately) or **teachers** (pending until an admin approves). Admins are created only by the seed script.
- Every API route goes through `protectedRoute(roles, handler)` (`server/route.ts`), so the role check runs on every request. Pages are guarded again in each role's `layout.tsx`.
- Role and status are read from the database on each request, so disabling a user takes effect immediately.
- Passwords need 8+ characters with an uppercase letter, a lowercase letter and a number.
- Security: PBKDF2 password hashes with per-user salt, HttpOnly + SameSite=Lax + Secure session cookie signed with HMAC, same-origin check on writes (CSRF), login lock after 5 wrong passwords in 15 minutes, generic login errors, security headers, parameterised SQL only.
- Student record fields: ID, name, email, mobile, date of birth, gender, class, guardian name and mobile, address, status. Results: subject, term, marks, maximum, remarks.

## Project structure

```
app/                 routes only (thin): pages, layouts, api/**/route.ts
components/ui/       global reusable components (Button, Field, Modal, Toast, DataTable, ...)
components/layout/   header, footer, sub navigation, page shells (same on every page)
components/marketing landing page sections
lib/                 constants, formatting, http client, hooks, shared zod rules
modules/<name>/      one folder per feature: api.ts, schemas.ts, types.ts, hooks, components/
                     (auth, students, users, results, dashboard)
server/              db access, auth (password, session, guard), repositories, services
migrations/          D1 schema
scripts/seed.mjs     demo data
```

Rules kept: no file over 300 lines (enforced by ESLint `max-lines`), each module owns its own API
client, and anything used by more than one module lives in `components/ui` or `lib`.

## Design system (`styles/tokens.css`)

- Look: clean teal brand colour with a mint highlight and soft animated school-themed backgrounds (drifting book, pencil, cap and atom icons, an ID card, a subject marquee). Sidebar dashboards with banners, a landing page with interactive role tabs and product previews, split login and signup. Light and dark themes, toggle in the header, choice remembered, no flash on load.
- Font: Manrope everywhere, self-hosted via Fontsource.
- Type scale: caption 12px, label 14px, body 16px, lead 18px, h4 17px, h3 20px, h2 24-30px, h1 28-40px, display 38-64px (fluid). Line height 1.6 body, 1.06-1.35 headings.
- One container width (74rem), one section rhythm, one radius scale (8 / 12 / 16 / 20px), one soft shadow family, one button, one field style.
- Every interactive element has hover, focus-visible, active and disabled states; buttons and fields are at least 44px tall.
- Loading skeletons, empty states, toasts, confirm dialogs, 404 page and error page are shared components.

## Not included (noted on purpose)

- Email verification and password reset (needs an email service).
- Content-Security-Policy header (Next.js inline scripts need nonces; the other security headers are set).
- Image optimisation: the app uses only inline SVG icons, so there are no image files to compress.
- Rate limiting is per email address only, not per IP.
