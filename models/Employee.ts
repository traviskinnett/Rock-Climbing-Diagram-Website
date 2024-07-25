export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  role: EmployeeRole;
}

export type EmployeeRole = "Associate" | "Manager";
