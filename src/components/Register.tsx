import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Button,
  Steps,
  Typography,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import logo from '../assets/Logo.svg';

const { Step } = Steps;
const { Title } = Typography;

interface FormData {
  email: string;
  password1: string;
  password2: string;
  role: string;
  [key: string]: any;
}

const Register = () => {
  const [current, setCurrent] = useState(0);
  const [role, setRole] = useState<string>('restaurante');
  const [form] = Form.useForm();

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const onFinish = (values: FormData) => {
    console.log('Dados enviados:', values);
    // Aqui você pode enviar ao backend ou prosseguir com lógica de cadastro
  };

  const steps = [
    {
      title: 'Informações de Acesso',
      content: (
        <>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email' },
              { type: 'email', message: 'Email inválido' },
            ]}
          >
            <Input placeholder="Ex: sara@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password1"
            rules={[
              { required: true, message: 'Digite sua senha' },
              { min: 6, message: 'Mínimo de 6 caracteres' },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item
            label="Confirmar Senha"
            name="password2"
            dependencies={['password1']}
            hasFeedback
            rules={[
              { required: true, message: 'Confirme sua senha' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password1') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não conferem.'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Digite novamente" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Você quer se cadastrar como"
            rules={[{ required: true, message: 'Escolha uma opção' }]}
          >
            <Radio.Group
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <Radio value="restaurante">Restaurante</Radio>
              <Radio value="empresa">Empresa</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Dados da Conta',
      content: (
        <>
          {role === 'restaurante' ? (
            <>
              <Form.Item
                name="nomeRestaurante"
                label="Nome do Restaurante"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tipoComida"
                label="Tipo de Comida"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="cnpj"
                label="CNPJ"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="razaoSocial"
                label="Razão Social"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Confirmação',
      content: <p>Revise os dados e clique em "Finalizar" para criar sua conta.</p>,
    },
  ];

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <img src={logo} alt="logo da empresa" style={{ width: 100 }} />
        <Title level={3} style={{ marginTop: 16 }}>Cadastro</Title>
      </div>

      <Steps current={current} items={steps.map((item) => ({ title: item.title }))} style={{ marginBottom: 32 }} />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {steps[current].content}

        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }} icon={<ArrowLeftOutlined />}>
              Voltar
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Próximo
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Finalizar
            </Button>
          )}
        </div>
      </Form>

      <Button
        href="/login"
        type="link"
        style={{ marginTop: 16, display: 'block', textAlign: 'center' }}
      >
        Já tem uma conta? Fazer login
      </Button>
    </div>
  );
};

export default Register;
