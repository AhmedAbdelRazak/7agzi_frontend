import { DatePicker } from "antd";
import moment from "moment";
import styled from "styled-components";

const Adding2DaysClosed = ({
	daysStoreClosed,
	setDaysStoreClosed,
	datesStoreClosed,
	setDatesStoreClosed,
	alreadySetLoyaltyPointsManagement,
	query,
	setQuery,
	oneDateStoreOff,
	setOneDateStoreOff,
	setClickedMenu,
	activeOnlineBooking,
	setActiveOnlineBooking,
	setExtraData,
	extraData,
	salonGrade,
	setSalonGrade,
	workersGender,
	setWorkersGender,
}) => {
	const pushToAllDates = (e) => {
		e.preventDefault();
		console.log(
			new Date(oneDateStoreOff._d).toLocaleDateString(),
			"oneDateStoreOff"
		);
		setDatesStoreClosed([
			...datesStoreClosed,
			new Date(oneDateStoreOff._d).toLocaleDateString(),
		]);
		setOneDateStoreOff("");
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		}

		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	// console.log(daysStoreClosed.daysStoreClosed, "daysStore");

	const removeDay = (index) => {
		const newDatesStoreClosed = [...datesStoreClosed];
		newDatesStoreClosed.splice(index, 1);
		setDatesStoreClosed(newDatesStoreClosed);
	};

	return (
		<Adding2DaysClosedWrapper className='container'>
			<div className='mb-3'>
				<label className='mr-2' style={{ fontWeight: "bold" }}>
					Activate Online Booking (Self Service Online Booking)?
				</label>

				<label className='block'>
					<input
						type='checkbox'
						id='one'
						onChange={() => setActiveOnlineBooking(true)}
						value={activeOnlineBooking}
						className='my-3 mx-1'
						checked={activeOnlineBooking}
					/>
					Yes
				</label>
				<label className='block ml-3 '>
					<input
						type='checkbox'
						id='one'
						onChange={() => setActiveOnlineBooking(false)}
						value={activeOnlineBooking}
						className='my-3 mx-1'
						checked={!activeOnlineBooking}
					/>
					No
				</label>
			</div>
			<div className='w-100 mb-5'>
				<label>Store Closed on days:</label>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					<label htmlFor='one' className='block '>
						<input
							type='checkbox'
							id='one'
							onChange={handleQueryChange}
							value='Saturday'
							className='m-3'
							checked={daysStoreClosed.daysStoreClosed.indexOf("Saturday") > -1}
						/>
						Saturday
					</label>
					<label htmlFor='two' className='block'>
						<input
							type='checkbox'
							id='two'
							onChange={handleQueryChange}
							value='Sunday'
							className='m-3'
							checked={daysStoreClosed.daysStoreClosed.indexOf("Sunday") > -1}
						/>
						Sunday
					</label>
					<label htmlFor='three' className='block'>
						<input
							type='checkbox'
							id='three'
							onChange={handleQueryChange}
							value='Monday'
							className='m-3'
							checked={daysStoreClosed.daysStoreClosed.indexOf("Monday") > -1}
						/>
						Monday
					</label>
					<label htmlFor='four' className='block'>
						<input
							type='checkbox'
							id='four'
							onChange={handleQueryChange}
							value='Tuesday'
							className='m-3'
							checked={daysStoreClosed.daysStoreClosed.indexOf("Tuesday") > -1}
						/>
						Tuesday
					</label>
					<label htmlFor='five' className='block'>
						<input
							type='checkbox'
							id='five'
							onChange={handleQueryChange}
							value='Wednesday'
							className='m-3'
							checked={
								daysStoreClosed.daysStoreClosed.indexOf("Wednesday") > -1
							}
						/>
						Wednesday
					</label>
					<label htmlFor='six' className='block'>
						<input
							type='checkbox'
							id='six'
							onChange={handleQueryChange}
							value='Thursday'
							className='m-3'
							checked={daysStoreClosed.daysStoreClosed.indexOf("Thursday") > -1}
						/>
						Thursday
					</label>
					<label htmlFor='seven' className='block'>
						<input
							type='checkbox'
							id='seven'
							onChange={handleQueryChange}
							value='Friday'
							className='m-3'
							checked={daysStoreClosed.daysStoreClosed.indexOf("Friday") > -1}
						/>
						Friday
					</label>
				</div>
			</div>

			<div className='my-3'>
				<h4 style={{ fontWeight: "bolder" }}>General Data</h4>

				<div className='row'>
					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							Accept Cash?
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, cashPayment: true })
								}
								value={extraData.cashPayment}
								className='my-3 mx-1'
								checked={extraData.cashPayment}
							/>
							Yes
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, cashPayment: false })
								}
								value={extraData.cashPayment}
								className='my-3 mx-1'
								checked={!extraData.cashPayment}
							/>
							No
						</label>
					</div>

					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							Accept Cards?
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, visaPayment: true })
								}
								value={extraData.visaPayment}
								className='my-3 mx-1'
								checked={extraData.visaPayment}
							/>
							Yes
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, visaPayment: false })
								}
								value={extraData.visaPayment}
								className='my-3 mx-1'
								checked={!extraData.visaPayment}
							/>
							No
						</label>
					</div>

					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							Parking Lot?
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() => setExtraData({ ...extraData, parking: true })}
								value={extraData.parking}
								className='my-3 mx-1'
								checked={extraData.parking}
							/>
							Yes
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() => setExtraData({ ...extraData, parking: false })}
								value={extraData.parking}
								className='my-3 mx-1'
								checked={!extraData.parking}
							/>
							No
						</label>
					</div>

					<div className='mb-3 col-md-3'>
						<label className='mr-1' style={{ fontWeight: "bold" }}>
							Air Condition?
						</label>

						<label className='block'>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, airConditioned: true })
								}
								value={extraData.airConditioned}
								className='my-3 mx-1'
								checked={extraData.airConditioned}
							/>
							Yes
						</label>
						<label className='block ml-1 '>
							<input
								type='checkbox'
								id='one'
								onChange={() =>
									setExtraData({ ...extraData, airConditioned: false })
								}
								value={extraData.airConditioned}
								className='my-3 mx-1'
								checked={!extraData.airConditioned}
							/>
							No
						</label>
					</div>

					<div className='col-md-4 mx-auto'>
						<div className='form-group'>
							<label className='text-muted'>How Many Branches?</label>
							<input
								type='number'
								className='form-control'
								onChange={(e) =>
									setExtraData({ ...extraData, branchesCount: e.target.value })
								}
								value={extraData.branchesCount}
								placeholder='How Many Branches'
							/>
						</div>
					</div>

					<div className='col-md-4 mx-auto'>
						<div className='form-group'>
							<label className='text-muted'>How Many Employees?</label>
							<input
								type='number'
								className='form-control'
								onChange={(e) =>
									setExtraData({ ...extraData, stylistsCount: e.target.value })
								}
								value={extraData.stylistsCount}
								placeholder='Stylists Count'
							/>
						</div>
					</div>

					<div className='col-md-4 mx-auto'>
						<div className='form-group'>
							<label className='text-muted'>How Many Chairs?</label>
							<input
								type='number'
								className='form-control'
								onChange={(e) =>
									setExtraData({ ...extraData, chairsCount: e.target.value })
								}
								value={extraData.chairsCount}
								placeholder='Chairs Count'
							/>
						</div>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-6'>
						<div className='form-group mx-auto'>
							<label className='text-muted'>Please Grade The Salon</label>
							<select
								className='form-control'
								value={salonGrade}
								onChange={(e) => {
									setSalonGrade(e.target.value);
								}}
							>
								<option value=''>Please Select</option>
								<option value='a'>A</option>
								<option value='b'>B</option>
								<option value='c'>C</option>
							</select>
						</div>
					</div>

					<div className='col-md-6'>
						<div className='form-group  mx-auto'>
							<label className='text-muted'>
								Overall Employee Gender Status
							</label>
							<select
								className='form-control'
								value={workersGender}
								onChange={(e) => {
									setWorkersGender(e.target.value);
								}}
							>
								<option value=''>Please Select</option>
								<option value='men'>MEN ONLY ARE WORKING</option>
								<option value='women'>WOMEN ONLY ARE WORKING</option>
								<option value='mixed'>MIXED (WOMEN & MEN)</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div className='form-group'>
				<label className='text-muted'>
					Add dates your store is closed (e.g. Holidays, labor day, etc...)
				</label>
				<br />
				<DatePicker
					className='inputFieldsFirstAvail'
					onChange={(date) =>
						setOneDateStoreOff(date || new Date(date._d).toLocaleDateString())
					}
					disabledDate={disabledDate}
					max
					showToday={true}
					// defaultValue={moment()}
					placeholder='Please pick the desired store closing date'
				/>
				<div className='ml-5 mb-3'>
					<button
						onClick={pushToAllDates}
						className='btn btn-outline-info mb-3  ml-5'
					>
						Add Date
					</button>
				</div>
			</div>

			<div>
				{datesStoreClosed && datesStoreClosed.length > 0 ? (
					<strong>Added Dates:</strong>
				) : (
					<strong>No Dates Added</strong>
				)}
				<ul>
					{datesStoreClosed &&
						datesStoreClosed.length > 0 &&
						datesStoreClosed.map((i, e) => (
							<li
								className='mb-1'
								style={{
									listStyle: "none",
									marginLeft: "20px",
									fontSize: "12px",
								}}
								key={e}
							>
								{new Date(i).toDateString()}
								<span
									className='ml-2 removeButton'
									onClick={() => removeDay(e)}
									style={{ cursor: "pointer", fontWeight: "bolder" }}
								>
									X
								</span>
							</li>
						))}
				</ul>
			</div>

			<div className='ml-2 mb-3 col-md-8 mx-auto'>
				<button
					onClick={() => setClickedMenu("Awards")}
					className='btn btn-primary btn-block mb-3 '
				>
					Add Awards
				</button>
			</div>
		</Adding2DaysClosedWrapper>
	);
};

export default Adding2DaysClosed;

const Adding2DaysClosedWrapper = styled.div`
	overflow: hidden;
	margin-top: 50px;
	background-color: white;
	padding: 20px;
	border-radius: 10px;
	width: 1200px !important;

	.inputFieldsFirstAvail {
		padding-top: 9px;
		padding-bottom: 9px;
		border: #cfcfcf solid 1px;
		border-radius: 4px !important;
		width: 50%;
		font-size: 0.8rem;
		/* box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2); */
		margin-bottom: 15px;
	}

	.removeButton {
		border: 1px solid darkgrey;
		border-radius: 10px;
	}

	@media (max-width: 1000px) {
		width: 100% !important;
	}
`;
