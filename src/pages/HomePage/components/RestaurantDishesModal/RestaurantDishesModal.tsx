import React, { useEffect } from "react";
import { useRestaurantStore } from "../../../../stores/restaurantStore";
import { Card } from "antd";
import "./RestaurantDishesModal.css";
import { CookingPot } from "@phosphor-icons/react";

interface Props {
  restaurantId: string;
}

const RestaurantDishesModal: React.FC<Props> = ({ restaurantId }) => {
  const { listDishes, dishes, isLoading } = useRestaurantStore();

  useEffect(() => {
    listDishes(restaurantId);
  }, [listDishes, restaurantId]);

  if (isLoading) {
    return <p>Carregando pratos...</p>;
  }

  if (!dishes.length) {
    return (
      <div className="no-dishes-container">
        <img
          src="/assets/chef-animate.svg"
          alt="Chef preparando pratos"
          className="no-dishes-image"
        />
        <p className="no-dishes-message">
          Ainda não há nenhum prato cadastrado desse restaurante
          <br />
          Tente mais tarde para acompanhar as delícias

        </p>
      </div>
    );
  }

  return (
    <div className="dishes-container" >
      <div className="dishes-header">
        <h2 className="dishes-header-title">Cárdapio</h2>
      </div>

      {dishes.map((dish) => (
        <div key={dish._id} className="dish-card" >
          <div className="dish-content">
            {dish.image ? (
              <img
                src={dish.image}
                alt={dish.name}
                className="dish-image"
                width={50}
                height={50}
              />
            ) : (
              <CookingPot size={16} />
            )}
            <div className="dish-info">
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-price">R$ {dish.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantDishesModal;
