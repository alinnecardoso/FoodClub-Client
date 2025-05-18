import { useEffect, useState } from "react";
import { Button, Form, Typography } from "antd";
import "./RegisterStepOne.css";
import imgEmpresa from "../../../assets/empresa.png";
import imgRestaurante from "../../../assets/restaurante.png";
import { ICompanyRestaurant } from "../RegisterForm";
import { IEmployee } from "../RegisterForm";

const { Title, Text } = Typography;

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
	const [role, setRole] = useState<string>(formData.role || "");
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<ICompanyRestaurant | IEmployee>(formData);

	function goToNextStep() {
		onStepChange(1);
	}

	function handleDataChange() {
		if (!role) {
			setError("Por favor, selecione uma opção antes de prosseguir.");
			return;
		}
		setError(null);

		let updatedData: ICompanyRestaurant | IEmployee;

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
		onDataChange(updatedData);
		goToNextStep();
	}

	function handleSubmit() {
		handleDataChange();
	}

	useEffect(() => {
		console.log(data);
	}, [data]);

	const options = [
		{ value: "empresa", label: "Empresa", img: imgEmpresa },
		{ value: "restaurante", label: "Restaurante", img: imgRestaurante },
	];

	return (
		<div className="step-1-container">
			<div id="registerFormStepOne">
				<Form layout="vertical" onFinish={handleSubmit} className='RegisterForm' >
					<div>
						<div className="form-header">
							<Title level={3}>Você quer se cadastrar como</Title>
							<Text type="secondary">Escolha o tipo desejado</Text>
						</div>

						<Form.Item>
							<div className="role-options">
								{options.map(({ value, label, img }) => (
									<div
										key={value}
										className={`card-option ${role === value ? "selected" : ""}`}
										onClick={() => setRole(value)}
									>
										<img src={img} alt={label} />
										<div>{label}</div>
									</div>
								))}
							</div>
						</Form.Item>

						{error && <Text type="danger">{error}</Text>}
					</div>

					
					<div className="form-footer">
						<Button type="primary" htmlType="submit" block>
							Prosseguir
						</Button>
					</div>
				</Form>

				
			</div>
		</div>
	);
};
