import { useState } from "react"
import c from 'chalk'
import pc from 'picocolors'
import cr from 'colorette'
import lo from 'lodash-es'
export default function App() {
	const [toggle, setToggle] = useState(false)
	return (
		<div>
			<button className="p-10" onClick={ () => { console.log(c.blue('hiii')); } }>hi</button>
			{lo.range(3)}
		</div>
	)
}