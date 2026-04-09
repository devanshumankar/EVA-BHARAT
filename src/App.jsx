import React from "react";
import "./App.css";
import GitHubProfile from "./components/GitHubProfile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Repositories from "./components/Repositories";
import BookMark from "./components/BookMark";
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
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
