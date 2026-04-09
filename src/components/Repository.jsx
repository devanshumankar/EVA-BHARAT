import React from "react";

const Repository = ({ repo, onBookmark }) => {
	console.log(repo);
	return (
		<div className="repo-card">
			<h3>{repo.name}</h3>
			<p>
				Stars:{repo.stargazers_count} | Forks: {repo.forks_count}
			</p>
			<p>{repo.description || "No description available"}</p>
			<p>Language: {repo.language || "Not specified"}</p>
			<div className="viewrepo-bookmark-container">
				<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
					View Repo
				</a>

				<button onClick={() => onBookmark(repo.html_url, repo.name)}>
					Bookmark
				</button>
			</div>
		</div>
	);
};

export default Repository;
