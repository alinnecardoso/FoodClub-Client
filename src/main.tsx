import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { ConfigProvider } from "antd";
import { theme } from "./theme/theme";

import "./index.css";
import InitialPage from "./pages/all/InitialPage";
import NotFoundPage from "./pages/all/NotFoundPage";
import Login from "./pages/all/Login";
import Register from "./pages/all/Register";
import HomePage from "./pages/HomePage/HomePage";
import Refeicoes from "./pages/restaurant/Refeicoes";
import ProtectedLayout from "./components/ProtectedLayout";
import Pedidos from "./pages/all/Pedidos";
import Gerenciar from "./pages/all/Gerenciar";
import Colaboradores from "./pages/company/Colaboradores/Colaboradores";
import Busca from "./pages/employee/Busca";
import Perfil from "./pages/employee/Perfil";
import PublicLayout from "./components/layouts/PublicLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{ path: "/", element: <InitialPage /> },
			{ path: "/login", element: <Login /> },
			{ path: "/cadastro", element: <Register /> },
		],
	},
	{
		path: "/",
		element: <ProtectedLayout />,
		children: [
			{ path: "/inicio", element: <HomePage /> },
			{ path: "/refeicoes", element: <Refeicoes /> },
			{ path: "/pedidos", element: <Pedidos /> },
			{ path: "/gerenciar", element: <Gerenciar /> },
			{ path: "/colaboradores", element: <Colaboradores /> },
			{ path: "/busca", element: <Busca /> },
			{ path: "/perfil", element: <Perfil /> },
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#7d0000",
					},
				}}
			>
				<CssBaseline />
				<main>
					<RouterProvider router={router} />
				</main>
			</ConfigProvider>
		</ThemeProvider>
	</StrictMode>
);
