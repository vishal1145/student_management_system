import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import { Icon } from "@/components/ui/Icon";
import { formatDbDate, percent } from "@/lib/format";
import type { Result } from "../types";
import { resultTone } from "../utils";

type ResultsTableProps = { results: Result[]; onDelete?: (result: Result) => void };

/** Read-only for students; teachers and admins also get a delete button. */
export function ResultsTable({ results, onDelete }: ResultsTableProps) {
  const columns: Column<Result>[] = [
    { key: "subject", header: "Subject", cell: (item) => <span className="font-semibold text-ink">{item.subject}</span> },
    { key: "term", header: "Term", className: "md:whitespace-nowrap", cell: (item) => item.term },
    {
      key: "score",
      header: "Marks",
      cell: (item) => (
        <span className="flex flex-wrap items-center gap-2 md:flex-nowrap md:whitespace-nowrap">
          {item.score}/{item.maxScore}
          <Badge tone={resultTone(item.score, item.maxScore)}>{percent(item.score, item.maxScore)}%</Badge>
        </span>
      ),
    },
    { key: "remarks", header: "Remarks", cell: (item) => item.remarks || <span className="text-faint">-</span> },
    { key: "date", header: "Recorded", className: "md:whitespace-nowrap", cell: (item) => formatDbDate(item.createdAt) },
  ];

  if (onDelete) {
    columns.push({
      key: "actions",
      header: "",
      className: "md:text-right",
      cell: (item) => (
        <Button size="sm" variant="secondary" iconOnly onClick={() => onDelete(item)} aria-label={`Delete ${item.subject} result`} title="Delete">
          <Icon name="trash" size={16} className="text-danger" />
        </Button>
      ),
    });
  }

  return <DataTable caption="Results" columns={columns} rows={results} rowKey={(item) => item.id} />;
}
