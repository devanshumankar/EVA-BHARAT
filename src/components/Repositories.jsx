import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import Repository from "./Repository";

const Repositories = () => {
	const { userName } = useParams();
	const [repos, setRepos] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const per_page = 6;
	const URL = "https://api.github.com/users/";
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchRepos() {
			try {
				setLoading(true);
				const res = await axios.get(
					URL + `${userName}/repos` + `?per_page=${per_page}&page=${page}`,
				);
				setRepos(res.data);
			} catch (err) {
				setError("failed to fetch user repos");
			} finally {
				setLoading(false);
			}
		}
		fetchRepos();
	}, [page]);
	if (error) return <p>{error}</p>;
	if (loading) return <Loader></Loader>;
	function handleBookmark(url, name) {
		const bookmarkRepos = JSON.parse(localStorage.getItem("bookmarkRepos")) || [];
		const exists = bookmarkRepos.some((repo) => repo.url === url);
		if (exists) {
			alert("Already bookmarked!");
			return;
		}
		bookmarkRepos.push({ url, name });
		localStorage.setItem("bookmarkRepos", JSON.stringify(bookmarkRepos));
		alert("Bookmarked successfully");
	}
	return (
		<div className="repo-container">
			<h2>{userName}'s Repositories</h2>
			<button className="home-btn" onClick={() => navigate("/")}>
				Back to Home
			</button>
			{repos.length == 0 && <p>User Does not Have Any Repository</p>}
			<div className="repo-inner-container">
				{repos.map((repo) => (
					<Repository key={repo.id} repo={repo} onBookmark={handleBookmark} />
				))}
			</div>
			<div className="pagination-btns">
				<button disabled={page == 1} onClick={() => setPage((prev) => prev - 1)}>
					Prev
				</button>
				<button
					disabled={repos.length < per_page}
					onClick={() => setPage((prev) => prev + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Repositories;
