/** @format */

import Slider from "react-slick";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllAds } from "../../admin/apiAdmin";
const Menu2 = () => {
	const [allAdsCombined, setAllAdsCombined] = useState([]);

	const gettingAllAds = () => {
		getAllAds().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAdsCombined(
					data[data.length - 1] && data[data.length - 1].ad_Name,
				);
			}
		});
	};

	useEffect(() => {
		gettingAllAds();
		// eslint-disable-next-line
	}, []);

	const settings = {
		dots: true,
		dotsClass: "slick-dots",
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000,
		pauseOnHover: true,
	};

	return (
		<div style={{ backgroundColor: "#e8f3ff" }}>
			{" "}
			<Nav3 className='mx-auto mb-1'>
				<div className='nav-item mainMessages '>
					<Slider {...settings}>
						{allAdsCombined &&
							allAdsCombined.map((i, e) => {
								return (
									<React.Fragment key={e}>
										<div>
											<span>{i}</span>
										</div>
									</React.Fragment>
								);
							})}
					</Slider>
				</div>
			</Nav3>
		</div>
	);
};

export default Menu2;

const Nav3 = styled.nav`
	text-align: center;
	padding-top: 10px;
	padding-bottom: 22px;
	width: 32%;
	box-shadow: 8px 10px 5px 0px rgba(0, 0, 0, 0.5);
	background-color: #f2f2fd;

	.slick-dots li button:hover:before,
	.slick-dots li button:focus:before {
		opacity: 1;
	}
	.slick-dots li button:before {
		font-size: 12px;
		text-align: center;
		opacity: 0.25;
		color: var(--darkGrey);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.slick-dots li.slick-active button:before {
		opacity: 1;
		color: #0404e4;
		font-weight: bold;
	}

	.mainMessages {
		color: #000;

		font-weight: bold;
		font-style: italic;
		text-align: center;
		font-size: 0.82rem;
	}

	@media (max-width: 1400px) {
		.mainMessages {
			color: #000;
			font-weight: bold;
			font-style: italic;
			text-align: center;
			font-size: 0.75rem;
		}
	}
	@media (max-width: 900px) {
		width: 100%;
		box-shadow: none;
		margin: 0 !important;

		.mainMessages {
			color: #000;
			font-weight: bold;
			font-style: italic;
			text-align: center;
			font-size: 0.75rem;
		}
		.slick-dots li button:before {
			font-size: 10px;
		}
	}
`;
