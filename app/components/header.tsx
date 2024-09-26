import { Link } from '@remix-run/react';

export function Header() {
	return (
		<header className="flex justify-between items-center p-4 bg-gray-800 text-white">
			<Link to="/" className="text-2xl font-bold">
				ChatApp
			</Link>
			<form action="/auth/logout" method="post">
				<button
					type="submit"
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					Logout
				</button>
			</form>
		</header>
	);
}
