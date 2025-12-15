import { clsx } from "clsx"
import { useRef, useState } from "react"
export default function App() {
    const [count, setCount] = useState(0)
    const refDivRef = useRef<HTMLDivElement>(null!)
    const refDivRef2 = useRef<HTMLVideoElement>(null!)
    return (
        <div>
            <div className={ clsx(
                'outline outline-red-400 bg-yellow-300',
            ) } ref={refDivRef}>asdfa</div>
            <video controls ref={refDivRef2} src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" className={ clsx(
                'bg-blue-400',
            ) }></video>
            <button  onClick={() => {
                refDivRef2.current.requestFullscreen()
                // refDivRef.current.webkitEnterFullscreen()
            }}>requestFullscreen</button>
            <button  onClick={() => {
                // refDivRef.current.requestFullscreen()
                // refDivRef.current.webkitEnterFullscreen()
                refDivRef2.current.webkitEnterFullscreen()
            }}>webkitEnterFullscreen</button>
        </div>
    )
}
