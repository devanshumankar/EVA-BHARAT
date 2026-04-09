import React from "react";
import { useNavigate } from "react-router-dom";

const BookMark = () => {
	const navigate = useNavigate();
	const repos = JSON.parse(localStorage.getItem("bookmarkRepos")) || [];
	return (
		<div className="bookmark-container">
			<h2>Bookmark Repositories</h2>
			<button className="home-page-btn" onClick={() => navigate("/")}>
				Home Page
			</button>
			{repos.length == 0 ?
				<p>No BookMark Repos</p>
			:	<ol>
					{repos.map((ele, ind) => {
						return (
							<li key={ind}>
								<a href={ele.url}>{ele.name}</a>
							</li>
						);
					})}
				</ol>
			}
		</div>
	);
};

export default BookMark;
