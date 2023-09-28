'use client'
import * as React from 'react'

import {
    persistQueryClientRestore,
    persistQueryClientSubscribe,
} from '@tanstack/query-persist-client-core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { PersistQueryClientOptions } from '@tanstack/query-persist-client-core'
import type { QueryClientProviderProps } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'

export type PersistQueryClientProviderProps = QueryClientProviderProps & {
    persistOptions: Omit<PersistQueryClientOptions, 'queryClient'>
    onSuccess?: () => Promise<unknown> | unknown
}
const IsRestoringContext = React.createContext(false)

export const useIsRestoring = () => React.useContext(IsRestoringContext)
export const IsRestoringProvider = IsRestoringContext.Provider

export const isRestoringAtom = atom(true)
export const PersistQueryClientProvider = ({
    client,
    children,
    persistOptions,
    onSuccess,
    ...props
}: PersistQueryClientProviderProps): JSX.Element => {
    const [isRestoring, setIsRestoring] = useAtom(isRestoringAtom)
    const refs = React.useRef({ persistOptions, onSuccess })
    const didRestore = React.useRef(false)

    React.useEffect(() => {
        refs.current = { persistOptions, onSuccess }
    })

    React.useEffect(() => {
        const options = {
            ...refs.current.persistOptions,
            queryClient: client,
        }
        if (!didRestore.current) {
            didRestore.current = true
            setIsRestoring(true)
            persistQueryClientRestore(options).then(async () => {
                try {
                    await refs.current.onSuccess?.()
                } finally {
                    setIsRestoring(false)
                }
            })
        }
        return isRestoring ? undefined : persistQueryClientSubscribe(options)
    }, [client, isRestoring])

    return (
        <QueryClientProvider client={ client } { ...props }>
            <IsRestoringProvider value={ isRestoring }>{ children }</IsRestoringProvider>
        </QueryClientProvider>
    )
}
