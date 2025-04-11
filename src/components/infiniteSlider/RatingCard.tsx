import { Rating } from "@mui/material";
import "./InfiniteSlider.css";
import { iRatingCard } from "../../interfaces/ratingCard";

export const RatingCard = (props: iRatingCard) => {
	return (
		<div
			style={
				{
					"--position": props.position,
				} as React.CSSProperties
			}
			className="rating-card"
		>
			<p className="userName">{props.userName}</p>
			<Rating name="read-only" value={props.stars} readOnly />
			<p className="rating-text">"{props.text}"</p>
		</div>
	);
};
