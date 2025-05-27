import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRestaurantStore } from "../stores/restaurantStore";

type Props = {
	trigger?: React.ReactNode;
	buttonText?: string;
	confirmText?: string;
	cancelText?: string;
	titleText?: string;
	height?: string;
	children: React.ReactNode;
	onConfirm?: () => void;
	onCancel?: () => void;
	onClose?: () => void;
};

export default function FormDialog({
	trigger,
	buttonText = "Open modal",
	confirmText = "Criar",
	cancelText = "Cancelar",
	titleText = "Modal title",
	children,
	onConfirm,
}: Props) {
	const [open, setOpen] = useState(false);
	const { dishDTO, cleanDishDTO } = useRestaurantStore();

	titleText = dishDTO.name !== "" ? dishDTO.name : titleText;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		if (onclose) onclose();
	};

	const handleOk = () => {
		if (onConfirm) onConfirm();
		handleClose();
	};

	return (
		<>
			{trigger ? (
				React.cloneElement(trigger as React.ReactElement, {
					onClick: handleClickOpen,
				})
			) : (
				<Button type="primary" onClick={handleClickOpen}>
					{buttonText}
				</Button>
			)}

			<Modal
				open={open}
				title={<strong>{titleText}</strong>}
				onCancel={handleClose}
				onOk={handleOk}
				okText={confirmText}
				cancelText={cancelText}
				onClose={handleClose}

			>
				{children}
			</Modal>
		</>
	);
}
