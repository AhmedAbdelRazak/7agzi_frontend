import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import AdminNavbar from "../OwnerNavbar/AdminNavbar";
import Adding1Logo from "./Adding1Logo";
import Adding2DaysClosed from "./Adding2DaysClosed";
import Adding3Awards from "./Adding3Awards";
import {
	LoyaltyPointsAndStoreStatus,
	allLoyaltyPointsAndStoreStatus,
	getServices,
} from "../apiOwner";
import { isAuthenticated } from "../../auth";
import AddingWorkingHours from "./AddingWorkingHours";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import OwnerNavmenu from "../NewOwnerNavMenu/OwnerNavmenu";
import { useCartContext } from "../../sidebar_context";
// import {Redirect} from "react-router-dom";

const isActive = (history, path) => {
	if (history === path) {
		return {
			background: "#0f377e",
			fontWeight: "bold",
			borderRadius: "5px",
			fontSize: "1.1rem",
			textAlign: "center",
			padding: "7px",
			color: "white",
			transition: "var(--mainTransition)",

			// textDecoration: "underline",
		};
	} else {
		return {
			backgroundColor: "white",
			padding: "7px",
			borderRadius: "5px",
			fontSize: "1.1rem",
			fontWeight: "bolder",
			textAlign: "center",
			cursor: "pointer",
			transition: "var(--mainTransition)",
		};
	}
};

