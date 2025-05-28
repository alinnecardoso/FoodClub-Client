import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStores";
import "./Navbar.css";
import { navIconsList } from "./NavIconsList";
import { Buildings, Storefront, User } from "@phosphor-icons/react";

const Navbar = () => {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();
	console.log(user)

	if (user) {

		const filteredIcons = navIconsList.filter((icon) =>
			icon.iconFor.includes(user.userType)
		);

		const handleClick = (
			e: React.MouseEvent<HTMLAnchorElement>,
			label: string,
		) => {
			if (label === "Sair") {
				e.preventDefault();
				logout();
				navigate('/login', { replace: true });
			}
		};

		return (
			<nav className="navbar-container">
				<div className="nav-perfil-container">
					<img src={user.image ? user.image : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} alt="" className="nav-perfil-img" />
					<p className="nav-perfil-name">{user.name}</p>
				</div>
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

				<div className="nav-identificacao-container">
					{user.userType === "restaurant" && (
						<div className="nav-identificacao">
							<p className="nav-identificacao-text">
								<Storefront size={16} />
							</p>
							<p className="nav-identificacao-text">
								Restaurante parceiro
							</p>
						</div>
					)}
					{user.userType === "company" && (
						<div className="nav-identificacao">
							<p className="nav-identificacao-text">
								<Buildings size={16} />
							</p>
							<p className="nav-identificacao-text">
								Empresa parceira
							</p>
						</div>
					)}
					{user.userType === "employee" && (
						<div className="nav-identificacao">
							<p className="nav-identificacao-icon">
								<User size={16} />
							</p>
							<p className="nav-identificacao-text">
								Funcionário
							</p>
						</div>
					)}
				</div>

			</nav>
		);
	}

	return null;
};

export default Navbar;
