import { useState } from "react"
import './try12-spinner.scss'
import clsx from "clsx"
export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>

            <Spinner />
        </div>
    )
}
function Spinner() {
    // const duration = '1.4s'
    // const offset = '187'
    return (
        <div className="stroke-white/70 w-20 h-50">
            <svg className="mdspinner"  viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className="mdspinner-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    )
}
