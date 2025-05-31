import { useState } from "react";
import { ICompanyRestaurant, IEmployee } from "../RegisterForm";
import { RegisterRestaurantCompany } from "./RegisterRestaurantCompany/ResgisterRestaurantCompany";
import './RegisterStepThree.css'

export interface IRegisterStepProps {
  formData: ICompanyRestaurant | IEmployee;
  onStepChange: (delta:number) => void;
  onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

export const RegisterStepThree = ({ formData, onStepChange, onDataChange }: IRegisterStepProps) => {
  const [ userType, ] = useState<string>(formData.userType);

  return (
    <div className={`step-3-container`} >

      {(userType === 'restaurant' || userType === 'company') && (
        <RegisterRestaurantCompany 
          formData={formData} 
          onStepChange={onStepChange}
          onDataChange={onDataChange}
        />
      )}

    </div>
  )
}