import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { allLoyaltyPointsAndStoreStatus, gettingAllUsers } from "../apiBoss";
import CountUp from "react-countup";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import { Helmet } from "react-helmet";
import { Spin } from "antd";

//DreamProject2023!
//Plat form admin when he goes to store dashboard add a clear note.
//Service Type drop down male female , e.tc...
//Link to youtube video
//Employee share with the owner when adding an employee
//Edit Website
//contact us add fields from and to
//Schedule an Appointment for the user
//Phones should be 11 digits
//Are you sure you want to cancel this appointment for the user dashboard.
//On changing statuses, you should confirm the message

const BossDashboard = () => {
	const [AdminMenuStatus, setAdminMenuStatus] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const [loading, setLoading] = useState(true);
	const [storeProperties, setStoreProperties] = useState([]);
	const [ownerAccounts, setOwnerAccounts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [clickedFilter, setClickedFilter] = useState("All");

	useEffect(() => {
		if (window.location.pathname.includes("/store/admin/dashboard")) {
			setCollapsed(true);
		} else {
			setCollapsed(false);
		}
	}, []);

	const { token, user } = isAuthenticated();

	const getOnlineStoreName = () => {
		setLoading(true);
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var dataModified = data.map((i) => {
					return {
						...i,
						storeId: i.belongsTo && i.belongsTo._id,
						storeCreatedAt: i.belongsTo && i.belongsTo.createdAt,
					};
				});

				dataModified.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				// Then, use reduce to construct an object where the keys are storeNames and the values are the corresponding items with the latest date
				var result = dataModified.reduce((acc, item) => {
					if (
						!acc[item.storeId] ||
						new Date(item.createdAt) > new Date(acc[item.storeId].createdAt)
					) {
						acc[item.storeId] = item;
					}
					return acc;
				}, {});

				// Finally, extract the values from the resulting object to get an array of items
				var uniqueStoresWithLatestDates = Object.values(result);
				uniqueStoresWithLatestDates.sort(
					(a, b) => new Date(a.storeCreatedAt) - new Date(b.storeCreatedAt)
				);

				setStoreProperties(uniqueStoresWithLatestDates);

				gettingAllUsers(token, user._id).then((data2) => {
					setLoading(true);

					if (data2.error) {
						console.log(data2.error);
					} else {
						var allOwnerAccounts = data2.filter((i) => i.role === 1000);

						allOwnerAccounts.sort(
							(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
						);

						setOwnerAccounts(allOwnerAccounts);
						setLoading(false);
					}
				});
			}
		});
	};

	useEffect(() => {
		getOnlineStoreName();

		// eslint-disable-next-line
	}, []);

	var storesPendingApproval =
		storeProperties && storeProperties.filter((i) => i.activeStore === false);

	const filteredOwnerAccounts = ownerAccounts.filter(
		(o) =>
			o.agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			o.storeGovernorate.toLowerCase().includes(searchQuery.toLowerCase()) ||
			o.phone.toLowerCase().includes(searchQuery)
	);

	var filteredData =
		clickedFilter === "All"
			? filteredOwnerAccounts
			: clickedFilter === "UN-ADDED SETTINGS"
			? filteredOwnerAccounts &&
			  filteredOwnerAccounts.filter(
					(i) =>
						storeProperties
							.map((iii) => iii.belongsTo && iii.belongsTo._id)
							.indexOf(i._id) === -1
			  )
			: clickedFilter === "NOT LIVE ACCOUNTS"
			? filteredOwnerAccounts &&
			  filteredOwnerAccounts.filter(
					(i) =>
						storeProperties &&
						storeProperties
							.map((iii) => iii.belongsTo && iii.belongsTo._id)
							.indexOf(i._id) !== -1 &&
						storeProperties[
							storeProperties &&
								storeProperties
									.map((iii) => iii.belongsTo && iii.belongsTo._id)
									.indexOf(i._id)
						].activeStore === false
			  )
			: filteredOwnerAccounts;

	return (
		<BossDashboardWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title dir='rtl'>XLOOK ADMIN DASHBOARD</title>

				<link
					rel='canonical'
					href={`https://www.xlookpro.com/boss/admin/dashboard`}
				/>
			</Helmet>
			<div className='grid-container'>
				<div>
					<AdminNavbar
						fromPage='AdminDasboard'
						AdminMenuStatus={AdminMenuStatus}
						setAdminMenuStatus={setAdminMenuStatus}
						collapsed={collapsed}
						setCollapsed={setCollapsed}
					/>
				</div>
				{loading ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "50vh", // adjust as per your requirement
						}}
					>
						<Spin size='large' tip='Loading...' />
					</div>
				) : (
					<div className='mt-3 col-md-11 mx-auto'>
						<div className='row'>
							<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
								<div className='card' style={{ background: "#50cd89" }}>
									<div className='card-body'>
										<h5 style={{ fontWeight: "bolder", color: "white" }}>
											Registered Stores
										</h5>
										<CountUp
											style={{ color: "white" }}
											duration={2}
											delay={1}
											end={ownerAccounts.length}
											separator=','
										/>
									</div>
								</div>
							</div>

							<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
								<div className='card' style={{ background: "#f1416c" }}>
									<div className='card-body'>
										<h5 style={{ fontWeight: "bolder", color: "white" }}>
											Finished Settings
										</h5>
										<CountUp
											style={{ color: "white" }}
											duration={2}
											delay={1}
											end={storeProperties.length}
											separator=','
										/>
									</div>
								</div>
							</div>

							<div className='col-xl-4 col-lg-6 col-md-11 col-sm-11 text-center mx-auto my-2'>
								<div className='card' style={{ background: "#009ef7" }}>
									<div className='card-body'>
										<h5 style={{ fontWeight: "bolder", color: "white" }}>
											Pending Approval
										</h5>
										<CountUp
											style={{ color: "white" }}
											duration={2}
											delay={1}
											end={storesPendingApproval.length}
											separator=','
										/>
									</div>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-md-12 mx-auto'>
								<div
									className='mt-5'
									style={{
										maxHeight: "1200px",
										overflow: "auto",
									}}
								>
									<h3 style={{ fontWeight: "bolder" }}>
										Registered Owners ({clickedFilter}{" "}
										<span style={{ fontSize: "1.3rem", color: "darkred" }}>
											"{filteredData && filteredData.length} ACCOUNTS"
										</span>{" "}
										)
									</h3>
									<div className='text-center col-md-5 mx-auto'>
										<label>
											{" "}
											<strong>Search</strong>{" "}
										</label>
										<br />
										<input
											className='form-control'
											type='text'
											value={searchQuery}
											onChange={(e) => {
												setClickedFilter("All");
												setSearchQuery(e.target.value);
											}}
											placeholder='Search by agent or owner name or phone or governorate'
											style={{ marginBottom: "10px" }}
										/>

										<div className='mb-4'>
											<button
												className='btn btn-success mr-2 w-25'
												onClick={() => {
													setClickedFilter("All");
												}}
											>
												ALL
											</button>
											<button
												className='btn btn-danger'
												onClick={() => {
													setClickedFilter("NOT LIVE ACCOUNTS");
												}}
											>
												NOT LIVE ACCOUNTS
											</button>
											<button
												className='btn btn-info ml-2'
												onClick={() => {
													setClickedFilter("UN-ADDED SETTINGS");
												}}
											>
												UN-ADDED SETTINGS
											</button>
										</div>
									</div>
									<table
										className='table table-bordered table-md-responsive table-hover table-striped'
										style={{ fontSize: "0.75rem" }}
									>
										<thead
										// className='thead-light'
										// style={{border: "2px black solid"}}
										>
											<tr>
												<th scope='col'>#</th>
												<th scope='col'>Owner Name</th>
												<th scope='col'>Phone</th>
												<th scope='col'>Governorate</th>
												<th scope='col'>District</th>
												<th scope='col'>Address</th>
												<th scope='col'>Email</th>
												<th scope='col'>Salon Name</th>
												<th scope='col'>Agent</th>
												<th scope='col'>Registered</th>
												<th scope='col'>Settings?</th>
												<th scope='col'>Active?</th>
												<th
													scope='col'
													style={{ background: "#164216", color: "white" }}
												>
													Update?
												</th>
											</tr>
										</thead>

										<tbody>
											{filteredData &&
												filteredData.map((o, i) => {
													// const now = new Date();
													// const endDate = new Date(o.createdAt);
													// const diffTime = Math.abs(endDate - now);
													// const diffDays = Math.ceil(
													// 	diffTime / (1000 * 60 * 60 * 24)
													// );

													// const remainingDays = 30 - diffDays;

													return (
														<tr key={i}>
															<td>{i + 1}</td>
															<td>{o.name}</td>
															<td>{o.phone}</td>
															<td style={{ textTransform: "capitalize" }}>
																{o.storeGovernorate}
															</td>
															<td style={{ textTransform: "capitalize" }}>
																{o.storeDistrict}
															</td>
															<td>{o.storeAddress}</td>
															<td>{o.email}</td>
															<td>
																{storeProperties &&
																storeProperties
																	.map(
																		(iii) => iii.belongsTo && iii.belongsTo._id
																	)
																	.indexOf(o._id) !== -1 &&
																storeProperties[
																	storeProperties &&
																		storeProperties
																			.map(
																				(iii) =>
																					iii.belongsTo && iii.belongsTo._id
																			)
																			.indexOf(o._id)
																].addStoreName ? (
																	<span>
																		{
																			storeProperties[
																				storeProperties
																					.map(
																						(iii) =>
																							iii.belongsTo && iii.belongsTo._id
																					)
																					.indexOf(o._id)
																			].addStoreName
																		}
																	</span>
																) : (
																	o.storeName
																)}
															</td>
															<td>{o.agent && o.agent.name}</td>
															<td>
																{moment(o.createdAt).format("DD/MM/YYYY")}
															</td>
															<td
																style={{
																	background:
																		storeProperties &&
																		storeProperties
																			.map(
																				(iii) =>
																					iii.belongsTo && iii.belongsTo._id
																			)
																			.indexOf(o._id) === -1
																			? "red"
																			: "darkgreen",
																	color:
																		storeProperties &&
																		storeProperties
																			.map(
																				(iii) =>
																					iii.belongsTo && iii.belongsTo._id
																			)
																			.indexOf(o._id) === -1
																			? "white"
																			: "white",
																}}
															>
																{storeProperties &&
																storeProperties
																	.map(
																		(iii) => iii.belongsTo && iii.belongsTo._id
																	)
																	.indexOf(o._id) === -1
																	? "NO"
																	: "YES"}
															</td>
															<td
																style={{
																	background:
																		storeProperties &&
																		storeProperties
																			.map(
																				(iii) =>
																					iii.belongsTo && iii.belongsTo._id
																			)
																			.indexOf(o._id) !== -1 &&
																		storeProperties[
																			storeProperties &&
																				storeProperties
																					.map(
																						(iii) =>
																							iii.belongsTo && iii.belongsTo._id
																					)
																					.indexOf(o._id)
																		].activeStore === true
																			? "darkgreen"
																			: "red",
																	color:
																		storeProperties &&
																		storeProperties
																			.map(
																				(iii) =>
																					iii.belongsTo && iii.belongsTo._id
																			)
																			.indexOf(o._id) !== -1 &&
																		storeProperties[
																			storeProperties &&
																				storeProperties
																					.map(
																						(iii) =>
																							iii.belongsTo && iii.belongsTo._id
																					)
																					.indexOf(o._id)
																		].activeStore === true
																			? "white"
																			: "white",
																}}
															>
																{storeProperties &&
																storeProperties
																	.map(
																		(iii) => iii.belongsTo && iii.belongsTo._id
																	)
																	.indexOf(o._id) !== -1 &&
																storeProperties[
																	storeProperties &&
																		storeProperties
																			.map(
																				(iii) =>
																					iii.belongsTo && iii.belongsTo._id
																			)
																			.indexOf(o._id)
																].activeStore === true
																	? "YES"
																	: "NO"}
															</td>
															<td
																style={{
																	fontWeight: "bolder",
																	backgroundColor: "black",
																	color: "white",
																}}
															>
																<Link
																	style={{
																		color: "white",
																		textDecoration: "underline",
																	}}
																	to={`#`}
																	onClick={() => {
																		window.location.href = `/boss/store/admin/dashboard/${o._id}`;
																	}}
																>
																	{" "}
																	<strong>UPDATE ACCOUNT</strong>{" "}
																</Link>
															</td>
														</tr>
													);
												})}
										</tbody>
									</table>
								</div>
							</div>

							{/* <div className='col-md-11 mx-auto'>
					<div
						className='mt-5'
						style={{
							maxHeight: "800px",
							overflow: "auto",
						}}
					>
						<h3 style={{ fontWeight: "bolder" }}>Stores Added Settings</h3>
						<table
							className='table table-bordered table-md-responsive table-hover table-striped'
							style={{ fontSize: "0.75rem" }}
						>
							<thead
							// className='thead-light'
							// style={{border: "2px black solid"}}
							>
								<tr>
									<th scope='col'>Name</th>
									<th scope='col'>Phone</th>
									<th scope='col'>Governorate</th>
									<th scope='col'>Store Name</th>
									<th scope='col'>Address</th>
								</tr>
							</thead>

							<tbody>
								{storeProperties &&
									storeProperties.map((o, i) => {
										return (
											<tr key={i}>
												<td>{o.belongsTo && o.belongsTo.name}</td>
												<td>{o.belongsTo && o.belongsTo.phone}</td>
												<td style={{ textTransform: "capitalize" }}>
													{o.belongsTo && o.belongsTo.storeGovernorate}
												</td>
												<td>{o.addStoreName}</td>
												<td>{o.belongsTo && o.belongsTo.storeAddress}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</div> */}
						</div>
					</div>
				)}
			</div>
		</BossDashboardWrapper>
	);
};

export default BossDashboard;

const BossDashboardWrapper = styled.div`
	min-height: 1200px;
	overflow: auto;

	.grid-container {
		display: grid;
		grid-template-columns: 11% 92%;
	}

	.container-fluid {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.card-body {
		font-weight: bolder;
	}

	.card-body span {
		font-size: 1.5rem;
	}

	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: 2% 98%;
		}

		a {
			font-size: 13px !important;
			text-align: center;
		}

		.container-fluid > div {
			text-align: center;
			margin-left: 0px !important;
		}

		.container-fluid {
			margin-left: 0px !important;
			text-align: center;
		}

		.apexcharts-toolbar {
			display: none !important;
		}
	}
`;
