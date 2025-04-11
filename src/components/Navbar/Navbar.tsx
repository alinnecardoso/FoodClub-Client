import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStores";
import "./Navbar.css";
import { navIconsList } from "./NavIconsList";

const Navbar = () => {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	if (user) {
		// Filtra os ícones com base no tipo de usuário
		const filteredIcons = navIconsList.filter((icon) =>
			icon.iconFor.includes(user.userType)
		);

		// Define o handleClick para lidar com a navegação e o logout
		const handleClick = (
			e: React.MouseEvent<HTMLAnchorElement>,
			label: string,
			link: string
		) => {
			if (label === "Sair") {
				e.preventDefault(); // Impede a navegação para "/login"
				logout(); // Chama o método de logout
				navigate(link); // Redireciona para a página de login
			}
		};

		return (
			<nav className="navbar-container">
				{filteredIcons.map(({ element, link, label, id }) => (
					<div key={id} className="nav-link-container">
						<NavLink
							to={link}
							className="nav-link"
							onClick={(e) => handleClick(e, label, link)}
						>
							<div className="nav-icon">{element}</div>
							<p>{label}</p>
						</NavLink>
					</div>
				))}
			</nav>
		);
	}

	return null; // Se não houver usuário, o Navbar não é exibido
};

export default Navbar;
