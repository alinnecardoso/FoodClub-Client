import React, { useEffect } from "react";
import FuncionarioForm from "../../../components/FuncionarioForm/FuncionarioForm";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { useAuthStore } from "../../../stores/authStores";
import "./Colaboradores.css";
import { useCompanyStore } from "../../../stores/companyStore";
import useColaboradoresTableColumns from "./hooks/useColaboradoresTableColumns";
import { Form, message, Modal, Table } from "antd";
import BasicModal from "../../../components/Forms/Modal/BasicModalButton";
import { UserType } from "../../../enums/enums";
import { useEmployeeStore } from "../../../stores/employeeStore";

const { confirm } = Modal;

const Colaboradores = () => {
	useCheckAuth("/login");
	const { createEmployee, user } = useAuthStore();
	const { company, getCompany } = useCompanyStore();
	const { removeEmployee } = useEmployeeStore();
	const [form] = Form.useForm();

	useEffect(() => {
		if (!user) return;
		getCompany(user._id);
	}, [user]);

	const handleCreate = async () => {
		try {
			await form.validateFields();

			form.setFieldsValue({
				company: company?._id,
				userType: UserType.EMPLOYEE,
			});

			const values = form.getFieldsValue(true);
			const response = await createEmployee(values);
			if (!response.success) {
				message.error(response.error);
				return;
			} else {
				message.success(response.message);
			}
			form.resetFields();
		} catch (error) {
			console.error("Erro na validação do formulário", error);
		}
	};

	// Função que chama a confirmação de exclusão
	const showDeleteConfirm = (colaborador: any) => {
		confirm({
			title: `Deseja realmente remover ${colaborador.name}?`,
			content: "Esse funcionário perderá seu acesso ao sistema.",
			okText: "Sim, remover",
			okType: "danger",
			cancelText: "Cancelar",
			centered: true,
			onOk() {
				handleDelete(colaborador._id);
			},
		});
	};

	// Função real que remove o colaborador (deve ser implementada para chamar a API)
	const handleDelete = async (employeeId: string) => {
		try {
			const response = await removeEmployee(employeeId);

			if (!response.success) {
				message.error(response.error);
				return;
			} else {
				console.log(response)
				message.success(response.message);
				getCompany(user._id);
			}
		} catch (error) {
			console.error("Erro ao remover colaborador", error);

		}
	};

	const columns = useColaboradoresTableColumns({
		onEdit: (colaborador) => console.log("Editar", colaborador),
		onDelete: (colaborador) => showDeleteConfirm(colaborador),
	});

	const handleCancel = () => {
		form.resetFields();
	};

	return (
		<div className="colaboradores-container">
			<h1>Colaboradores</h1>
			<BasicModal
				title="Adicionar colaborador"
				buttonContent="Adicionar"
				width="80%"
				maxWidth="700px"
				okText=""
				handleCancel={handleCancel}
				handleOk={handleCreate}
			>
				<FuncionarioForm form={form} onFinish={handleCreate} />
			</BasicModal>

			<Table
				columns={columns}
				dataSource={company?.employees}
				rowKey="_id"
				scroll={{ x: "max-content" }}
			/>
		</div>
	);
};

export default Colaboradores;
