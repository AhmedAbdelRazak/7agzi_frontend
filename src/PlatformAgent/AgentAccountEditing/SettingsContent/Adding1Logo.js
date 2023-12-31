import React, { useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../../../auth";
import { cloudinaryUpload1 } from "../apiOwner";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import ImageCard from "./ImageCard";
import { Link } from "react-router-dom";
import ImageCard2 from "./ImageCard2";
import { Spin } from "antd";
import ImageCard3 from "./ImageCard3";
import GettingMap from "../../../components/SingleStorePage/GettingMap";

const Adding1Logo = ({
	addStoreLogo,
	setAddStoreLogo,
	addStoreName,
	addStoreNameArabic,
	setAddStoreName,
	setAddStoreNameArabic,
	setClickedMenu,
	allServices,
	storeThumbnail,
	setStoreThumbnail,
	ownerIdPhoto,
	setOwnerIdPhoto,
	alreadySetLoyaltyPointsManagement,
	latitude,
	setLatitude,
	longitude,
	setLongitude,
	loading,
	setLoading,
	language,
}) => {
	const [loading2, setLoading2] = useState(false);
	const [loading3, setLoading3] = useState(false);
	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const fileUploadAndResizeLogo = (e) => {
		setLoading2(true);

		// console.log(e.target.files);
		let files = e.target.files;
		console.log(files);
		let allUploadedFiles = addStoreLogo;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 1024 * 1024) {
					setLoading2(false);
					// file size is in bytes
					alert("File size should be less than 1MB");
					continue; // skip this file
				}
				Resizer.imageFileResizer(
					files[i],
					666,
					315,
					"AUTO",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setAddStoreLogo({ ...addStoreLogo, images: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
			setTimeout(() => {
				setLoading2(false);
			}, 1500);
		}
	};

	const handleImageRemove = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setAddStoreLogo([]);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const fileUploadAndResizeStoreThumbnail = (e) => {
		setLoading(true);
		let files = e.target.files;

		if (files) {
			let allUploadedFiles = storeThumbnail ? [...storeThumbnail] : [];

			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 1024 * 1024) {
					setLoading(false);
					alert("File size should be less than 1MB");
					continue; // skip this file
				}

				let reader = new FileReader();
				reader.readAsDataURL(files[i]);
				reader.onload = (event) => {
					cloudinaryUpload1(user._id, token, { image: event.target.result })
						.then((data) => {
							allUploadedFiles.push(data);

							setStoreThumbnail({
								...storeThumbnail,
								images: allUploadedFiles,
							});
						})
						.catch((err) => {
							console.log("CLOUDINARY UPLOAD ERR", err);
						});
				};
			}

			setTimeout(() => {
				setLoading(false);
			}, 1500);
		}
	};

	const handleImageRemove2 = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setStoreThumbnail([]);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const fileUploadAndResizeOwnerIdPhoto = (e) => {
		setLoading3(true);
		// console.log(e.target.files);
		let files = e.target.files;
		console.log(files);
		let allUploadedFiles = ownerIdPhoto;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				if (files[i].size > 500 * 1024) {
					setLoading3(false);
					// file size is in bytes
					alert("File size should be less than 500kb");
					continue; // skip this file
				}
				Resizer.imageFileResizer(
					files[i],
					800,
					954,
					"AUTO",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setOwnerIdPhoto({
									...ownerIdPhoto,
									images: allUploadedFiles,
								});
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
			setTimeout(() => {
				setLoading3(false);
			}, 1500);
		}
	};

	const handleImageRemove3 = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				setOwnerIdPhoto([]);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	return (
		<Adding1LogoWrapper>
			<div className='row col-12'>
				<div className='col-md-4'>
					{loading2 ? (
						<div style={{ textAlign: "center", marginTop: "10%" }}>
							<Spin size='large' />
						</div>
					) : (
						<ImageCard
							addThumbnail={addStoreLogo}
							handleImageRemove={handleImageRemove}
							setAddThumbnail={setAddStoreLogo}
							fileUploadAndResizeThumbNail={fileUploadAndResizeLogo}
							language={language}
						/>
					)}
				</div>
				<div className='col-md-4 mx-auto'>
					{loading ? (
						<div style={{ textAlign: "center", marginTop: "10%" }}>
							<Spin size='large' />
						</div>
					) : (
						<ImageCard2
							addThumbnail={storeThumbnail}
							handleImageRemove={handleImageRemove2}
							setAddThumbnail={setStoreThumbnail}
							fileUploadAndResizeThumbNail={fileUploadAndResizeStoreThumbnail}
							language={language}
							setLoading={setLoading}
						/>
					)}
				</div>
				<div className='col-md-4 mx-auto'>
					{loading3 ? (
						<div style={{ textAlign: "center", marginTop: "10%" }}>
							<Spin size='large' />
						</div>
					) : (
						<ImageCard3
							addThumbnail={ownerIdPhoto}
							handleImageRemove={handleImageRemove3}
							setAddThumbnail={setOwnerIdPhoto}
							fileUploadAndResizeThumbNail={fileUploadAndResizeOwnerIdPhoto}
							language={language}
						/>
					)}
				</div>
				<div className='col-md-5 pt-5 mx-auto'>
					<label>
						{language === "Arabic"
							? "اسم المتجر بالإنجليزية"
							: "Store Name In English"}{" "}
						<span style={{ color: "red", fontWeight: "bold" }}>
							{" "}
							<strong>*</strong>{" "}
						</span>{" "}
					</label>
					<input
						className='form-control'
						type='text'
						placeholder={
							language === "Arabic"
								? "ادخل اسم متجرك"
								: "Fill In Your Store Name In English"
						}
						value={addStoreName}
						onChange={(e) => {
							setAddStoreName(e.target.value);
						}}
					/>
				</div>

				<div className='col-md-5 pt-5 mx-auto'>
					<label>
						{language === "Arabic"
							? "اسم المتجر (بالعربية)"
							: "Store Name (Arabic)"}{" "}
						<span style={{ color: "red", fontWeight: "bold" }}>
							{" "}
							<strong>*</strong>{" "}
						</span>{" "}
					</label>
					<input
						className='form-control'
						type='text'
						placeholder={
							language === "Arabic"
								? "ادخل اسم متجرك بالعربية"
								: "Fill In Your Store Name In Arabic"
						}
						value={addStoreNameArabic}
						onChange={(e) => {
							setAddStoreNameArabic(e.target.value);
						}}
					/>
				</div>

				<div className='col-md-5 py-5 mx-auto'>
					<label>
						{language === "Arabic" ? "خط العرض" : "Latitude"}{" "}
						<span style={{ color: "red", fontWeight: "bold" }}>
							{" "}
							<strong>*</strong>{" "}
						</span>{" "}
					</label>
					<input
						className='form-control'
						type='text'
						placeholder={
							language === "Arabic"
								? "ادخل خط العرض الخاص بالموقع"
								: "Fill In Your Location Latitude"
						}
						value={latitude}
						onChange={(e) => {
							setLatitude(e.target.value);
						}}
					/>
				</div>

				<div className='col-md-5 py-5 mx-auto'>
					<label>
						{language === "Arabic" ? "خط الطول" : "Longitude"}{" "}
						<span style={{ color: "red", fontWeight: "bold" }}>
							{" "}
							<strong>*</strong>{" "}
						</span>{" "}
					</label>
					<input
						className='form-control'
						type='text'
						placeholder={
							language === "Arabic"
								? "ادخل خط الطول الخاص بالموقع"
								: "Fill In Your Location Longitude"
						}
						value={longitude}
						onChange={(e) => {
							setLongitude(e.target.value);
						}}
					/>
				</div>
			</div>

			{addStoreName &&
			addStoreLogo &&
			addStoreLogo.images &&
			addStoreLogo.images.length > 0 &&
			storeThumbnail &&
			storeThumbnail.images &&
			storeThumbnail.images.length > 0 ? (
				<div>
					<div
						className='btn btn-primary mt-4 text-center w-25'
						onClick={() => setClickedMenu("WorkingDays")}
					>
						{language === "Arabic"
							? "أضف ساعات اعمل"
							: "Add Your Working Hours"}
					</div>
				</div>
			) : null}

			<div>
				<GettingMap storeProperties={{ longitude, latitude, from: "update" }} />
			</div>

			{alreadySetLoyaltyPointsManagement &&
			allServices &&
			allServices.length === 0 &&
			alreadySetLoyaltyPointsManagement &&
			alreadySetLoyaltyPointsManagement.addStoreName ? (
				<div className='mt-3 mb-5'>
					<span>
						<Link
							to='/store/admin/services'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}
							className='btn btn-danger text-center btn-block w-25 float-left'
						>
							{language === "Arabic"
								? "Add Services (Next Step)"
								: "Add Services (Next Step)"}
						</Link>
					</span>
				</div>
			) : null}
		</Adding1LogoWrapper>
	);
};

export default Adding1Logo;

const Adding1LogoWrapper = styled.div`
	overflow: hidden;
	margin-left: 130px;
	margin-top: 50px;

	.row {
		background-color: white;
		min-height: 500px;
		padding: 10px;
	}

	label {
		font-weight: bolder;
		font-size: 1.1rem;
	}

	div > .btn {
		margin-left: 350px;
		cursor: pointer;
	}

	@media (max-width: 1000px) {
		margin-left: 10px;

		div > .btn {
			margin-left: 50px;
			width: 60% !important;
			cursor: pointer;
		}
	}
`;
