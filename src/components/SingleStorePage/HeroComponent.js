import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Animated } from "react-animated-css";
import FirstAvailableAppointments from "./FirstAvailableAppointments";
import { showAverageRatingForEntireStore } from "../SingleEmployee/Rating";

const HeroComponent = ({
	hero1,
	onlineStoreName,
	allEmployees,
	AllServices,
	contact,
	allCustomerType,
	chosenCustomerType,
	setChosenCustomerType,
	chosenDate,
	setChosenDate,
	setChosenService,
	chosenService,
	handleChosenCustomerType,
	fromLocalStore,
	language,
	AllServices2,
}) => {
	const [offsetY, setOffsetY] = useState(0);
	const handleScroll = () => setOffsetY(window.pageYOffset);

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 5, behavior: "smooth" });
		}, 1000);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const allRatingArray = allEmployees && allEmployees.map((i) => i.ratings);

	return (
		<HeroComponentWrapper>
			<div
				className='row rowWrapper'
				style={{
					background:
						hero1 && hero1.images && hero1.images[0]
							? `url(${hero1.images[0].url})`
							: `url(
                    "https://cdn.pixabay.com/photo/2020/05/21/11/42/hair-salon-5200393_960_720.jpg"
                )`,
					backgroundPosition: `center ${offsetY * 0.7}px`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover", // add this line
					position: "relative",
					height: "790px",
					width: "104%",
					borderRadius: "10px",
				}}
			>
				<div className='col-md-11 mx-auto firstAppointWrapper'>
					<div className='appointment-component col-md-6 float-right mt-4 '>
						<Animated
							animationIn='bounceInLeft'
							animationOut='zoomOut'
							animationInDuration={2000}
							animationInDelay={500}
							animationOutDuration={1000}
							isVisible={true}
						>
							<div className='firstAppointWrapperSub'>
								<FirstAvailableAppointments
									onlineStoreName={onlineStoreName}
									allEmployees={allEmployees}
									AllServices={AllServices}
									contact={contact}
									allCustomerType={allCustomerType}
									chosenCustomerType={chosenCustomerType}
									setChosenCustomerType={setChosenCustomerType}
									chosenDate={chosenDate}
									setChosenDate={setChosenDate}
									setChosenService={setChosenService}
									chosenService={chosenService}
									handleChosenCustomerType={handleChosenCustomerType}
									fromLocalStore={fromLocalStore}
									language={language}
								/>
							</div>
						</Animated>
					</div>
					<div className='appointment-component col-md-6 requiredComponentBottomLeft'>
						<Animated
							animationIn='bounceInRight'
							animationOut='zoomOut'
							animationInDuration={2000}
							animationInDelay={500}
							animationOutDuration={1000}
							isVisible={true}
						>
							<div className='ml-3'>
								<h3
									style={{
										fontSize: "1.3rem",
										fontWeight: "bold",
										color: "white",
										textTransform: "uppercase",
										letterSpacing: "2px",
									}}
								>
									<strong>{fromLocalStore.addStoreName}</strong>
								</h3>
							</div>
							<div className='ml-3'>
								{showAverageRatingForEntireStore(
									allRatingArray,
									fromLocalStore
								)}
							</div>

							<div className='ml-3'>
								{AllServices2 &&
									AllServices2.map((s, i) => {
										if (i <= 4) {
											// Check if current element is the last one in the iteration or the 5th one (since we're showing max 5 items)
											const isLastElement =
												i === AllServices2.length - 1 || i === 4;

											return (
												<span
													style={{
														color: "darkgrey",
														textTransform: "uppercase",
														fontSize: "12px",
													}}
													key={i}
												>
													{s.serviceName} {isLastElement ? "" : "- "}
												</span>
											);
										} else {
											return null;
										}
									})}
							</div>
						</Animated>
					</div>
				</div>
			</div>
		</HeroComponentWrapper>
	);
};

export default HeroComponent;

const HeroComponentWrapper = styled.div`
	overflow: hidden;

	.firstAppointWrapper {
		position: relative; // Relative positioning is necessary for absolute child positioning

		.appointment-component {
			width: 50%; // Control width of the components instead of using flex
		}

		.requiredComponentBottomLeft {
			position: absolute; // Position the required component absolutely...
			bottom: 200px; // ...at the bottom...
			left: 10px; // ...and to the left of the parent container.
		}
	}

	.requiredComponentBottomLeft > div {
		background-color: rgba(0, 0, 0, 0.85);
		color: white;
		padding: 30px 20px;
		border-radius: 100px 20px;
	}

	@media (max-width: 768px) {
		.firstAppointWrapper {
			position: relative; // Relative positioning is necessary for absolute child positioning

			.appointment-component {
				width: 100%; // Control width of the components instead of using flex
			}

			.requiredComponentBottomLeft {
				position: absolute; // Position the required component absolutely...
				bottom: -10px; // ...at the bottom...
				left: 8px; // ...and to the left of the parent container.
				width: 95%;
			}
		}

		.rowWrapper {
			height: 450px !important;
		}

		.firstAppointWrapperSub {
			display: none;
		}
	}
`;
