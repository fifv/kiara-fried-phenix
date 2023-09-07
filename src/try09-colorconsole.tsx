import { useState } from "react"
import pc from "picocolors";
import { cyan } from "colorette";
console.log(pc.cyan('123'));
console.log('pc.isColorSupported', pc.isColorSupported);
console.log("\x1b[3m666\x1b[23m", "");
console.log("\x1b[36m777\x1b[39m");
console.log(cyan('ahhh'));
// const { cyan } = c
export default function App() {
	const [count, setCount] = useState(0)
	return (
		<div>hi</div>
	)
}
