import { useState } from "react";
import checkIcon from '../../../assets/check-icon.png'
import './RegisterStepFive.css'
import { Button } from "@mui/material";

export const RegisterStepFive = () => {
  const [isAnimating, ] = useState<boolean>(false);
  return(
    <div className={`step-4-container ${isAnimating ? "hidden" : "visible"}`}>
      <div className="icon-text">
        <img src={checkIcon} alt="Ícone simbolizando que o cadastro foi realizado com sucesso." />
        <h1>Cadastro realizado com sucesso</h1>
        <span>A sua conta foi cadastrada e você já pode estar realizando o seu login</span>
      </div>

      <Button className="btn-entrar" href="/login" variant="contained" color="primary" type="submit">
        Entrar
      </Button>
    </div>
  )
}