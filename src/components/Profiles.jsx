import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Profiles = ({ userProfiles }) => {
	return (
		<div className="profile-container">
			{userProfiles.map((ele) => (
				<Profile key={ele.id} user={ele} />
			))}
		</div>
	);
};

export default Profiles;
