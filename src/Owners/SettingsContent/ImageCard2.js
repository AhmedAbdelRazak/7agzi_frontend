/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../Images/UploadImageImage.jpg";
import { cloudinaryUpload1 } from "../apiOwner";
import { isAuthenticated } from "../../auth";

const ImageCard2 = ({
	setAddThumbnail,
	handleImageRemove,
	addThumbnail,
	language,
	setLoading,
}) => {
	const { user, token } = isAuthenticated();

	const fileUploadAndResizeThumbNail = (e) => {
		setLoading(true);

		let files = e.target.files;
		let allUploadedFiles =
			addThumbnail &&
			addThumbnail.images &&
			addThumbnail.images[0] &&
			addThumbnail.images[0].url
				? [...addThumbnail.images]
				: [];

		if (files) {
			for (let i = 0; i < files.length; i++) {
				let reader = new FileReader();
				reader.readAsDataURL(files[i]);
				reader.onload = (event) => {
					cloudinaryUpload1(user._id, token, { image: event.target.result })
						.then((data) => {
							allUploadedFiles.push(data);

							setAddThumbnail({
								...addThumbnail,
								images: allUploadedFiles,
							});
						})
						.catch((err) => {
							setLoading(false);
							console.log("CLOUDINARY UPLOAD ERR", err);
						});
				};
			}

			setTimeout(() => {
				setLoading(false);
			}, 1500);
		}
	};
	return (
		<ImageCardWrapper>
			<div className='card card-flush  mx-auto'>
				<div className=''>
					<div className=' p-2'>
						<h5 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
							{language === "Arabic"
								? "صورة مُصغّرة للمتجر"
								: "Store Thumbnail"}
						</h5>
					</div>
				</div>
				<div className='card-body text-center pt-0 mx-auto'>
					<div
						className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
						data-kt-image-input='true'
					>
						<div className='image-input-wrapper w-180px h-180px'></div>
						<div className='col-12'>
							{addThumbnail &&
								addThumbnail.images &&
								addThumbnail.images.map((image, i) => {
									return (
										<div className='m-3 col-6 ' key={i}>
											<button
												type='button'
												className='close'
												onClick={() => {
													handleImageRemove(image.public_id);
													setAddThumbnail([]);
												}}
												style={{
													color: "white",
													background: "black",
													fontSize: "20px",
												}}
												aria-label='Close'
											>
												<span aria-hidden='true'>&times;</span>
											</button>
											<img
												src={image.url}
												alt='Img Not Found'
												style={{
													width: "130px",
													height: "130px",
													boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
												}}
												key={image.public_id}
											/>
										</div>
									);
								})}
						</div>
						{!addThumbnail.images || addThumbnail.images.length === 0 ? (
							<label
								className=''
								style={{ cursor: "pointer", fontSize: "0.95rem" }}
							>
								<img src={imageImage} alt='imageUpload' />
								<input
									type='file'
									hidden
									accept='image/*'
									onChange={fileUploadAndResizeThumbNail}
									required
								/>
							</label>
						) : null}
					</div>
					<div className='text-muted fs-7'>
						Width: 800px, Height: 954px; <br />
						Set the Thumbnail Image. Only *.png, *.jpg and *.jpeg image files
						are accepted
					</div>
				</div>
			</div>
		</ImageCardWrapper>
	);
};

export default ImageCard2;

const ImageCardWrapper = styled.div`
	text-align: center;

	.card {
		border: 1px #f6f6f6 solid !important;
		margin: auto;
		text-align: center;
	}
`;
