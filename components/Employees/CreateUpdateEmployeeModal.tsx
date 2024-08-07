import { Form, Input, Modal, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { Employee } from "../../models/Employee";
interface CreateUpdateEmployeeModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  employee?: Employee;
  updateEmployee: (value: Employee) => void;
  createEmployee: (value: Employee) => void;
  setEdit?: (value: boolean) => void;
  edit?: boolean;
}

export const CreateUpdateEmployeeModal = (
  props: CreateUpdateEmployeeModalProps
) => {
  const [form] = Form.useForm();
  const [isManager, setIsManager] = useState(false);

  const onOk = () => {
    const employeeValues = form.getFieldsValue();
    if (props.edit && props.setEdit) {
      if (props.employee) {
        const newEmployee = Object.assign(props.employee, employeeValues);
        props.updateEmployee(newEmployee);
        console.log(newEmployee);
      }
      props.setEdit(false);
    } else {
      props.createEmployee(employeeValues);
    }
    props.setOpenModal(false);
    form.resetFields();
  };

  const handleCancel = () => {
    props.setOpenModal(false);
    if (props.edit && props.setEdit) props.setEdit(false);
    form.resetFields();
  };

  const roleOptions: DefaultOptionType[] = [
    { label: "Associate", value: "Associate" },
    { label: "Manager", value: "Manager" },
  ];

  const managerOptions: DefaultOptionType[] = [
    { label: "Tommy McConnell", value: "Tommy McConnell" },
    { label: "Russ Miller", value: "Russ Miller" },
  ];

  useEffect(() => {
    if (props.edit) form.setFieldsValue(props.employee);
  }, [props.openModal]);

  //TODO fix the rules for the form

  return (
    <>
      <Modal
        open={props.openModal}
        onOk={() => {
          form.submit();
          onOk();
        }}
        onCancel={handleCancel}
        title={`${props.edit ? "Edit" : "Create"} Employee`}
        okText={`${props.edit ? "Update" : "Create"}`}
      >
        <Form form={form} onFinish={() => setIsManager(false)}>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input autoFocus placeholder="First Name"></Input>
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input placeholder="Last Name"></Input>
          </Form.Item>
          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select employee role" }]}
          >
            <Select
              placeholder="Role"
              options={roleOptions}
              onChange={(value: string) => {
                if (value == "Manager") {
                  setIsManager(true);
                } else {
                  setIsManager(false);
                }
              }}
            ></Select>
          </Form.Item>
          {!isManager ? (
            <Form.Item
              name="manager"
              rules={[
                {
                  required: true,
                  message: "Please select the employee's manager",
                },
              ]}
            >
              <Select placeholder="Manager" options={managerOptions}></Select>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </>
  );
};
