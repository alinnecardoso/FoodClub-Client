import { FormEvent, useState } from "react";
import GenericInput from "../GenericInput";
import { Button } from "@mui/material";
import { formatCNPJ } from "../../utils/isValidCNPJ";
import { formatCEP } from "../../utils/isValidCEP";

// Definindo a interface para as props do componente
interface RestaurantRegisterProps {
  data: object; // Use o tipo FormData para data
}

const RestaurantRegister = ({data}:RestaurantRegisterProps) =>{
  const [error, setError] = useState<string | null>(null);
  const [formattedCNPJ, setFormattedCNPJ] = useState<string>("");
  const [formattedCEP, setFormattedCEP] = useState<string>("");
  const [addressNumber, setAddressNumber] = useState<string>("");



  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
		event.preventDefault();
    setError(null)

		const formData = new FormData(event.currentTarget);
    //const cnpj = formData.get("cnpj") as string;

    // Valida o CNPJ
    {/* if (!isValidCNPJ(cnpj)) {
      setError("CNPJ inválido.");
      return;
    } */}

    // Valida o CEP
    {/* if (!isValidCEP(cep)) {
      setError("CEP inválido.");
      return;
    } */}

		const restaurantData = {
      ...data,
			name: formData.get("name"),
			cnpj: formData.get("cnpj"),
			cep: formData.get("cep"),
			number: formData.get("number"),
		};
		console.log('Restaurant -> Button Clicked')
		console.log(restaurantData);
	}

   // Função para lidar com a mudança no campo do CNPJ
  function handleCNPJChange(event: React.ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setFormattedCNPJ(formatCNPJ(value));
  };

  // Função para lidar com a mudança no campo do CEP
  function handleCEPChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setFormattedCEP(formatCEP(value));
  };

  /// Função para lidar com a mudança no número do endereço
  function handleAddressNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const numberValue = parseInt(value, 10);

    // Verifica se é um número válido
    if (value === "" || (numberValue > 0 && Number.isInteger(numberValue))) {
      setAddressNumber(value); // Atualiza o número se for válido
      setError(null); // Limpa a mensagem de erro
    } else {
      setError("Número do endereço deve ser um número inteiro positivo."); // Exibe erro se não for válido
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <h1>Restaurante</h1>
        <GenericInput
          type="text"
          placeholder="Nome do seu restaurante"
          labelText="Nome do seu restaurante"
          name="name"
        />
        <GenericInput
          type="text"
          placeholder="Ex: 12.345.678/0001-95"
          labelText="Digite o CNPJ"
          name="cnpj"
          value={formattedCNPJ}
          onChange={handleCNPJChange}
          error={!!error}
          minLength={18}
          maxLength={18}
        />
        <GenericInput
          type="text"
          placeholder="Digite o CEP"
          labelText="CEP"
          name="cep"
          value={formattedCEP}
          onChange={handleCEPChange}
          minLength={9}
          maxLength={9}
        />
        <GenericInput
          type="number"
          placeholder="Número"
          labelText="Número"
          name="number"
          value={addressNumber}
          onChange={handleAddressNumberChange}
          error={!!error}
        />

        <Button variant="contained" color="primary"type="submit" >
                  Cadastrar
        </Button>
      </form>
    </div>
  )
}

export default  RestaurantRegister;