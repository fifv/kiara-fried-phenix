import { useState } from "react"
// import * as ebml from 'ts-ebml'
/**
 * the 'ts-ebml' is distributed in CJS, while transpiled from ESM
 * It's originally lack export default, so it's expected that the ebml is undefined
 * 
 */
import ebml_NoDefaultSoBeUndefined, { Decoder, version } from 'ts-ebml'

import * as ebml from 'ts-ebml'

console.log(version)
console.log(ebml)
// const decoder = new ebml.Decoder()
const decoder = new Decoder()
const a = Date.now()

export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={ () => {
                fetch('media/test.mkv')
                    .then((res) => res.arrayBuffer())
                    .then((buf) => {
                        const ebmlElms = decoder.decode(buf)
                        console.log(ebmlElms)
                    })
            } }>ooo</button>
        </div>
    )
}
