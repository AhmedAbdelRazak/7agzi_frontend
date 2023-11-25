import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "antd";

const TableViewStore = ({ orders, setSelectedDate, selectedDate }) => {
	const [q, setQ] = useState("");

	function search(orders) {
		return orders.filter((row) => {
			var datesYaba = new Date(row.scheduledDate).toLocaleDateString();
			return (
				row.employees[0].employeeName.toLowerCase().indexOf(q) > -1 ||
				row.phone.toLowerCase().indexOf(q) > -1 ||
				datesYaba.toString().toLowerCase().indexOf(q) > -1 ||
				row._id.substring(0, 10).toString().toLowerCase().indexOf(q) > -1 ||
				row.scheduledByUserName.toString().toLowerCase().indexOf(q) > -1 ||
				row.scheduledByUserEmail.toString().toLowerCase().indexOf(q) > -1 ||
				row.status.toString().toLowerCase().indexOf(q) > -1 ||
				row.applyPoints.toString().toLowerCase().indexOf(q) > -1 ||
				row.transaction_id.toString().toLowerCase().indexOf(q) > -1 ||
				// row.BookedFrom.toString().toLowerCase().indexOf(q) > -1 ||
				row.service.toString().toLowerCase().indexOf(q) > -1 ||
				row.BookedFrom.toString().toLowerCase().indexOf(q) > -1
			);
		});
	}

	useEffect(() => {
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("PetType");
		localStorage.removeItem("PetSize");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
		localStorage.removeItem("chosenStylistUpdate");
		// eslint-disable-next-line
	}, []);

	const ordersFiltered =
		orders &&
		orders.filter((i) =>
			moment(i.scheduledDate, "MM/DD/YYYY").isSame(
				moment(selectedDate, "MM/DD/YYYY")
			)
		);

	const date = moment(selectedDate, "MM/DD/YYYY");

	const handleChangeDate = (date) => {
		if (date) {
			const formattedDate = moment(date).format("MM/DD/YYYY");
			setSelectedDate(formattedDate);
		} else {
			setSelectedDate(null);
		}
	};

	return (
		<TableViewStoreWrapper>
			<div className='row mx-1'>
				<div className='col-3'></div>
				<div className='col-6 text-center mx-auto'>
					<div className='mt-2'>
						<span
							onClick={() =>
								setSelectedDate(
									moment(selectedDate, "MM/DD/YYYY")
										.subtract(1, "days")
										.format("MM/DD/YYYY")
								)
							}
							style={{
								fontSize: "12px",
								marginRight: "3px",
								fontWeight: "bolder",
								background: "#214221",
								color: "white",
								padding: "1px 15px",
								cursor: "pointer",
							}}
						>
							Previous
						</span>
						<span
							onClick={() =>
								setSelectedDate(
									moment(selectedDate, "MM/DD/YYYY")
										.add(1, "days")
										.format("MM/DD/YYYY")
								)
							}
							style={{
								fontSize: "12px",
								marginRight: "5px",
								fontWeight: "bolder",
								background: "#214221",
								color: "white",
								padding: "1px 15px",
								cursor: "pointer",
							}}
						>
							Next
						</span>
					</div>
					<div className='my-4'>
						<label
							className='ml-3'
							style={{
								fontSize: "14px",
							}}
						>
							<strong>Choose Date</strong>
						</label>
						<DatePicker
							onChange={handleChangeDate}
							size='small'
							defaultValue={moment(selectedDate, "MM/DD/YYYY")}
							style={{ width: "95%" }}
							max
							showToday={true}
							// defaultValue={chosenDate || moment()}
							placeholder='Please Select A Date'
						/>
					</div>
				</div>
				<div className='col-3 text-center'>
					<div
						className='english'
						style={{ textAlign: "center", fontWeight: "bolder" }}
					>
						<div
							style={{
								fontSize: "2rem",
								textAlign: "center",
								fontWeight: "bolder",
							}}
						>
							<strong>
								{date.locale("en").format("D")} {/* Day */}
							</strong>
							<div
								style={{ fontSize: "15px", textAlign: "center", margin: "0px" }}
							>
								<strong>
									{date.locale("en").format("MMMM, YYYY")}{" "}
									{/* Month Name, Year */}
								</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=' mb-3 form-group mx-3 text-center'>
				<label
					className='mt-0 mx-1'
					style={{
						fontWeight: "bold",
						fontSize: "1.05rem",
						color: "white",
						borderRadius: "20px",
					}}
				>
					Search
				</label>
				<input
					className='p-2 mb-5 mt-2'
					type='text'
					value={q}
					onChange={(e) => setQ(e.target.value.toLowerCase())}
					placeholder='Seach by client phone, client name, stylist name'
					style={{ borderRadius: "20px", width: "100%" }}
				/>
			</div>
			{/* <div className='my-3'>{DownloadExcel()}</div> */}

			<div
				style={{
					maxHeight: "700px",
					overflow: "auto",
				}}
			>
				<table
					className='table table-md-responsive table-hover my-auto'
					style={{ fontSize: "0.75rem" }}
				>
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Client Name</th>
							<th>Client Phone</th>
							<th>Stylist</th>
							<th>Amount</th>
							<th>Booking Source </th>
							<th>Details</th>
						</tr>
					</thead>

					<tbody className='my-auto'>
						{search(q ? orders : ordersFiltered).map((s, i) => (
							<tr
								key={i}
								className={
									s.status === "Paid"
										? "green-back"
										: s.status === "Cancelled"
										? "red-back"
										: i % 2 === 0
										? "white-row"
										: "grey-row"
								}
							>
								<td>{i + 1}</td>
								<td>
									{new Date(s.scheduledDate).toLocaleDateString()}{" "}
									{s.scheduledTime}
								</td>
								<td>{s.scheduledByUserName}</td>
								<td>{s.phone}</td>
								<td>
									{s.employees.map((e, ii) => (
										<div
											key={ii}
											// className='text-center'
											style={{
												color:
													s.status === "Cancelled"
														? "white"
														: s.status.includes("Not Paid")
														? ""
														: s.status.includes("Paid")
														? "white"
														: "",
											}}
										>
											{e.employeeName}
										</div>
									))}
								</td>
								<td style={{ fontWeight: "bolder", fontSize: "10px" }}>
									${s.amount.toFixed(2)}
								</td>
								<td>{s.BookedFrom === "Store" ? "From Store" : "Online"}</td>
								<td>
									<Link
										onClick={() => {
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}
										to={`/store/single-appointment-details-store/${s._id}/${
											s && s.employees && s.employees[0] && s.employees[0]._id
										}`}
									>
										{" "}
										<strong>Details...</strong>
									</Link>
								</td>
							</tr>
						))}
						<tr className='grey-row'>
							<td>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "1" : ""}
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr className='white-row'>
							<td>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "2" : ""}
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr className='grey-row'>
							<td>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "3" : ""}
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr className='white-row'>
							<td>
								{!q && ordersFiltered && ordersFiltered.length === 0 ? "4" : ""}
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
				<div
					style={{
						fontSize: "1.4rem",
						fontWeight: "bolder",
						textAlign: "center",
						color: "white",
					}}
				>
					{!q && ordersFiltered && ordersFiltered.length === 0
						? "No Available Appointment For The Selected Date"
						: ""}
				</div>
			</div>
		</TableViewStoreWrapper>
	);
};

export default TableViewStore;

const TableViewStoreWrapper = styled.div`
	margin-right: 20px;
	margin-left: 20px;
	overflow-x: auto;
	background-color: grey;

	.white-row {
		background-color: #ececec;
		color: black;
	}

	.grey-row {
		background-color: white;
		color: black;
	}

	.green-back {
		background-color: green;
		color: white;
	}

	.red-back {
		background-color: red;
		color: white;
	}

	table {
		background-color: lightgrey;
	}

	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;
