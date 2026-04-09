import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
	const navigate = useNavigate();

	return (
		<div className="profile" onClick={() => navigate(`/repository/${user.login}`)}>
			<img src={user.avatar_url} alt="avatar" className="avatar-image" />
			<p>{user.login}</p>
			<button
				onClick={() => navigate(`/repository/${user.login}`)}
				className="view-repo-btn"
			>
				View Repositories
			</button>
		</div>
	);
};

export default Profile;
