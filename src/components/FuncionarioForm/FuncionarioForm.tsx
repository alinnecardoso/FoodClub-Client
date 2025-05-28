import { useAuthStore } from "../../stores/authStores";
import { Form, Input, Upload, message, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState, useEffect } from "react";
import "./FuncionarioForm.css";

const formatCPF = (cpf: string) => {
	const onlyNumbers = cpf.replace(/\D/g, "");
	if (onlyNumbers.length <= 11) {
		return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}
	return onlyNumbers;
};

const FuncionarioForm = () => {
	const { employeeDTO, setEmployeeDTO } = useAuthStore();
	const [form] = Form.useForm();
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		return () => {
			setIsModalOpen(false);
		};
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === "cpf") {
			const formattedCPF = formatCPF(value);
			const onlyNumbers = formattedCPF.replace(/\D/g, "");

			if (onlyNumbers.length !== 11) {
				setError("O CPF deve ter exatamente 11 dígitos.");
			} else {
				setError(null);
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

	const uploadProps: UploadProps = {
		name: 'file',
		action: '/api/upload', // Substitua pela sua URL de upload
		onChange(info) {
			if (info.file.status === 'done') {
				message.success(`${info.file.name} arquivo enviado com sucesso`);
				setEmployeeDTO({
					...employeeDTO,
					image: info.file.response.url, // Ajuste conforme sua API
				});
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} falha no upload.`);
			}
		},
		showUploadList: false,
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		form.validateFields()
			.then(() => {
				message.success('Funcionário registrado com sucesso!');
				setIsModalOpen(false);
			})
			.catch((error) => {
				console.log('Erro de validação:', error);
			});
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="funcionario-form-container">
			<div className="funcionario-form-header">
				<div
					className="funcionario-image"
					style={{
						backgroundImage: employeeDTO.image ? `url(${employeeDTO.image})` : "none",
					}}
				>
					<Upload {...uploadProps}>
						<button className="upload-button">
							<UploadOutlined /> Alterar foto
						</button>
					</Upload>
				</div>
				<p className="funcionario-name">{employeeDTO.name ? employeeDTO.name : "Novo Funcionário"}</p>
			</div>

			<Form
				form={form}
				layout="vertical"
				initialValues={employeeDTO}
				onFinish={showModal}
			>
				<Form.Item
					name="name"
					label="Nome"
					rules={[{ required: true, message: 'Por favor, insira o nome' }]}
				>
					<Input
						placeholder="Nome"
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					name="email"
					label="Email"
					rules={[
						{ required: true, message: 'Por favor, insira o email' },
						{ type: 'email', message: 'Email inválido' }
					]}
				>
					<Input
						placeholder="renata@gmail.com"
						onChange={handleInputChange}
					/>
				</Form.Item>

				<Form.Item
					name="cpf"
					label="CPF"
					rules={[
						{ required: true, message: 'Por favor, insira o CPF' },
						{ len: 14, message: 'CPF deve ter 11 dígitos' }
					]}
				>
					<Input
						placeholder="CPF"
						onChange={handleInputChange}
						maxLength={14}
					/>
				</Form.Item>

				<Form.Item
					name="password"
					label="Senha"
					rules={[
						{ required: true, message: 'Por favor, insira a senha' },
						{ min: 6, message: 'A senha deve ter no mínimo 6 caracteres' }
					]}
				>
					<Input.Password
						placeholder="Senha"
						onChange={handleInputChange}
					/>
				</Form.Item>

				{error && <p className="error-message">{error}</p>}
			</Form>

			<Modal
				title="Confirmar registro"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Confirmar"
				cancelText="Cancelar"
			>
				<p>Tem certeza que deseja registrar o funcionário {employeeDTO.name}?</p>
				<p>Verifique se todos os dados estão corretos antes de confirmar.</p>
			</Modal>
		</div>
	);
};

export default FuncionarioForm;
