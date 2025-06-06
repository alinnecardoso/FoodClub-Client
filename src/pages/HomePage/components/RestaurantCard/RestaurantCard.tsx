import React, { useState } from "react";
import { Card, Image, Modal } from "antd";
import { ForkKnife } from "@phosphor-icons/react";
import "./RestaurantCard.css";
import RestaurantDishesModal from "../RestaurantDishesModal/RestaurantDishesModal";
import { useRestaurantStore } from "../../../../stores/restaurantStore";

interface RestaurantCardProps {
  image: string;
  name: string;
  restaurantId: string;
}

// Componente reutilizável para o header (imagem + nome)
const RestaurantHeader: React.FC<{ image?: string; name: string }> = ({ image, name }) => (
  <div style={{ display: "flex", alignItems: "center", columnGap: 16 }}>
    {image ? (
      <Image
        src={image}
        alt={name}
        preview={false}
        width={50}
        height={50}
        className="restaurant-card-image"
      />
    ) : (
      <ForkKnife size={32} />
    )}
    <p className="restaurant-card-name" >
      {name}
    </p>
  </div >
);

const RestaurantCard: React.FC<RestaurantCardProps> = ({ image, name, restaurantId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cleanDishes = useRestaurantStore((state) => state.cleanDishes);

  const openModal = () => {
    cleanDishes();
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  return (
    <>
      <Card
        hoverable
        className="restaurant-card"
        bodyStyle={{ padding: 0 }}
        onClick={openModal}
      >
        <div className="restaurant-card-content">
          <RestaurantHeader image={image} name={name} />
        </div>
      </Card>

      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        title={'Restaurante'}
        width={600}
        destroyOnHidden={true}
      >
        <RestaurantDishesModal restaurantId={restaurantId} />
      </Modal>
    </>
  );
};

export default RestaurantCard;
