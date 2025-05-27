import { useState } from "react";
import { ICompanyRestaurant, IEmployee } from "../RegisterForm";
import { RegisterRestaurantCompany } from "./RegisterRestaurantCompany/ResgisterRestaurantCompany";
import { RegisterEmployee } from "./RegisterEmployee/RegisterEmployee";
import './RegisterStepThree.css'

export interface IRegisterStepProps {
  formData: ICompanyRestaurant | IEmployee;
  onStepChange: (delta:number) => void;
  onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

export const RegisterStepThree = ({ formData, onStepChange, onDataChange }: IRegisterStepProps) => {
  const [isAnimating, ] = useState<boolean>(false);
  const [ userType, ] = useState<string>(formData.userType);

  return (
    <div className={`step-3-container ${isAnimating ? "hidden" : "visible"}`} >

      {(userType === 'restaurant' || userType === 'company') && (
        <RegisterRestaurantCompany 
          formData={formData} 
          onStepChange={onStepChange}
          onDataChange={onDataChange}
        />
      )}

      {userType === 'colaborador' && (
        <RegisterEmployee 
          formData={formData} 
          onStepChange={onStepChange}
          onDataChange={onDataChange}
        />
      )}
    </div>
  )
}