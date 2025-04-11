import { useState } from "react";
import { ICompanyRestaurant, IEmployee } from "../RegisterForm";

export interface IRegisterStepFourProps {
	formData: ICompanyRestaurant | IEmployee;
	onStepChange: (delta: number) => void;
	onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

export const RegisterStepFour = ({ formData }: IRegisterStepFourProps) => {
	const [isAnimating] = useState<boolean>(false);
	const [role] = useState<string>(formData.role);
	return (
		<div className={`step-3-container ${isAnimating ? "hidden" : "visible"}`}>
			{(role === "restaurant" || role === "company") && (
				<h1>Restaurant/Empresa</h1>
			)}

			{role === "colaborador" && <h1>Colaborador</h1>}
		</div>
	);
};
