import React, { useEffect, useState, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import {
	// eslint-disable-next-line
	allStoresSorted,
	activeStoresCount,
	getCountriesDistrictsGov,
} from "../apiCore";
import { Pagination, Spin } from "antd";
import StoreListPhone from "../components/StoreListHaircut/StoreListPhone";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import SideFilter from "../components/StoresListComp/SideFilter";
import { useCartContext } from "../sidebar_context";
import { getAffiliates } from "../TheBoss/apiBoss";

const IconHaircut = () => {
	const { chosenLanguage } = useCartContext();

	// eslint-disable-next-line
	const capturedCountry = JSON.parse(localStorage.getItem("userLocation"));

	const [stores, setStores] = useState([]);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const [filtersClicked, setFiltersClicked] = useState(false);
	// eslint-disable-next-line
	const [allServicesCombined, setAllServicesCombined] = useState([]);
	const [allAvailableFilters, setAllAvailableFilters] = useState([]);
	const [availableCountries, setAvailableCountries] = useState([]);
	const [availableGovernorates, setAvailableGovernorates] = useState([]);
	const [availableDistricts, setAvailableDistricts] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(undefined);
	const [selectedGovernorate, setSelectedGovernorate] = useState(undefined);
	const [selectedDistrict, setSelectedDistrict] = useState(undefined);
	const [selectedService, setSelectedService] = useState(undefined);

	// eslint-disable-next-line
	const [allSalonTypes, setAllSalonTypes] = useState("");
	const [selectedSalonType, setSelectedSalonType] = useState(undefined);
	const [priceRange, setPriceRange] = useState([]);
	const [servicesInPriceRange, setServicesInPriceRange] = useState([]);

	const [affiliateProducts, setAffiliateProducts] = useState(null);
	// eslint-disable-next-line
	const [loading2, setLoading2] = useState(true);
	const [randomNumberArray, setRandomNumberArray] = useState([0]);

	// eslint-disable-next-line
	const [itemsPerPage, setItemPerPage] = useState(21);
	const [currentPage, setCurrentPage] = useState(1);
	// eslint-disable-next-line
	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
	});
	const userLocation = JSON.parse(localStorage.getItem("userLocation"));

	const getLocation = useCallback(() => {
		const salonTypeStored = localStorage.getItem("salonTypeStored");

		allStoresSorted(
			34.052235,
			-118.243683,
			"united states",
			selectedGovernorate,
			selectedDistrict,
			salonTypeStored ? salonTypeStored : selectedSalonType,
			selectedService,
			itemsPerPage,
			currentPage
		)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					var uniqueStoresWithLatestDates = data.stores.filter((store) =>
						store.services.some((service) =>
							service.serviceName.toLowerCase().includes("haircut")
						)
					);

					// console.log(cleanedString, "cleanedString");
					// console.log(
					// 	uniqueStoresWithLatestDates,
					// 	"uniqueStoresWithLatestDates"
					// );

					if (selectedCountry) {
						uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
							(store) =>
								store.belongsTo.storeCountry.toLowerCase() ===
								selectedCountry.toLowerCase()
						);
					}

					if (selectedGovernorate && selectedDistrict) {
						uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
							(store) =>
								store.belongsTo.storeGovernorate.toLowerCase() ===
									selectedGovernorate.toLowerCase() &&
								store.belongsTo.storeDistrict.toLowerCase() ===
									selectedDistrict.toLowerCase()
						);
					}

					if (selectedGovernorate) {
						uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
							(store) =>
								store.belongsTo.storeGovernorate.toLowerCase() ===
								selectedGovernorate.toLowerCase()
						);

						const gettingUpatedDistrictHelper =
							allAvailableFilters &&
							allAvailableFilters.filter(
								(item) =>
									item.storeGovernorate.toLowerCase() ===
									selectedGovernorate.toLowerCase()
							);

						const uniqueDistricts = [
							...new Set(
								gettingUpatedDistrictHelper.map((item) => item.storeDistrict)
							),
						];
						setAvailableDistricts(uniqueDistricts);
					}

					if (selectedDistrict) {
						uniqueStoresWithLatestDates = uniqueStoresWithLatestDates.filter(
							(store) =>
								store.belongsTo.storeDistrict.toLowerCase() ===
								selectedDistrict.toLowerCase()
						);
						const gettingUpatedGovernorateHelper =
							allAvailableFilters &&
							allAvailableFilters.filter(
								(item) =>
									item.storeDistrict.toLowerCase() ===
									selectedDistrict.toLowerCase()
							);

						const uniqueGovernorates = [
							...new Set(
								gettingUpatedGovernorateHelper.map(
									(item) => item.storeGovernorate
								)
							),
						];
						setAvailableGovernorates(uniqueGovernorates);
					}

					//Salon Types
					var allSalonTypesArray =
						uniqueStoresWithLatestDates &&
						uniqueStoresWithLatestDates.map((iii) => iii.belongsTo.storeType);
					setAllSalonTypes([...new Set(allSalonTypesArray)]);

					//Services
					const allServices = uniqueStoresWithLatestDates.flatMap(
						(item) => item.services
					);
					const uniqueServices = allServices.reduce((accumulator, service) => {
						const serviceName = service.serviceName;
						const existingService = accumulator.find(
							(s) => s.serviceName === serviceName
						);
						if (!existingService) {
							accumulator.push(service);
						}
						return accumulator;
					}, []);

					uniqueServices.sort((a, b) =>
						a.serviceName.localeCompare(b.serviceName)
					);

					setAllServicesCombined(uniqueServices);

					setStores(uniqueStoresWithLatestDates);

					setLoading(false);
				}
			})
			.catch((err) => setError(err));

		navigator.geolocation.getCurrentPosition(
			(position) => {
				// lat, long
				// 31.123883, 29.775421 examples
				// eslint-disable-next-line
				const { latitude: lat, longitude: lon } = position.coords;

				allStoresSorted(
					lat,
					lon,
					userLocation.country.toLowerCase(),
					selectedGovernorate,
					selectedDistrict,
					salonTypeStored ? salonTypeStored : selectedSalonType,
					selectedService,
					itemsPerPage,
					currentPage
				)
					.then((data) => {
						if (data.error) {
							setError(data.error);
						} else {
							var uniqueStoresWithLatestDates = data.stores.filter((store) =>
								store.services.some((service) =>
									service.serviceName.toLowerCase().includes("haircut")
								)
							);

							// console.log(cleanedString, "cleanedString");
							// console.log(
							// 	uniqueStoresWithLatestDates,
							// 	"uniqueStoresWithLatestDates"
							// );

							if (selectedCountry) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
										(store) =>
											store.belongsTo.storeCountry.toLowerCase() ===
											selectedCountry.toLowerCase()
									);
							}

							if (selectedGovernorate && selectedDistrict) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
										(store) =>
											store.belongsTo.storeGovernorate.toLowerCase() ===
												selectedGovernorate.toLowerCase() &&
											store.belongsTo.storeDistrict.toLowerCase() ===
												selectedDistrict.toLowerCase()
									);
							}

							if (selectedGovernorate) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
										(store) =>
											store.belongsTo.storeGovernorate.toLowerCase() ===
											selectedGovernorate.toLowerCase()
									);

								const gettingUpatedDistrictHelper =
									allAvailableFilters &&
									allAvailableFilters.filter(
										(item) =>
											item.storeGovernorate.toLowerCase() ===
											selectedGovernorate.toLowerCase()
									);

								const uniqueDistricts = [
									...new Set(
										gettingUpatedDistrictHelper.map(
											(item) => item.storeDistrict
										)
									),
								];
								setAvailableDistricts(uniqueDistricts);
							}

							if (selectedDistrict) {
								uniqueStoresWithLatestDates =
									uniqueStoresWithLatestDates.filter(
										(store) =>
											store.belongsTo.storeDistrict.toLowerCase() ===
											selectedDistrict.toLowerCase()
									);
								const gettingUpatedGovernorateHelper =
									allAvailableFilters &&
									allAvailableFilters.filter(
										(item) =>
											item.storeDistrict.toLowerCase() ===
											selectedDistrict.toLowerCase()
									);

								const uniqueGovernorates = [
									...new Set(
										gettingUpatedGovernorateHelper.map(
											(item) => item.storeGovernorate
										)
									),
								];
								setAvailableGovernorates(uniqueGovernorates);
							}

							//Salon Types
							var allSalonTypesArray =
								uniqueStoresWithLatestDates &&
								uniqueStoresWithLatestDates.map(
									(iii) => iii.belongsTo.storeType
								);
							setAllSalonTypes([...new Set(allSalonTypesArray)]);

							//Services
							const allServices = uniqueStoresWithLatestDates.flatMap(
								(item) => item.services
							);
							const uniqueServices = allServices.reduce(
								(accumulator, service) => {
									const serviceName = service.serviceName;
									const existingService = accumulator.find(
										(s) => s.serviceName === serviceName
									);
									if (!existingService) {
										accumulator.push(service);
									}
									return accumulator;
								},
								[]
							);

							uniqueServices.sort((a, b) =>
								a.serviceName.localeCompare(b.serviceName)
							);

							setAllServicesCombined(uniqueServices);

							setStores(uniqueStoresWithLatestDates);

							setLoading(false);
						}
					})
					.catch((err) => setError(err));
			},
			() => setError("Could not get location")
		);
		// eslint-disable-next-line
	}, [
		currentPage,
		selectedSalonType,
		selectedService,
		selectedDistrict,
		selectedCountry,
		selectedGovernorate,
		itemsPerPage,
		allAvailableFilters,
	]);

	const gettingFilteringCriteria = () => {
		getCountriesDistrictsGov().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAvailableFilters(data);

				// Get unique countries
				const uniqueCountries = [
					...new Set(data.map((item) => item.storeCountry)),
				];
				setAvailableCountries(uniqueCountries);

				// Get unique governorates
				const uniqueGovernorates = [
					...new Set(data.map((item) => item.storeGovernorate)),
				];
				setAvailableGovernorates(uniqueGovernorates);

				// Get unique districts
				const uniqueDistricts = [
					...new Set(data.map((item) => item.storeDistrict)),
				];
				setAvailableDistricts(uniqueDistricts);
			}
		});
	};

	useEffect(() => {
		activeStoresCount(
			userLocation && userLocation.country.toLowerCase(),
			selectedGovernorate,
			selectedDistrict,
			selectedSalonType,
			selectedService
		)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setTotalItems(data.total);
				}
			})
			.catch((err) => setError(err));

		if (!isLoaded) return;
		getLocation();

		// eslint-disable-next-line
	}, [isLoaded, currentPage, , getLocation]);

	const gettingAllAffiliates = () => {
		getAffiliates().then((data) => {
			if (data && data.error) {
				console.log("Affiliate Products Error");
			} else {
				setAffiliateProducts(data);

				// Create an array from 0 to data.length - 1
				const numberArray = Array.from({ length: data.length }, (_, i) => i);
				// Shuffle the array
				for (let i = numberArray.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[numberArray[i], numberArray[j]] = [numberArray[j], numberArray[i]];
				}
				// Set the randomized array
				setRandomNumberArray(numberArray);
			}
		});
	};

	useEffect(() => {
		gettingAllAffiliates();
		gettingFilteringCriteria();

		// eslint-disable-next-line
	}, []);

	// eslint-disable-next-line
	const handleRetryClick = () => {
		window.location.reload();
	};

	if (loading && isLoaded) {
		return (
			<div className='spinner-container'>
				<Spin size='large' tip='Loading...' />
			</div>
		);
	}

	// if (loadError || error) {
	// 	return (
	// 		<div className='spinner-container'>
	// 			<Spin size='large' tip='Loading...' />
	// 			<div>
	// 				This app requires access to your location. Please enable it in your
	// 				browser settings, or{" "}
	// 				<Link href='#' onClick={handleRetryClick}>
	// 					click here
	// 				</Link>{" "}
	// 				to retry.
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<MyStoreListWrapper showPagination={selectedGovernorate}>
			<Helmet dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}>
				<meta charSet='utf-8' />
				{chosenLanguage === "Arabic" ? (
					<title dir='rtl'>أفضل عروض قصات الشعر للرجال والنساء</title>
				) : (
					<title>Best haircut offers for Men & Women</title>
				)}
				<meta
					name='description'
					content={
						chosenLanguage === "Arabic"
							? `ابحث عن أقرب مصفف للشعر بالقرب منك باستخدام منصتنا السهلة للحجز. اكتشف خبراء تصفيف الشعر المحترفين وأصحاب صالونات الحلاقة والجمال في منطقتك. احجز موعدك بسهولة واستمتع بخدمات عالية الجودة. احصل على الإطلالة التي ترغب فيها بسهولة. ابدأ رحلتك للحصول على تسريحة شعر رائعة اليوم!. Powered By https://infinite-apps.com`
							: `Find the closest stylist near you with our convenient booking platform. Discover professional hairstylists, barbers, and beauty experts in your area. Book your appointment hassle-free and enjoy quality services. Get the look you desire with ease. Start your journey to a fabulous hairstyle today! Powered By https://infinite-apps.com`
					}
				/>
				<meta
					name='keywords'
					content={
						chosenLanguage === "Arabic"
							? `إكس لوك، مصفف شعر، صالونات حلاقة، خدمات تجميل , ${
									allServicesCombined &&
									allServicesCombined.map((i) => i.serviceNameOtherLanguage)
							  }`
							: `XLOOK, hairstylist, barbershops, beauty services, ${
									allServicesCombined &&
									allServicesCombined.map((i) => i.serviceName)
							  }`
					}
				/>

				<link rel='canonical' href='https://xlookpro.com/schedule/haircut' />
			</Helmet>
			<SideFilter
				filtersClicked={filtersClicked}
				setFiltersClicked={setFiltersClicked}
				availableCountries={availableCountries}
				availableGovernorates={availableGovernorates}
				availableDistricts={availableDistricts}
				selectedCountry={selectedCountry}
				setSelectedCountry={setSelectedCountry}
				selectedGovernorate={selectedGovernorate}
				setSelectedGovernorate={setSelectedGovernorate}
				selectedDistrict={selectedDistrict}
				setSelectedDistrict={setSelectedDistrict}
				allServicesCombined={allServicesCombined}
				selectedService={selectedService}
				setSelectedService={setSelectedService}
				priceRange={priceRange}
				setPriceRange={setPriceRange}
				servicesInPriceRange={servicesInPriceRange}
				setServicesInPriceRange={setServicesInPriceRange}
				allSalonTypes={allSalonTypes}
				selectedSalonType={selectedSalonType}
				setSelectedSalonType={setSelectedSalonType}
			/>
			<div>
				<StoreListPhone
					activeStoresOnly={stores}
					allServicesCombined={allServicesCombined}
					filtersClicked={filtersClicked}
					setFiltersClicked={setFiltersClicked}
					language={chosenLanguage}
					loading={loading2}
					affiliateProducts={affiliateProducts}
					randomNumberArray={randomNumberArray}
				/>
			</div>
			<div
				className='mx-auto text-center mt-3 pb-5 pagination container'
				onClick={() => {
					window.scrollTo({ top: 10, behavior: "smooth" });
				}}
			>
				<Pagination
					current={currentPage}
					total={totalItems}
					pageSize={itemsPerPage}
					onChange={(page) => {
						setCurrentPage(page);
						window.scrollTo({ top: 10, behavior: "smooth" });
					}}
				/>
			</div>
		</MyStoreListWrapper>
	);
};

export default IconHaircut;

const MyStoreListWrapper = styled.div`
	min-height: 1100px;
	background-color: black;
	padding-bottom: 50px;

	img {
		width: 100%;
		min-height: 300px;
	}

	.deskTopVersion {
		display: block;
	}

	@media (max-width: 1000px) {
		.deskTopVersion {
			display: none;
		}

		.pagination {
			display: ${(props) => (props.showPagination ? "none" : "block")};
		}

		img {
			width: 100%;
			min-height: 100%;
		}
	}
`;
