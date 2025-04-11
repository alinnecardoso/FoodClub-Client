import React, { useState } from "react";
import GenericInput from "./GenericInput";
import { validateEmail } from "../utils/validateEmail";

interface EmailInputProps {
  name: string;
  placeholder: string;
  labelText: string;
  required?: boolean;
  value?: string; // Suporte para valor controlado
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Suporte para mudança externa
}

const EmailInput: React.FC<EmailInputProps> = ({
  name,
  placeholder,
  labelText,
  value = "", // Valor inicial padrão
  onChange, // Callback externo
}) => {
  const [email, setEmail] = useState<string>(value);
  const [error, setError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);

    if (validateEmail(value)) {
      setError("");
    } else {
      setError("E-mail inválido");
    }

    // Notifica o callback externo, se fornecido
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <GenericInput
      type="email"
      name={name}
      placeholder={placeholder}
      labelText={labelText}
      error={!!error}
      helperText={error}
      value={email}
      onChange={handleChange}
    />
  );
};

export default EmailInput;
