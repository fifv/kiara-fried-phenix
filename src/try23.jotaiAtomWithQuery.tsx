import { QueryClient, QueryObserver, isCancelledError } from '@tanstack/query-core'
import type {
    QueryKey,
    QueryObserverOptions,
    QueryObserverResult,
} from '@tanstack/query-core'
import { atomWithObservable } from 'jotai/vanilla/utils'
import type { Getter, WritableAtom } from 'jotai/vanilla'
import { atom } from 'jotai/vanilla'

type Action = {
    type: 'refetch'
    force?: boolean
    options?: Parameters<QueryObserver['refetch']>[0]
}

export const queryClientAtom = atom(new QueryClient())
if (process.env.NODE_ENV !== 'production') {
    queryClientAtom.debugPrivate = true
}


export function atomsWithQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    getOptions: (
        get: Getter
    ) => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
    getQueryClient: (get: Getter) => QueryClient = (get) => get(queryClientAtom)
): WritableAtom<
    QueryObserverResult<TData, TError>,
    [Action],
    Promise<QueryObserverResult<TData, TError>> | undefined
> {
    type Observer = QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>
    type Result = ReturnType<Observer['getCurrentResult']>
    const observerCacheAtom = atom(() => new WeakMap<QueryClient, Observer>())

    if (process.env.NODE_ENV !== 'production') {
        observerCacheAtom.debugPrivate = true
    }

    const refreshAtom = atom(0)
    if (process.env.NODE_ENV !== 'production') {
        refreshAtom.debugPrivate = true
    }

    // This is for a special property to indicate
    // that it is in the render function.
    // It's a workaround because we can't use useEffect.
    const IN_RENDER = Symbol()

    const observerAtom = atom((get) => {
        get(refreshAtom)
        const queryClient = getQueryClient(get)
        const options = getOptions(get)
        const observerCache = get(observerCacheAtom)
        let observer = observerCache.get(queryClient)
        if (observer) {
            ; (observer as any)[IN_RENDER] = true
            observer.setOptions(options)
            delete (observer as any)[IN_RENDER]
        } else {
            observer = new QueryObserver(queryClient, options)
            observerCache.set(queryClient, observer)
        }
        return observer
    })

    if (process.env.NODE_ENV !== 'production') {
        observerAtom.debugPrivate = true
    }

    const baseStatusAtom = atom((get) => {
        const observer = get(observerAtom)
        const observable = {
            subscribe: (arg: { next: (result: Result) => void }) => {
                const callback = (result: Result) => {
                    const notifyResult = () => arg.next(result)
                    if ((observer as any)[IN_RENDER]) {
                        Promise.resolve().then(notifyResult)
                    } else {
                        notifyResult()
                    }
                }
                const unsubscribe = observer.subscribe(callback)
                callback(observer.getCurrentResult())
                return { unsubscribe }
            },
        }
        const resultAtom = atomWithObservable(() => observable, {
            initialValue: observer.getCurrentResult(),
        })

        if (process.env.NODE_ENV !== 'production') {
            resultAtom.debugPrivate = true
        }

        return resultAtom
    })

    if (process.env.NODE_ENV !== 'production') {
        baseStatusAtom.debugPrivate = true
    }

    const statusAtom = atom(
        (get) => {
            const resultAtom = get(baseStatusAtom)
            return get(resultAtom)
        },
        (get, set, action: Action | 'refresh') => {
            const observer = get(observerAtom)
            const refresh = () => {
                const queryClient = getQueryClient(get)
                const observerCache = get(observerCacheAtom)
                observerCache.delete(queryClient)
                set(refreshAtom, (c) => c + 1)
            }
            if (action === 'refresh') {
                refresh()
                return undefined as unknown as never
            }

            if (action.type === 'refetch') {
                if (action.force) {
                    // observer.remove()

                    const options = getOptions(get)
                    const queryClient = getQueryClient(get)
                    queryClient.removeQueries({ queryKey: options.queryKey, })

                    refresh()
                    return
                }
                return observer.refetch(action.options)
            }

        }
    )
    statusAtom.onMount = (setAtom) => () => setAtom('refresh')

    return statusAtom
}
