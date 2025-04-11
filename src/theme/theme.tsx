import { createTheme } from "@mui/material/styles";

// Crie o tema personalizado
export const theme = createTheme({
	palette: {
		primary: {
			main: "#7D0000", // Cor primária (vermelho, por exemplo)
		},
		secondary: {
			main: "#00FF00", // Cor secundária (verde, por exemplo)
		},
		background: {
			default: "#f6f2eb;", // Cor de fundo global
		},
		text: {
			primary: "#1d1d1d", // Cor principal do texto
		},
	},
	typography: {
		fontFamily: "Arial, sans-serif", // Fonte personalizada
	},
});
