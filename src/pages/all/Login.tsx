import { useLayoutEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";

const Login = () => {
	const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

	useLayoutEffect(() => {
		const updateScreenSize = () => setScreenSize(window.innerWidth);

		window.addEventListener("resize", updateScreenSize);

		// Chama ao carregar a página para definir o tamanho inicial
		updateScreenSize();

		// Remove o event listener quando o componente é desmontado
		return () => window.removeEventListener("resize", updateScreenSize);
	}, []);

	return <LoginForm screenSize={screenSize} />;
};

export default Login;
