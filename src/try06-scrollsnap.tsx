import { useState } from "react"
export default function App() {
	const [count, setCount] = useState(0)
	return (
		<div className="scroll-auto  snap-y snap-mandatory  h-screen w-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-600 scrollbar-track-transparent ">
			<div className="snap-center h-screen w-screen bg-purple-300"></div>
			<div className="snap-center h-screen w-screen bg-blue-300"></div>
			<div className="snap-center h-screen w-screen bg-teal-300"></div>
		</div> 
	)
}
