import { useState } from "react";
import "./RegisterForm.css";
import { RegisterStepOne } from "./RegisterStepOne/ResgisterStepOne";
import { RegisterStepTwo } from "./RegisterStepTwo/RegisterStepTwo";
import { RegisterStepThree } from "./RegisterStepThree/RegisterStepThree";
import { RegisterStepFour } from "./RegisterStepFour/RegisterStepFour";
import { RegisterStepFive } from "./RegisterStepFive/RegisterStepFive";
import imagemFundo from "../../assets/eating a variety of foods-bro.svg";
import { useAuthStore } from "../../stores/authStores";
import { useNavigate } from "react-router-dom";
import { Steps } from "antd";

interface IProps {
  screenSize: number;
}

export interface IEmployee {
  userType: string;
  email: string;
  password1: string;
  password2: string;
  name: string;
  birthday: string;
  company: string;
  image: string;
}

export interface ICompanyRestaurant {
  userType: string;
  email: string;
  password1: string;
  password2: string;
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  city: string;
  state: string;
  complement: string;
  number: string;
  image: string;
}

const RegisterForm = ({ screenSize }: IProps) => {
  const { businessDTO, setBusinessDTO, createBusiness, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ICompanyRestaurant | IEmployee>({
    userType: "",
    email: "",
    password1: "",
    password2: "",
    name: "",
    cnpj: "",
    cep: "",
    street: "",
    city: "",
    state: "",
    complement: "",
    number: "",
    birthday: "",
    company: "",
    image: "",
  });

  async function handleStepChange(delta: number) {
    setStep((prevStep) => prevStep + delta);

    if (step === 5) {
      const updatedBusinessDTO = {
        name: formData.name,
        cnpj: (formData as ICompanyRestaurant).cnpj,
        cep: (formData as ICompanyRestaurant).cep,
        number: (formData as ICompanyRestaurant).number,
        image: (formData as ICompanyRestaurant).image,
        email: formData.email,
        password: formData.password1,
        userType: formData.userType,
        verificationToken: businessDTO.verificationToken,
        verificationTokenExpireAt: businessDTO.verificationTokenExpireAt,
      };

      setBusinessDTO(updatedBusinessDTO);
      await createBusiness(updatedBusinessDTO);
      await checkAuth();
      navigate("/inicio", { replace: true });
    }
  }

  const handleDataChange = (updatedData: ICompanyRestaurant | IEmployee) => {
    setFormData(updatedData);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <RegisterStepOne
            formData={formData}
            onStepChange={handleStepChange}
            onDataChange={handleDataChange}
          />
        );
      case 2:
        return (
          <RegisterStepTwo
            formData={formData}
            onStepChange={handleStepChange}
            onDataChange={handleDataChange}
          />
        );
      case 3:
        return (
          <RegisterStepThree
            formData={formData}
            onStepChange={handleStepChange}
            onDataChange={handleDataChange}
          />
        );
      case 4:
        return (
          <RegisterStepFour
            formData={formData}
            onStepChange={handleStepChange}
            onDataChange={handleDataChange}
          />
        );
      case 5:
        return <RegisterStepFive />;
      default:
        return null;
    }
  };

  const steps = Array.from({ length: 5 }, () => ({ title: "" }));

  return (
    <div className="container">
      <div className="form-container">
        <Steps current={step - 1} items={steps} className="custom-steps" />
        {renderStepContent()}
      </div>

      {screenSize > 800 && (
        <div className="imagem-fundo">
          <img src={imagemFundo} alt="Imagem de fundo" />
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
