import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Welcome to ChatApp' },
		{ name: 'description', content: 'Login to start chatting!' },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	return authenticator.isAuthenticated(request, {
		successRedirect: '/chat',
	});
}

export default function Index() {
	return (
		<div className="flex h-screen bg-gray-900 items-center justify-center">
			<div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
				<h1 className="text-3xl font-bold text-center mb-6 text-white">
					Welcome to ChatApp
				</h1>
				<p className="text-center text-gray-300 mb-8">
					Please sign in to continue
				</p>
				<Form action="/auth/google" method="post">
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
					>
						<svg
							className="w-6 h-6 mr-2"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
								fill="currentColor"
							/>
						</svg>
						Sign in with Google
					</button>
				</Form>
			</div>
		</div>
	);
}
