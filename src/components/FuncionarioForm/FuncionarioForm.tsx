import { useAuthStore } from "../../stores/authStores";
import GenericInput from "../GenericInput";
import "./FuncionarioForm.css";
import { useState } from "react";

const formatCPF = (cpf: string) => {
	const onlyNumbers = cpf.replace(/\D/g, "");
	if (onlyNumbers.length <= 11) {
		return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}
	return onlyNumbers;
};

const FuncionarioForm = () => {
	const { employeeDTO, setEmployeeDTO } = useAuthStore();
	const [error, setError] = useState<string | null>(null);

	console.log(employeeDTO);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "cpf") {
			const formattedCPF = formatCPF(value);
			const onlyNumbers = formattedCPF.replace(/\D/g, "");

			// Valida se o CPF tem exatamente 11 dígitos
			if (onlyNumbers.length !== 11) {
				setError("O CPF deve ter exatamente 11 dígitos.");
			} else {
				setError(null); // Remove o erro se válido
			}

			setEmployeeDTO({
				...employeeDTO,
				[name]: formattedCPF,
			});
		} else {
			if (name !== "password2") {
				setEmployeeDTO({
					...employeeDTO,
					[name]: value,
				});
			}

			if (name === "password2") {
				if (value !== employeeDTO.password) {
					setError("As senhas não coincidem!");
				} else {
					setError(null);
				}
			}
		}
	};

	return (
		<div className="funcionario-form-container">
			<div className="funcionario-form-header">
				<div
					className="funcionario-image"
					style={{
						backgroundImage: employeeDTO.image ? `url(${employeeDTO.image})` : "none",
					}}
				></div>
				<p>{employeeDTO.name ? employeeDTO.name : "Novo Funcionario"}</p>
			</div>
			<GenericInput
				type="text"
				placeholder="Nome"
				labelText="Nome"
				name="name"
				value={employeeDTO.name}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="email"
				placeholder="renata@gmail.com"
				labelText="Email"
				name="email"
				value={employeeDTO.email}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="text"
				placeholder="CPF"
				labelText="CPF"
				name="cpf"
				value={employeeDTO.cpf}
				onChange={handleInputChange}
				maxLength={14}
				minLength={11}
			/>
			<GenericInput
				type="text"
				placeholder="Imagem"
				labelText="Imagem"
				name="image"
				value={employeeDTO.image}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="password"
				placeholder="Senha"
				labelText="Senha"
				name="password"
				value={employeeDTO.password}
				onChange={handleInputChange}
			/>

			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default FuncionarioForm;
