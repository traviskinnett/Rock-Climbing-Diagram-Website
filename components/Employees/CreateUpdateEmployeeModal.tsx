import { Form, Input, Modal, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { Employee } from "../../models/Employee";
import { useEffect, useState } from "react";
interface CreateUpdateEmployeeModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  employee?: Employee;
  createEmployee: (value: Employee) => void;
}

export const CreateUpdateEmployeeModal = (
  props: CreateUpdateEmployeeModalProps
) => {
  const [form] = Form.useForm();
  const [isManager, setIsManager] = useState(false);

  const onOk = () => {
    const employee = form.getFieldsValue();

    props.createEmployee(employee);
    props.setOpenModal(false);
  };

  const handleCancel = () => {
    props.setOpenModal(false);
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
    form.setFieldsValue(props.employee);
  }, [props.openModal]);

  return (
    <>
      <Modal
        open={props.openModal}
        onOk={() => {
          form.submit();
          onOk();
        }}
        onCancel={handleCancel}
        title="Create Employee"
        okText="Create"
        destroyOnClose
      >
        <Form form={form} clearOnDestroy onFinish={() => setIsManager(false)}>
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
