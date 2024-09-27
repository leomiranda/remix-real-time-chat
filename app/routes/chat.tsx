import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';
import { Header } from '~/components/header';
import { db } from '~/db.server';
import { authenticator } from '~/services/auth.server';
import { emitter } from '~/services/emitter.server';
import { useEventSource } from 'remix-utils/sse/react';

export async function loader({ request }: LoaderFunctionArgs) {
	await authenticator.isAuthenticated(request, {
		failureRedirect: '/',
	});

	const data = await db.message.findMany({
		select: {
			message: true,
			id: true,
			User: {
				select: {
					username: true,
					imageUrl: true,
				},
			},
		},

		orderBy: {
			createdAt: 'asc',
		},
		take: 50,
	});

	return json({ data });
}

export async function action({ request }: ActionFunctionArgs) {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/',
	});

	const formData = await request.formData();
	const message = formData.get('message');

	const data = await db.message.create({
		data: {
			message: message as string,
			userId: user.id,
		},
		include: {
			User: {
				select: {
					username: true,
					imageUrl: true,
				},
			},
		},
	});
	emitter.emit('message', `${JSON.stringify(data)}\n\n`);
	return json(null, { status: 201 });
}

export default function Chat() {
	const { data } = useLoaderData<typeof loader>();

	const [totalComments, setTotalComments] = useState(data);

	const formRef = useRef<HTMLFormElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const submit = useSubmit();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		submit(event.currentTarget, { method: 'post' });
		inputRef.current?.value && (inputRef.current.value = '');
	};

	const currentComments = useEventSource('/chat/subscribe', {
		event: 'message',
	});

	const messageEndRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const parsedComments = JSON.parse(currentComments as string);
		if (parsedComments !== null) {
			setTotalComments((prev) => [...prev, parsedComments]);
		}
	}, [currentComments]);

	const scrollToBottom = () => {
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [totalComments]);
	return (
		<div className="h-screen bg-gray-200 flex flex-col">
			<Header />

			<div className="p-6 flex-grow max-h-screen overflow-y-auto py-8 pb-16">
				<div className="flex flex-col gap-4">
					{totalComments.map((message, index) => (
						<div key={index}>
							<div className="flex items-center">
								<img
									src={message.User?.imageUrl}
									alt={`${message.User?.username || 'User'}'s profile`}
									className="h-12 w-12 object-cover rounded-lg mr-4"
								/>
								<div className="rounded-lg bg-gray-800 p-4 shadow-md self-start text-white">
									{message.message}
								</div>
							</div>
							<p className="font-light text-sm text-gray-600">
								{message.User?.username}
							</p>
						</div>
					))}
					<div ref={messageEndRef}></div>
				</div>
			</div>

			<Form
				ref={formRef}
				onSubmit={handleSubmit}
				className="p-4 fixed bottom-0 left-0 w-full bg-gray-100 shadow-lg"
			>
				<div className="flex items-center gap-2">
					<input
						ref={inputRef}
						type="text"
						name="message"
						placeholder="Type your message..."
						className="flex-grow py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
					/>
					<button
						type="submit"
						className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
					>
						Send
					</button>
				</div>
			</Form>
		</div>
	);
}
