import React from "react";
import { useNavigate } from "react-router-dom";

const BookMark = () => {
	const navigate = useNavigate();
	const repos = JSON.parse(localStorage.getItem("bookmarkRepos")) || [];
	function handleRemove(url) {
		const bookmarkRepos = JSON.parse(localStorage.getItem("bookmarkRepos")) || [];
		const updatedRepos = bookmarkRepos.filter((ele) => ele.url !== url);
		localStorage.setItem("bookmarkRepos", JSON.stringify(updatedRepos));
		window.location.reload();
	}
	return (
		<div className="bookmark-container">
			<h2>Bookmark Repositories</h2>
			<button className="home-page-btn" onClick={() => navigate("/")}>
				Home Page
			</button>
			{repos.length == 0 ?
				<p>No BookMark Repositories</p>
			:	<ol>
					{repos.map((ele, ind) => {
						return (
							<li key={ind} className="bookmark-item">
								<a href={ele.url}>{ele.name}</a>
								<span> ----</span>
								<button onClick={() => handleRemove(ele.url)}>
									Remove Bookmark
								</button>
							</li>
						);
					})}
				</ol>
			}
		</div>
	);
};

export default BookMark;
