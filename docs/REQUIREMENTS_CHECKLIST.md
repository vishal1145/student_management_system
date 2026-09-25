# Requirements checklist

Every point from the QA sheet and the assignment brief, with where it lives in the code.
Status: **Done** (built and tested), **N/A** (nothing in the app needs it, reason given).

## A. Assignment brief

| Requirement | Status | Where / how |
| --- | --- | --- |
| Signup, login, logout | Done | `modules/auth/`, `app/api/auth/*`, header account menu |
| Three roles: Admin, Teacher, Student | Done | `lib/constants.ts`, `server/route.ts`, `app/admin|teacher|student/` |
| Dashboard per role, each sees only what fits the role | Done | `app/admin`, `app/teacher`, `app/student` (each has its own layout guard) |
| Role check on every API request | Done | `protectedRoute(roles, handler)` in `server/route.ts`; tested 401 / 403 |
| Users and students stored in a database | Done | Cloudflare D1, schema in `migrations/0001_init.sql` |
| No passwords or keys in code or Git | Done | `AUTH_SECRET` in `.dev.vars` / Cloudflare secret; demo passwords in git-ignored `.seed.env` |
| Student record fields decided and explained | Done | README "Roles and decisions" |
| Deployable to Cloudflare | Done | `wrangler.jsonc`, `open-next.config.ts`, `npm run deploy` (build verified) |

## B. Layout and responsiveness

| Point | Status | Where / how |
| --- | --- | --- |
| Header and footer identical on static pages | Done | One `SiteHeader` and one `SiteFooter` in `app/layout.tsx`, used by every page |
| Works on mobile, tablet, desktop; fully responsive | Done | Mobile-first Tailwind breakpoints (sm 640, md 768, lg 1024); tested at 390, 820 and 1366 px, no horizontal overflow |
| Text, buttons, images, icons aligned on all screens | Done | Shared flex/grid patterns; `DataTable` becomes labelled cards on phones |
| Proper spacing, not crowded | Done | 4 px spacing scale, see `docs/DESIGN_SYSTEM.md` section 4 |
| Consistent spacing between sections, components, elements | Done | `.section` (48 / 64 / 80 px), `gap-8/10` between blocks, `gap-4/5` inside |
| Consistent margin and padding | Done | `--card-pad` token (20 px mobile, 24 px tablet+) used by every card, header and row |
| Common layout, container width, column structure | Done | `.container-page` (max 1152 px, gutters 16 / 24 / 32 px), grids of 1, 2, 3 or 4 columns |
| Consistent theme, light and dark | Done | `styles/tokens.css`; header toggle, saved choice, no flash on load |

## C. Typography

| Point | Status | Where / how |
| --- | --- | --- |
| One font family used consistently | Done | Manrope only, everywhere (hierarchy by size and weight) |
| Standard font sizes for headings, body, labels, buttons, captions | Done | Type scale in `styles/tokens.css`: caption 12, label 14, button 15, body 16, lead 18, h4 17, h3 20, h2 24-30, h1 28-40, display 38-64 px |
| Consistent line height | Done | 1.6 body, 1.4 labels/captions, 1.06-1.35 headings |

## D. Colour, borders, shadows, buttons

| Point | Status | Where / how |
| --- | --- | --- |
| Defined colour palette for backgrounds, text, buttons, borders | Done | Named tokens (paper, surface, ink, muted, brand, success, warning, danger ...), orange brand colour plus one amber highlight, light and dark |
| Border thickness, colour, radius follow one standard | Done | 1 px borders; radius 8 / 12 / 16 / 20 px; `--line`, `--line-strong`, `--control-border` |
| Consistent shadows for cards, popups, elements | Done | Soft layered shadow family: sm (buttons, cards), md (hover, floating), lg (menus, dialogs) |
| Button size, padding, font, radius, style consistent | Done | `.btn` + variants primary / secondary / danger / ghost, sizes sm 36 / md 44 / lg 52 px |
| Important action buttons clearly visible | Done | Primary buttons are solid brand colour; danger actions are red |
| Images keep aspect ratio | N/A | The app uses no photos. Global `img { max-width:100%; height:auto }` protects any future image |
| Images optimised | N/A | Only inline SVG icons and CSS artwork, so there are no image files to slow the page |
| Icons consistent size, style, spacing, alignment | Done | One icon set in `components/ui/Icon.tsx` (24 px grid, 1.75 stroke, sizes 16 / 18 / 20) |

