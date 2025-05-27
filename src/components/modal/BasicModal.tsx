import { Modal } from 'antd';

interface BasicModalProps {
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  children: React.ReactNode
  okText?: string;
  cancelText?: string;
  titleText?: string
}

const BasicModal = ({ isOpen, handleOk, handleCancel, children, okText, cancelText, titleText = "Modal title" }: BasicModalProps) => {
  return (
    <Modal title={titleText} open={isOpen} onOk={handleOk} onCancel={handleCancel} okText={okText} cancelText={cancelText} >
      {children}
    </Modal>
  );
};

export default BasicModal;
