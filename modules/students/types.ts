export type Student = {
  id: string;
  userId: string | null;
  studentCode: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "" | "female" | "male" | "other";
  grade: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};

export type Page<T> = { items: T[]; total: number; page: number; pageSize: number };

export type StudentQuery = { search?: string; grade?: string; status?: string; page?: number };
