import { type DefaultError, QueryClient, type QueryKey, QueryObserver, type QueryObserverOptions, type QueryObserverResult, notifyManager } from "@tanstack/query-core"
import { type Getter, atom, getDefaultStore, } from "jotai"
// import { isRestoringAtom } from "./try23.PersistQueryClientProvider"
const defaultStore = getDefaultStore()
/**
 * idk if atom can know itself is used in a component, and know when the component is unmounted
 * 
 * QUESTION: how to get notified when an atom's depents list changed? (which means atom is used in a conponent)
 * after read https://jotai.org/docs/guides/core-internals again,
 * when a component mount, the useAtom will `atomState.listeners.add(callback)`
 * but it may be a derived atom based on atomWithQuery, in which case the atomWithQuery's listeners didn't change at all
 * and most importantly, it seems impossible to observe changes in a Set()...
 * 
 * currently, this `atomWithQuery`:
 * 
 * - `observer.trackResult` and `notifyManager.batchCalls` are not used because they make notify re-render broken, I don't know how they works now .
 *   These functions are used to reduce re-render by only notify re-render when needed. 
 *   Check TkDodo's blog [inside-react-query](https://tkdodo.eu/blog/inside-react-query) [react-query-render-optimizations](https://tkdodo.eu/blog/react-query-render-optimizations) for more infomation
 *   (e.g. If `isFetching` is never used, when `isFetching` changes, re-render won't be notified )
 * 
 *   - Luckily, these feature can be implemented manually with jotai's `selectAtom` easily
 * 
 * - Not check `isRestoring`.
 *   `react-query` will check `isRestoring`, which is `true` when restore queryCache from persister,
 *   Here not, but it seems works with persister, idk what does check `isRestoring` do exactly
 * 
 * - Lacking `Suspense` and `error boundary`
 * 
 * - `queryClient` need to be provided explictly.
 *   in `react-query`, `queryClient` is provided by Context.
 *   I don't how to let atom access context, as atoms can be used in anywhere in components tree,
 *   it may be hard to get `queryClient` from one context  
 * 
 * - QueryObserver's lifetime from the atom first used in components to it is no longer used,
 *   initialized in atom.onMount, destroyed in onMount's return
 * 
 *   - So no matter how many components the atomWithQuery is used by, there is only one observer for the atom.
 *     and atomWithQuery doesn't know when it's used in a new component,
 *     so it can't do things like refetch on one component mount unless this component is the only component use the atomWithQuery
 * 
 * 
 * FIXME: Only works with defaultStore
 * 
 * FIXME:(maybe ok?) Must pass queryClient
 * 
 */



export function atomWithQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    getOptions: (
        get: Getter
    ) => QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
    client: QueryClient
) {
    /**
     * is there a way to store a variable that won't change?
     * react-query use useState() 
     * 
     * I don't understand, but here the defaultStore.get won't break app even it use another store
     */
    // let hack: (() => void) | undefined = undefined
    // const observerAtom = atom(
    //     (get) => {
    //         const observer = new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
    //             client,
    //             client.defaultQueryOptions(getOptions(get)),
    //         )
    //         return observer
    //     }
    // )
    const observer = new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
        client,
        client.defaultQueryOptions(getOptions(defaultStore.get)),
    )
    // @ts-ignore
    window.observer = observer
    const resultAtom = atom(
        /**
         * this get function won't be called when a component mount.
         * when mount, since no dependencies changed, it will just return from cache
         * after that, onMount triggered, it changes deps so this function is called.
         * if more than one components mount, the others won't trigger onMount, so they always get from cache,
         * no refetch-on-mount
         */
        (get) => {
            get(refreshAtom)

            // const isRestoring = get(isRestoringAtom)
            // if (!hack) {
            //     hack = observer.subscribe(() => {
            //         defaultStore.set(refreshAtom, x => x + 1)
            //     })
            // }
            // console.time('client.defaultQueryOptions')
            // if (!observer.hasListeners()) {
            //     console.log('noooooo')
            // }
            // console.log('resultAtom get');
            // const defaultedQueryOptions = client.defaultQueryOptions(
            //     getOptions(get)
            // )
            // defaultedQueryOptions._optimisticResults =
            //     isRestoring
            //         ? 'isRestoring'
            //         : 'optimistic'

            // console.timeEnd('client.defaultQueryOptions')

            // console.time('observer.setOptions')optimioptimistic
            /**
             * if not observer.setOptions, when options change,
             * the result from observer.getOptimisticResult will be...weird
             */
            observer.setOptions(
                getOptions(get),
                { listeners: false }
            )
            // console.timeEnd('observer.setOptions')
            /**
             * observer.getOptimisticResult 確實是會build新的Query,獲取新的option的result
             * 但是! 他不會在新Query.listeners裡加上這個Observer,所以新query處於inactive狀態下根本不會開始fetch
             * 所以要observer.setOptions, 可以正確把Observer綁定到新的Query上去
             */
            // console.time('observer.getOptimisticResult')
            // const result =
            //     observer.getOptimisticResult(
            //         defaultedQueryOptions
            //     )
            /* ok if has `observer.setOptions` */
            const result = observer.getCurrentResult()
            // console.timeEnd('observer.getOptimisticResult')
            return (
                result
            )
        }
    )
    const refreshAtomBase = atom(0)
    const refreshAtom = atom(
        (get) => get(refreshAtomBase),
        (get, set) => {
            set(refreshAtomBase, x => x + 1)
            // const defaultedQueryOptions = client.defaultQueryOptions(
            //     getOptions(get)
            // )
            // defaultedQueryOptions._optimisticResults = 'optimistic'
            // observer.setOptions(
            //     defaultedQueryOptions,
            //     { listeners: false }
            // )
        }
    )
    /**
     * FIXME: this is inconsist with react-query
     * when unmount and mount in the components tree, the atom will return old result with status success
     * and then this onMount is called, so observer.subscribe, then query start
     */
    refreshAtom.onMount = (refresh) => {
        console.log('refreshAtom.onMount')
        /**
         * the result from the callback is not used, same as `react-query`
         * 
         * `react-query` use `React.useSyncExternalStore` just to notify re-render and discard the result.
         * And the actual result is from `observer.getOptimisticResult(defaultedOptions)`
         */
        const unsubscribe = observer.subscribe((result) => {
            // notifyManager.batchCalls(() => {
            // })
            refresh()
        })

        return () => {
            console.log('refreshAtom onUnmount')
            // observer.destroy()
            unsubscribe()
            // hack?.()
            // hack = undefined
        }
    }
    // export const isRestoringAtomBase = atom(true)
    // export const isRestoringAtom = atom(
    //     (get) => get(isRestoringAtomBase),
    //     (get, set, newValue: boolean) => {
    //         set(isRestoringAtomBase, newValue)
    //         const unsubscribe = observer.subscribe((result) => {
    //             // notifyManager.batchCalls(() => {
    //             // })
    //             set(refresh)
    //         })
    //     }
    // )
    /**
     * not works...????
     */
    // observer.subscribe((result) => {
    //     // notifyManager.batchCalls(() => {
    //     // })
    //     defaultStore.set(refreshAtom, x => x + 1)
    // })
    return resultAtom
}



