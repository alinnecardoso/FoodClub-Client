// components/ModalAntPrato.tsx
import { Modal, Button } from "antd";
import { useState } from "react";

interface ModalAntPratoProps {
  onConfirm: () => void;
  children: React.ReactNode;
}

const ModalAntPrato = ({ onConfirm, children }: ModalAntPratoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => {
    onConfirm();
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Novo Prato
      </Button>
      <Modal
        title="Novo Prato"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Criar"
        cancelText="Cancelar"
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalAntPrato;
