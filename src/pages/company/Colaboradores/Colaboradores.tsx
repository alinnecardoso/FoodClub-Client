import { useEffect } from "react";
import FuncionarioForm from "../../../components/FuncionarioForm/FuncionarioForm";
import useCheckAuth from "../../../hooks/useCheckAuth";
import { useAuthStore } from "../../../stores/authStores";
import "./Colaboradores.css";
import { useCompanyStore } from "../../../stores/companyStore";
import useColaboradoresTableColumns from "./hooks/useColaboradoresTableColumns";
import { Form, message, Table } from "antd";
import BasicModal from "../../../components/Forms/Modal/BasicModalButton";
import { UserType } from "../../../enums/enums";



const Colaboradores = () => {
	useCheckAuth("/login");
	const { employeeDTO, createEmployee, user, error } = useAuthStore();
	const { company, getCompany } = useCompanyStore();
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
			console.log(values);
			const response = await createEmployee(values);
			console.log(response)
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

	const columns = useColaboradoresTableColumns({
		onEdit: (colaborador) => console.log('Editar', colaborador),
		onDelete: (colaborador) => console.log('Excluir', colaborador),
	});

	function handleCancel(): void {

	}

	return (
		<div className="colaboradores-container">

			<h1>Colaboradores</h1>
			<BasicModal
				title="Adicionar colaborador"
				buttonContent="Adicionar"
				width="80%"
				maxWidth="700px"
				okText=""
				handleCancel={() => handleCancel()}
				handleOk={() => handleCreate()}
			>
				<FuncionarioForm form={form} onFinish={handleCreate} />
			</BasicModal>


			<Table
				columns={columns}
				dataSource={company?.employees}
				rowKey="_id"
				scroll={{ x: 'max-content' }} // rolagem horizontal
			/>


			{/* <div className="colaboradores-card">
				{company?.employees?.map((employee) => {
					return (
						<div className="colaborador-card">
							<img
								src={employee.image}
								alt="Foto do funcionário"
								onError={(e) => {
									(e.target as HTMLImageElement).src =
										"https://www.fatosdesconhecidos.com.br/wp-content/uploads/2020/01/images-600x377.png";
								}}
							/>

							<div className="colaborador-info">
								{" "}
								<p className="colaborador-name">{employee.name}</p>
								<p className="colaborador-email">{employee.email}</p>
							</div>
							<div className="actions-container">
								<FaRegTrashCan fontSize={20} color="red" />
								<MdEdit fontSize={20} />
							</div>
						</div>
					);
				})}
			</div> */}
		</div>
	);
};

export default Colaboradores;
