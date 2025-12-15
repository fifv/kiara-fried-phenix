import { clsx } from "clsx"
import { useEffect, useState } from "react"

interface Message {
    event: string
    data: any
}

function createWorker<T extends Function>(fn: T) {
    return new Worker(URL.createObjectURL(new Blob(['(', fn.toString(), ')()'], { type: 'application/javascript' })))
}
/**
 * Benchmark:
 * 100_000 postMessage() cost 135ms on 9700x (i.e. ~1us per postMessage())
 */
const worker = createWorker(async () => {
    let ccc = 0
    let ttt = 0

    self.onmessage = async (msg) => {
        // console.log('worker receive:', msg)
        {
            if (msg.data.event === 'count') {
                await new Promise(resolve => setTimeout(resolve, 500))
                self.postMessage({
                    event: "count",
                    data: msg.data.data + 1,
                } satisfies Message)
            } else if (msg.data.event === 'benchmark') {
                ccc++
                if (ccc === 1) {
                    ttt = msg.data.data
                }
                if (ccc === 100_000) {
                    ccc = 0
                    self.postMessage({
                        event: "benchmark",
                        data: Date.now() - ttt,
                    } satisfies Message)
                }
            }
        }
    }
})

export default function App() {
    const [count, setCount] = useState(0)
    const [benchResult, setBenchResult] = useState(0)
    useEffect(() => {
        worker.onmessage = (msg) => {
            console.log('main receive:', msg)
            if (msg.data.event === 'count') {
                setCount(msg.data.data)

            } else if (msg.data.event === 'benchmark') {
                setBenchResult(msg.data.data)
            }
        }
    }, [])
    return (
        <div className={ clsx(
            'font-mono',
        ) }>

            <button onClick={ async () => {
                worker.postMessage({
                    event: "count",
                    data: count,
                    a: await window.queryLocalFonts()
                } satisfies Message)
            } }>fa { count }</button>

            <button onClick={ () => {
                for (let i = 0; i < 100000; i++) {
                    worker.postMessage({
                        event: "benchmark",
                        data: Date.now(),
                    } satisfies Message)
                }
            } }>Bench { benchResult }</button>
        </div>
    )
}
