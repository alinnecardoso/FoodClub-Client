import { useState, useLayoutEffect } from 'react';
import RegisterForm from '../../components/Register/RegisterForm';

const Register = () => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    const updateScreenSize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', updateScreenSize);

    // Chama ao carregar a página para definir o tamanho inicial
    updateScreenSize();

    // Remove o event listener quando o componente é desmontado
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return <RegisterForm screenSize={screenSize} />;
};

export default Register;
