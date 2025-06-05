import { useState } from "react";
import { Button, Typography, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { ICompanyRestaurant, IEmployee } from "../RegisterForm";
import './RegisterStepFour.css';
import { avatarRestaurantOptions, avatarCompanyOptions } from '../../../data/mockData';

const { Title, Text } = Typography;

interface IProps {
  formData: ICompanyRestaurant | IEmployee;
  onStepChange: (delta: number) => void;
  onDataChange: (updatedData: ICompanyRestaurant | IEmployee) => void;
}

const userTypeLabelMap: { [key: string]: string } = {
    company: 'Empresa',
    restaurant: 'Restaurante'
};

const userTypeArticleMap: { [key: string]: string } = {
    company: 'sua',
    restaurant: 'seu'
};

export const RegisterStepFour = ({ formData, onStepChange, onDataChange }: IProps) => {
  const [fileName, setFileName] = useState("");

  const handleImageChange = ({ file, fileList }: any) => {
    if (file.status === "removed") {
      onDataChange({ ...formData, image: "" });
      setFileName("");
      return;
    }

    const latestFile = fileList[fileList.length - 1];

    if (!latestFile?.originFileObj) {
      message.error("Erro ao carregar imagem. Tente novamente.");
      return;
    }

    const isImage = latestFile.type?.startsWith("image/") || latestFile.originFileObj.type?.startsWith("image/");
    if (!isImage) {
      message.error("Por favor, envie um arquivo de imagem.");
      return;
    }

    const url = URL.createObjectURL(latestFile.originFileObj);
    onDataChange({ ...formData, image: url });
    setFileName(latestFile.name);
  };

  const handleAvatarSelect = (url: string) => {
    onDataChange({ ...formData, image: url });
    setFileName(""); // limpa nome do upload
  };

  const avatarOptions = formData.userType?.toLowerCase() === 'company' 
    ? avatarCompanyOptions 
    : avatarRestaurantOptions;

  const userType = formData.userType?.toLowerCase() || '';
  const article = userTypeArticleMap[userType] || '';

  return (
    <div className="step-4-container">
      <div className="step-4-content">
        <Title level={3}>
					{userTypeLabelMap[formData.userType?.toLowerCase()] || ''}
				</Title>

        <Text type="secondary">
          Escolha uma logo
        </Text>

        <Row gutter={[5, 5]}>
          {avatarOptions.map(({ key, image }) => (
            <Col span={8} key={key} style={{ width: '2rem' }}> {/* 24 / 8 = 3 colunas por linha */}
              <img
                className="avatar-option"
                src={image}
                alt={key}
                style={{
                  aspectRatio: "1 / 1", // força quadrado
                  borderRadius: 8,
                  cursor: "pointer",
                  objectFit: "cover",
                  border:
                    formData.image === image
                      ? "2px solid #8B0000"
                      : "2px solid transparent"
                }}
                onClick={() => handleAvatarSelect(image)}
              />
            </Col>
          ))}
        </Row>


        <Text type="secondary" style={{ marginTop: 24, display: "block" }}>
          Ou faça upload de uma imagem
        </Text>

        <div className="upload-area">
          <ImgCrop rotationSlider>
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageChange}
            >
              <Button
                icon={<UploadOutlined />}
                style={{ backgroundColor: "#8B0000", color: "#fff" }}
              >
                Escolher arquivo
              </Button>
            </Upload>
          </ImgCrop>
          <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
            {fileName || (formData.image ? "Imagem selecionada" : "Nenhum arquivo selecionado")}
          </Text>
        </div>
      </div>

      <Button
        type="primary"
        block
        style={{ backgroundColor: "#8B0000", marginTop: 32 }}
        onClick={() => onStepChange(1)}
      >
        Cadastrar
      </Button>
    </div>
  );
};
