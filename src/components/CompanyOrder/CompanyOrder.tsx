import { nanoid } from "nanoid";
import { ICompanyOrder } from "../../interfaces/CompanyOrder";
import { useRestaurantStore } from "../../stores/restaurantStore";
import { calcularTempoDecorrido } from "../../utils/utils";
import FormDialog from "../Dialog";
import "./CompanyOrder.css";

import { CiClock2 } from "react-icons/ci";

const CompanyOrder = (props: ICompanyOrder) => {
	const quantidade = props.collaboratorsOrders.reduce(
		(acc, dish) => acc + dish.order.quantity,
		0
	);

	const { updateCompanyOrderStatus, getRestaurant } = useRestaurantStore();

	return (
		<div className="company-order-container">
			<div className="co-header">
				<p className="codigo">{props.code}</p>
				<p className="create-at">
					<CiClock2 /> {calcularTempoDecorrido(props.createdAt)}
				</p>
			</div>
			<p className="quantidade-pratos">{quantidade} pratos</p>
			<div className="info-container">
				<div>
					{props.collaboratorsOrders.map(({ order }) => {
						return (
							<p key={nanoid()}>
								{order.quantity} x {order.dishId.name}
							</p>
						);
					})}
				</div>
				<FormDialog
					confirmText="Trocar"
					titleText="Trocar estado do pedido"
					buttonText={props.status}
				>
					{" "}
					<select
						className="select-container"
						onChange={(e) => {
							updateCompanyOrderStatus(
								props?.collaboratorsOrders[0].companyOrder,
								e.target.value
							);
							getRestaurant(props.restaurant);
						}}
					>
						<option value="Pendente">Pendente</option>
						<option value="Confirmado">Confirmado</option>
						<option value="Preparando">Preparando</option>
						<option value="Completado">Completado</option>
						<option value="Cancelado">Cancelado</option>
					</select>
				</FormDialog>
			</div>
		</div>
	);
};

export default CompanyOrder;
