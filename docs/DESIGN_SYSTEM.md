# Design system

All values live in `styles/tokens.css`. Change one there and the whole app follows.

## 1. Look and feel

Clean and calm: soft off-white pages, deep ink text, one **teal** brand colour and a **mint** highlight. The
background carries the student-management theme without getting loud: a few outlined school icons (book, pencil,
graduation cap, atom, calculator, ruler, award, star) drift slowly behind the hero, the login/signup panel, dashboard
banners, the call to action and the 404 page (`components/effects/EduBackdrop.tsx`). They are low opacity, never sit
behind body text, and are hidden from screen readers. The landing page also shows real product previews, a student ID
card that tilts, a scrolling subject strip, interactive Admin / Teacher / Student tabs and a split login / signup with
a live preview of the student view. Light and dark themes use the same tokens.

Motion is small and purposeful (`styles/effects.css`): drifting icons, a rotating word in the hero, a marquee of
features, progress bars and rings that fill, scroll reveal, hover lifts and count-up numbers. Everything stops for
people who choose "reduce motion".

## 2. Typography

One font family everywhere: **Manrope** (self-hosted through Fontsource, no external requests).
Hierarchy comes from size and weight only.

| Role | Size | Line height | Weight |
| --- | --- | --- | --- |
| Display (landing hero) | 38-64 px, fluid | 1.06 | 800 |
| Heading 1 | 28-40 px, fluid | 1.12 | 700-800 |
| Heading 2 | 24-30 px, fluid | 1.25 | 700 |
| Heading 3 | 20 px | 1.35 | 700 |
| Heading 4 | 17 px | 1.4 | 700 |
| Lead paragraph | 18 px | 1.65 | 400 |
| Body | 16 px | 1.6 | 400 |
| Label / table text | 14 px | 1.45 | 500-650 |
| Button | 15 px (14 small, 17 large) | 1.2 | 650 |
| Caption / hint / error | 12 px | 1.4 | 400-650 |
| Eyebrow | 12 px, uppercase, 0.12em tracking | 1.4 | 700 |

## 3. Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | #F4F7F6 | #0A100E | page background |
| `surface` | #FFFFFF | #111917 | cards, fields, menus |
| `sunken` | #EBF0EE | #18231F | table header, hover rows, disabled fields |
| `ink` | #0E1D19 | #ECF5F2 | main text |
| `muted` | #485A55 | #A3B8B1 | secondary text |
| `faint` | #5B6D67 | #8AA098 | placeholders, hints |
| `brand` | #0F766E | #2DD4B0 | primary buttons, links, active menu item, banners |
| `mint` | #8CF0D9 | #8CF0D9 | the single highlight (chips, dots, one shape per banner) |
| `success` | #166534 | #6EE7A0 | success badges and toasts |
| `warning` | #8A5100 | #FBBF24 | pending status only |
| `danger` | #B42318 | #FCA5A5 | errors, delete |

Text always sits on `ink`, `on-brand` or `on-mint`, chosen for contrast. Field borders meet the 3:1 rule for UI parts.

## 4. Spacing (4 px scale)

| Step | Size | Used for |
| --- | --- | --- |
| 1 / 2 | 4 / 8 px | icon-to-text, badge padding |
| 3 / 4 | 12 / 16 px | gap between related items, grid gap, page gutter (mobile) |
| 5 | 20 px | gap between form fields, card padding (mobile) |
| 6 | 24 px | card padding (tablet and up), page gutter (tablet) |
| 8 / 10 | 32 / 40 px | gap between blocks on a page |
| 14 / 20 / 24 | 56 / 80 / 96 px | section padding (mobile / tablet / desktop) |

## 5. Shape and elevation

- Border: 1 px, soft grey-green. Focus ring: 2 px brand outline plus a soft glow on fields.
- Radius: 8 px (small), 12 px (buttons, fields), 16 px (cards), 20 px (dialogs).
- Shadow: sm (buttons, cards), md (hover, floating cards), lg (menus, dialogs). All soft and layered.

## 6. Components (`components/ui`)

Button and LinkButton, TextField, PasswordField, SelectField, TextareaField, FormActions, Modal,
ConfirmDialog, Toast, Alert, Badge, Avatar, Card, DataTable, Pagination, SearchInput, DropdownMenu,
Skeleton, EmptyState, Icon. Layout pieces: SiteHeader, SiteFooter, DashboardSidebar, DashboardShell,
PageHeader, AuthShell. Landing sections live in `components/marketing/`.

## 7. Breakpoints

| Name | From | Behaviour |
| --- | --- | --- |
| mobile | 0 | single column, hamburger menu, pill navigation, tables become labelled cards, dialogs slide up as sheets |
| sm | 640 px | two-column forms, side-by-side buttons |
| md | 768 px | full tables, inline nav, 24 px card padding |
| lg | 1024 px | sidebar dashboards, split login and signup, two-column hero |

## 8. Rules for new code

1. Use tokens and existing classes (`.btn`, `.field-control`, `.card`, `.card-pad`), never raw colours or pixel values.
2. Reuse a component from `components/ui` before writing a new one.
3. Keep every file under 300 lines (ESLint enforces it).
4. Every list needs a loading state, an empty state and an error state.
