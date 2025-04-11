import { Button, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./InitialPage.css";
import { HowItWorkCard } from "../../components/HowItWorkCard";
import { nanoid } from "nanoid";
import InfiniteSlider from "../../components/infiniteSlider/InfiniteSlider";
import { howItWorkCardsInfo } from "../../data/mockData";
import { ratings } from "../../data/mockData";

const InitialPage = () => {
	return (
		<main>
			<div className="hero">
				<img
					src="/assets/Logo.svg"
					alt="Logotipo da empresa com um chapéu de chef e uma gravata borboleta sobre um paletó, simbolizando serviços de culinária e hospitalidade."
				/>
				<div className="hero-info-container">
					<h1>
						FoodClub, <span>a sua nova forma de pedir uma refeição.</span>
					</h1>
					<p>Conectando empresas e restaurantes sem perder a praticidade</p>
					<div className="hero-btns-container">
						<NavLink to={"/login"} className=" nav-link entrar-btn">
							<Button variant="contained">Entrar</Button>
						</NavLink>

						<NavLink to={"/cadastro"} className="nav-link cadastrar-btn">
							<Button variant="outlined">Cadastrar</Button>
						</NavLink>
					</div>
				</div>
			</div>

			<Container maxWidth={"xl"} className="how-it-work-container">
				<h2>Como funciona ?</h2>
				{howItWorkCardsInfo.map(({ iconAddress, Text, altText, title }) => (
					<HowItWorkCard
						key={nanoid()}
						iconAddress={iconAddress}
						text={Text}
						altText={altText}
						title={title}
					/>
				))}
			</Container>

			<Container maxWidth={"xl"} className="users-ratings-container">
				<h2>Veja o que nossos clientes dizem</h2>
				<InfiniteSlider
					cards={ratings}
					animationDuration={40}
					cardHeight={200}
					cardWidth={300}
				/>
				<InfiniteSlider
					cards={ratings}
					animationDuration={40}
					cardHeight={200}
					cardWidth={300}
				/>
			</Container>
		</main>
	);
};

export default InitialPage;
