import { nanoid } from "nanoid";
import RefeicaoCard from "../../components/RefeicaoCard/RefeicaoCard";
import { IRestaurant } from "../../interfaces/restaurant";
import { useAuthStore } from "../../stores/authStores";
import "./Refeicoes.css";
import { useRestaurantStore } from "../../stores/restaurantStore";
import { useEffect } from "react";
import GenericForm from "../../components/Forms/GenericForm/GenericForm";
import GenericInputAnt from "../../components/Forms/GenericInputAnt/GenericInputAnt";
import BasicModalButton from "../../components/Forms/Modal/BasicModalButton";
import { Form } from "antd";

const Refeicoes = () => {
	let { user } = useAuthStore();
	user = user as IRestaurant;
	const [form] = Form.useForm();

	const { dishDTO, createDish, restaurant, getRestaurant } =
		useRestaurantStore();

	useEffect(() => {
		getRestaurant(user?._id.toString());
	}, [user?._id]);

	const handleSubmit = () => {
		form.submit();

	};


	const handleCancel = () => {
		form.resetFields();
	}


	return (
		<div className="refeicoes-container">
			<div className="header-pratos-container">
				<h1>Pratos</h1>
				<BasicModalButton title="Adicionar prato" buttonText="Adicionar" handleCancel={() => handleCancel()} handleOk={() => handleSubmit()}  >
					<GenericForm onFinish={handleSubmit} form={form} >
						<GenericInputAnt
							type="text"
							placeholder="Nome"
							labelText="Nome do prato"
							name="name"
							minLength={5}
					
						/>

						<GenericInputAnt
							type="number"
							placeholder="ex: 5.00"
							labelText="Preço"
							name="price"
						/>

						<GenericInputAnt
							type="text"
							placeholder="Digite o link da imagem"
							labelText="Imagem"
							name="image"
							minLength={5}
						/>

						<GenericInputAnt
							type="text"
							placeholder="Descrição do prato"
							labelText="Descrição"
							name="description"
							maxLength={70}
							minLength={5}
						/>

					</GenericForm>
				</BasicModalButton>
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
