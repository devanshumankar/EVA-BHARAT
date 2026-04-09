import React from "react";
import "./App.css";
import GitHubProfile from "./components/GitHubProfile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Repositories from "./components/Repositories";
import BookMark from "./components/BookMark";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <GitHubProfile></GitHubProfile>,
		},
		{
			path: "/repository/:userName",
			element: <Repositories></Repositories>,
		},
		{
			path: "/bookmark",
			element: <BookMark></BookMark>,
		},
	]);
	return (
		<>
			<ThemeToggle />
			<RouterProvider router={router}></RouterProvider>
		</>
	);
};

export default App;
