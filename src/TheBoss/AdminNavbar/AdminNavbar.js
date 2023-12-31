// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Redirect, Link } from "react-router-dom";
import {
	AreaChartOutlined,
	BankTwoTone,
	BarChartOutlined,
	// eslint-disable-next-line
	BranchesOutlined,
	// eslint-disable-next-line
	ContactsFilled,
	DollarCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	SettingOutlined,
	ShopOutlined,
	// eslint-disable-next-line
	ShoppingCartOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import LastAddedLogoImage from "./LastAddedLogoImage";

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	};
}

const items = [
	getItem(
		<div className='logoClass'></div>,
		"StoreLogo",
		<LastAddedLogoImage />
	),
	getItem(
		<div className='logoClass '></div>,
		"StoreLogo",
		<div
			className='logoClass no-background'
			style={{
				width: "100%",
			}}
		>
			<hr />
		</div>
	),
	getItem(
		<Link to='/boss/admin/dashboard'>Admin Dashboard</Link>,
		"sub1",
		<PieChartOutlined />
	),
	getItem(
		<Link to='/boss/admin/added-stores'>Added Stores</Link>,
		"sub2",
		<SettingOutlined />
	),
	getItem(
		<Link to='/boss/admin/pending-approval'>Pending Approval</Link>,
		"sub3",
		<ShopOutlined />
	),
	getItem(
		<Link to='/boss/admin/agent-management'>Agents Management</Link>,
		"sub4",
		<TeamOutlined />
	),

	getItem(
		<Link to='/boss/admin/business-partners-reports'>
			Business Partners Reports
		</Link>,
		"sub5",
		<AreaChartOutlined />
	),

	getItem(
		<Link to='/boss/admin/xlook-user'>Users Reports</Link>,
		"sub6",
		<BarChartOutlined />
	),

	getItem(
		<Link to='/boss/admin/xlook-coupons'>Coupon Management</Link>,
		"sub7",
		<PieChartOutlined />
	),
	getItem(
		<Link to='/boss/admin/affiliate-links'>Affiliate Program</Link>,
		"sub8",
		<PieChartOutlined />
	),

	getItem(
		<Link to='/boss/admin/xstore'> X Store Accounts</Link>,
		"sub11",
		<>
			{" "}
			<BankTwoTone />
		</>
	),

	getItem(
		<Link to='/boss/admin/store-billing'>Stores Billing</Link>,
		"sub10",
		<>
			<DollarCircleOutlined />
		</>
	),

	// getItem("Option 3", "4", <ContainerOutlined />),
];

const AdminNavbar = ({
	fromPage,
	setAdminMenuStatus,
	collapsed,
	setCollapsed,
}) => {
	const [clickedOn, setClickedOn] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
		setAdminMenuStatus(!collapsed);
	};

	return (
		<AdminNavbarWrapper
			show={collapsed}
			show2={clickedOn}
			style={{
				width: 285,
			}}
		>
			<Button
				type='primary'
				onClick={toggleCollapsed}
				style={{
					marginBottom: 8,
					textAlign: "center",
					marginLeft: 10,
					marginTop: 3,
				}}
			>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<Menu
				defaultSelectedKeys={
					fromPage === "AdminDasboard"
						? "sub1"
						: fromPage === "AddedStores"
						? "sub2"
						: fromPage === "PendingApproval"
						? "sub3"
						: fromPage === "AgentManagement"
						? "sub4"
						: fromPage === "StoreBilling"
						? "sub10"
						: fromPage === "BusinessReport"
						? "sub5"
						: fromPage === "XStores"
						? "sub11"
						: fromPage === "Users"
						? "sub6"
						: fromPage === "CouponManagement"
						? "sub7"
						: fromPage === "Affiliate"
						? "sub8"
						: "sub1"
				}
				defaultOpenKeys={[
					"sub1",

					// fromPage === "AddGender" ||
					// fromPage === "UpdateGender" ||
					// fromPage === "DeleteGender"
					// 	? "sub2"
					// 	: null,

					// "sub4",

					// "sub6",
				]}
				mode='inline'
				theme='dark'
				inlineCollapsed={collapsed}
				items={items}
				onClick={(e) => {
					if (e.key === "StoreLogo") {
						setClickedOn(true);
					} else {
						setClickedOn(false);
					}
					return <Redirect to={e.key} />;
				}}
			/>
		</AdminNavbarWrapper>
	);
};

export default AdminNavbar;

const AdminNavbarWrapper = styled.div`
	margin-bottom: 15px;
	background: ${(props) => (props.show ? "" : "#1e1e2d")};
	top: 0px !important;
	position: fixed;
	z-index: 20000;
	overflow: auto;
	height: ${(props) => (props.show ? "" : "100%")} !important;

	.logoClass {
		display: ${(props) => (props.show ? "none " : "block")} !important;
	}

	li {
		/* margin: 20px auto; */
		font-size: 0.9rem;
		margin-bottom: ${(props) => (props.show ? "20px " : "15px")};
	}

	hr {
		color: white !important;
		background: white !important;
	}

	.ant-menu.ant-menu-inline-collapsed {
		min-height: 850px;
		/* position: fixed; */
	}

	.ant-menu.ant-menu-dark,
	.ant-menu-dark .ant-menu-sub,
	.ant-menu.ant-menu-dark .ant-menu-sub {
		color: rgba(255, 255, 255, 0.65);
		background: #1e1e2d !important;
	}

	.ant-menu.ant-menu-dark,
	.ant-menu-dark {
		position: ${(props) => (props.show ? "fixed" : "")};
	}

	.ant-menu-item-selected {
		background: ${(props) => (props.show2 ? "none !important" : "")};
	}

	@media (max-width: 1650px) {
		background: ${(props) => (props.show ? "" : "transparent")};

		ul {
			width: 250px;
			padding: 0px !important;
			margin: 0px !important;
		}

		ul > li {
			font-size: 0.8rem !important;
		}
	}

	@media (max-width: 1200px) {
		width: ${(props) => (props.show ? "20%" : "60%")} !important;

		ul {
			display: ${(props) => (props.show ? "none" : "")};
			margin-top: 0px !important;
			top: 0px !important;
		}

		.ant-menu.ant-menu-dark {
			/* position: fixed; */
		}

		button {
			margin-top: 5px !important;
		}
	}
`;
