export const fetchAddressByCep = async (cep: string) => {
  const cleanedCep = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar o CEP");
    }
    const data = await response.json();
    if (data.erro) {
      throw new Error("CEP não encontrado");
    }
    return data; // Retorna o endereço
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error);
    throw error;
  }
};
