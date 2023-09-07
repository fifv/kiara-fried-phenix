import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { z } from 'zod';
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { randomUUID } from 'crypto'

interface User {
	id: string;
	name: string;
}
const userList: User[] = [
	{
		id: '1',
		name: 'KATT',
	},
];
// created for each request
const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

// const router = t.router;
// const publicProcedure = t.procedure;

const appRouter = t.router({
	userById: t.procedure
		// The input is unknown at this time.
		// A client could have sent us anything
		// so we won't assume a certain data type.
		.input((val: unknown) => {
			// If the value is of type string, return it.
			// TypeScript now knows that this value is a string.
			if (typeof val === 'string') return val;

			// Uh oh, looks like that input wasn't a string.
			// We will throw an error instead of running the procedure.
			throw new Error(`Invalid input: ${typeof val}`);
		})
		.query((req) => {
			const { input } = req;
			console.log('get input @userById:', input);

			const user = userList.find((u) => u.id === input);

			return user;
		}),
	userFind: t.procedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.query(({ input }) => {
			console.log('get input @userFind:', input);
			const user = userList.find((u) => u.id === input.id);
			return user;
		}),
	userAll: t.procedure
		.input(
			z.undefined()
		)
		.query(({ input }) => {
			console.log('get input @userAll:', input);
			const user = userList
			return user;
		}),
	userCreate: t.procedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.mutation(({ input }) => {
			console.log('get mutation @userCreate:', input);
			// const id = `${Math.random()}`;
			const id = randomUUID()

			const user: User = {
				id,
				name: input.name,
			};

			userList.push(user);

			return user;
		}),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;




const app = express();
/**
 * 不容易,終於收到了,該死的cors全擋下來了...
 */
app.use(cors())
app.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	}),
);
const HOST = '0.0.0.0'
const PORT = 3333
app.listen(PORT, HOST);
console.log('*Listen:', PORT);