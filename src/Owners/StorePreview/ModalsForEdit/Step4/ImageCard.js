/** @format */

import React from "react";
import styled from "styled-components";
import imageImage from "../../../../Images/UploadImageImage.jpg";
import { Spin } from "antd";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

const ImageCard = ({
	setAddThumbnail,
	handleImageRemove,
	addThumbnail,
	fileUploadAndResizeThumbNail,
	language,
	loading,
}) => {
	return (
		<ImageCardWrapper>
			<div className='card card-flush py-4'>
				<div className=''>
					<div className=' p-2'>
						<h5 style={{ fontWeight: "bold", fontSize: "1.05rem" }}>
							{language === "Arabic"
								? "صور عمل الموظفين"
								: "Employee Working Photos"}
						</h5>
					</div>
				</div>
				<div className='card-body text-center pt-0'>
					<div
						className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
						data-kt-image-input='true'
					>
						<div className='image-input-wrapper'></div>
						<div className='col-12'>
							<div className='row'>
								{addThumbnail &&
									addThumbnail.map((image, i) => {
										return (
											<div className='col-5  mb-3' key={i}>
												<div className=' col-9 '>
													<button
														type='button'
														className='close'
														onClick={() => {
															handleImageRemove(image.public_id);

															ReactGA.event("Account_Added_Employee_Photos", {
																event_category: "Account_Added_Employee_Photos",
																event_label: "Account_Added_Employee_Photos",
																value: 0, // Optional extra parameters
															});

															ReactPixel.track(
																"Account_Added_Employee_Photos",
																{
																	content_name: "Account_Added_Employee_Photos",
																	content_category:
																		"Account_Added_Employee_Photos",
																	value: "",
																	currency: "",
																}
															);
															// setAddThumbnail([]);
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
														className='mx-2 imagePlace'
														src={image.url}
														alt='Img Not Found'
														style={{
															width: "80%",
															boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														}}
														key={image.public_id}
													/>
												</div>
											</div>
										);
									})}
							</div>
						</div>
						{!addThumbnail.images || addThumbnail.images.length <= 0 ? (
							<>
								{loading ? (
									<div className='mx-auto text-center'>
										<Spin size='large' />
									</div>
								) : (
									<>
										<label
											className=''
											style={{ cursor: "pointer", fontSize: "0.95rem" }}
										>
											<img
												src={imageImage}
												alt='imageUpload'
												style={{
													width: "150px",
													height: "150px",
												}}
											/>
											<input
												type='file'
												multiple
												hidden
												accept='image/*'
												onChange={fileUploadAndResizeThumbNail}
												required
											/>
										</label>
									</>
								)}
							</>
						) : null}
					</div>
					{language === "Arabic" ? (
						<div className='text-muted fs-7'>
							العرض: 800 بكسل، الارتفاع: 954 بكسل;{" "}
							<span
								style={{ fontWeight: "bolder", textTransform: "uppercase" }}
							>
								حتى 10 صور.
							</span>
							<br />
							<strong style={{ color: "black" }}>
								يجب أن تكون الصورة 1024 كيلوبايت أو أقل...
							</strong>
							<br />
							قم بتعيين صور عمل الموظف. يتم قبول ملفات الصور فقط بصيغة *.png،
							*.jpg و *.jpeg
						</div>
					) : (
						<div className='text-muted fs-7'>
							Width: 800px, Height: 954px;{" "}
							<span
								style={{ fontWeight: "bolder", textTransform: "uppercase" }}
							>
								Up to 10 photos.
							</span>
							<br />
							<strong style={{ color: "black" }}>
								Image Should be 1 MB or less...
							</strong>
							<br />
							Set the employee working images. Only *.png, *.jpg and *.jpeg
							image files are accepted
						</div>
					)}
				</div>
			</div>
		</ImageCardWrapper>
	);
};

export default ImageCard;

const ImageCardWrapper = styled.div`
	text-align: center;

	.card {
		border: 1px #f6f6f6 solid !important;
		margin: auto;
		text-align: center;
	}

	@media (max-width: 1000px) {
		.imagePlace {
			width: 250% !important;
		}
	}
`;
