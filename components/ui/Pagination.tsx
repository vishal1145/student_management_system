import { Button } from "./Button";
import { Icon } from "./Icon";

type PaginationProps = { page: number; pageSize: number; total: number; onChange: (page: number) => void };

export function Pagination({ page, pageSize, total, onChange }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (total <= pageSize) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-between gap-3 border-t border-line card-pad">
      <p className="text-label text-muted">
        Showing <strong className="text-ink">{from}-{to}</strong> of <strong className="text-ink">{total}</strong>
      </p>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => onChange(page - 1)} disabled={page <= 1}>
          <Icon name="chevronLeft" size={16} /> Prev
        </Button>
        <span className="min-w-16 text-center text-label text-muted">{page} / {pages}</span>
        <Button variant="secondary" size="sm" onClick={() => onChange(page + 1)} disabled={page >= pages}>
          Next <Icon name="chevronRight" size={16} />
        </Button>
      </div>
    </nav>
  );
}
