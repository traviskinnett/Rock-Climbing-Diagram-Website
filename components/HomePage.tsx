import { Button, Table } from "antd";
import { useState } from "react";
import { CreateUpdateEmployeeModal } from "./Employees/CreateUpdateEmployeeModal";
import { Employee } from "../models/Employee";
import { ColumnsType } from "antd/es/table";

let employeeId = 1;
export const HomePage = () => {
  const [openCreateUpdateEmployeeModal, setOpenCreateEmployeeModal] =
    useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>();
  const [employees, updateEmployees] = useState<Employee[]>([]);
  const [isEditEmployee, setIsEditEmployee] = useState(false);

  const handleClick = () => {
    setOpenCreateEmployeeModal(true);
  };

  const createEmployee = (Employee: Employee) => {
    Employee.id = employeeId;
    employees.push(Employee);
    employeeId++;
  };

  const updateEmployee = (Employee: Employee) => {
    const foundEmployee = employees.findIndex((o) => o.id == Employee.id);

    employees[foundEmployee] = Employee;
  };

  const columns: ColumnsType = [
    { title: "ID", dataIndex: "id" },
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Role", dataIndex: "role" },
    { title: "Manager", dataIndex: "manager" },
    {
      title: "",
      render: (_, record: Employee) => {
        return (
          <div>
            <Button
              onClick={() => {
                setCurrentEmployee(record);
                setIsEditEmployee(true);
                setOpenCreateEmployeeModal(true);
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                updateEmployees(employees.filter((o) => o.id != record.id));
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
      width: 100,
    },
  ];

  return (
    <div className="w-128">
      <div className="pb-4 text-xl flex justify-between ">
        Employees
        <Button onClick={handleClick}>Create</Button>
      </div>
      <Table
        className="pb-3"
        dataSource={employees}
        columns={columns}
        pagination={false}
      ></Table>
      <div className="space-x-3"></div>

      <CreateUpdateEmployeeModal
        openModal={openCreateUpdateEmployeeModal}
        setOpenModal={setOpenCreateEmployeeModal}
        employee={currentEmployee}
        updateEmployee={updateEmployee}
        createEmployee={createEmployee}
        setEdit={setIsEditEmployee}
        edit={isEditEmployee}
      ></CreateUpdateEmployeeModal>
    </div>
  );
};
