import { Button, FormHelperText, FormLabel } from "@mui/material";
import EmailInput from "../../EmailInput";
import GenericInput from "../../GenericInput";
import { useState } from "react";
import { ICompanyRestaurant } from "../RegisterForm";
import { IEmployee } from "../RegisterForm";
import "./RegisterStepTwo.css";
import { validateEmail } from "../../../utils/validateEmail";

interface IRegisterStepTwoProps {
	formData: ICompanyRestaurant | IEmployee;
	onStepChange: (delta: number) => void;
	onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

export const RegisterStepTwo = ({
	formData,
	onStepChange,
	onDataChange,
}: IRegisterStepTwoProps) => {
	const [email, setEmail] = useState(formData.email);
	const [password1, setPassword1] = useState(formData.password1);
	const [password2, setPassword2] = useState(formData.password2);
	const [role] = useState(formData.role);
	const [, setData] = useState<ICompanyRestaurant | IEmployee>(formData);
	const [isAnimating] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	function goToNextStep() {
		onStepChange(1); // Avançar
	}

	/*
        function goToPreviousStep(){
            onStepChange(-1); // Retroceder
        };
    */

	function handleEmailChange(
		setEmail: React.Dispatch<React.SetStateAction<string>>
	) {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value; // Remove espaços
			setEmail(value);
		};
	}

	function handlePasswordChange(
		setPassword: React.Dispatch<React.SetStateAction<string>>
	) {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.replace(/\s/g, ""); // Remove espaços
			setPassword(value);
		};
	}

	function handleDataChange() {
		// Validação de campos obrigatórios
		if (!email || !password1 || !password2) {
			setError("Por favor, preencha todos os campos obrigatórios.");
			return;
		}

		// Validação de e-mail
		if (!validateEmail(email)) {
			setError("E-mail inválido.");
			return;
		}

		// Validação de senhas
		if (password1 !== password2) {
			setError("As senhas não coincidem.");
			return;
		}

		if (password1.length < 6) {
			setError("A senha deve ter pelo menos 6 caracteres.");
			return;
		}
		let updatedData: ICompanyRestaurant | IEmployee;

		if (formData.role === "restaurante" || formData.role === "empresa") {
			updatedData = {
				name: formData.name || "",
				cnpj: (formData as ICompanyRestaurant).cnpj || "",
				cep: (formData as ICompanyRestaurant).cep || "",
				street: (formData as ICompanyRestaurant).street || "",
				city: (formData as ICompanyRestaurant).city || "",
				state: (formData as ICompanyRestaurant).state || "",
				complement: (formData as ICompanyRestaurant).complement || "",
				number: (formData as ICompanyRestaurant).number || "",
				role: (formData as ICompanyRestaurant).role,
				email,
				password1,
				password2,
				image: "",
			};
		} else {
			updatedData = {
				name: formData.name || "",
				birthday: (formData as IEmployee).birthday || "",
				company: (formData as IEmployee).company || "",
				role: (formData as IEmployee).role,
				email,
				password1,
				password2,
				image: "",
			};
		}

		setData(updatedData);
		onDataChange(updatedData); // Notifica o componente pai
		console.log(updatedData);
		goToNextStep();
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault(); // Evita o reload da página
		handleDataChange();
	}

	return (
		<div className={`step-2-container ${isAnimating ? "hidden" : "visible"}`}>
			{/*
                <Button id="return" startIcon={<ArrowBack />} onClick={goToPreviousStep}>
                    Voltar
                </Button>
            */}

			<form onSubmit={handleSubmit} noValidate>
				<div className="basic-info-container">
					<div className="input-label-group">
						<FormLabel id="demo-row-radio-buttons-group-label">
							<h1>{role.charAt(0).toUpperCase() + role.slice(1)}</h1>
							<span>Informações da conta</span>
						</FormLabel>

						<EmailInput
							name="email"
							placeholder="Ex: sara@gmail.com"
							labelText="Email"
							required
							value={email}
							onChange={handleEmailChange(setEmail)}
						/>

						<GenericInput
							minLength={6}
							type="password"
							placeholder="Digite a sua senha"
							labelText="Digite a sua senha"
							name="password1"
							value={password1}
							onChange={handlePasswordChange(setPassword1)}
						/>
						<GenericInput
							minLength={6}
							type="password"
							placeholder="Digite a sua senha novamente"
							labelText="Confirme a sua senha"
							name="password2"
							value={password2}
							onChange={handlePasswordChange(setPassword2)}
						/>
						{error && error.includes("senha") && (
							<FormHelperText error>{error}</FormHelperText>
						)}
					</div>

					{error && error.includes("obrigatórios") && (
						<FormHelperText error>{error}</FormHelperText>
					)}
					<Button variant="contained" color="primary" type="submit">
						Continuar
					</Button>
				</div>
				{/*
                    <Button href="/login" id="btn-login" variant="contained" color="inherit">
                        Retornar para o login
                    </Button>
                */}
			</form>
		</div>
	);
};
