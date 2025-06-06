import { useState } from "react";
import { Form, Input, Avatar, Typography, Row, Col, Card, FormInstance } from "antd";
import "./FuncionarioForm.css";

const { Title, Text } = Typography;

const formatCPF = (cpf: string) => {
	const onlyNumbers = cpf.replace(/\D/g, "");
	return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

type FuncionarioFormProps = {
	form: FormInstance;
	onFinish: (values: any) => void;
};

const FuncionarioForm = ({ form, onFinish }: FuncionarioFormProps) => {
	const [passwordConfirm, setPasswordConfirm] = useState("");

	return (
		<Row gutter={24} className="funcionario-row">
			{/* PRÉ-VISUALIZAÇÃO */}
			<Col xs={24} sm={24} md={10}>
				<Card bordered style={{ textAlign: "center" }}>
					<Avatar
						size={150}
						src={form.getFieldValue("image")}
						alt="Imagem do funcionário"
					/>
					<Title level={4}>
						{form.getFieldValue("name") || "Novo Funcionário"}
					</Title>
					<Text>
						{form.getFieldValue("email") || "email@exemplo.com"}
					</Text>
					<br />
					<Text>
						{form.getFieldValue("cpf") || "000.000.000-00"}
					</Text>
					<br />
					<Text>
						{/* Exibe birthDate formatada no formato dd/mm/yyyy, se existir */}
						{form.getFieldValue("birthDate")
							? new Date(form.getFieldValue("birthDate")).toLocaleDateString("pt-BR")
							: "Data de nascimento"}
					</Text>
				</Card>
			</Col>

			{/* FORMULÁRIO */}
			<Col xs={24} sm={24} md={14}>
				<Form
					form={form}
					layout="vertical"
					validateTrigger={["onChange", "onBlur"]}
					onFinish={(values) => {
						// formatar o CPF antes do envio
						values.cpf = formatCPF(values.cpf);
						onFinish(values);
					}}
				>
					<Form.Item
						label="Nome"
						name="name"
						rules={[{ required: true, message: "Informe o nome" }]}
						hasFeedback
					>
						<Input placeholder="Nome" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Informe o email" },
							{ type: "email", message: "Email inválido" },
						]}
						hasFeedback
					>
						<Input placeholder="email@exemplo.com" />
					</Form.Item>

					<Form.Item
						label="CPF"
						name="cpf"
						rules={[
							{ required: true, message: "Informe o CPF" },
							{
								pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
								message: "CPF inválido",
							},
						]}
						hasFeedback
					>
						<Input
							placeholder="000.000.000-00"
							maxLength={14}
							onChange={(e) => {
								const formatted = formatCPF(e.target.value);
								form.setFieldsValue({ cpf: formatted });
							}}
						/>
					</Form.Item>

					<Form.Item
						label="Data de Nascimento"
						name="birthDate"
						rules={[{ required: true, message: "Informe a data de nascimento" }]}
						hasFeedback
					>
						<Input
							type="date"

							onChange={(e) => {
								form.setFieldsValue({ birthDate: e.target.value });
							}}
						/>
					</Form.Item>

					<Form.Item label="Imagem (URL)" name="image" hasFeedback>
						<Input placeholder="Link da imagem" />
					</Form.Item>

					<Form.Item
						label="Senha"
						name="password"
						rules={[{ required: true, message: "Informe a senha" }]}
						hasFeedback
					>
						<Input.Password placeholder="Senha" />
					</Form.Item>

					<Form.Item
						label="Confirmar senha"
						name="password2"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{ required: true, message: "Confirme a senha" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("As senhas não coincidem!")
									);
								},
							}),
						]}
					>
						<Input.Password
							placeholder="Confirmar senha"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};

export default FuncionarioForm;
