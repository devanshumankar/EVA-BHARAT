import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

	useEffect(() => {
		document.documentElement.classList.toggle("dark-theme", isDark);
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	return (
		<button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
			{isDark ? "☀️" : "🌙"}
		</button>
	);
};

export default ThemeToggle;
