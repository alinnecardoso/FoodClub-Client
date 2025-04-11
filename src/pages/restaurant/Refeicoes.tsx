import { nanoid } from "nanoid";
import RefeicaoCard from "../../components/RefeicaoCard/RefeicaoCard";
import { IRestaurant } from "../../interfaces/restaurant";
import { useAuthStore } from "../../stores/authStores";
import "./Refeicoes.css";
import FormDialog from "../../components/Dialog";
import PratoForm from "../../components/PratoForm/PratoForm";
import { useRestaurantStore } from "../../stores/restaurantStore";
import { useEffect } from "react";

const Refeicoes = () => {
	let { user } = useAuthStore();
	user = user as IRestaurant;

	const { dishDTO, createDish, restaurant, getRestaurant } =
		useRestaurantStore();

	useEffect(() => {
		getRestaurant(user?._id.toString());
	}, []);

	const handleSubmit = () => {
		if (
			dishDTO.name != "" &&
			dishDTO.description != "" &&
			dishDTO.price != 0 &&
			dishDTO.image != ""
		) {
			dishDTO.restaurantId = user._id;
			createDish(dishDTO);
		}
	};

	return (
		<div className="refeicoes-container">
			<div className="header-pratos-container">
				<h1>Pratos</h1>
				<FormDialog
					buttonText="Novo Prato"
					titleText="Novo Prato"
					onConfirm={handleSubmit}
				>
					<PratoForm />
				</FormDialog>
			</div>
			<div className="cards-container">
				{restaurant?.dishes.map((dish) => (
					<RefeicaoCard
						key={nanoid()}
						name={dish.name}
						description={dish.description}
						image={dish.image}
						price={dish.price}
						ratings={dish.ratings}
						_id={dish.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Refeicoes;
