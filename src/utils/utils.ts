import axios from "axios";

export const calcularTempoDecorrido = (createdAt: string) => {
	const now = Date.now(); // Obtém o timestamp atual
	const createdTime = Date.parse(createdAt); // Converte a string em timestamp
	const diff = now - createdTime; // Calcula a diferença em milissegundos

	// Converte para unidades de tempo
	const segundos = Math.floor(diff / 1000);
	const minutos = Math.floor(segundos / 60);
	const horas = Math.floor(minutos / 60);
	const dias = Math.floor(horas / 24);

	if (dias > 0) return `${dias} dia(s) atrás`;
	if (horas > 0) return `${horas} hora(s) atrás`;
	if (minutos > 0) return `${minutos} minuto(s) atrás`;
	return `${segundos} segundo(s) atrás`;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const handleAxiosError = (error: unknown, set: Function) => {
	if (axios.isAxiosError(error) && error.response) {
		set({
			error: error.response.data.message || "Erro desconhecido.",
			isLoading: false,
		});
	} else {
		set({
			error: "Erro de conexão. Tente novamente mais tarde.",
			isLoading: false,
		});
	}
};
