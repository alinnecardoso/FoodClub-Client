import React, { useState, useEffect } from "react";
import "./LoginForm.css";
import { Button } from "@mui/material";
import GenericInput from "./GenericInput";
import EmailInput from "./EmailInput";
import imagemFundo from "../assets/eating a variety of foods-bro.svg";
import { useAuthStore } from "../stores/authStores";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";

interface IProps {
	screenSize: number;
}

const LoginForm = ({ screenSize }: IProps) => {
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const { login, user, isAuthenticated, error } = useAuthStore();
	const navigate = useNavigate();

	//#region Métodos

	// Função para mudar a senha
	function handlePasswordChange(
		setPassword: React.Dispatch<React.SetStateAction<string>>
	) {
		return (event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.replace(/\s/g, ""); // Remove espaços
			setPassword(value);
		};
	}

	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();
		setLoading(true);
		const formData = new FormData(event.currentTarget);
		const data = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		await login(data.email as string, data.password as string);
		setLoading(false);
	}

	//#endregion

	useEffect(() => {
		if (isAuthenticated && user) {
			navigate("/inicio");
		}
	}, [isAuthenticated, user, navigate]);

	useEffect(() => {
		if (error === "Email ou senha inválido.") {
			message.error("Email ou senha inválido.");
		}
	}, [error]);

	return (
		<div className="form-img">
			<Spin spinning={loading} tip="Entrando...">
				<div id="loginForm">
					<form onSubmit={handleSubmit} className="form-principal">
						<div className="tittle">
							<h1>Bem vindo de volta</h1>
							<p>Entrar na sua conta</p>
						</div>
						<div className="form-group">
							<EmailInput
								name="email"
								placeholder="Ex: sara@gmail.com"
								labelText="Email"
								required
							/>
							{/* TODO - Criar mensagem de erro */}
							{/* <span className="error-message">Error message</span> */}
						</div>
						<div className="form-group">
							<GenericInput
								minLength={6}
								type="password"
								placeholder="Digite a sua senha"
								labelText="Digite a sua senha"
								name="password"
								value={password}
								onChange={handlePasswordChange(setPassword)}
							/>
							{/* TODO - Criar mensagem de erro */}
							{/* <span className="error-message">Error message</span> */}
						</div>
						<Button variant="contained" color="primary" type="submit">
							Entrar
						</Button>

						<span className="link-cadastro">
							Não tem conta? <a href="/cadastro">Cadastre-se agora</a>
						</span>
					</form>
				</div>
			</Spin>

			{screenSize > 800 && (
				<div className="imagem-fundo">
					<img src={imagemFundo} alt="logo da empresa" />
				</div>
			)}
		</div>
	);
};

export default LoginForm;
