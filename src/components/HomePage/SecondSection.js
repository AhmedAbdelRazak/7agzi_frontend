import React from "react";
import styled from "styled-components";
import HairCutImg from "./HomeImages/hair-dressr-1.png";
import BeardImg from "./HomeImages/Beard-Shave.png";
import GroomImg from "./HomeImages/grooms-Eng.png";
// eslint-disable-next-line
import BrideImg from "./HomeImages/bride-eng.png";
import BundleImg from "./HomeImages/Bundels-eng.png";
import OffersImg from "./HomeImages/offers.png";
import WhatsAppImg from "./HomeImages/kalemna-wats.png";

const SecondSection = () => {
	return (
		<SecondSectionWrapper>
			<div className='grid-container'>
				<img
					src={HairCutImg}
					alt='Book Your Appointment With XLOOK To Get a HAIRCUT'
					onClick={() => {
						window.location.href = `/schedule?haircut`;
					}}
				/>
				<img
					src={BeardImg}
					alt='Book Your Appointment With XLOOK To Get a BEARDCUT'
					onClick={() => {
						window.location.href = `/schedule?beard shaving`;
					}}
				/>
				<img
					src={BundleImg}
					alt='Book Your Appointment With XLOOK To Get Our Latest Hot Offers'
					onClick={() => {
						window.location.href = `/schedule?bundle`;
					}}
				/>
				<img
					src={GroomImg}
					alt='If you are a groom, check our offers for grooms today'
					onClick={() => {
						window.location.href = `/schedule?groom`;
					}}
				/>
				<img
					src={OffersImg}
					alt='Book Your Appointment With XLOOK To Get Our Latest Hot Offers'
				/>
				<img
					src={WhatsAppImg}
					alt='Our clients are our first priority, text us on whats app and we will be so happy to support'
					onClick={() => {
						window.open(
							"https://api.whatsapp.com/send?phone=+201098168674",
							"_blank"
						);
					}}
				/>
			</div>
		</SecondSectionWrapper>
	);
};

export default SecondSection;

const SecondSectionWrapper = styled.div`
	margin: 30px auto;
	text-align: center;

	.grid-container {
		display: grid;
		grid-template-columns: repeat(6, 1fr); // 6 columns
		text-align: center;
		/* gap: 3px; */

		img {
			width: 50%;
		}
	}

	@media (max-width: 1100px) {
		margin-top: 30px;

		.grid-container {
			display: grid;
			grid-template-columns: repeat(6, 1fr); // 6 columns
			/* gap: 3px; */

			img {
				width: 100%;
			}
		}
	}
`;