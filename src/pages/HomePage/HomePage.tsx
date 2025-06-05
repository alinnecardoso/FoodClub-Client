import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStores";
import { useEffect } from "react";
import { useRestaurantStore } from "../../stores/restaurantStore";
import { IRestaurant } from "../../interfaces/restaurant";
import RestaurantCard from "./components/RestaurantCard/RestaurantCard";

import "./HomePage.css";
import { Card } from "antd";

const HomePage = () => {
	const { getRestaurants, restaurants, isLoading } =
		useRestaurantStore();


	useEffect(() => {

		getRestaurants();

	}, []);

	return (
		<div >
			<h1>Restaurantes</h1>
			<div className="restaurants-container">
				{restaurants.map((restaurant: IRestaurant) => (
					<RestaurantCard key={restaurant._id} image={restaurant.image} name={restaurant.name} restaurantId={restaurant._id} />
				))}
			</div>


		</div>
	);
};

export default HomePage;
