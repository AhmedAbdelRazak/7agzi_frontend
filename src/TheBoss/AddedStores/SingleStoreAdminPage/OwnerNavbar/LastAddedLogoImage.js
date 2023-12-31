import styled from "styled-components";
import { allLoyaltyPointsAndStoreStatus } from "../apiOwner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../../auth";

const LastAddedLogoImage = ({ ownerId }) => {
	const [lastLogoURL, setLastLogoURL] = useState("");
	// eslint-disable-next-line
	const { token, user } = isAuthenticated();

	var logoUrl =
		"https://res.cloudinary.com/infiniteapps/image/upload/v1640547562/Infinite-Apps/MyLogo_p0bqjs.jpg";

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token, ownerId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				var lastAddedSettings;

				if (data.length === 0) {
					lastAddedSettings = "";
				} else {
					lastAddedSettings = data && data[data.length - 1];
				}

				if (lastAddedSettings) {
					setLastLogoURL(
						lastAddedSettings ? lastAddedSettings.addStoreLogo[0].url : ""
					);
				}
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	return (
		<LastAddedLogoImageWrapper>
			<div
				className='logoClass no-background'
				style={{
					textAlign: "center",
					padding: "5px",
					marginLeft: "25%",
					marginTop: "5px",
					objectFit: "cover",
				}}
			>
				<Link to='/store/admin/dashboard'>
					<img
						id='logoImage'
						src={lastLogoURL ? lastLogoURL : logoUrl}
						alt='infinite-apps.com'
						style={{
							width: "100px",
							objectFit: "cover",
						}}
					/>
				</Link>
			</div>
		</LastAddedLogoImageWrapper>
	);
};

export default LastAddedLogoImage;

const LastAddedLogoImageWrapper = styled.div``;
