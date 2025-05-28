import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { CharactersPage } from "@/pages/characters";
import { CharacterModal } from "@/entities/character";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Navigate to="/characters" replace />,
			},
			{
				path: "characters",
				element: <CharactersPage />,
				children: [
					{
						path: ":id",
						element: <CharacterModal />,
					},
				],
			},
		],
	},
]);
