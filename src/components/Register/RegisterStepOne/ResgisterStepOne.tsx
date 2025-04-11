import {
	Button,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./RegisterStepOne.css";
import imgEmpresa from "../../../assets/empresa.png";
import imgRestaurante from "../../../assets/restaurante.png";
import { ICompanyRestaurant } from "../RegisterForm";
import { IEmployee } from "../RegisterForm";

interface IRegisterStepOneProps {
	formData: ICompanyRestaurant | IEmployee;
	onStepChange: (delta: number) => void;
	onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

export const RegisterStepOne = ({
	formData,
	onStepChange,
	onDataChange,
}: IRegisterStepOneProps) => {
	const [role, setRole] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<ICompanyRestaurant | IEmployee>(formData);

	function goToNextStep() {
		onStepChange(1); // Avançar
	}

	/*
    const goToPreviousStep = () => {
    onStepChange(-1); // Retroceder
    };
  */

	function handleDataChange() {
		if (!role) {
			setError("Por favor, selecione uma opção antes de prosseguir.");
			return;
		}
		setError(null); // Limpa a mensagem de erro

		let updatedData: ICompanyRestaurant | IEmployee;

		// Verifica o tipo de dados e atualiza com o role selecionado
		if (role === "restaurante" || role === "empresa") {
			updatedData = {
				email: formData.email || "",
				password1: formData.password1 || "",
				password2: formData.password2 || "",
				name: formData.name || "",
				cnpj: (formData as ICompanyRestaurant).cnpj || "",
				cep: (formData as ICompanyRestaurant).cep || "",
				street: (formData as ICompanyRestaurant).street || "",
				city: (formData as ICompanyRestaurant).city || "",
				state: (formData as ICompanyRestaurant).state || "",
				complement: (formData as ICompanyRestaurant).complement || "",
				number: (formData as ICompanyRestaurant).number || "",
				role,
				image: "",
			};
		} else {
			updatedData = {
				email: formData.email || "",
				password1: formData.password1 || "",
				password2: formData.password2 || "",
				name: formData.name || "",
				birthday: (formData as IEmployee).birthday || "",
				company: (formData as IEmployee).company || "",
				role,
				image: "",
			};
		}

		setData(updatedData);
		onDataChange(updatedData); // Notifica o componente pai
		goToNextStep();
	}

	function handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setRole(event.target.value);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault(); // Evita o reload da página
		handleDataChange();
	}

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div className="step-1-container">
			<div id="registerFormStepOne">
				<form id="formChooseRole" onSubmit={handleSubmit}>
					<div className="form-group">
						<div className="form-header">
							<FormLabel id="demo-row-radio-buttons-group-label">
								<h1>Você quer se cadastrar como</h1>
								<span>Escolha o tipo desejado</span>
							</FormLabel>
						</div>

						<RadioGroup
							onChange={handleRoleChange}
							id="radio-group"
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={role}
						>
							{[
								{ value: "empresa", label: "Empresa", img: imgEmpresa },
								{ value: "restaurante", label: "Restaurante", img: imgRestaurante },
							].map(({ value, label, img }) => (
								<FormControlLabel
									key={value}
									value={value}
									control={
										<Radio
											className="radio"
											icon={<img src={img} alt={`Ícone para ${label} não selecionado`} />}
											checkedIcon={
												<img
													src={img}
													alt={`Ícone para ${label} selecionado`}
													style={{
														filter: "brightness(1)",
														transform: "scale(1.3)",
														backgroundColor: "#f5d0d0b3",
														padding: "5px",
														borderRadius: "8px",
														transition: "0.3s ease",
													}}
												/>
											}
										/>
									}
									label={value === role ? ` ${label}` : label}
									sx={{
										"& .MuiFormControlLabel-label": {
											fontSize: "1.2rem",
											fontWeight: value === role ? "bold" : "normal",
											color: value === role ? "#7D0000" : "#000",
											transition: "0.3s ease",
										},
									}}
								/>
							))}
						</RadioGroup>
					</div>

					<div className="buttonGroup">
						{error && <span style={{ color: "red" }}>{error}</span>}
						<Button variant="contained" color="primary" type="submit">
							Prosseguir
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
