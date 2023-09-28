import { isEqual, range } from "lodash-es"
import { ReactNode, useEffect, useState } from "react"
import { atomFamily, selectAtom, useHydrateAtoms } from 'jotai/utils'
import { Provider, atom, createStore, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { DevTools as JotaiDevTools } from 'jotai-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import clsx from "clsx"

import { atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query'
// import { atomsWithQuery, queryClientAtom } from './try23.atomWithQuery'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
const myStore = createStore()
/**
 * ReactQueryDevtools 5.0.0-beta.29 crash, 28ok
 */
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { atomWithQuery } from "./try23.myAtomWithQuery"
// import { PersistQueryClientProvider } from "./try23.PersistQueryClientProvider"
const queryClient = new QueryClient()
const persister = createSyncStoragePersister({
    storage: window.localStorage,
})
// @ts-ignore
window.queryClient = queryClient
interface Todo {
    userId: number
    id: number
    title: string
    completed: boolean
}
const [, todosQueryAtom] = atomsWithQuery<Todo[]>((get) => ({
    queryKey: ['todos',],
    queryFn: async ({ queryKey: [, id] }) => {
        console.log('fetch https://jsonplaceholder.typicode.com/todos/')
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/`)
        return res.json()
    },
}))
todosQueryAtom.debugLabel = 'todosQueryAtom'



const messageAtom = atom('Edit me and see output in console')
const [, jotaiQueryAtom] = atomsWithQuery<string>((get) => ({
    queryKey: ['jotai', get(messageAtom)],
    queryFn: async ({ queryKey: [, message] }) => {
        // console.log('queryFn jotai')
        return new Promise((resolve) => {
            setTimeout(function () {
                resolve('' + message)
            }, 500)
        })
    },
}))
jotaiQueryAtom.debugLabel = 'jotaiQueryAtom'


function TryQuery() {
    console.log('')
    // const [{ data, isSuccess, status }] = useAtom(todosQueryAtom)
    const [message, setMessage] = useAtom(messageAtom)
    const jotaiQuery = useAtomValue(jotaiQueryAtom)

    const reactQuery = useQuery<string>({
        queryKey: ['react', message],
        queryFn: async ({ queryKey: [, message] }) => {
            // console.log('queryFn react')
            return new Promise((resolve) => {
                setTimeout(function () {
                    resolve('' + message)
                }, 500)
            })
        },
    })

    // console.log(`[jotaiQuery] %c${jotaiQuery.status} %cmessageInAtom: %c${message} %cmessageInQuery: %c${jotaiQuery.data}`, jotaiQuery.isPending ? 'color: yellow' : 'color: cyan', 'color: auto', 'color: green', 'color: auto', 'color: green',)
    // if (jotaiQuery.status === 'success' && message !== jotaiQuery.data) {
    //     console.warn('↑ OH NO, queryKey has changed, but still success with old value!')
    // }
    // console.log(`[reactQuery] %c${reactQuery.status} %cmessageInAtom: %c${message} %cmessageInQuery: %c${reactQuery.data}`, reactQuery.isPending ? 'color: yellow' : 'color: cyan', 'color: auto', 'color: green', 'color: auto', 'color: green',)
    // if (reactQuery.status === 'success' && message !== reactQuery.data) {
    //     console.warn('↑ OH NO, queryKey has changed, but still success with old value!')
    // }
    console.log('jotaiQuery', jotaiQuery)
    console.log('reactQuery', reactQuery)

    return (
        <>
            <input type='text' id='value' value={ message } autoComplete="off" style={ { width: '80vw', height: '32px' } } onChange={ (e) => { console.log('* message changed'); setMessage(e.currentTarget.value) } } />
            <div>{ jotaiQuery.status }</div>
            <div>{ jotaiQuery.data ?? '...' }</div>
            <div>{ reactQuery.status }</div>
            <div>{ reactQuery.data ?? '...' }</div>
        </>
    )

}




const queryResultAtom = atomWithQuery((get) => {
    return {
        queryKey: ['my', get(messageAtom)],
        queryFn: async ({ queryKey: [, message] }) => {
            // console.log('queryFn jotai')
            return new Promise<string>((resolve, reject) => {
                setTimeout(function () {
                    // @ts-ignore
                    if (message.length < 37) {
                        resolve(
                            ''
                            + message + ' - '
                            // + performance.now()
                        )
                    } else {
                        reject()
                    }
                }, 500)
            })
        },
    }
}, queryClient)
queryResultAtom.debugLabel = 'queryResultAtom'
// console.log('queryResultAtom', queryResultAtom)

function TryMyQuery() {
    const result = useAtomValue(queryResultAtom)
    const [message, setMessage] = useAtom(messageAtom)
    if (result.isSuccess) {
        result.data
    }
    result.data

    console.log('render TryMyQuery', result)
    return (
        <div>

            <div>
                {
                    // result.isFetching ? 'isFetching...' : 'notFetching'
                    result.status
                }
                {
                    result.isFetching && '...'
                }
            </div>
            <div>
                { result.data }
            </div>

        </div>
    )
}

const resultDataAtom = selectAtom(queryResultAtom, (result) => result.data)
function TryReRender() {
    const [count, setCount] = useState(0)
    const [resultData, setresultData] = useAtom(resultDataAtom)
    console.log('render', 'resultData', resultData)
    return (
        <div>{ resultData }</div>
    )
}

function Editor() {
    const [message, setMessage] = useAtom(messageAtom)

    return (
        <input className={ clsx(
            message.length >= 37 && ' focus-visible:border-red-500 focus-visible:outline outline-red-500',
        ) } type='text' id='value' value={ message } autoComplete="off" style={ { width: '80vw', height: '32px' } } onChange={ (e) => { console.log('* message changed'); setMessage(e.currentTarget.value) } } />

    )
}







function HydrateAtoms({ children }: { children: ReactNode }) {
    useHydrateAtoms([[queryClientAtom, queryClient]])
    return children
}
export default function App() {
    const [isActive, setIsActive] = useState(true)
    return (
        <PersistQueryClientProvider client={ queryClient } persistOptions={ { persister } }>
            <Provider
            //  store={myStore}
            >
                <HydrateAtoms>
                    <Editor></Editor>
                    <div>
                        <button onClick={ () => setIsActive((x) => (!x)) }>{ isActive ? 'ON' : 'OFF' }</button>
                    </div>
                    {/* <TryMyQuery></TryMyQuery> */ }
                    {
                        isActive && <>
                            {/* <TryQuery></TryQuery> */}
                            <TryMyQuery></TryMyQuery>
                            <TryReRender></TryReRender>
                        </>
                    }
                    <JotaiDevTools theme="dark"></JotaiDevTools>
                </HydrateAtoms>
            </Provider>
            <ReactQueryDevtools initialIsOpen={ false } client={ queryClient } />
        </PersistQueryClientProvider>
    )
}