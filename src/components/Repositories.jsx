import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
import Repository from "./Repository";

const Repositories = () => {
	const { userName } = useParams();
	const [allRepos, setAllRepos] = useState([]);
	const [repos, setRepos] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [sortBy, setSortBy] = useState("default");
	const [filterByLanguage, setFilterByLanguage] = useState("all");
	const per_page = 6;
	const URL = "https://api.github.com/users/";
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchRepos() {
			try {
				setLoading(true);
				const res = await axios.get(URL + `${userName}/repos?per_page=100`);
				setAllRepos(res.data);
				setPage(1);
			} catch (err) {
				setError("failed to fetch user repos");
			} finally {
				setLoading(false);
			}
		}
		fetchRepos();
	}, [userName]);

	useEffect(() => {
		let filtered = [...allRepos];
		if (filterByLanguage !== "all") {
			filtered = filtered.filter((repo) => repo.language === filterByLanguage);
		}
		if (sortBy === "stars") {
			filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
		} else if (sortBy === "forks") {
			filtered.sort((a, b) => b.forks_count - a.forks_count);
		}

		const startIdx = (page - 1) * per_page;
		const paginatedRepos = filtered.slice(startIdx, startIdx + per_page);

		setRepos(paginatedRepos);
	}, [allRepos, sortBy, filterByLanguage, page]);

	const languages = [
		"all",
		...new Set(allRepos.map((repo) => repo.language).filter(Boolean)),
	];
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
			<div className="sort-filter-controls">
				<div className="control-group">
					<label htmlFor="sort">Sort by:</label>
					<select
						id="sort"
						value={sortBy}
						onChange={(e) => {
							setSortBy(e.target.value);
							setPage(1);
						}}
					>
						<option value="default">Default</option>
						<option value="stars"> Stars</option>
						<option value="forks"> Forks</option>
					</select>
				</div>

				<div className="control-group">
					<label htmlFor="language">Filter by Language:</label>
					<select
						id="language"
						value={filterByLanguage}
						onChange={(e) => {
							setFilterByLanguage(e.target.value);
							setPage(1);
						}}
					>
						{languages.map((lang) => (
							<option key={lang} value={lang}>
								{lang === "all" ? "All Languages" : lang}
							</option>
						))}
					</select>
				</div>
			</div>

			{repos.length === 0 && (
				<p>
					{allRepos.length === 0 ?
						"User does not have any repository"
					:	"No repositories match the current filters"}
				</p>
			)}
			<div className="repo-inner-container">
				{repos.map((repo) => (
					<Repository key={repo.id} repo={repo} onBookmark={handleBookmark} />
				))}
			</div>
			<div className="pagination-btns">
				<button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
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
