import { Button, Table } from "antd";
import { useState } from "react";
import { CreateEmployeeModal } from "./Employees/CreateEmployeeModal";
import { Employee } from "../models/Employee";
import { ColumnsType } from "antd/es/table";

export const HomePage = () => {
  const [openCreateEmployeeModal, setOpenCreateEmployeeModal] = useState(false);

  const handleClick = () => {
    setOpenCreateEmployeeModal(true);
  };
  const employees: Employee[] = [
    { id: 1, firstName: "Travis", lastName: "Kinnett", role: "Associate" },
  ];
  const createEmployee = (Employee: Employee) => {
    employees.push(Employee);
  };

  const columns: ColumnsType = [
    { title: "ID", dataIndex: "id" },
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Role", dataIndex: "role" },
    { title: "" },
  ];

  return (
    <div>
      <div className="pb-4 text-xl">Employees</div>
      <Table dataSource={employees} columns={columns}></Table>
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
