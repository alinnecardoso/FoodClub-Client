import { nanoid } from "nanoid";
import { iRating } from "../../interfaces/rating";
import "./InfiniteSlider.css";
import { RatingCard } from "./RatingCard";

type InfiniteSliderProps = {
	cards: iRating[];
	cardWidth: number;
	cardHeight: number;
	animationDuration: number;
};

const InfiniteSlider = (props: InfiniteSliderProps) => {
	// Cria a string de animação utilizando o valor de animationSeconds

	return (
		<div
			style={
				{
					"--width": props.cardWidth + "px",
					"--height": props.cardHeight + "px",
					"--quantity": props.cards.length,
					"--animationDuration": props.animationDuration + "s",
				} as React.CSSProperties
			}
			className="slider"
		>
			<div className="list">
				{props.cards.map(({ text, userName, stars }, index) => {
					return (
						<RatingCard
							key={nanoid()}
							text={text}
							userName={userName}
							stars={stars}
							position={index + 1}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default InfiniteSlider;
