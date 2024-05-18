import { useState } from "react"
import ebml from 'ts-ebml'

const decoder = new ebml.Decoder()


export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={ () => {
                fetch('media/test.webm')
                    .then((res) => res.arrayBuffer())
                    .then((buf) => {
                        const ebmlElms = decoder.decode(buf)
                        console.log(ebmlElms)
                    })
            } }>ooo</button>
        </div>
    )
}
