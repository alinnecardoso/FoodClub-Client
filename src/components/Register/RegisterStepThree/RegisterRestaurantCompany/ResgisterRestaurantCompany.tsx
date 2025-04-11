import { useState, useCallback } from "react";
import { IRegisterStepThreeProps } from "../RegisterStepThree";
import { Button, FormLabel } from "@mui/material";
import GenericInput from "../../../GenericInput";
import { ICompanyRestaurant } from "../../RegisterForm";
import { fetchAddressByCep } from "../../../../utils/apiCEP";
import { formatCEP } from "../../../../utils/isValidCEP";
import { formatCNPJ } from "../../../../utils/isValidCNPJ";

// Função debounce para limitar requisições
const debounce = (func: (...args: any[]) => void, delay: number) => {
	let timeoutId: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

export const RegisterRestaurantCompany = ({
	formData,
	onStepChange,
	onDataChange,
}: IRegisterStepThreeProps) => {
	const [formState, setFormState] = useState<ICompanyRestaurant>({
		...formData,
		cnpj: (formData as ICompanyRestaurant).cnpj || "",
		cep: (formData as ICompanyRestaurant).cep || "",
		street: (formData as ICompanyRestaurant).street || "",
		city: (formData as ICompanyRestaurant).city || "",
		state: (formData as ICompanyRestaurant).state || "",
		complement: (formData as ICompanyRestaurant).complement || "",
		number: (formData as ICompanyRestaurant).number || "",
		role: (formData as ICompanyRestaurant).role || "",
		image: (formData as ICompanyRestaurant).image || "",
	});

	const [isLoadingCep, setIsLoadingCep] = useState(false);
	const [formattedCNPJ, setFormattedCNPJ] = useState<string>("");
	const [formattedCEP, setFormattedCEP] = useState<string>("");

	// Função debounce para limitar requisições
	//const debouncedFetchAddress = useCallback(debounce(fetchAddress, 500), []);

	function goToNextStep() {
		onStepChange(1); // Avançar
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	// Função debounce para fetchAddress
	const debouncedFetchAddress = useCallback(
		debounce(async (cep: string) => {
			setIsLoadingCep(true);
			try {
				const address = await fetchAddressByCep(cep);
				if (address) {
					setFormState((prevState) => ({
						...prevState,
						street: address.logradouro,
						city: address.localidade,
						state: address.uf,
					}));
					onDataChange({
						...formState,
						street: address.logradouro,
						city: address.localidade,
						state: address.uf,
					});
				}
			} catch (error) {
				console.error("Erro ao buscar o CEP:", error);
			} finally {
				setIsLoadingCep(false);
			}
		}, 500),
		[formState, onDataChange]
	);

	function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
		const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
		setFormattedCEP(formatCEP(cep));
		setFormState((prevState) => ({ ...prevState, cep }));

		if (cep.length === 8) {
			debouncedFetchAddress(cep); // Executa a busca com debounce
		}
	}

	function handleCNPJChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setFormattedCNPJ(formatCNPJ(value));
		setFormState((prevState) => ({
			...prevState,
			cnpj: value,
		}));
	}

	function handleDataChange() {
		const updatedData: ICompanyRestaurant = {
			...formState,
		};

		setFormState(updatedData);
		onDataChange(updatedData); // Notifica o componente pai
		console.log(updatedData);
		goToNextStep();
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault(); // Evita o reload da página
		handleDataChange();
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="basic-info-container">
				<div className="input-label-group">
					<FormLabel id="demo-row-radio-buttons-group-label">
						<h1>
							{formState.role.charAt(0).toUpperCase() + formState.role.slice(1)}
						</h1>
						<span>Informações da {formState.role}</span>
					</FormLabel>

					<GenericInput
						type="text"
						placeholder="Nome"
						labelText="Nome"
						name="name"
						value={formState.name}
						onChange={handleInputChange}
					/>

					<GenericInput
						type="text"
						placeholder="CNPJ"
						labelText="Digite o CNPJ"
						name="cnpj"
						value={formattedCNPJ}
						onChange={handleCNPJChange}
						minLength={18}
						maxLength={18}
					/>

					<GenericInput
						type="text"
						placeholder="Digite o CEP"
						labelText="CEP"
						name="cep"
						value={formattedCEP}
						onChange={handleCepChange}
						minLength={9}
						maxLength={9}
					/>

					<GenericInput
						type="text"
						placeholder="Rua"
						labelText="Rua"
						name="street"
						value={formState.street}
						onChange={handleInputChange}
						disabled={!!formState.street || isLoadingCep}
					/>

					<div className="input-group">
						<GenericInput
							type="text"
							placeholder="Cidade"
							labelText="Cidade"
							name="city"
							value={formState.city}
							onChange={handleInputChange}
							disabled={!!formState.city || isLoadingCep}
						/>

						<GenericInput
							type="text"
							placeholder="Estado"
							labelText="Estado"
							name="state"
							value={formState.state}
							onChange={handleInputChange}
							disabled={!!formState.state || isLoadingCep}
						/>
					</div>

					<div className="input-group">
						<GenericInput
							type="text"
							placeholder="Complemento"
							labelText="Complemento"
							name="complement"
							value={formState.complement}
							onChange={handleInputChange}
						/>

						<GenericInput
							type="text"
							placeholder="Número"
							labelText="Número"
							name="number"
							value={formState.number}
							onChange={handleInputChange}
						/>
					</div>

					<GenericInput
							type="text"
							placeholder="Endereço da imagem"
							labelText="Imagem"
							name="image"
							value={formState.image}
							onChange={handleInputChange}
					/>
				</div>

				<Button variant="contained" color="primary" type="submit">
					Continuar
				</Button>
			</div>
		</form>
	);
};