const SettingsMain = ({ language }) => {
	const { chosenLanguage } = useCartContext();

	// const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapseMenu, setCollapseMenu] = useState(false);

	//Helper Variables
	const [clickedMenu, setClickedMenu] = useState("AddLogo");
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");

	//StoreManagement Main Fields
	const [loyaltyPointsAward, setLoyaltyPointsAward] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState("");
	const [onlineServicesFees, setOnlineServicesFees] = useState("");
	const [addStoreLogo, setAddStoreLogo] = useState([]);
	const [storeThumbnail, setStoreThumbnail] = useState([]);
	const [ownerIdPhoto, setOwnerIdPhoto] = useState([]);
	const [addStoreName, setAddStoreName] = useState("");
	const [addStoreNameArabic, setAddStoreNameArabic] = useState("");
	const [daysStoreClosed, setDaysStoreClosed] = useState("");
	const [datesStoreClosed, setDatesStoreClosed] = useState("");
	const [query, setQuery] = useState([]);
	const [oneDateStoreOff, setOneDateStoreOff] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [activeOnlineBooking, setActiveOnlineBooking] = useState(true);
	const [activeProp, setActiveProp] = useState(false);
	const [extraData, setExtraData] = useState({
		branchesCount: 1,
		stylistsCount: 2,
		chairsCount: 2,
		cashPayment: true,
		visaPayment: false,
		airConditioned: false,
		parking: false,
	});
	const [activeWhatsAppNotification, setActiveWhatsAppNotification] =
		useState(true);
	const [loading, setLoading] = useState(false);

	//Checking whether services were added or not
	const [allServices, setAllServices] = useState([]);

	const { user, token } = isAuthenticated();

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var lastAddedSettings;

				if (data.length === 0) {
					lastAddedSettings = "";
				} else {
					lastAddedSettings = data && data[data.length - 1];
				}

				if (lastAddedSettings) {
					setAlreadySetLoyaltyPointsManagement(lastAddedSettings);
					setLoyaltyPointsAward(
						lastAddedSettings && lastAddedSettings.loyaltyPointsAward
					);

					setExtraData({
						...extraData,
						branchesCount: lastAddedSettings && lastAddedSettings.branchesCount,
						stylistsCount: lastAddedSettings && lastAddedSettings.stylistsCount,
						chairsCount: lastAddedSettings && lastAddedSettings.chairsCount,
						cashPayment: lastAddedSettings && lastAddedSettings.cashPayment,
						visaPayment: lastAddedSettings && lastAddedSettings.visaPayment,
						airConditioned:
							lastAddedSettings && lastAddedSettings.airConditioned,
						parking: lastAddedSettings && lastAddedSettings.parking,
					});
					setDiscountPercentage(
						lastAddedSettings && lastAddedSettings.discountPercentage
					);
					setOnlineServicesFees(
						lastAddedSettings && lastAddedSettings.onlineServicesFees
					);
					setDaysStoreClosed({
						daysStoreClosed:
							lastAddedSettings && lastAddedSettings.daysStoreClosed,
					});
					setQuery(lastAddedSettings && lastAddedSettings.daysStoreClosed);
					setActiveWhatsAppNotification(
						lastAddedSettings && lastAddedSettings.activeWhatsAppNotification
					);
					setDatesStoreClosed(
						lastAddedSettings && lastAddedSettings.datesStoreClosed
					);
					setAddStoreLogo(
						lastAddedSettings &&
							lastAddedSettings.addStoreLogo &&
							lastAddedSettings.addStoreLogo.length > 0
							? {
									images: lastAddedSettings.addStoreLogo,
							  }
							: []
					);

					setStoreThumbnail(
						lastAddedSettings &&
							lastAddedSettings.storeThumbnail &&
							lastAddedSettings.storeThumbnail.length > 0
							? { images: lastAddedSettings.storeThumbnail }
							: []
					);

					setOwnerIdPhoto(
						lastAddedSettings &&
							lastAddedSettings.ownerIdPhoto &&
							lastAddedSettings.ownerIdPhoto.length > 0
							? { images: lastAddedSettings.ownerIdPhoto }
							: []
					);

					setAddStoreName(lastAddedSettings && lastAddedSettings.addStoreName);
					setAddStoreNameArabic(
						lastAddedSettings && lastAddedSettings.addStoreNameArabic
					);
					setLongitude(lastAddedSettings && lastAddedSettings.longitude);
					setLatitude(lastAddedSettings && lastAddedSettings.latitude);
					setActiveProp(lastAddedSettings && lastAddedSettings.activeStore);
					setActiveOnlineBooking(
						lastAddedSettings && lastAddedSettings.activeOnlineBooking
					);
				}
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		// eslint-disable-next-line
	}, [query]);

	const clickSubmit = () => {
		if (
			storeThumbnail &&
			storeThumbnail.images &&
			storeThumbnail.images.length === 0
		) {
			return toast.error("Please Add Store Thumbnail");
		}

		if (!longitude || !latitude) {
			return toast.error("Longitude & Latitude are required");
		}

		if (!onlineServicesFees) {
			return toast.error(
				"Please Add Online Services Fee which should be at least 3 EGP"
			);
		}

		if (Number(onlineServicesFees) < 3) {
			return toast.error("Online Services Fee which should be at least 3 EGP");
		}

		if (!addStoreName) {
			return toast.error("Store Name Required");
		}
		if (!addStoreNameArabic) {
			return toast.error("Store Name Arabic Required");
		}

		LoyaltyPointsAndStoreStatus(user._id, token, {
			loyaltyPointsAward: loyaltyPointsAward ? loyaltyPointsAward : 1000000,
			discountPercentage: discountPercentage ? discountPercentage : 0,
			datesStoreClosed,
			daysStoreClosed: daysStoreClosed.daysStoreClosed,
			onlineServicesFees: onlineServicesFees,
			addStoreLogo: addStoreLogo.images,
			storeThumbnail: storeThumbnail.images,
			ownerIdPhoto: ownerIdPhoto.images,
			addStoreName: addStoreName,
			addStoreNameArabic: addStoreNameArabic,
			longitude: longitude,
			latitude: latitude,
			activeOnlineBooking: activeOnlineBooking,
			activeWhatsAppNotification: activeWhatsAppNotification,
			storePhone: user.phone,
			branchesCount: extraData.branchesCount,
			stylistsCount: extraData.stylistsCount,
			chairsCount: extraData.chairsCount,
			cashPayment: extraData.cashPayment,
			visaPayment: extraData.visaPayment,
			airConditioned: extraData.airConditioned,
			parking: extraData.parking,
			activeStore: activeProp,
			belongsTo: isAuthenticated().user._id,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setTimeout(function () {
					setLoyaltyPointsAward("");
					setDiscountPercentage("");
					setDaysStoreClosed([]);
					window.scrollTo({ top: 0, behavior: "smooth" });
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const gettingAllServices = () => {
		getServices(token, user._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllServices(data);
			}
		});
	};

	useEffect(() => {
		gettingAllServices();
		// eslint-disable-next-line
	}, []);

	return (
		<SettingsMainWrapper
			dir={chosenLanguage === "Arabic" ? "rtl" : "ltr"}
			show={collapseMenu}
		>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>Owner {user.name} Add Settings</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/store/admin/settings`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div className='menuWrapper'>
					<div
						className='iconMenu'
						onClick={() => {
							setCollapseMenu(!collapseMenu);
						}}
					>
						<i className='fa-solid fa-bars'></i>
					</div>

					<OwnerNavmenu
						language={chosenLanguage}
						fromPage='Settings'
						collapseMenu={collapseMenu}
					/>
				</div>

				<div>
					<div className='container'>
						<div className='row mx-auto'>
							<div
								style={isActive(clickedMenu, "AddLogo")}
								className='col-4 mx-auto col-md-3 menuItems'
								onClick={() => setClickedMenu("AddLogo")}
							>
								<i className='fa-brands fa-html5 mr-1'></i>{" "}
								{chosenLanguage === "Arabic" ? "أضف شعار" : "Add Logo"}
							</div>
							<div
								style={isActive(clickedMenu, "WorkingDays")}
								className='col-3 mx-auto col-md-3 menuItems'
								onClick={() => setClickedMenu("WorkingDays")}
							>
								<i className='fa-solid fa-calendar-days mr-1'></i>{" "}
								{chosenLanguage === "Arabic" ? "أيام عمل" : "Add Working Days"}
							</div>
							<div
								style={isActive(clickedMenu, "Awards")}
								className='col-2 mx-auto col-md-3 menuItems'
								onClick={() => setClickedMenu("Awards")}
							>
								{/* <i className='fa-solid fa-award mr-1'></i>{" "} */}
								{chosenLanguage === "Arabic" ? "جوائز" : "Add Awards"}
							</div>
							<div
								style={isActive(clickedMenu, "WorkingHours")}
								className='col-3 mx-auto col-md-3 menuItems'
								onClick={() => setClickedMenu("WorkingHours")}
							>
								<i className='fa-solid fa-clock mr-1'></i>{" "}
								{chosenLanguage === "Arabic"
									? "ساعات عمل"
									: "Add Working Hours"}
							</div>
						</div>
					</div>

					{clickedMenu === "AddLogo" ? (
						<Adding1Logo
							addStoreLogo={addStoreLogo}
							setAddStoreLogo={setAddStoreLogo}
							addStoreName={addStoreName}
							addStoreNameArabic={addStoreNameArabic}
							setAddStoreName={setAddStoreName}
							setAddStoreNameArabic={setAddStoreNameArabic}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							setClickedMenu={setClickedMenu}
							allServices={allServices}
							storeThumbnail={storeThumbnail}
							setStoreThumbnail={setStoreThumbnail}
							latitude={latitude}
							setLatitude={setLatitude}
							setLongitude={setLongitude}
							longitude={longitude}
							loading={loading}
							setLoading={setLoading}
							ownerIdPhoto={ownerIdPhoto}
							setOwnerIdPhoto={setOwnerIdPhoto}
							language={chosenLanguage}
						/>
					) : null}

					{clickedMenu === "WorkingDays" ? (
						<Adding2DaysClosed
							daysStoreClosed={daysStoreClosed}
							setDaysStoreClosed={setDaysStoreClosed}
							datesStoreClosed={datesStoreClosed}
							setDatesStoreClosed={setDatesStoreClosed}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							query={query}
							setQuery={setQuery}
							oneDateStoreOff={oneDateStoreOff}
							setOneDateStoreOff={setOneDateStoreOff}
							setClickedMenu={setClickedMenu}
							activeOnlineBooking={activeOnlineBooking}
							setActiveOnlineBooking={setActiveOnlineBooking}
							setExtraData={setExtraData}
							extraData={extraData}
							language={chosenLanguage}
						/>
					) : null}

					{clickedMenu === "Awards" ? (
						<Adding3Awards
							loyaltyPointsAward={loyaltyPointsAward}
							setLoyaltyPointsAward={setLoyaltyPointsAward}
							discountPercentage={discountPercentage}
							setDiscountPercentage={setDiscountPercentage}
							onlineServicesFees={onlineServicesFees}
							setOnlineServicesFees={setOnlineServicesFees}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							clickSubmit={clickSubmit}
							setClickedMenu={setClickedMenu}
							activeWhatsAppNotification={activeWhatsAppNotification}
							setActiveWhatsAppNotification={setActiveWhatsAppNotification}
							language={chosenLanguage}
							user={user}
						/>
					) : null}

					{clickedMenu === "WorkingHours" ? (
						<AddingWorkingHours
							loyaltyPointsAward={loyaltyPointsAward}
							setLoyaltyPointsAward={setLoyaltyPointsAward}
							discountPercentage={discountPercentage}
							setDiscountPercentage={setDiscountPercentage}
							onlineServicesFees={onlineServicesFees}
							setOnlineServicesFees={setOnlineServicesFees}
							alreadySetLoyaltyPointsManagement={
								alreadySetLoyaltyPointsManagement
							}
							clickSubmit2={clickSubmit}
							storeThumbnail={storeThumbnail}
							addStoreName={addStoreName}
							addStoreNameArabic={addStoreNameArabic}
							language={chosenLanguage}
						/>
					) : null}
				</div>
			</div>
		</SettingsMainWrapper>
	);
};

export default SettingsMain;

const SettingsMainWrapper = styled.div`
	min-height: 1000px;
	.grid-container {
		display: grid;
		grid-template-columns: 5% 95%;
	}

	.container {
		margin-top: 50px;
		margin-bottom: 20px;
	}

	h3 {
		font-weight: bold;
		color: goldenrod;
	}

	.menuWrapper {
		background-color: ${(props) => (props.show ? "white" : "black")};
		overflow: auto;
	}
	.iconMenu {
		display: none;
	}

	@media (max-width: 1000px) {
		.grid-container {
			display: grid;
			/* grid-template-columns: 18% 82%; */
			grid-template-columns: ${(props) => (props.show ? "3% 97%" : "18% 82%")};
		}

		.iconMenu {
			display: block;
			color: ${(props) => (props.show ? "black" : "white")};
			position: ${(props) => (props.show ? "absolute" : "")};
			text-align: right;
			font-size: 20px;
			margin-right: ${(props) => (props.show ? "3px" : "5px")};
		}

		.container {
			margin-top: 10px;
			margin-bottom: 20px;
		}

		.menuItems {
			font-size: 10px !important;
			margin: auto;
		}
	}
`;
