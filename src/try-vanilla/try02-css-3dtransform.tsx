import { useState } from "react"
import './try02-css-3dtransform.scss'
export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div className="wrapper m-32 ">
            <div className="bg-red-300/70 absolute w-24 h-24 text-6xl flex justify-center items-center top">1</div>
            <div className="bg-red-300/70 absolute w-24 h-24 text-6xl flex justify-center items-center bottom">2</div>
            <div className="bg-red-300/70 absolute w-24 h-24 text-6xl flex justify-center items-center left">3</div>
            <div className="bg-red-300/70 absolute w-24 h-24 text-6xl flex justify-center items-center right">4</div>
            <div className="bg-red-300/70 absolute w-24 h-24 text-6xl flex justify-center items-center front">5</div>
            <div className="bg-red-300/70 absolute w-24 h-24 text-6xl flex justify-center items-center back">6</div>
        </div>
    )
}
