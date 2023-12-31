import React from "react";

const NavbarBackground = ({collapsed, setCollapsed}) => {
	return (
		<div
			className='DarkbackgroundForSidebar2'
			onClick={() => {
				setCollapsed(!collapsed);
			}}
		></div>
	);
};

export default NavbarBackground;
