import { useEffect } from "react";
import { useRestaurantStore } from "../../stores/restaurantStore";
import "./Pedidos.css";
import RestaurantOrdersTable from "./Orders/components/RestaurantOrdersTable";

const Pedidos = () => {
	const { restaurant, getRestaurant } = useRestaurantStore();

	// Extrai o ID do restaurante salvo no Zustand (ou defina de outra fonte se necessário)
	const restaurantId = restaurant?._id;

	useEffect(() => {
		// Garante que sempre que entrar na página, os dados sejam atualizados
		if (restaurantId) {
			getRestaurant(restaurantId);
		}
	}, [restaurantId, getRestaurant]);

	return (
		<div >
			<div >
				<h1 >Pedidos</h1>
			</div>

			<div >
				{restaurant?.companyOrders ? (
					<RestaurantOrdersTable companyOrders={restaurant.companyOrders} />
				) : (
					<p>Carregando pedidos...</p>
				)}
			</div>
		</div>
	);
};

export default Pedidos;
