import { useState } from "react";
import { ICompanyRestaurant, IEmployee } from "../RegisterForm";
import { RegisterRestaurantCompany } from "./RegisterRestaurantCompany/ResgisterRestaurantCompany";
import { RegisterEmployee } from "./RegisterEmployee/RegisterEmployee";
import './RegisterStepThree.css'

export interface IRegisterStepThreeProps {
  formData: ICompanyRestaurant | IEmployee;
  onStepChange: (delta:number) => void;
  onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

export const RegisterStepThree = ({ formData, onStepChange, onDataChange }: IRegisterStepThreeProps) => {
  const [isAnimating, ] = useState<boolean>(false);
  const [ role, ] = useState<string>(formData.role);

  return (
    <div className={`step-3-container ${isAnimating ? "hidden" : "visible"}`} >

      {(role === 'restaurante' || role === 'empresa') && (
        <RegisterRestaurantCompany 
          formData={formData} 
          onStepChange={onStepChange}
          onDataChange={onDataChange}
        />
      )}

      {role === 'colaborador' && (
        <RegisterEmployee 
          formData={formData} 
          onStepChange={onStepChange}
          onDataChange={onDataChange}
        />
      )}
    </div>
  )
}