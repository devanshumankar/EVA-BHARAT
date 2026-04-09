import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Profiles from "./Profiles";
import { useNavigate } from "react-router-dom";

const GitHubProfile = () => {
	const [userName, setUserName] = useState("");
	const [userProfiles, setUserProfiles] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const URL = "https://api.github.com/search/users";

	async function fetchUserRepos() {
		try {
			setLoading(true);
			const res = await axios.get(URL + `?q=${userName}`);
			setUserProfiles(res.data.items);
		} catch (err) {
			setError("failed to fetch user");
		} finally {
			setLoading(false);
		}
	}
	useEffect(() => {
		const timer = setTimeout(() => {
			if (userName.trim()) {
				fetchUserRepos();
			} else {
				setUserProfiles([]);
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [userName]);
	if (error) return <p>{error}</p>;
	return (
		<div className="main-container">
			<h1>GitHub Explorer</h1>
			<div className="input-user-container">
				<input
					type="text"
					placeholder="enter username"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				></input>
				<button
					onClick={() => navigate("/bookmark")}
					className="view-bookmark-btn"
				>
					View BookMark Repositories
				</button>
			</div>

			{loading ?
				<Loader></Loader>
			: userProfiles.length ?
				<Profiles userProfiles={userProfiles}></Profiles>
			:	null}
		</div>
	);
};

export default GitHubProfile;
