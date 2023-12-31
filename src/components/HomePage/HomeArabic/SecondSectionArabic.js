import React from "react";
import styled from "styled-components";
import HairCutImg from "../HomeImages/hair-dressr-ara1.png";
import BeardImg from "../HomeImages/Beard-Shave-ara.png";
import GroomImg from "../HomeImages/groo-ara.png";
import BundleImg from "../HomeImages/Bundels-ara.png";
import OffersImg from "../HomeImages/offers-ara.png";
import WhatsAppImg from "../HomeImages/kalemna-wats.png";
import BrideImg from "../HomeImages/wedding-ara-women.png";
import SkinCare from "../HomeImages/body-care-ara.png";

const SecondSectionArabic = () => {
	var salonTypeStored = localStorage.getItem("salonTypeStored");
	return (
		<SecondSectionWrapper dir='rtl'>
			{salonTypeStored === "hair salon" ? (
				<div className='grid-container'>
					<img
						src={HairCutImg}
						alt='احجز موعدك مع إكسلوك للحصول على حلاقة شعر'
						onClick={() => {
							window.location.href = `/schedule/haircut`;
						}}
					/>
					<img
						src={SkinCare}
						alt='احجز موعدك مع إكسلوك للحصول على حلاقة لحية'
						onClick={() => {
							window.location.href = `/schedule/skin-care`;
						}}
					/>
					<img
						src={BundleImg}
						alt=' احجز موعدك مع إكسلوك للحصول على أحدث عروضنا الحصرية'
						onClick={() => {
							window.location.href = `/schedule/bundle`;
						}}
					/>
					<img
						src={BrideImg}
						alt='إذا كنت عريسًا، تحقق من عروضنا للعرسان اليوم'
						onClick={() => {
							window.location.href = `/schedule/groom`;
						}}
					/>
					<img
						src={OffersImg}
						alt=' احجز موعدك مع إكسلوك للحصول على أحدث عروضنا الحصرية'
						onClick={() => {
							window.location.href = `/schedule/offers`;
						}}
					/>
					<img
						src={WhatsAppImg}
						alt='عملاؤنا هم أولويتنا الأولى، راسلنا على واتساب وسنكون سعداء جدًا بمساعدتك'
						onClick={() => {
							window.open(
								"https://api.whatsapp.com/send?phone=+201098168674",
								"_blank"
							);
						}}
					/>
				</div>
			) : (
				<div className='grid-container'>
					<img
						src={HairCutImg}
						alt='احجز موعدك مع إكسلوك للحصول على حلاقة شعر'
						onClick={() => {
							window.location.href = `/schedule/haircut`;
						}}
					/>
					<img
						src={BeardImg}
						alt='احجز موعدك مع إكسلوك للحصول على حلاقة لحية'
						onClick={() => {
							window.location.href = `/schedule/beard-shaving`;
						}}
					/>
					<img
						src={BundleImg}
						alt=' احجز موعدك مع إكسلوك للحصول على أحدث عروضنا الحصرية'
						onClick={() => {
							window.location.href = `/schedule/bundle`;
						}}
					/>
					<img
						src={GroomImg}
						alt='إذا كنت عريسًا، تحقق من عروضنا للعرسان اليوم'
						onClick={() => {
							window.location.href = `/schedule/groom`;
						}}
					/>
					<img
						src={OffersImg}
						alt=' احجز موعدك مع إكسلوك للحصول على أحدث عروضنا الحصرية'
						onClick={() => {
							window.location.href = `/schedule/offers`;
						}}
					/>
					<img
						src={WhatsAppImg}
						alt='عملاؤنا هم أولويتنا الأولى، راسلنا على واتساب وسنكون سعداء جدًا بمساعدتك'
						onClick={() => {
							window.open(
								"https://api.whatsapp.com/send?phone=+201098168674",
								"_blank"
							);
						}}
					/>
				</div>
			)}
		</SecondSectionWrapper>
	);
};

export default SecondSectionArabic;

const SecondSectionWrapper = styled.div`
	margin: 30px auto;
	text-align: center;

	.grid-container {
		display: grid;
		grid-template-columns: repeat(6, 1fr); // 6 columns
		align-items: center; // aligns items vertically in the center
		justify-items: center; // aligns items horizontally in the center

		img {
			width: 30%;
			text-align: center; // this is not necessary as the image will be centered by justify-items
		}

		img:hover {
			cursor: pointer;
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
