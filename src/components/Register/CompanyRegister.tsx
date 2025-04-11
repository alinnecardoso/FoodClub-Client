import { FormEvent } from "react";
import GenericInput from "../GenericInput";
import { Button } from "@mui/material";

interface CompanyRegisterProps {
	data: object;
}

const CompanyRegister = ({ data }: CompanyRegisterProps) => {
	function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const CompanyData = {
			...data,
			name: formData.get("name"),
			cnpj: formData.get("cnpj"),
			cep: formData.get("cep"),
			number: formData.get("number"),
		};
		console.log("Company -> Button Clicked");
		console.log(CompanyData);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h1>Empresa</h1>
				<GenericInput
					type="text"
					placeholder="Nome do seu Empresa"
					labelText="Nome do seu Empresa"
					name="name"
				/>
				<GenericInput
					type="text"
					placeholder="CNPJ"
					labelText="Digite o CNPJ"
					name="cnpj"
				/>
				<GenericInput
					type="text"
					placeholder="Digite o CEP"
					labelText="CEP"
					name="cep"
				/>
				<GenericInput
					type="number"
					placeholder="Número"
					labelText="Número"
					name="number"
				/>

				<Button variant="contained" color="primary" type="submit">
					Cadastrar
				</Button>
			</form>
		</div>
	);
};

export default CompanyRegister;
