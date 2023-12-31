/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { contactUs } from "../../auth/index";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

const ContactUs = ({ contact }) => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});
	const [values, setValues] = useState({
		name: "",
		email: "",
		subject: "",
		text: "",
		success: false,
		loading: false,
	});

	const { name, email, subject, text, loading } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			[name]: event.target.value,
		});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		console.log("Form was submitted");
		window.scrollTo({ top: 0, behavior: "smooth" });

		contactUs({ name, email, subject, text, loading: true }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
				toast.error(data.error);
			} else {
				toast.success(SuccessfullySubmitted);

				setValues({
					subject: "",
					text: "",
					success: false,
					loading: false,
				});
			}
		});
	};

	const SuccessfullySubmitted =
		"Your form was successfully submitted. Our support team will contact you!";

	return (
		<ContactUsWrapper>
			<div className='col-md-5 mx-auto mb-5'>
				<br />
				<div className='horizLine'></div>
			</div>
			<div>
				<div className='row mt-5 ml-3'>
					<div className='col-md-4 my-3'>
						<h3
							style={{ color: "var(--orangePrimary)" }}
							className='text-center'
						>
							Do you have any inquiries...?
						</h3>
						<p className='Contact-us-paragraph mt-5'>
							Please allow up to 24 hours for our Salon Support Team to answer
							your inquiry by filling out the form.
						</p>

						<p className='Contact-us-paragraph'>
							<div className='mt-3'>
								<strong style={{ color: "var(--orangePrimary)" }}>
									Business Hour:
								</strong>{" "}
								{contact && contact.business_hours}.
							</div>
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Address:
							</strong>{" "}
							{contact && contact.address}.
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Phone #:
							</strong>{" "}
							{contact && contact.phone}.
							<br />
							<strong style={{ color: "var(--orangePrimary)" }}>
								Email:
							</strong>{" "}
							{contact && contact.email}.
							<br />
						</p>

						<div className='mt-5'>
							<h3
								style={{ color: "var(--orangePrimary)" }}
								className='text-center'
							>
								{contact && contact.header_1}
							</h3>
							&nbsp;&nbsp;&nbsp;&nbsp;{" "}
							<div
								className='ml-3'
								dangerouslySetInnerHTML={{
									__html: contact && contact.description_1,
								}}
							/>
						</div>
					</div>
					<Fragment>
						<div
							className='col-md-7 my-3 mx-auto'
							style={
								{
									// boxShadow: "3px 0px 3px 3px rgba(0,0,0,0.5)",
								}
							}
						>
							<Fragment>
								<h2
									style={{ color: "var(--mainBlue)" }}
									className='text-center'
								>
									Contact Us
								</h2>
							</Fragment>
							{loading ? (
								<h2>Loading...</h2>
							) : (
								<form className='mt-5 mr-3 ' onSubmit={clickSubmit}>
									<ToastContainer />
									{/*first:  adding your name*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{
												fontWeight: "bold",
												fontSize: "1.1rem",
											}}
										>
											Name:
										</label>
										<input
											type='text'
											name='name'
											onChange={handleChange("name")}
											value={name}
											className='form-control'
											placeholder='Fullname e.g.: John Don'
											required
										/>
									</div>
									{/*email:  adding your emailaddress*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}
										>
											Email Address:
										</label>

										<input
											type='email'
											name='email'
											onChange={handleChange("email")}
											value={email}
											className='form-control'
											placeholder='Email e.g.: Name@email.com'
											required
										/>
									</div>
									{/*Subject:  Adding your subject line*/}
									<div className='form-group'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}
										>
											Subject:
										</label>

										<input
											type='text'
											name='subject'
											onChange={handleChange("subject")}
											value={subject}
											className='form-control'
											placeholder='Subject'
										/>
									</div>
									{/*message */}
									<div className='form'>
										<label
											className='text-center labelStyle'
											style={{ fontWeight: "bold", fontSize: "1.1rem" }}
										>
											Your Inquiry / Complaint:
										</label>

										<textarea
											name='text'
											className='form-control'
											onChange={handleChange("text")}
											value={text}
											rows='10'
											placeholder='Please place your message/comments here'
											required
										></textarea>
									</div>
									{/*message */}
									<input
										type='submit'
										value='Submit'
										className='form-control bg-primary text-white'
									/>
								</form>
							)}
						</div>
					</Fragment>

					<hr />
				</div>
			</div>

			<hr />
		</ContactUsWrapper>
	);
};

export default ContactUs;

const ContactUsWrapper = styled.div`
	overflow: hidden;
	color: white;
	.horizLine {
		border-bottom: wheat solid 5px;
	}

	.labelStyle {
		text-align: center !important;
	}
`;
