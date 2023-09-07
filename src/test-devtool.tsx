/**
 * wtf
 * 在有任何class field的情況下,devtool的parse hook name會失敗
 * 這個ClassComponent的所有sub Function Component都會失敗
 * edit: 不止只要整個文件裡面存在一個class field,哪怕完全沒有用到,整個file的parse都會掛掉
 */
import { Component, useState } from "react"
// import { TestC, Test } from "./test-devtool.1"
// export function Test() {
// 	const [count, setCount] = useState(0)
// 	return (
// 		<div>test
// 		</div>
// 	)
// }

// export default class App extends Component<
// 	{},
// 	{}
// > {
// 	test = () => { /*  */ }
// 	render() {
// 		console.log('App');
// 		return <Test />
// 	}
// }

export default function App() {
	const [count, setCount] = useState(0)
	console.log('App');
	return (
		<div>

			{/* <Test></Test> */}
			{/* <TestC></TestC> */}
		</div>
	)
}


// class TestC extends Component<
// 	{},
// 	{}
// > {
// 	test = () => { /*  */ }
// 	render() { return <div>testccclass</div> }
// }