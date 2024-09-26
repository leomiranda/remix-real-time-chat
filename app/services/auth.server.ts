import { Authenticator } from 'remix-auth';
import { sessionStorage } from '~/services/session.server';
import type { User } from '@prisma/client';
import { db } from '~/db.server';
import { GoogleStrategy } from 'remix-auth-google';

export const authenticator = new Authenticator<User>(sessionStorage, {
	throwOnError: true,
});

const googleStrategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID as string,
		clientSecret: process.env.GOOGLE_SECRET_KEY as string,
		callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
	},
	async ({ profile }) => {
		let user = await db.user.findUnique({
			where: {
				email: profile.emails[0].value,
			},
		});

		if (!user) {
			user = await db.user.create({
				data: {
					email: profile.emails[0].value,
					imageUrl: profile.photos[0].value,
					username: profile.displayName,
				},
			});

			if (!user) throw new Error('Unable to create the user');
		}

		return user;
	}
);

authenticator.use(googleStrategy);
