import useCheckAuth from "../hooks/useCheckAuth";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import NavBarAnt from "./Navbar/NavBarAnt";

const ProtectedLayout = () => {
	useCheckAuth();
	return (
		<>
			{/* <Navbar /> */}
			<NavBarAnt/>
			<div className="main-container">
				<Outlet />
			</div>
		</>
	);
};

export default ProtectedLayout;
