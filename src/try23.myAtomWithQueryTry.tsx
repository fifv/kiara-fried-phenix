import { DefaultError, QueryClient, QueryKey, QueryObserver, QueryObserverOptions, QueryObserverResult, notifyManager } from "@tanstack/query-core"
import { Getter, atom, getDefaultStore, } from "jotai"
const defaultStore = getDefaultStore()
// @ts-ignore
window.defaultStore = defaultStore

export function myAtomWithQuery<
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

    // const observerAtom = atom(new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
    //     client,
    //     client.defaultQueryOptions(getOptions(defaultStore.get)),
    // ))
    // const observer = defaultStore.get(observerAtom)

    //#region WORKS
    const observer = new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
        client,
        client.defaultQueryOptions(getOptions(defaultStore.get)),
    )
    // @ts-ignore
    window.observer = observer

    const resultAtom = atom(
        (get) => {
            get(refreshAtom)
            const defaultedQueryOptions = client.defaultQueryOptions(
                getOptions(get)
            )
            observer.setOptions(
                defaultedQueryOptions,
                { listeners: false }
            )
            const result =
                observer
                    .getOptimisticResult(
                        defaultedQueryOptions
                    )
            return (
                // observer.trackResult(result)
                result
            )
        }
    )
    const refreshAtom = atom(0)
    refreshAtom.onMount = (s) => {
        console.log('refreshAtom.onMount')
        observer.subscribe((result) => {
            // console.log('[observer.subscribe]', result)
            notifyManager.batchCalls(() => {
                s(x => x + 1)
            })
        })
        return () => {
            observer.destroy()
        }
    }
    //#endregion WORKS



    // const resultAtom = atom<QueryObserverResult<TData, TError>>(
    //     observer
    //         .getOptimisticResult(
    //             client.defaultQueryOptions(
    //                 getOptions(defaultStore.get)
    //             )
    //         )
    // )
    // console.log('resultAtom', resultAtom)
    // resultAtom.onMount = (s) => {
    //     console.log('refreshAtom.onMount')
    //     observer.subscribe((result) => {
    //         console.log('[observer.subscribe]', result)
    //         // notifyManager.batchCalls(() => {
    //         // })
    //         s(result)
    //     })
    //     return () => {
    //         observer.destroy()
    //     }
    // }
    /**
     * weird things happen, set resultAtom not takes effect
     */
    // observer.subscribe((result) => {
    //     console.log('[observer.subscribe]', result)
    //     console.log('resultAtom', resultAtom)
    //     defaultStore.set(resultAtom, result)
    // })




    // const testAtom = atom(
    //     (get) => {
    //         return get(resultAtom)
    //     },
    //     (get, set, a: any) => {
    //         // console.log(a)
    //         set(resultAtom, a)
    //     }
    // )
    // setInterval(function() {
    //     console.log('!!!!!!');
    //     defaultStore.set(resultAtom, performance.now())
    // }, 1000);
    // observer.getCurrentResult().data
    // observer.subscribe((result) => {
    //     console.log('[observer.subscribe]', result)
    //     // notifyManager.batchCalls(() => {
    //     // })
    //     // defaultStore.set(resultAtom, observer.trackResult(result))
    //     // defaultStore.set(resultAtom, observer.trackResult(observer.getOptimisticResult(client.defaultQueryOptions(getOptions(defaultStore.get)))))
    //     // defaultStore.set(resultAtom, observer.getOptimisticResult(client.defaultQueryOptions(getOptions(defaultStore.get))))
    //     defaultStore.set(resultAtom, result)
    //     // defaultStore.set(testAtom, result)
    //     // defaultStore.set(resultAtom, result.data)
    // })
    // observer.updateResult()
    // return resultAtom
    return resultAtom
    // return testAtom

    // oooAtom.onMount = (setAtom) => {
    //     setAtom(
    //         new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
    //             client,
    //             client.defaultQueryOptions(getOptions(defaultStore.get)),
    //         )
    //     )
    //     return () => {
    //         setAtom((observer) => {
    //             observer.destroy()
    //             return observer
    //         })
    //     }
    // }
    // FIXME: observer lifetime...?
    // const observerAtom = atom((get) => {
    //     const defaultedOptions = client.defaultQueryOptions(getOptions(get))
    //     const observer = new QueryObserver<TQueryFnData, TError, TData, TQueryData, TQueryKey>(
    //         client,
    //         defaultedOptions,
    //     )
    //     return observer
    // },)




}