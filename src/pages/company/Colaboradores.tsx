import { useEffect } from "react";
import FormDialog from "../../components/Dialog";
import FuncionarioForm from "../../components/FuncionarioForm/FuncionarioForm";
import useCheckAuth from "../../hooks/useCheckAuth";
import { useAuthStore } from "../../stores/authStores";
import "./Colaboradores.css";
import { useCompanyStore } from "../../stores/companyStore";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const Colaboradores = () => {
	useCheckAuth("/login");
	const { employeeDTO, createEmployee, user } = useAuthStore();
	const { company, getCompany } = useCompanyStore();

	useEffect(() => {
		if (!user) return;
		getCompany(user._id);
	}, [user]);

	const handleConfirm = () => {
		employeeDTO.company = user!._id;
		createEmployee(employeeDTO);
	};

	return (
		<div className="colaboradores-container">
			<div className="colaboradores-header">
				<h1>Colaboradores</h1>
				<FormDialog
					titleText="Registrar colaborador"
					buttonText="Novo colaborador"
					onConfirm={() => handleConfirm()}
				>
					<FuncionarioForm />
				</FormDialog>
			</div>
			<div className="colaboradores-card">
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
			</div>
		</div>
	);
};

export default Colaboradores;
