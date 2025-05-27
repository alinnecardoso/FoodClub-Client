import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import "./RefeicaoCard.css";
import { IDish } from "../../interfaces/dish";
import BasicModal from "../modal/BasicModal";
import GenericInputAnt from "../Forms/GenericInputAnt/GenericInputAnt";
import { Form } from "antd";

const mediaRatings = (ratings: { userId: string; rating: number }[]) => {
	let sum = 0;
	for (let i = 0; i < ratings.length; i++) {
		sum += ratings[i].rating;
	}
	return sum / ratings.length;
};

const RefeicaoCard = (props: IDish) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	const handleOpenModal = () => {
		form.setFieldsValue({
			description: props.description,
			name: props.name,
			price: props.price,
			image: props.image,
		});
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="refeicao-card-container" onClick={handleOpenModal}>
				<div
					className="refeicao-img"
					style={{
						backgroundImage: `url(${props.image})`,
					}}
				></div>

				<div className="refeicao-info-container">
					<p className="r-title">{props.name}</p>
					<p className="r-description">{props.description}</p>
					<div className="r-price-container">
						<div className="r-rating-container">
							<Rating
								name="half-rating"
								defaultValue={mediaRatings(props.ratings)}
								precision={0.5}
								size="small"
								readOnly
							/>
							({props.ratings.length})
						</div>
						<p className="r-price">R$ {props.price.toFixed(2)}</p>
					</div>
				</div>
			</div>

			<BasicModal
				isOpen={isModalOpen}
				handleOk={handleCloseModal}
				handleCancel={handleCloseModal}
				titleText="Editar prato"
			>
				<Form form={form} layout="vertical">
					<img src= { props.image ? props.image: ''} alt="" style={{ height: '120px', margin: '0 auto', borderRadius: '8px'	}} />
					<GenericInputAnt
						type="text"
						placeholder="Nome do prato"
						labelText="Nome"
						name="name"
						maxLength={40}
						minLength={3}
					/>

					<GenericInputAnt
						type="text"
						placeholder="Descrição do prato"
						labelText="Descrição"
						name="description"
						maxLength={70}
						minLength={5}
					/>

					<GenericInputAnt
						type="text"
						placeholder="Imagem do prato"
						labelText="Imagem"
						name="image"
						maxLength={300}
						minLength={5}
					/>

					<GenericInputAnt
						type="number"
						placeholder="Preço"
						labelText="Preço"
						name="price"
					/>
				</Form>
			</BasicModal>
		</>
	);
};

export default RefeicaoCard;
