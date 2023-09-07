import { useState } from "react"
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './try-trpc-server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export const trpc = createTRPCReact<AppRouter>();

export default function App() {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: 'http://localhost:3333/trpc',
					// optional
					headers() {
						return {
							// authorization: getAuthCookie(),
						};
					},
				}),
			],
		}),
	);
	// const userById = trpc.userById.useQuery('1')
	return (
		<trpc.Provider client={ trpcClient } queryClient={ queryClient }>
			<QueryClientProvider client={ queryClient }>
				<Some></Some>
				<Some2></Some2>
				<ReactQueryDevtools initialIsOpen={ false } />

			</QueryClientProvider>
		</trpc.Provider>
	);
}

function Some() {
	const [count, setCount] = useState(0)
	// const userById = trpc.userById.useQuery('1')
	const userFind = trpc.userFind.useQuery({ id: '1' })
	if (userFind.isLoading) {
		return <div className="bg-yellow-500 m-2 p-2 rounded inline-block">Loading...</div>
	}
	if (userFind.isError) {
		return <div className="bg-red-600 m-2 p-2 rounded inline-block">Error!</div>
	}
	return (
		<div>
			{/* <div>{ userById.data.name }</div> */ }
			<div>Some:{ userFind.isSuccess ? userFind.data.name : "loading" }</div>
		</div>
	)
}
function Some2() {
	const [count, setCount] = useState(0)
	// const userById = trpc.userById.useQuery('1')
	const userAll = trpc.userAll.useQuery()
	const userCreate = trpc.userCreate.useMutation()
	if (userAll.isLoading) {
		return <div className="bg-yellow-500 m-2 p-2 rounded inline-block">Loading...</div>
	}
	if (userAll.isError) {
		return <div className="bg-red-600 m-2 p-2 rounded inline-block">Error!</div>
	}
	return (
		<div>
			<div>
				<button
					onClick={ async () => {
						/**
						 * 這裡要兩步走,先useMutation,然後.mutate
						 */
						await userCreate.mutateAsync({ name: '66' })
						/**
						 * 在極慢的網速下,狂點會多次觸發refetch,只有最新的一次會生效,其他依然會fetch但是會忽略
						 */
						userAll.refetch()
					} }
				>createUser</button>
				{ userCreate.isLoading && 'mutation loading' }
				{ userCreate.isError && 'mutation error' }
			</div>

			<div>{
				/**
				 * 懂了我87
				 * list一直正反亂跳,因為reverse會修改原array
				 */
				userAll.data.slice().reverse().map((user) => {
					return (
						<div>{ user.id }:{ user.name }</div>
					)
				})
			}</div>
		</div>
	)
}


