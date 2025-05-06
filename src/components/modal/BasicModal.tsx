import { Modal } from 'antd';

interface BasicModalProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const BasicModal = ({ isOpen, handleOk, handleCancel }: BasicModalProps) => {
  return (
    <Modal title="Detalhes da Refeição" open={isOpen} onOk={handleOk} onCancel={handleCancel} okText="Atualizar">
      <p>Informações da refeição...</p>
    </Modal>
  );
};

export default BasicModal;
