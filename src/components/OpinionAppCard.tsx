import { Rating } from "@mui/material"

type Props = {
    img: string,
    imgAlt: string,
    userName: string,
    comment: string,
    rating: number

}

export const OpinionAppCard = (props: Props) => {
  return (
    <div className="opinion-card">
        <img src={props.img} alt={props.imgAlt} />
        <p className='user-name'> {props.userName}</p>
        <p className="user-opinion">{props.comment}</p>
        <Rating name="read-only" value={props.rating} readOnly />
    </div>
  )
}