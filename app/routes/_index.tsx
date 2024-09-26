import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const result = await authenticator.isAuthenticated(request, {
		successRedirect: '/chat',
	});

	return result;
}

export default function Index() {
	return (
		<div className="flex h-screen items-center justify-center">
			<Form action="/auth/google" method="post">
				<button>Login with Google</button>
			</Form>
		</div>
	);
}
