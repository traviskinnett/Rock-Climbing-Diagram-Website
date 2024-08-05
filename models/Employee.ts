export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  role: EmployeeRole;
  manager?: string;
}

export type EmployeeRole = "Associate" | "Manager";
