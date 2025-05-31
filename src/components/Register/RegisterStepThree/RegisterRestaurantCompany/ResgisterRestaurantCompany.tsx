import { useState, useCallback } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Typography,
  message
} from "antd";
import { IRegisterStepProps } from "../RegisterStepThree";
import { ICompanyRestaurant } from "../../RegisterForm";
import { fetchAddressByCep } from "../../../../utils/apiCEP";
import { formatCEP, isValidCEP } from "../../../../utils/isValidCEP";
import { formatCNPJ, isValidCNPJ } from "../../../../utils/isValidCNPJ";

const { Title, Text } = Typography;

const debounce = (
  func: (arg: string) => void,
  delay: number
): ((arg: string) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (arg: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(arg), delay);
  };
};


export const RegisterRestaurantCompany = ({
  formData,
  onStepChange,
  onDataChange,
}: IRegisterStepProps) => {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState<ICompanyRestaurant>({
    ...formData,
    cnpj: (formData as ICompanyRestaurant).cnpj || "",
    cep: (formData as ICompanyRestaurant).cep || "",
    street: (formData as ICompanyRestaurant).street || "",
    city: (formData as ICompanyRestaurant).city || "",
    state: (formData as ICompanyRestaurant).state || "",
    complement: (formData as ICompanyRestaurant).complement || "",
    number: (formData as ICompanyRestaurant).number || "",
    userType: (formData as ICompanyRestaurant).userType || "",
    image: (formData as ICompanyRestaurant).image || "",
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const userTypeLabelMap: { [key: string]: string } = {
    company: 'Empresa',
    restaurant: 'Restaurante'
  };

  const debouncedFetchAddress = useCallback(
    debounce(async (cep: string) => {
      setIsLoadingCep(true);
      try {
        const address = await fetchAddressByCep(cep);
        if (address) {
          setFormState((prev) => {
            const updated = {
              ...prev,
              street: address.logradouro,
              city: address.localidade,
              state: address.uf,
            };
            onDataChange(updated);
            form.setFieldsValue(updated);
            return updated;
          });
        }
      } catch {
        message.error("Erro ao buscar o CEP.");
      } finally {
        setIsLoadingCep(false);
      }
    }, 500),
    [onDataChange, form]
  );

  const handleFieldChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 14);
    const masked = formatCNPJ(raw);
    form.setFieldsValue({ cnpj: masked });
    handleFieldChange("cnpj", raw);
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    const masked = formatCEP(raw);
    form.setFieldsValue({ cep: masked });
    handleFieldChange("cep", raw);
    if (raw.length === 8) debouncedFetchAddress(raw);
  };

  const handleSubmit = () => {
    const updatedData: ICompanyRestaurant = { ...formState };
    if (!isValidCNPJ(formatCNPJ(updatedData.cnpj))) {
      message.error("CNPJ inválido.");
      return;
    }
    if (!isValidCEP(formatCEP(updatedData.cep))) {
      message.error("CEP inválido.");
      return;
    }
    onDataChange(updatedData);
    console.log(updatedData)
    onStepChange(1);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...formState,
        cnpj: formatCNPJ(formState.cnpj),
        cep: formatCEP(formState.cep),
      }}
      className="step-3-form"
    >
      <div>
        <Title level={3}>
          {userTypeLabelMap[formState.userType] || ''}
        </Title>

        <Text type="secondary">
          Informações da {userTypeLabelMap[formState.userType] || ''}
        </Text>

        <Form.Item name="name" label="Nome" rules={[{ required: true }]} hasFeedback>
          <Input onChange={(e) => handleFieldChange("name", e.target.value)} />
        </Form.Item>

        <Form.Item name="cnpj" label="CNPJ" rules={[
          { required: true },
          {
            validator: (_, value) => isValidCNPJ(value) ? Promise.resolve() : Promise.reject("CNPJ inválido.")
          }
        ]} hasFeedback>
          <Input onChange={handleCNPJChange} maxLength={18} placeholder="00.000.000/0000-00" />
        </Form.Item>

        <Form.Item name="cep" label="CEP" rules={[
          {
            validator: (_, value) => isValidCEP(value) ? Promise.resolve() : Promise.reject("CEP inválido.")
          }
        ]} hasFeedback>
        <Input onChange={handleCEPChange} maxLength={9} placeholder="00000-000" />
        </Form.Item>

        <Form.Item name="street" label="Rua" hasFeedback>
          <Input disabled={!!formState.street || isLoadingCep} onChange={(e) => handleFieldChange("street", e.target.value)} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="city" label="Cidade" hasFeedback>
              <Input disabled={!!formState.city || isLoadingCep} onChange={(e) => handleFieldChange("city", e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="state" label="Estado" hasFeedback>
              <Input disabled={!!formState.state || isLoadingCep} onChange={(e) => handleFieldChange("state", e.target.value)} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="complement" label="Complemento" rules={[{ required: true, message: "Campo obrigatório." }]} hasFeedback>
              <Input onChange={(e) => handleFieldChange("complement", e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="number" label="Número" rules={[{ required: true, message: "Campo obrigatório." }]} hasFeedback>
              <Input 
              onChange={(e) => handleFieldChange("number", e.target.value)}
              value={formState.number}
              />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Form.Item style={{ margin: "0" }}>
        <Button type="primary" htmlType="submit" block>
          Continuar
        </Button>
      </Form.Item>
    </Form>
  );
};