## E. Interaction states

| Point | Status | Where / how |
| --- | --- | --- |
| Hover, active, focus, disabled states defined | Done | `.btn`, `.field-control`, links, cards in `styles/components.css` and `styles/base.css` |
| Consistent hover effect on buttons, links, cards | Done | Lift by 1-3 px with a growing shadow; links thicken their underline |
| Sufficient clickable area | Done | Buttons and fields at least 44 px tall, menu items 44 px, small buttons 36 px |
| Disabled buttons and fields look the same everywhere | Done | Sunken background, faint text, no shadow, `not-allowed` cursor |
| Selected nav items, tabs, active elements have a clear state | Done | Header link highlight, filled sidebar item with `aria-current="page"` |
| Keyboard focus ring | Done | 2 px brand outline with offset on every focusable element |

## F. Navigation, header, footer

| Point | Status | Where / how |
| --- | --- | --- |
| Header height, logo, navigation, spacing the same on all pages | Done | Fixed `--header-h: 4rem`, same `SiteHeader` component |
| Navigation simple and clear | Done | 3 links when signed out, Dashboard plus account menu when signed in, sidebar per role (pills on phones) |
| Footer structure, typography, spacing, links consistent | Done | Single `SiteFooter` (brand, Explore, Account, copyright row) |
| Dropdown size, styling, spacing, interaction consistent | Done | Selects share `.field-control`; account menu in `DropdownMenu.tsx` (Esc and outside click close it) |
| Proper 404 page with a way back | Done | `app/not-found.tsx` with "Back to home" (and "Go to my dashboard" when signed in) |
| Error page for unexpected failures | Done | `app/error.tsx` with "Try again" |

## G. Forms and validation

| Point | Status | Where / how |
| --- | --- | --- |
| Labels, fields, validation messages, spacing follow one structure | Done | `components/ui/Field.tsx` (`FieldShell`); 20 px gap between fields |
| Required fields clearly marked, optional ones labelled | Done | Red `*` on required, "(optional)" on the rest |
| Consistent required-field validation | Done | Shared zod schemas run in the browser and on the server, so messages always match |
| Email, phone, date, password use the correct format | Done | Email pattern; phone 10 digits starting 6-9; `type="date"` with age range; password 8+ chars with upper, lower and number; show / hide toggle |
| Error messages clear and consistent | Done | Inline field errors with icon, `Alert` box for form-level errors, plain-language text |
| Success feedback via toast | Done | `ToastProvider`: same position, look and 4.5 s duration everywhere |
| Confirmation before important actions | Done | `ConfirmDialog` for delete, disable and saving a student; role change has its own confirm step |

## H. States: loading, empty, long text

| Point | Status | Where / how |
| --- | --- | --- |
| Loading indicators or skeletons | Done | `Skeleton`, `ListSkeleton`, `StatSkeleton`, route-level `loading.tsx`, button spinners |
| Clear message and action when there is no data | Done | `EmptyState` with an "Add student" style action |
| Empty sections never blank or broken | Done | Every list, table and results panel renders `EmptyState` |
| Long text wrapped or truncated without breaking layout | Done | `truncate` with `title` in tables, `break-words` in profile cards, `overflow-wrap` on `body` |

## I. Security (own column)

| Point | Status | Where / how |
| --- | --- | --- |
| Password storage | Done | PBKDF2-SHA256, random salt per user (`server/auth/password.ts`) |
| Session | Done | HMAC-signed HttpOnly, SameSite=Lax, Secure cookie; 7 days |
| Role and status re-checked each request | Done | `server/auth/guard.ts` reads the user from the database every time |
| CSRF | Done | Same-origin check on every write (`assertSameOrigin`) |
| Brute force | Done | Account locks for 15 minutes after 5 wrong passwords |
| User enumeration | Done | Same message and timing for unknown email and wrong password |
| SQL injection | Done | Parameterised queries only |
| Security headers | Done | nosniff, frame deny, referrer policy, permissions policy, HSTS |
| Content-Security-Policy | Skipped | Next.js inline scripts need nonces; noted for later |
| Email verification, password reset | Skipped | Needs an email service; out of scope for this assignment |
