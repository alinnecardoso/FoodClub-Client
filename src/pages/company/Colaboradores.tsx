import { useEffect, useState } from "react";
import FormDialog from "../../components/Dialog";
import FuncionarioForm from "../../components/FuncionarioForm/FuncionarioForm";
import useCheckAuth from "../../hooks/useCheckAuth";
import { useAuthStore } from "../../stores/authStores";
import "./Colaboradores.css";
import { useCompanyStore } from "../../stores/companyStore";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { Table, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
	key: string;
	name: string;
	email: string;
	image: string;
}

const Colaboradores = () => {
	useCheckAuth("/login");
	const { employeeDTO, createEmployee, user } = useAuthStore();
	const { company, getCompany } = useCompanyStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<DataType | null>(null);

	useEffect(() => {
		if (!user) return;
		getCompany(user._id);
	}, [user]);

	const handleConfirm = () => {
		employeeDTO.company = user!._id;
		createEmployee(employeeDTO);
	};

	const showDeleteModal = (record: DataType) => {
		setSelectedEmployee(record);
		setIsModalOpen(true);
	};

	const handleDelete = () => {
		if (selectedEmployee) {
			//TODO - lógica de exclusão
			message.success('Colaborador excluído com sucesso!');
			setIsModalOpen(false);
			setSelectedEmployee(null);
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setSelectedEmployee(null);
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'Foto',
			dataIndex: 'image',
			key: 'image',
			render: (image: string) => (
				<img
					src={image}
					alt="Foto do funcionário"
					style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
					onError={(e) => {
						(e.target as HTMLImageElement).src =
							"https://www.fatosdesconhecidos.com.br/wp-content/uploads/2020/01/images-600x377.png";
					}}
				/>
			),
		},
		{
			title: 'Nome',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Ações',
			key: 'actions',
			render: (_: unknown, record: DataType) => (
				<div style={{ display: 'flex', gap: '10px' }}>
					<FaRegTrashCan 
						fontSize={20} 
						color="red" 
						style={{ cursor: 'pointer' }} 
						onClick={() => showDeleteModal(record)}
					/>
					<MdEdit fontSize={20} style={{ cursor: 'pointer' }} />
				</div>
			),
		},
	];

	const data: DataType[] = company?.employees?.map((employee) => ({
		key: employee._id,
		name: employee.name,
		email: employee.email,
		image: employee.image,
	})) || [];

	return (
		<div className="colaboradores-container">
			<div className="colaboradores-header">
				<h1 style={{ fontSize: '24px', fontWeight: 'bold'}}>Colaboradores</h1>
				<FormDialog
					titleText="Registrar colaborador"
					buttonText="Novo colaborador"
					onConfirm={() => handleConfirm()}
				>
					<FuncionarioForm />
				</FormDialog>
			</div>
			<Table 
				columns={columns} 
				dataSource={data} 
				style={{ width: '100%' }}
				pagination={{ pageSize: 10 }}
			/>
			<Modal
				title="Confirmar exclusão"
				open={isModalOpen}
				onOk={handleDelete}
				onCancel={handleCancel}
				okText="Sim, excluir"
				cancelText="Cancelar"
				okButtonProps={{ danger: true }}
			>
				<p>Tem certeza que deseja excluir o colaborador {selectedEmployee?.name}?</p>
				<p>Esta ação não poderá ser desfeita.</p>
			</Modal>
		</div>
	);
};

export default Colaboradores;
