import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStores";

const HomePage = () => {
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	async function handleLogout() {
		await logout();
		navigate("/login", { replace: true });
	}

	return (
		<div>
			<button onClick={handleLogout}>Deslogar</button>
		</div>
	);
};

export default HomePage;
