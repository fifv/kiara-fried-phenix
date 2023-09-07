import { useState } from "react"

export default function App() {
	const [count, setCount] = useState(0)
	return (
		<div>123
			{ JSON.parse(import.meta.env.VITE_HI)?'this is true':'this is false' }
		</div>
	)
}
