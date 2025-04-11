import { PiHouseLight } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { PiNewspaperClipping } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

interface iNavIcon {
	id: number;
	element: JSX.Element;
	link: string;
	label: string;
	iconFor: string[];
}

export const navIconsList: iNavIcon[] = [
	{
		id: 1,
		element: <PiHouseLight />,
		link: "/inicio",
		label: "Home",
		iconFor: ["restaurant", "company", "employee"],
	},
	{
		id: 2,
		element: <IoFastFoodOutline />,
		link: "/refeicoes",
		label: "Refeições",
		iconFor: ["restaurant"],
	},
	{
		id: 5,
		element: <IoPeopleOutline />,
		link: "/colaboradores",
		label: "Colaboradores",
		iconFor: ["company"],
	},
	{
		id: 6,
		element: <IoIosSearch />,
		link: "/busca",
		label: "Busca",
		iconFor: ["employee"],
	},
	{
		id: 3,
		element: <PiNewspaperClipping />,
		link: "/pedidos",
		label: "Pedidos",
		iconFor: ["restaurant", "company", "employee"],
	},
	{
		id: 4,
		element: <CiLogout />,
		link: "/login",
		label: "Sair",
		iconFor: ["restaurant", "company", "employee"],
	},
];
