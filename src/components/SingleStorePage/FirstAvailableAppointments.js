/** @format */

import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "antd";
import AddedServices from "./AddedServices";
import styled from "styled-components";
import { GenerallistScheduledOrders } from "../../apiCore";

const FirstAvailableAppointments = ({
	onlineStoreName,
	allEmployees,
	AllServices,
	contact,
	allCustomerType,
	chosenCustomerType,
	chosenDate,
	setChosenDate,
	setChosenService,
	chosenService,
	handleChosenCustomerType,
	fromLocalStore,
	language,
	clickedMenu,
}) => {
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [HistOrders, setHistOrders] = useState([]);

	const checkLength = (i) => {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	};

	const today = new Date();
	// eslint-disable-next-line
	var todayDate =
		today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
	var h = today.getHours();
	var m = today.getMinutes();
	h = checkLength(h);
	m = checkLength(m);
	// eslint-disable-next-line
	const timeNow = h + ":" + m;

	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	var d = new Date(chosenDate);
	var chosenDateName = days[d.getDay()];

	// console.log(chosenDateName, "chosenDateName");

	const loadOrders = () => {
		setLoading(true);
		GenerallistScheduledOrders(fromLocalStore.storeId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistOrders(
					data.filter(
						(i) =>
							new Date(i.scheduledDate).toLocaleDateString() ===
								new Date(chosenDate).toLocaleDateString() &&
							i.status !== "Cancelled"
					)
				);
				setLoading(false);
			}
		});
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	useEffect(() => {
		setChosenDate(new Date().toLocaleDateString());
		// eslint-disable-next-line
	}, [clickedMenu]);

	//
	//Getting Unique Services Values

	const indexOfService =
		chosenService &&
		AllServices.map((service) => service.serviceName.toLowerCase()).indexOf(
			chosenService.toLowerCase()
		);
	// eslint-disable-next-line
	var chosenServiceDetails = AllServices && AllServices[indexOfService];

	// console.log(chosenServiceDetails);

	var ServiceTime_Duration =
		AllServices &&
		AllServices[0] &&
		AllServices.filter((i) => i.serviceName === chosenService) &&
		AllServices.filter((i) => i.serviceName === chosenService)[0];

	// End Of Getting Unique Services Values
	//

	//Getting Unique Occupied/Booked Times For All Employees

	var allBookedTimesInChosenDate =
		HistOrders &&
		HistOrders.map((i) => {
			const el3abatkollo = (periods, timing, lastPeriods) => {
				var finalAlreadyScheduledTimes = [];
				// eslint-disable-next-line
				var timeModified = new Date("1970-01-01" + " " + timing + ":00");
				timeModified = timeModified.setMinutes(
					timeModified.getMinutes() - lastPeriods * 15
				);
				// timeModified = new Date(
				// 	timeModified.setMinutes(timeModified.getMinutes() - periods * 15),
				// );
				var helper = new Date();
				for (let i = 0; i <= periods + lastPeriods; i++) {
					finalAlreadyScheduledTimes = [
						...finalAlreadyScheduledTimes,
						{
							scheduledTime: new Date(timeModified),

							serviceDuration: 0,
						},
					];

					helper = new Date(
						finalAlreadyScheduledTimes[
							finalAlreadyScheduledTimes.length - 1
						].scheduledTime
					);
					timeModified = helper.setMinutes(helper.getMinutes() + 15);
				}
				return finalAlreadyScheduledTimes.map((addedTimes) =>
					new Date(addedTimes.scheduledTime).toLocaleTimeString()
				);
			};
			var scheduledTimeModified1 = el3abatkollo(
				i.serviceDuration === undefined ? 0 : i.serviceDuration / 15 - 1,
				i.scheduledTime,
				ServiceTime_Duration && ServiceTime_Duration.serviceTime
					? ServiceTime_Duration.serviceTime / 15 - 1
					: 0
			);

			var scheduledTimeModified2 = [].concat.apply([], scheduledTimeModified1);

			var scheduledTimeModified3 =
				scheduledTimeModified2.concat(i.scheduledTime) &&
				scheduledTimeModified2.concat(i.scheduledTime).map(
					(i) =>
						// eslint-disable-next-line
						checkLength(
							// eslint-disable-next-line
							new Date("1970-01-01" + " " + i).getHours()
						).toString() +
						":" +
						// eslint-disable-next-line
						checkLength(
							// eslint-disable-next-line
							new Date("1970-01-01" + " " + i).getMinutes()
						).toString()
				);

			var allAlreadyScheduledHoursFinal = [];
			scheduledTimeModified3.map((time) => {
				if (allAlreadyScheduledHoursFinal.indexOf(time) === -1) {
					return allAlreadyScheduledHoursFinal.push(time);
				}
				return allAlreadyScheduledHoursFinal.sort();
			});

			return {
				employeeId: i.employeeId,
				scheduledDate: new Date(i.scheduledDate).toLocaleDateString(),
				scheduledTime: i.scheduledTime,
				serviceDuration: i.serviceDuration,
				scheduledTimeModifiedV1: allAlreadyScheduledHoursFinal,
			};
		});

	//End ofGetting Unique Occupied/Booked Times For All Employees
	//

	//
	//Getting Unique Working Times For All Employees vs Their Occupied Times
	const retrieveHoursNotInPast = (arrayOfWorkingHours) => {
		if (
			chosenDate &&
			new Date(chosenDate).toLocaleDateString() ===
				new Date(todayDate).toLocaleDateString()
		) {
			return (
				arrayOfWorkingHours &&
				arrayOfWorkingHours.filter((i) => i >= timeNow) &&
				arrayOfWorkingHours.filter((i) => i >= timeNow).sort()
			);
		} else {
			return arrayOfWorkingHours && arrayOfWorkingHours.sort();
		}
	};
	var gettingEmployeeIdFromHistOrders =
		allBookedTimesInChosenDate &&
		allBookedTimesInChosenDate.map((iii) => iii.employeeId);

	var allWorkingHoursFromEmployeesAndOccupiedTimes =
		allEmployees &&
		allEmployees.map((i) => {
			var scheduledTimeFromHistOrders =
				allBookedTimesInChosenDate &&
				gettingEmployeeIdFromHistOrders &&
				gettingEmployeeIdFromHistOrders.indexOf(i._id) === -1
					? []
					: allBookedTimesInChosenDate &&
					  allBookedTimesInChosenDate.filter(
							(iiii) => iiii.employeeId === i._id
					  ) &&
					  allBookedTimesInChosenDate
							.filter((iiii) => iiii.employeeId === i._id)
							.map((final) => final.scheduledTimeModifiedV1);

			var scheduledTimeModified2 = [].concat.apply(
				[],
				scheduledTimeFromHistOrders
			);
			return {
				workingHours: retrieveHoursNotInPast(i.workingHours),
				employeeName: i.employeeName,
				employeeId: i._id,
				occupiedTimes:
					allBookedTimesInChosenDate &&
					gettingEmployeeIdFromHistOrders &&
					gettingEmployeeIdFromHistOrders.indexOf(i._id) === -1
						? []
						: allBookedTimesInChosenDate &&
						  allBookedTimesInChosenDate.filter(
								(iiii) => iiii.employeeId === i._id
						  ) &&
						  allBookedTimesInChosenDate
								.filter((iiii) => iiii.employeeId === i._id)
								.map((final) => final.scheduledTime),

				serviceDuration:
					allBookedTimesInChosenDate &&
					gettingEmployeeIdFromHistOrders &&
					gettingEmployeeIdFromHistOrders.indexOf(i._id) === -1
						? []
						: allBookedTimesInChosenDate &&
						  allBookedTimesInChosenDate.filter(
								(iiii) => iiii.employeeId === i._id
						  ) &&
						  allBookedTimesInChosenDate
								.filter((iiii) => iiii.employeeId === i._id)
								.map((final) => final.serviceDuration),
				scheduledTimeModified: scheduledTimeModified2,
			};
		});

	//End of Getting Unique Working Times For All Employees
	//
	//

	//
	// Getting Free Times For Each Employee
	var freeTimesForEachEmployee =
		allWorkingHoursFromEmployeesAndOccupiedTimes &&
		allWorkingHoursFromEmployeesAndOccupiedTimes.map((ii) => {
			const availableHoursModified = () => {
				if (ii.workingHours.length > 0) {
					return ii.workingHours
						.map((i) => {
							if (ii.scheduledTimeModified.indexOf(i) < 0) {
								return i;
							} else {
								return null;
							}
						})
						.filter((ii2) => ii2 !== null);
				}
			};
			return {
				employeeId: ii.employeeId,
				employeeName: ii.employeeName,
				scheduledTimeModified: ii.scheduledTimeModified,
				workingHours: ii.workingHours,
				availableHoursFinal: availableHoursModified(),
			};
		});

	//End Of Getting Free Times For Each Employee
	//

	//filtering to only get Employees with free Time
	var freeTimesForEachEmployeeModified =
		freeTimesForEachEmployee &&
		freeTimesForEachEmployee.filter((i) => i.availableHoursFinal !== undefined);
	var freeTimesForEachEmployeeModifiedV2 =
		freeTimesForEachEmployee &&
		freeTimesForEachEmployeeModified &&
		freeTimesForEachEmployeeModified.filter(
			(i) => i.availableHoursFinal && i.availableHoursFinal.length > 0
		);

	var retrieveAllAvailableTimesWithNoDuplicatesThenSort =
		freeTimesForEachEmployee &&
			freeTimesForEachEmployeeModifiedV2 &&
			freeTimesForEachEmployeeModified &&
			freeTimesForEachEmployeeModifiedV2.map((i) => i.availableHoursFinal) && [
				...new Set(
					[].concat.apply(
						[],
						freeTimesForEachEmployeeModifiedV2
							.map((i) => i.availableHoursFinal)
							.sort()
					)
				),
			];
	var finalStep_FirstAvailableEmployee =
		retrieveAllAvailableTimesWithNoDuplicatesThenSort &&
		retrieveAllAvailableTimesWithNoDuplicatesThenSort[0] &&
		freeTimesForEachEmployeeModifiedV2.filter(
			(i) =>
				i.availableHoursFinal.indexOf(
					retrieveAllAvailableTimesWithNoDuplicatesThenSort[0]
				) !== -1
		);

	useEffect(() => {
		loadOrders();
		// eslint-disable-next-line
	}, [clickedMenu]);

	const handleChosenService = (event) => {
		setChosenService(event.target.value);
	};

	const addItem = (item = [], next = (f) => f) => {
		let barber = [];
		barber = item.employeeId;

		localStorage.setItem("barber", JSON.stringify(barber));
		next();
	};

	const AddEmployee = () => {
		// console.log('added');
		var employee =
			finalStep_FirstAvailableEmployee && finalStep_FirstAvailableEmployee[0];
		addItem(employee);
		window.scrollTo(0, 0);
	};

	const employeeNameModified =
		finalStep_FirstAvailableEmployee &&
		finalStep_FirstAvailableEmployee[0] &&
		finalStep_FirstAvailableEmployee[0].employeeName.split(" ").join("-");

	const employeeId =
		finalStep_FirstAvailableEmployee &&
		finalStep_FirstAvailableEmployee[0] &&
		finalStep_FirstAvailableEmployee[0].employeeId.split(" ").join("-");

	const pickedService = () => {
		var theServiceIndex =
			AllServices &&
			AllServices.map((i) => i.serviceName.toLowerCase()) &&
			AllServices.map((i) => i.serviceName.toLowerCase()).indexOf(
				chosenService.toLowerCase()
			);
		var pickedServiceDetails = AllServices && AllServices[theServiceIndex];

		return pickedServiceDetails;
	};

	var storeClosed_NotClosed =
		onlineStoreName &&
		onlineStoreName.daysStoreClosed &&
		onlineStoreName.daysStoreClosed.length > 0 &&
		onlineStoreName.daysStoreClosed.indexOf(chosenDateName) > -1;

	return (
		<FirstAvailableAppointmentsWrapper
			dir={language === "Arabic" ? "rtl" : "ltr"}
		>
			<div className='contentWrapper'>
				<div className='mt-3 firstAvailableApp text-center'>
					{language === "Arabic" ? (
						<span>
							{" "}
							تحقق من أول موعد متاح:{" "}
							{new Date(chosenDate).toLocaleDateString("ar-EG")}{" "}
						</span>
					) : (
						<span>
							Check First Available Appointment on:{" "}
							{new Date(chosenDate).toDateString()}{" "}
						</span>
					)}
				</div>{" "}
				<div className='horizLine col-6 col-lg-2 col-md-3  mx-auto'></div>
				<div className='text-center mt-3'>
					<div className='row'>
						<div className='col-md-6'>
							{language === "Arabic" ? (
								<label className='ml-4 chooseDateServiceFirstAvailArabic'>
									اختر تاريخ
								</label>
							) : (
								<label className='mr-4 chooseDateServiceFirstAvail'>
									Choose a Date
								</label>
							)}

							<DatePicker
								className='inputFieldsFirstAvail'
								onChange={(date) =>
									setChosenDate(date || new Date(date._d).toLocaleDateString())
								}
								disabledDate={disabledDate}
								max
								showToday={true}
								defaultValue={chosenDate || moment()}
								placeholder='Please pick the desired schedule date'
							/>
							<br />
							{language === "Arabic" ? (
								<label className='ml-4 mt-3 chooseDateServiceFirstAvailArabic'>
									خدمة لـ
								</label>
							) : (
								<label className='mr-5 mt-3 chooseDateServiceFirstAvail'>
									Service For
								</label>
							)}

							<select
								onChange={handleChosenCustomerType}
								placeholder='Please Select'
								style={{ textTransform: "capitalize" }}
								className='inputFieldsFirstAvail ml-1'
							>
								{chosenCustomerType &&
								chosenCustomerType !== "Please Select" ? (
									<option className='items text-muted'>
										{chosenCustomerType}
									</option>
								) : (
									<option className='items text-muted'>
										{language === "Arabic"
											? "الرجاء الاختيار"
											: "Please Select"}
									</option>
								)}
								{HistOrders &&
									allCustomerType &&
									allCustomerType.map((s, i) => (
										<option key={i} value={s} className='items'>
											{s}
										</option>
									))}
							</select>
							<br />

							{chosenCustomerType ? (
								<Fragment>
									{language === "Arabic" ? (
										<label className='ml-2 chooseDateServiceFirstAvailArabic'>
											اختر خدمة
										</label>
									) : (
										<label className='mr-2 chooseDateServiceFirstAvail'>
											Select a Service
										</label>
									)}

									<select
										onChange={handleChosenService}
										placeholder='Select a Service'
										style={{ textTransform: "capitalize" }}
										className='inputFieldsFirstAvail'
									>
										{chosenService && chosenService !== "Select a Service" ? (
											<option className='items text-muted'>
												{chosenService}
											</option>
										) : (
											<option className='items text-muted'>
												Select a Service
											</option>
										)}
										{HistOrders &&
											AllServices &&
											AllServices.filter(
												(ss) => ss.serviceType === "package service"
											) &&
											AllServices.filter(
												(ss) => ss.serviceType === "package service"
											).map((s, i) => (
												<option key={i} value={s.serviceName} className='items'>
													{s.serviceName} ({s.servicePrice} EGP)
												</option>
											))}
									</select>
									{chosenService && pickedService() && (
										<ul className=' col-md-11  mx-auto AnimationCustom'>
											<strong style={{ color: "black" }}>
												Service Description:
											</strong>
											{pickedService().serviceDescription.map((d, i) => (
												<li className='listOfServiceDescription' key={i}>
													{d}
												</li>
											))}
										</ul>
									)}
								</Fragment>
							) : null}
						</div>
						{onlineStoreName && onlineStoreName.activeOnlineBooking ? (
							<div className='col-md-6'>
								{chosenService && !loading ? (
									<React.Fragment>
										{onlineStoreName &&
										onlineStoreName.daysStoreClosed &&
										onlineStoreName.daysStoreClosed.length > 0 &&
										storeClosed_NotClosed === true ? (
											<div className='my-3 noAppointFirstAvail'>
												{language === "Arabic"
													? `صالون الشعر مغلق في التاريخ المحدد ${new Date(
															chosenDate
													  ).toLocaleDateString(
															"ar-EG"
													  )}. الرجاء التحقق من تاريخ آخر.`
													: `Hair Salon is closed on the selected date ${new Date(
															chosenDate
													  ).toDateString()}. Please check another date.`}
											</div>
										) : (
											<Fragment>
												{onlineStoreName &&
												onlineStoreName.datesStoreClosed &&
												onlineStoreName.datesStoreClosed.length > 0 &&
												onlineStoreName.datesStoreClosed.indexOf(
													new Date(
														chosenDate._d || chosenDate
													).toLocaleDateString()
												) > -1 ? (
													<div className='my-3 noAppointFirstAvail'>
														{language === "Arabic"
															? `لا توجد مواعيد متاحة في ${new Date(
																	chosenDate
															  ).toLocaleDateString(
																	"ar-EG"
															  )}. <br /> الرجاء التحقق من تاريخ آخر.`
															: `No Appointments available on ${new Date(
																	chosenDate
															  ).toDateString()}. <br /> Please check another date.`}
													</div>
												) : (
													<React.Fragment>
														{(finalStep_FirstAvailableEmployee &&
															finalStep_FirstAvailableEmployee[0] &&
															finalStep_FirstAvailableEmployee.length === 0) ||
														finalStep_FirstAvailableEmployee === undefined ? (
															<div className='my-3 noAppointFirstAvail'>
																No Appointments available on{" "}
																{new Date(chosenDate).toDateString()}. <br />{" "}
																Please check another date.
															</div>
														) : (
															<div style={{ color: "white" }}>
																{language === "Arabic" ? (
																	<div>
																		الموعد الأول المتاح هو مع
																		<strong
																			style={{
																				color: "wheat",
																				fontWeight: "bolder",
																			}}
																		>
																			{finalStep_FirstAvailableEmployee &&
																				finalStep_FirstAvailableEmployee[0] &&
																				finalStep_FirstAvailableEmployee[0]
																					.employeeName}
																		</strong>
																		<br />
																		في
																		<strong style={{ color: "wheat" }}>
																			{finalStep_FirstAvailableEmployee &&
																				finalStep_FirstAvailableEmployee[0] &&
																				finalStep_FirstAvailableEmployee[0]
																					.availableHoursFinal &&
																				finalStep_FirstAvailableEmployee[0]
																					.availableHoursFinal[0]}
																		</strong>
																		في
																		<strong style={{ color: "wheat" }}>
																			{new Date(chosenDate).toLocaleDateString(
																				"ar-EG"
																			)}
																		</strong>
																		<div
																			style={{
																				fontSize: "15px",
																				fontWeight: "bold",
																			}}
																		>
																			تحقق من
																			<Link
																				style={{
																					color: "wheat",
																					textDecoration: "underline",
																				}}
																				to={`/employee/${employeeNameModified}/${employeeId}${employeeId}${employeeId}`}
																			>
																				{finalStep_FirstAvailableEmployee &&
																					finalStep_FirstAvailableEmployee[0] &&
																					finalStep_FirstAvailableEmployee[0]
																						.employeeName}
																			</Link>
																			ملف الشخصي.
																		</div>
																		<div
																			onClick={AddEmployee}
																			style={{
																				fontWeight: "bold",
																				fontSize: "1.2rem",
																				marginBottom: "10px",
																				marginTop: "10px",
																				textShadow: "1px 2px 4px",
																			}}
																		>
																			<Link
																				className='btn btn-info'
																				to='/schedule-an-appointment'
																				onClick={() => {
																					localStorage.setItem(
																						"pickedServiceFirstAvailable",
																						JSON.stringify(pickedService())
																					);
																					localStorage.setItem(
																						"CustomerType",
																						JSON.stringify(chosenCustomerType)
																					);
																					localStorage.setItem(
																						"chosenDateFromFirstAvailable",
																						JSON.stringify(chosenDate)
																					);
																					window.scrollTo(0, 0);
																				}}
																			>
																				جدول الآن...
																			</Link>
																		</div>
																	</div>
																) : (
																	<div>
																		The First Available Appointment is with
																		<strong
																			style={{
																				color: "wheat",
																				fontWeight: "bolder",
																			}}
																		>
																			{finalStep_FirstAvailableEmployee &&
																				finalStep_FirstAvailableEmployee[0] &&
																				finalStep_FirstAvailableEmployee[0]
																					.employeeName}
																		</strong>
																		<br />
																		at
																		<strong style={{ color: "wheat" }}>
																			{finalStep_FirstAvailableEmployee &&
																				finalStep_FirstAvailableEmployee[0] &&
																				finalStep_FirstAvailableEmployee[0]
																					.availableHoursFinal &&
																				finalStep_FirstAvailableEmployee[0]
																					.availableHoursFinal[0]}
																		</strong>
																		on
																		<strong style={{ color: "wheat" }}>
																			{new Date(chosenDate).toDateString()}
																		</strong>
																		<div
																			style={{
																				fontSize: "15px",
																				fontWeight: "bold",
																			}}
																		>
																			Check
																			<Link
																				style={{
																					color: "wheat",
																					textDecoration: "underline",
																				}}
																				to={`/employee/${employeeNameModified}/${employeeId}${employeeId}${employeeId}`}
																			>
																				{finalStep_FirstAvailableEmployee &&
																					finalStep_FirstAvailableEmployee[0] &&
																					finalStep_FirstAvailableEmployee[0]
																						.employeeName}
																			</Link>
																			's Profile.
																		</div>
																		<div
																			onClick={AddEmployee}
																			style={{
																				fontWeight: "bold",
																				fontSize: "1.2rem",
																				marginBottom: "10px",
																				marginTop: "10px",
																				textShadow: "1px 2px 4px",
																			}}
																		>
																			<Link
																				className='btn btn-info'
																				to='/schedule-an-appointment'
																				onClick={() => {
																					localStorage.setItem(
																						"pickedServiceFirstAvailable",
																						JSON.stringify(pickedService())
																					);
																					localStorage.setItem(
																						"CustomerType",
																						JSON.stringify(chosenCustomerType)
																					);
																					localStorage.setItem(
																						"chosenDateFromFirstAvailable",
																						JSON.stringify(chosenDate)
																					);
																					window.scrollTo(0, 0);
																				}}
																			>
																				Schedule Now...
																			</Link>
																		</div>
																	</div>
																)}
															</div>
														)}
													</React.Fragment>
												)}
											</Fragment>
										)}
									</React.Fragment>
								) : (
									<React.Fragment>
										{language === "Arabic" ? (
											<div className='pleaseSelectAServFirstAvailArabic'>
												الرجاء اختيار خدمة للتحقق من أول موعد متاح
												<div className='my-3 disclaimerArabic'>
													إذا كان لديك الحاجة لجدولة أكثر من شخص، يرجى جدولة
													موعد منفصل لكل منهم. قد تتمكن من جدولة المواعيد مع
													مصففين مختلفين في آن واحد لإنهاء احتياجاتك في وقت أقل!
												</div>
											</div>
										) : (
											<div className='pleaseSelectAServFirstAvail'>
												Please Select A Service To Check The First Available
												Appointment
												<div className='my-3 disclaimer'>
													If you have the need to schedule for more than one
													person, please schedule a separate appointment for
													each. You may be able to schedule the appointments
													with different stylists all at once to finish your
													styling needs with less time!
												</div>
											</div>
										)}

										{chosenCustomerType ? (
											<div className='my-2' style={{ textAlign: "left" }}>
												<AddedServices
													chosenCustomerType={chosenCustomerType}
													ownerId={fromLocalStore.storeId}
												/>
											</div>
										) : null}
									</React.Fragment>
								)}
							</div>
						) : (
							<div className='col-md-6 noAppointFirstAvail'>
								<div>
									Please Call{" "}
									<Link
										style={{ textDecoration: "underline" }}
										className='ml-2 noAppointFirstAvail'
										to='#'
										onClick={() => window.open(`tel:+1${contact.phone}`)}
									>
										{contact && contact.phone}
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</FirstAvailableAppointmentsWrapper>
	);
};

export default FirstAvailableAppointments;

const FirstAvailableAppointmentsWrapper = styled.div`
	/* background-color: rgba(22, 25, 56, 0.85);
	 */
	background-color: rgba(0, 0, 0, 0.85);
	padding: 30px;
	border-radius: 20px 100px;
	z-index: 1000;

	.contentWrapper {
		position: relative;
	}

	@media (max-width: 1000px) {
		background-color: #4e0000;
	}
`;
