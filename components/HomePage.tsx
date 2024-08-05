import { Button, Table } from "antd";
import { useState } from "react";
import { CreateEmployeeModal } from "./Employees/CreateEmployeeModal";
import { Employee } from "../models/Employee";
import { ColumnsType } from "antd/es/table";
let employees: Employee[] = [];
let employeeId = 1;
export const HomePage = () => {
  const [openCreateEmployeeModal, setOpenCreateEmployeeModal] = useState(false);

  const handleClick = () => {
    setOpenCreateEmployeeModal(true);
  };

  const createEmployee = (Employee: Employee) => {
    Employee.id = employeeId;
    employees.push(Employee);
    employeeId++;
  };
  console.log(employees);
  const columns: ColumnsType = [
    { title: "ID", dataIndex: "id" },
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Role", dataIndex: "role" },
    { title: "Manager", dataIndex: "manager" },
    { title: "" },
  ];

  return (
    <div>
      <div className="pb-4 text-xl">Employees</div>
      <Table
        className="pb-3"
        dataSource={employees}
        columns={columns}
        pagination={false}
      ></Table>
      <div>
        <Button onClick={handleClick}>Create</Button>
      </div>

      <CreateEmployeeModal
        openModal={openCreateEmployeeModal}
        setOpenModal={setOpenCreateEmployeeModal}
        createEmployee={createEmployee}
      ></CreateEmployeeModal>
    </div>
  );
};
