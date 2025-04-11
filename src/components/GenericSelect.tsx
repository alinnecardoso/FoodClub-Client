import { Select, MenuItem, FormControl, InputLabel, FormHelperText, SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

interface GenericSelectProps {
  name: string;
  labelText: string;
  value: string;
  onChange?: ((event: SelectChangeEvent<string>, child: ReactNode) => void) | undefined
  options: string[]; // Opções que aparecerão no select
  error?: boolean; // Para controlar a exibição de erro
  helperText?: string; // Mensagem de ajuda ou erro
  disabled?: boolean; // Se o select deve ser desabilitado
}

const GenericSelect = (props: GenericSelectProps) => {
  return (
    <FormControl
      fullWidth
      required
      error={props.error}
      disabled={props.disabled}
      sx={{ marginBottom: "16px" }} // Adiciona algum espaçamento entre os campos
    >
      <InputLabel id={`${props.name}-label`}>{props.labelText}</InputLabel>
      <Select
        labelId={`${props.name}-label`}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        label={props.labelText}
        variant="outlined"
        sx={{
          "& .MuiSelect-icon": { color: "gray" }, // Cor do ícone
        }}
      >
        <MenuItem value="">
          <em>Escolha uma opção</em>
        </MenuItem>
        {props.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};

export default GenericSelect;
