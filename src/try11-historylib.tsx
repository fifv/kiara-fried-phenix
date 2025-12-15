import { useEffect, useState } from "react"

import { Action, type Location, createBrowserHistory } from "history";
import { useImmer } from "use-immer";
import { type Immutable } from "immer";
const browserHistory = createBrowserHistory()
interface HistoryEntry {
	state: any,
	locationStr: string,
	location: Location,
}
export default function App() {
	const [count, setCount] = useState(0)
	const [historyStack, setHistoryStack] = useImmer<Immutable<HistoryEntry[]>>([])
	useEffect(() => {
		const unlisten = browserHistory.listen(({ action, location }) => {
			const locationStr = `The current URL is ${location.pathname}${location.search}${location.hash}`
			console.log(
				locationStr,
				'-----------',
				`The last navigation action was ${action}`,
			);
			console.log(location);
			setHistoryStack((draft) => {
				const newHistoryEntry = {
					locationStr,
					state: location.state,
					location,
				}
				switch (action) {
					case Action.Pop: {
						draft.pop()
						break;
					}
					case Action.Push: {
						draft.push(newHistoryEntry)
						break;
					}
					case Action.Replace: {
						/**
						 * 如果array是空的,會出現draft[-1] = xxx
						 * 但是這個東西好像不會被map到
						 */
						if (draft.length > 0) {
							draft[draft.length - 1] = newHistoryEntry
						}

						break;
					}

					default:
						break;
				}
				draft
			})
		})

		return () => {
			unlisten()
		}
	}, [])
	console.log(historyStack);
	return (
		<div>
			<button onClick={ () => {
				browserHistory.push(`/${count}`, { count: count })
				setCount((x) => (x + 1))
			} }>Push:{ count }</button>
			<button onClick={ () => {
				browserHistory.replace(`/${count}`, { count: count })
				setCount((x) => (x + 1))
			} }>Replace:{ count }</button>
			<button onClick={ () => {
				browserHistory.back()
				setCount((x) => (x + 1))
			} }>Back</button>
			<button onClick={ () => {
				browserHistory.forward()
				setCount((x) => (x + 1))
			} }>Forward</button>
			<div>
				{ historyStack.slice().reverse().map((historyEntry) => {
					return <div key={ historyEntry.location.key }>
						{ historyEntry.locationStr }, state:  { JSON.stringify(historyEntry.state) }
					</div>

				}) }
			</div>
		</div>
	)
}
