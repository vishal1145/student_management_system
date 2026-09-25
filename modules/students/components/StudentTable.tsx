import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import { Icon } from "@/components/ui/Icon";
import type { Student } from "../types";

type StudentTableProps = {
  students: Student[];
  canDelete: boolean;
  onEdit: (student: Student) => void;
  onResults: (student: Student) => void;
  onDelete: (student: Student) => void;
};

export function StudentTable({ students, canDelete, onEdit, onResults, onDelete }: StudentTableProps) {
  const columns: Column<Student>[] = [
    {
      key: "student",
      header: "Student",
      cell: (student) => (
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={student.fullName} />
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink" title={student.fullName}>{student.fullName}</p>
            <p className="truncate text-caption text-muted" title={student.email}>{student.email}</p>
          </div>
        </div>
      ),
    },
    { key: "code", header: "Student ID", className: "md:whitespace-nowrap", cell: (student) => <span className="font-medium">{student.studentCode}</span> },
    { key: "grade", header: "Class", className: "md:whitespace-nowrap", cell: (student) => (student.grade ? `Class ${student.grade}` : <span className="text-faint">Not set</span>) },
    { key: "phone", header: "Mobile", className: "md:max-lg:hidden md:whitespace-nowrap", cell: (student) => student.phone || <span className="text-faint">Not set</span> },
    {
      key: "status",
      header: "Status",
      className: "md:whitespace-nowrap",
      cell: (student) => <Badge tone={student.status === "active" ? "success" : "neutral"}>{student.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      className: "md:whitespace-nowrap md:text-right",
      cell: (student) => (
        <div className="flex flex-wrap gap-2 md:flex-nowrap md:justify-end">
          <Button size="sm" variant="secondary" onClick={() => onResults(student)}>
            <Icon name="chart" size={16} /> Results
          </Button>
          <Button size="sm" variant="secondary" iconOnly onClick={() => onEdit(student)} aria-label={`Edit ${student.fullName}`} title="Edit">
            <Icon name="edit" size={16} />
          </Button>
          {canDelete && (
            <Button size="sm" variant="secondary" iconOnly onClick={() => onDelete(student)} aria-label={`Delete ${student.fullName}`} title="Delete">
              <Icon name="trash" size={16} className="text-danger" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return <DataTable caption="Students" columns={columns} rows={students} rowKey={(student) => student.id} />;
}
