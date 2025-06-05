import { Card } from "antd";
import useCheckAuth from "../hooks/useCheckAuth";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
	useCheckAuth();
	return (
		<>
			<Navbar />
			<Card className="main-container" style={{ background: 'none' }}>
				<Outlet />
			</Card>
		</>
	);
};

export default ProtectedLayout;
