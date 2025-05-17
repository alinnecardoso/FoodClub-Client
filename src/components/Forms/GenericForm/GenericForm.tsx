import { Form } from "antd";
import { ReactNode } from "react";

interface GenericFormProps {
  children: ReactNode;
  onFinish?: (values: any) => void;
  form?: any;
}

const GenericForm = ({ children, onFinish, form }: GenericFormProps) => {
  return (
    <Form
      layout="vertical"
      name="generic-form"
      style={{ gap: "0.5rem", margin: '1rem 0' }}
      initialValues={{ remember: false }}
      autoComplete="off"
      onFinish={onFinish}
      form={form}
    >
      {children}
    </Form>
  );
};

export default GenericForm;
