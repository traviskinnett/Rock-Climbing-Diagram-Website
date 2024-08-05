import { Button, Table } from "antd";
import { useState } from "react";
import { CreateUpdateEmployeeModal } from "./Employees/CreateUpdateEmployeeModal";
import { Employee } from "../models/Employee";
import { ColumnsType } from "antd/es/table";
let employees: Employee[] = [];
let employeeId = 1;
export const HomePage = () => {
  const [openCreateUpdateEmployeeModal, setOpenCreateEmployeeModal] =
    useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>();

  const handleClick = () => {
    setOpenCreateEmployeeModal(true);
  };

  const createEmployee = (Employee: Employee) => {
    Employee.id = employeeId;
    employees.push(Employee);
    employeeId++;
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
                console.log(record);
                setOpenCreateEmployeeModal(true);
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                employees = employees.filter((o) => o.id != record.id);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="pb-4 text-xl flex justify-between">
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
        createEmployee={createEmployee}
      ></CreateUpdateEmployeeModal>
    </div>
  );
};
