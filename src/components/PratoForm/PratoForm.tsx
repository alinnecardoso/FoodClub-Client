import { useRestaurantStore } from "../../stores/restaurantStore";
import GenericInput from "../GenericInput";
import "./PratoForm.css";

const PratoForm = () => {
	const { dishDTO, updateDishDTO } = useRestaurantStore();

	// Função para lidar com as alterações de input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		updateDishDTO({
			...dishDTO, // Mantém o restante dos campos
			[name]: value, // Atualiza o campo específico
		});
	};

	return (
		<div className="prato-form-container">
			<GenericInput
				type="text"
				placeholder="Nome"
				labelText="Nome do prato"
				name="name"
				value={dishDTO.name}
				onChange={handleInputChange} // Passa a função para cada input
			/>
			<GenericInput
				type="number"
				placeholder="ex: 5.00"
				labelText="Preço"
				name="price"
				value={dishDTO.price}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="text"
				placeholder="Digite o link da imagem"
				labelText="Imagem"
				name="image"
				value={dishDTO.image}
				onChange={handleInputChange}
			/>
			<GenericInput
				type="text"
				placeholder="Descrição do prato"
				labelText="Descrição"
				name="description"
				maxLength={70}
				value={dishDTO.description}
				onChange={handleInputChange}
			/>
		</div>
	);
};

export default PratoForm;
