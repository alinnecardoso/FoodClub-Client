import { useState } from "react";
import "./RegisterForm.css";
import { RegisterStepOne } from "./RegisterStepOne/ResgisterStepOne";
import { RegisterStepTwo } from "./RegisterStepTwo/RegisterStepTwo";
import imagemFundo from "../../assets/eating a variety of foods-bro.svg";
import { RegisterStepThree } from "./RegisterStepThree/RegisterStepThree";
import { RegisterStepFive } from "./RegisterStepFive/RegisterStepFive";
import { RegisterStepFour } from "./RegisterStepFour/RegisterStepFour";
import { useAuthStore } from "../../stores/authStores";
import { useNavigate } from "react-router-dom";

interface IProps {
	screenSize: number;
}

export interface IEmployee {
	role: string;
	email: string;
	password1: string;
	password2: string;
	name: string;
	birthday: string;
	company: string;
	image: string;
}

export interface ICompanyRestaurant {
	role: string;
	email: string;
	password1: string;
	password2: string;
	name: string;
	cnpj: string;
	cep: string;
	street: string;
	city: string;
	state: string;
	complement: string;
	number: string;
	image: string;
}

const RegisterForm = ({ screenSize }: IProps) => {
	const { businessDTO, setBusinessDTO, createBusiness, checkAuth } =
		useAuthStore();
	const navigate = useNavigate();

	const [step, setStep] = useState<number>(1);
	const [formData, setFormData] = useState<ICompanyRestaurant | IEmployee>({
		role: "",
		email: "",
		password1: "",
		password2: "",
		name: "",
		cnpj: "",
		cep: "",
		street: "",
		city: "",
		state: "",
		complement: "",
		number: "",
		birthday: "",
		company: "",
		image: "",
	});

	async function handleStepChange(delta: number) {
		setStep((prevStep) => prevStep + delta);

		// Atualizar businessDTO na etapa 3
		if (step === 3) {
			// Verifique se o formData tem as propriedades necessárias
			const updatedBusinessDTO = {
				name: formData.name,
				cnpj: (formData as ICompanyRestaurant).cnpj,
				cep: (formData as ICompanyRestaurant).cep,
				number: (formData as ICompanyRestaurant).number,
				image: (formData as ICompanyRestaurant).image,
				email: formData.email,
				password: formData.password1, // Atribuir password1 para o password no DTO
				userType: formData.role,
				verificationToken: businessDTO.verificationToken,
				verificationTokenExpireAt: businessDTO.verificationTokenExpireAt,
			};

			// Atualizar o store com o novo DTO
			setBusinessDTO(updatedBusinessDTO);
			await createBusiness(updatedBusinessDTO);
			await checkAuth();
			navigate("/inicio", { replace: true });
		}
	}

	const handleDataChange = (updatedData: ICompanyRestaurant | IEmployee) => {
		setFormData(updatedData);
	};

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return (
					<>
						<RegisterStepOne
							formData={formData}
							onStepChange={handleStepChange}
							onDataChange={handleDataChange}
						/>
						{screenSize > 800 && (
							<div className="imagem-fundo">
								<img src={imagemFundo} alt="Imagem de fundo" />
							</div>
						)}
					</>
				);
			case 2:
				return (
					<>
						<RegisterStepTwo
							formData={formData}
							onStepChange={handleStepChange}
							onDataChange={handleDataChange}
						/>
						{screenSize > 800 && (
							<div className="imagem-fundo">
								<img src={imagemFundo} alt="Imagem de fundo" />
							</div>
						)}
					</>
				);

			case 3:
				return (
					<>
						<RegisterStepThree
							formData={formData}
							onStepChange={handleStepChange}
							onDataChange={handleDataChange}
						/>
						{screenSize > 800 && (
							<div className="imagem-fundo">
								<img src={imagemFundo} alt="Imagem de fundo" />
							</div>
						)}
					</>
				);

			case 4:
				return (
					<>
						<RegisterStepFour
							formData={formData}
							onStepChange={handleStepChange}
							onDataChange={handleDataChange}
						/>
						{screenSize > 800 && (
							<div className="imagem-fundo">
								<img src={imagemFundo} alt="Imagem de fundo" />
							</div>
						)}
					</>
				);

			case 5:
				return (
					<>
						<RegisterStepFive />
						{screenSize > 800 && (
							<div className="imagem-fundo">
								<img src={imagemFundo} alt="Imagem de fundo" />
							</div>
						)}
					</>
				);
			default:
				return null;
		}
	};

	return <div className="container">{renderStepContent()}</div>;
};

export default RegisterForm;
