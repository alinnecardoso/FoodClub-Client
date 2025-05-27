import { Button, Modal } from 'antd';
import React, { useState } from 'react';

type Props = {
  handleOk?: () => void;
  handleCancel?: () => void;
  children?: React.ReactNode;
  title?: string;
  okText?: string;
  cancelText?: string;
  buttonText?: string; // texto do botão que abre o modal
};

const BasicModal = ({
  handleOk,
  handleCancel,
  children,
  title = "Basic Modal",
  okText = "Save",
  cancelText = "Cancel",
  buttonText = "Open Modal",
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onOk = () => {
    if (handleOk) handleOk();
    setIsModalOpen(false);
  };

  const onCancel = () => {
    if (handleCancel) handleCancel();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>
      <Modal
        title={title}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >
        {children}
      </Modal>
    </>
  );
};

export default BasicModal;
