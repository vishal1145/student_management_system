type AdminStats = {
  role: "admin";
  users: number;
  pendingTeachers: number;
  students: number;
  activeStudents: number;
};

type TeacherStats = {
  role: "teacher";
  students: number;
  activeStudents: number;
  resultsRecorded: number;
};

export type Stats = AdminStats | TeacherStats;
