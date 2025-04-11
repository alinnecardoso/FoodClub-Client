import { OrderStatus } from "../../enums/enums";
import "./EstadoPedido.css";

type Props = {
	type: OrderStatus;
};

const EstadoPedido = (props: Props) => {
	return (
		<div className={`estado-pedido-container ${props.type}`}>{props.type}</div>
	);
};

export default EstadoPedido;
