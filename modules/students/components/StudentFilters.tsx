import { SearchInput } from "@/components/ui/SearchInput";
import { GRADES, STUDENT_STATUSES } from "@/lib/constants";

type StudentFiltersProps = {
  grade: string;
  status: string;
  onSearch: (value: string) => void;
  onGrade: (value: string) => void;
  onStatus: (value: string) => void;
};

export function StudentFilters({ grade, status, onSearch, onGrade, onStatus }: StudentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput onSearch={onSearch} placeholder="Search name, email or ID" label="Search students" />
      <select aria-label="Filter by class" value={grade} onChange={(event) => onGrade(event.target.value)} className="field-control sm:w-40">
        <option value="">All classes</option>
        {GRADES.map((item) => <option key={item} value={item}>Class {item}</option>)}
      </select>
      <select aria-label="Filter by status" value={status} onChange={(event) => onStatus(event.target.value)} className="field-control sm:w-40">
        <option value="">All statuses</option>
        {STUDENT_STATUSES.map((item) => <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>)}
      </select>
    </div>
  );
}
