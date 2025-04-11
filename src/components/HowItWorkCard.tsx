type Props = {
	iconAddress: string;
	text: string;
	title: string;
	altText: string;
};

export const HowItWorkCard = (props: Props) => {
	return (
		<div className="how-it-work-card">
			<img
				src={props.iconAddress}
				alt={props.altText}
				className="how-it-work-card-img"
			/>
			<div className="text-container">
				<p className="title">{props.title}</p>
				<p>{props.text}</p>
			</div>
		</div>
	);
};
