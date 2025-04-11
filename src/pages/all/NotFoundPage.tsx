import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div>
			PageNotFound <Link to={"/"}>Home from Link</Link>
			<a href="/">Home from Anchor</a>
		</div>
	);
};

export default NotFoundPage;
