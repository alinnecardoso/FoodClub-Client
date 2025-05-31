import { useEffect } from "react";
import "./LoginForm.css";
import { Button, Form, Input, Typography, message } from "antd";
import imagemFundo from "../../assets/eating a variety of foods-bro.svg";
import { useAuthStore } from "../../stores/authStores";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface IProps {
  screenSize: number;
}

const LoginForm = ({ screenSize }: IProps) => {
  const { login, user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
    } catch {
      message.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/inicio");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="form-img">
      <div id="loginForm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="form-principal"
        >
          <div className="tittle">
            <Title level={2}>Bem-vindo de volta</Title>
            <Text type="secondary">Entre na sua conta</Text>
          </div>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Por favor, insira seu email" },
              { type: "email", message: "Formato de email inválido" },
            ]}
            hasFeedback
          >
            <Input placeholder="Ex: sara@gmail.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[
              { required: true, message: "Por favor, insira sua senha" },
              { min: 6, message: "A senha deve ter pelo menos 6 caracteres" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>

          <div className="link-cadastro">
            <Text>
              Não tem conta? <a href="/cadastro">Cadastre-se agora</a>
            </Text>
          </div>
        </Form>
      </div>

      {screenSize > 800 && (
        <div className="imagem-fundo">
          <img src={imagemFundo} alt="Imagem de fundo" />
        </div>
      )}
    </div>
  );
};

export default LoginForm;
