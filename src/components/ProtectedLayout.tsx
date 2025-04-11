import useCheckAuth from "../hooks/useCheckAuth";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
	useCheckAuth();
	return (
		<>
			<Navbar />
			<div className="main-container">
				<Outlet />
			</div>
		</>
	);
};

export default ProtectedLayout;
