import { Form, Input, Modal, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { Employee } from "../../models/Employee";
interface CreateEmployeeModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  createEmployee: (value: Employee) => void;
}

export const CreateEmployeeModal = (props: CreateEmployeeModalProps) => {
  const [form] = Form.useForm();

  const onCreate = () => {
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
    { label: "Tommy McConnell", value: "Associate" },
    { label: "Russ Miller", value: "Manager" },
  ];

  return (
    <>
      <Modal
        open={props.openModal}
        onOk={onCreate}
        onCancel={handleCancel}
        title="Create Employee"
        okText="Create"
        destroyOnClose
      >
        <Form form={form} onFinish={onCreate}>
          <Form.Item name="firstName">
            <Input placeholder="First Name"></Input>
          </Form.Item>
          <Form.Item name="lastName">
            <Input placeholder="Last Name"></Input>
          </Form.Item>
          <Form.Item name="role">
            <Select placeholder="Role" options={roleOptions}></Select>
          </Form.Item>
          <Form.Item name="manager">
            <Select placeholder="Manager" options={managerOptions}></Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
