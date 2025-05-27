import { Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { ICompanyRestaurant, IEmployee } from "../RegisterForm";
import "./RegisterStepTwo.css";
import { validateEmail } from "../../../utils/validateEmail";

const { Title, Text } = Typography;

interface IRegisterStepTwoProps {
	formData: ICompanyRestaurant | IEmployee;
	onStepChange: (delta: number) => void;
	onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

type FormValues = {
  email: string;
  password1: string;
  password2: string;
};

const userTypeLabelMap: { [key: string]: string } = {
	company: 'Empresa',
	restaurant: 'Restaurante'
};
export const RegisterStepTwo = ({
	formData,
	onStepChange,
	onDataChange,
}: IRegisterStepTwoProps) => {
	const [form] = Form.useForm();
	const [userType] = useState(formData.userType);
	const [, setData] = useState<ICompanyRestaurant | IEmployee>(formData);

	function goToNextStep() {
		onStepChange(1);
	}

	const handleSubmit = (values: FormValues) => {
		const { email, password1, password2 } = values;

		if (!validateEmail(email)) {
			form.setFields([{ name: "email", errors: ["E-mail inválido."] }]);
			return;
		}

		if (password1 !== password2) {
			form.setFields([{ name: "password2", errors: ["As senhas não coincidem."] }]);
			return;
		}

		if (password1.length < 6) {
			form.setFields([{ name: "password1", errors: ["A senha deve ter pelo menos 6 caracteres."] }]);
			return;
		}

		let updatedData: ICompanyRestaurant | IEmployee;

		if (formData.userType === "restaurante" || formData.userType === "empresa") {
			updatedData = {
				...(formData as ICompanyRestaurant),
				email,
				password1,
				password2,
				image: "",
			};
		} else {
			updatedData = {
				...(formData as IEmployee),
				email,
				password1,
				password2,
				image: "",
			};
		}

		setData(updatedData);
		onDataChange(updatedData);
		console.log(updatedData);
		goToNextStep();
	};

	return (
		<div className={`step-2-container visible`}>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				requiredMark={false}
				className="RegisterForm"
			>
				<div className="basic-info-container">
					<div className="input-label-group">
						<div className="titleText">
							<Title level={3}>
								{userTypeLabelMap[formData.userType] || ''}
							</Title>
							<Text type="secondary">Informações da conta</Text>
						</div>

						<Form.Item
							label="Email"
							name="email"
							hasFeedback
							rules={[
								{ required: true, message: "Por favor, insira seu email." },
								{ type: "email", message: "Formato de email inválido." },
							]}
						>
							<Input placeholder="Ex: sara@gmail.com" />
						</Form.Item>

						<Form.Item
							label="Digite a sua senha"
							name="password1"
							hasFeedback
							rules={[
								{ required: true, message: "Por favor, insira sua senha." },
								{ min: 6, message: "A senha deve ter pelo menos 6 caracteres." },
							]}
						>
							<Input.Password placeholder="Digite a sua senha" />
						</Form.Item>

						<Form.Item
							label="Confirme a sua senha"
							name="password2"
							dependencies={["password1"]}
							hasFeedback
							rules={[
								{ required: true, message: "Confirme sua senha." },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password1") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("As senhas não coincidem."));
									},
								}),
							]}
						>
							<Input.Password placeholder="Digite a sua senha novamente" />
						</Form.Item>

						
					</div>
					<Form.Item style={{ marginTop: "2rem" }}>
						<Button type="primary" htmlType="submit" block className="btn-red">
							CONTINUAR
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};
