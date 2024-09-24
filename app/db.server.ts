import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

/* eslint-disable no-var */
declare global {
	var __db__: PrismaClient | undefined;
}
/* eslint-enable no-var */

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.__db__) {
		global.__db__ = new PrismaClient();
	}
	prisma = global.__db__;
}

export { prisma };
