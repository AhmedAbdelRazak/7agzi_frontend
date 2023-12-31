import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import myBackGroundImage from "../../Images/Steps1.jpg";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const StepsHeroComp = ({ language }) => {
	const [offsetY, setOffsetY] = useState(0);

	const handleScroll = () => setOffsetY(window.scrollY);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const options = {
		autoConfig: true,
		debug: false,
	};

	useEffect(() => {
		ReactPixel.init(process.env.REACT_APP_FACEBOOK_PIXEL_ID, options);

		ReactPixel.pageView();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.gtag("event", "page_view", {
			page_path: window.location.pathname,
		});

		// eslint-disable-next-line
	}, []);

	return (
		<AboutHeroCompWrapper
			style={{
				background: `url(
                ${myBackGroundImage}
            )`,
				backgroundRepeat: "no-repeat",
				width: window.innerWidth < 768 ? "100%" : "1380px",
				backgroundSize: "cover",
				position: "relative",
				height: window.innerWidth < 768 ? "380px" : "650px",
				margin: "auto",
				objectFit: "cover",
				backgroundPosition: `center ${offsetY * 0.5}px`,
			}}
		>
			<Animated
				animationIn='bounceInLeft'
				animationOut='zoomOut'
				animationInDuration={2000}
				animationInDelay={0}
				animationOutDuration={1000}
				isVisible={true}
			>
				<div className='col-12 mx-auto text-center'>
					{language === "Arabic" ? (
						<div className='row' dir='rtl'>
							<div className='col-2'>
								<strong dir='rtl' style={{ fontSize: "8rem", right: "10%" }}>
									٣
								</strong>
							</div>
							<div dir='rtl' className='col-10'>
								<h1
									dir='rtl'
									style={{ fontSize: "2.5rem", color: "white", left: "65%" }}
								>
									خطوات للظهور أمام الملايين
								</h1>
							</div>
							<div className='btnWrapperArabic'>
								<Link to='/signup' className='btn btn-danger'>
									سجل صالونك الآن
								</Link>
							</div>
						</div>
					) : (
						<div className='row'>
							<div className='col-2'>
								<strong>3</strong>
							</div>
							<div className='col-10'>
								<h1 style={{ color: "white" }}>STEPS TO BE SEEN BY MILLIONS</h1>
							</div>
							<div className='btnWrapperEnglish'>
								<Link
									to='/signup'
									className='btn btn-danger'
									onClick={() => {
										ReactGA.event("Account_Clicked_Register_Now", {
											event_category: "Account_Clicked_Register_Now",
											event_label: "Account_Clicked_Register_Now",
											value: 1, // Optional extra parameters
										});

										ReactPixel.track("Account_Clicked_Register_Now", {
											content_name: "Account_Clicked_Register_Now",
											content_category: "Account_Clicked_Register_Now",
											value: "",
											currency: "",
										});

										if (window.ttq) {
											window.ttq.track("Account_Clicked_Register_Now", {
												content_name: "Account_Clicked_Register_Now",
												content_category: "Account_Clicked_Register_Now",
												value: 1,
												currency: "USD", // Change the currency if needed
											});
										}
									}}
								>
									REGISTER NOW
								</Link>
							</div>
						</div>
					)}
				</div>
			</Animated>
		</AboutHeroCompWrapper>
	);
};

export default StepsHeroComp;

const AboutHeroCompWrapper = styled.div`
	::before {
		background-color: rgba(22, 25, 56, 0.7);
		content: "";
		display: block;
		height: 100%;
		position: absolute;
		width: 100%;
	}

	strong {
		position: absolute;
		margin-top: 310px;
		border-radius: 5px;
		color: white;
		font-weight: bolder;
		/* border: 1px solid black; */
		width: 90%;
		left: 40%;
		font-size: 6rem;
	}

	h1 {
		position: absolute;
		margin-top: 350px;
		border-radius: 5px;
		color: white;
		font-weight: bolder;
		/* border: 1px solid black; */
		width: 40%;
		left: 0%;
		background-color: rgba(0, 0, 0, 0.65) !important;
		padding: 20px 0px;
		font-size: 1.3rem;
		/* transform: translate(-30%, -30%); */
	}

	.btnWrapperArabic > a {
		margin-top: 460px;
		position: absolute;
		right: 20%;
		padding: 20px;
		font-size: 1.5rem;
		font-weight: bolder;
	}

	.btnWrapperEnglish > a {
		margin-top: 450px;
		position: absolute;
		left: 20%;
		padding: 20px;
		font-size: 1.5rem;
		font-weight: bolder;
	}

	@media (max-width: 1300px) {
		strong {
			position: absolute;
			margin-top: 110px;
			border-radius: 5px;
			color: white;
			font-weight: bolder;
			/* border: 1px solid black; */
			width: 90%;
			left: 10% !important;
			font-size: 6rem;
		}

		h1 {
			position: absolute;
			margin-top: 150px;
			border-radius: 5px;
			color: white;
			font-weight: bolder;
			/* border: 1px solid black; */
			width: 98%;
			left: 0% !important;
			background-color: rgba(0, 0, 0, 0.65) !important;
			padding: 7px 0px;
			font-size: 1.3rem;
			/* transform: translate(-30%, -30%); */
		}

		.btnWrapperArabic > a {
			margin-top: 280px;
			position: absolute;
			right: 30%;
			padding: 10px;
			font-size: 1.5rem;
			font-weight: bolder;
		}

		.btnWrapperEnglish > a {
			margin-top: 240px;
			position: absolute;
			left: 30%;
			padding: 10px;
			font-size: 1.5rem;
			font-weight: bolder;
		}
	}
`;
