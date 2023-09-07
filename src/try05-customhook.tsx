import { useEffect, useState, useSyncExternalStore } from "react"

declare global {
	var ttt: number
}
// interface Window {
// 	ttt: number
// }
window.ttt = 0

const tttIncreased = new CustomEvent('tttIncreased')

function useTTT() {
	console.log('useTTT');
	const [t, setT] = useState(0)
	useEffect(() => {
		console.log('useEffect in useTTT');
		function handletttIncreased() {
			console.log('handletttIncreased: setT in useTTT');
			/**
			 * 如果setState沒有改變值,不會觸發re-render
			 * 但是如果改變過,然後不變了,setT(1) setT(2) setT(2) setT(2) setT(2)
			 * 						   re	   re      re!!!   none	   none
			 * 會多一次
			 */
			setT(window.ttt)
		}
		document.addEventListener('tttIncreased', handletttIncreased)
		return () => {
			console.log('useEffect clean in useTTT');
			document.removeEventListener('tttIncreased', handletttIncreased)
		}
	}, [])
	return t
}



function useTTTs() {
	console.log('useTTTs');
	let a = 1
	/**
	 * 1. 不知道為什麼getT會運行超多次,初始會觸發3次,如果值變了會觸發4次
	 * 2. 如果event觸發了,但是值沒有變(要先getTTT,1次),不會觸發re-render
	 * 3. 每次給新的()=>{}getSnapshot好像不要緊
	 */
	const t = useSyncExternalStore(subscribeTTT, () => {
		console.log('getTTT',);
		return window.ttt
	})
	return t
}
function subscribeTTT(callback: () => void) {
	console.log('subscribeTTT');
	document.addEventListener('tttIncreased', callback)
	return () => {
		console.log('unsubscribeTTT');
		document.removeEventListener('tttIncreased', callback)
	}
}
function getTTT() {
	console.log('getTTT');
	return window.ttt
}

export default function App() {
	const [isActive, setIsActive] = useState(true)
	console.log('re-render');

	// const t = useTTT()
	const t = useTTTs()
	return (
		<div>
			<button id={ 'ttt' } onClick={ () => {
				window.ttt++
				document.dispatchEvent(tttIncreased)
			} }>increase ttt { t }</button>
			<button id={ '' } onClick={ () => {
				document.dispatchEvent(tttIncreased)
			} }>just event { t }</button>
			<button id={ '' } onClick={ () => {
				setIsActive((x) => (!x))
			} }>{ isActive + '' }</button>
		</div>
	)
}
