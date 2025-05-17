import { Form, Input, InputNumber } from "antd";
import { Rule } from "antd/es/form";
import { useState } from "react";

interface GenericInputProps {
  name: string;
  placeholder: string;
  type: string;
  labelText: string;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
}

const GenericInputAnt = ({
  name,
  placeholder,
  type,
  labelText,
  minLength,
  maxLength,
  disabled,
}: GenericInputProps) => {
  const [touched, setTouched] = useState(false);

  const isNumber = type === "number";

  const commonProps = {
    placeholder,
    disabled,
    onChange: () => {
      if (!touched) setTouched(true);
    },
  };

  const inputComponent = isNumber ? (
    <InputNumber style={{ width: "100%" }} {...commonProps} />
  ) : (
    <Input type={type} allowClear {...commonProps} />
  );

  const rules: Rule[] = [
    { required: true, message: `${labelText} é obrigatório.` },
    ...(minLength
      ? [{ min: minLength, message: `${labelText} deve ter no mínimo ${minLength} caracteres.` }]
      : []),
    ...(maxLength
      ? [{ max: maxLength, message: `${labelText} deve ter no máximo ${maxLength} caracteres.` }]
      : []),
  ];

  return (
    <Form.Item
      className="generic-input-ant"
      label={labelText}
      name={name}
      rules={rules}
      validateTrigger={touched ? "onChange" : "onBlur"} // chave da lógica
      hasFeedback
      style={{ marginBottom: 0 }}
    >
      {inputComponent}
    </Form.Item>
  );
};

export default GenericInputAnt;
