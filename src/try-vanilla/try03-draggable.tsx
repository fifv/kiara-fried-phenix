import clsx from "clsx"
import { range } from "lodash-es"
import { useState } from "react"
export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div className="m-12 border w-96 h-96 overflow-scroll">
            {
                range(100).map((item) => (
                    <div draggable onDragStart={(e) => {
                        // e.preventDefault()
                    }} className={ clsx(
                        '',
                    ) }>{item}||||||||||||||||||||||||||||||||</div>
                ))
            }
        </div>
    )
}
