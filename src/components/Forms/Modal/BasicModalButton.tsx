import { Button, Modal } from 'antd';
import React, { useState, ReactNode } from 'react';

type Props = {
  handleOk?: () => void;
  handleCancel?: () => void;
  children?: React.ReactNode;
  title?: string;
  okText?: string;
  width?: string;
  maxWidth?: string;          // adicionada
  cancelText?: string;
  buttonContent?: ReactNode;
  buttonProps?: React.ComponentProps<typeof Button>;
  style?: React.CSSProperties;
};

const BasicModal = ({
  handleOk,
  handleCancel,
  children,
  title = "Basic Modal",
  okText = "Save",
  width = '30%',
  maxWidth,                   // capturado
  style,
  cancelText = "Cancel",
  buttonContent = "Open Modal",
  buttonProps = {},
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

  // Cria estilo para o modal combinando style + maxWidth
  const modalStyle: React.CSSProperties = {
    ...style,
    maxWidth: maxWidth || undefined,
  };

  return (
    <>
      <Button type="primary" onClick={showModal} {...buttonProps}>
        {buttonContent}
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
        width={width}
        style={modalStyle}
      >
        {children}
      </Modal>
    </>
  );
};

export default BasicModal;
