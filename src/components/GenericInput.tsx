import { TextField } from "@mui/material";

interface GenericInputProps {
	name: string;
	placeholder: string;
	type: string;
	labelText: string;
	minLength?: number;
	maxLength?: number;
	error?: boolean; // Para controlar a exibição de erro
	helperText?: string; // Mensagem de ajuda ou erro
	value?: string | number; // Para controlar o valor do campo
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Para controle de mudanças
	disabled?: boolean;
}

const GenericInput = (props: GenericInputProps) => {
	return (
		<TextField
			name={props.name}
			id={props.name}
			label={props.labelText}
			required
			type={props.type}
			variant="outlined"
			error={props.error} // Controle de erro
			helperText={props.helperText} // Mensagem de ajuda ou erro
			value={props.value} // Controlando o valor
			onChange={props.onChange} // Capturando mudanças
			disabled={props.disabled} // Propriedade para desabilitar o campo
			slotProps={{
				htmlInput: {
					minLength: props.minLength, // Passa minLength aqui
					maxLength: props.maxLength,
				},
			}}
			sx={{
				"& .MuiInputBase-input": { color: "gray" }, // Cor do texto
				"& .MuiFormLabel-root": { color: "gray" }, // Cor do label normal
				"& .MuiFormLabel-root.Mui-focused": { color: "black" }, // Cor do label em foco
				"& .MuiOutlinedInput-root": {
					"& fieldset": {
						borderColor: "black", // Cor da borda no estado normal
					},
					"&:hover fieldset": {
						borderColor: "black", // Cor da borda no hover
					},
					"&.Mui-focused fieldset": {
						borderColor: "black", // Cor da borda no estado focado
					},
					"&.Mui-error .MuiInputBase-input": {
						color: "#D20000", // Cor do texto em erro
					},
					"&.Mui-error .MuiFormLabel-root": {
						color: "#D20000", // Cor do label em erro
					},
					"& .MuiFormHelperText-root": {
						color: "#D20000", // Cor da mensagem de erro
					},
					"&.Mui-error fieldset": {
						borderColor: "#D20000", // Cor da borda em erro
					},
				},
			}}
		/>
	);
};

export default GenericInput;
