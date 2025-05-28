import { Outlet } from "react-router-dom";

export default function App() {
	return (
		<main className="p-4 min-h-screen">
			<Outlet />
		</main>
	);
}
