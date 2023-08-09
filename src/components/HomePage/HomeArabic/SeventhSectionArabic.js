import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { allStoresSorted } from "../../../apiCore";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import Slider from "react-slick";
import ThirdSectionCard from "../ThirdSectionCard";

const SeventhSectionArabic = ({ language }) => {
	const [loading, setLoading] = useState(true);
	const [stores, setStores] = useState([]);

	// eslint-disable-next-line
	const [itemsPerPage, setItemPerPage] = useState(20);

	// eslint-disable-next-line
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState(null);

	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
	});
	const getLocation = useCallback(() => {
		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				// lat, long
				// 31.123883, 29.775421 examples
				// eslint-disable-next-line
				const { latitude: lat, longitude: lon } = position.coords;

				allStoresSorted(
					lat,
					lon,
					"egypt",
					undefined,
					undefined,
					undefined,
					undefined,
					itemsPerPage,
					currentPage
				)
					.then((data) => {
						if (data.error) {
							setError(data.error);
						} else {
							var uniqueStoresWithLatestDates = data.stores;

							setStores(uniqueStoresWithLatestDates);
							setLoading(false);
						}
					})
					.catch((err) => setError(err));
			},
			() => setError("Could not get location")
		);
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		if (!isLoaded) return;
		getLocation();

		// eslint-disable-next-line
	}, [isLoaded, currentPage, , getLocation]);

	const handleRetryClick = () => {
		window.location.reload();
	};

	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: 1.5,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	if (loadError || error) {
		return (
			<div className='spinner-container'>
				<Spin size='large' tip='Loading...' />
				<div>
					This app requires access to your location. Please enable it in your
					browser settings, or{" "}
					<Link href='#' onClick={handleRetryClick}>
						click here
					</Link>{" "}
					to retry.
				</div>
			</div>
		);
	}

	return (
		<ThirdSectionWrapper>
			{loading ? (
				<div style={{ textAlign: "center", margin: "auto" }}>
					<Spin size='large' tip='جاري التحميل...' />
				</div>
			) : (
				<div className='carousel thirdSection'>
					<div className='container-fluid'>
						<div className='topPerf'>أفضل المؤدين:</div>
						<div className='topRated'>الأعلى تقييمًا:</div>
						<Slider {...settings}>
							{stores.map((salon, i) => (
								<div
									className='img-fluid images'
									key={i}
									onClick={() => {
										localStorage.setItem("chosenStore", JSON.stringify(salon));
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
								>
									<ThirdSectionCard
										i={i}
										salon={salon}
										key={i}
										language={language}
									/>
								</div>
							))}
						</Slider>
					</div>
				</div>
			)}
		</ThirdSectionWrapper>
	);
};

export default SeventhSectionArabic;

const ThirdSectionWrapper = styled.div`
	padding: 30px 0px;

	.thirdSection {
		padding: 10px 100px;
		background-color: #141414;
	}

	.slick-dots {
		display: none !important;
	}

	.topPerf {
		font-weight: bolder;
		margin-bottom: 5px;
		text-decoration: underline;
	}

	.topRated {
		text-align: right;
		font-weight: bolder;
		margin-bottom: 5px;
		text-decoration: underline;
		font-size: 10px;
	}

	@media (max-width: 1100px) {
		.thirdSection {
			padding: 10px 0px;
		}

		.slick-dots {
			display: none !important;
		}
	}
`;
