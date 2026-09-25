import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/format";
import type { Student } from "../types";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-caption font-medium text-muted">{label}</dt>
      <dd className="break-words text-label font-semibold text-ink">{value || <span className="font-normal text-faint">Not set</span>}</dd>
    </div>
  );
}

/** Read-only profile summary shown on the student's own dashboard. */
export function StudentProfileCard({ student }: { student: Student }) {
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow">Student ID {student.studentCode}</p>
          <h2 className="text-h3 break-words">{student.fullName}</h2>
        </div>
        <Badge tone={student.status === "active" ? "success" : "neutral"}>{student.status}</Badge>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Detail label="Class" value={student.grade ? `Class ${student.grade}` : ""} />
        <Detail label="Date of birth" value={student.dateOfBirth ? formatDate(student.dateOfBirth) : ""} />
        <Detail label="Gender" value={student.gender ? student.gender[0].toUpperCase() + student.gender.slice(1) : ""} />
        <Detail label="Email" value={student.email} />
        <Detail label="Mobile" value={student.phone} />
        <Detail label="Guardian" value={student.guardianName} />
        <Detail label="Guardian mobile" value={student.guardianPhone} />
        <div className="sm:col-span-2 lg:col-span-2"><Detail label="Address" value={student.address} /></div>
      </dl>
    </Card>
  );
}
