import { atom, useAtom } from "jotai"
import { useState } from "react"
import { DevTools as JotaiDevTools } from 'jotai-devtools'
import jotaiDevToolsCss from 'jotai-devtools/styles.css?inline'

const anAtom = atom(0)
anAtom.onMount = (setAtom) => {
    /**
     * of course, this will cause addtional re-render, just like useEffect
     */
    setAtom((x) => x + 1)
    return () => {
        setAtom((x) => x + 1)
    }
}
const isActiveAtom = atom(false)
function TryAtom() {
    const [an, setAn] = useAtom(anAtom)
    const [b, setB] = useAtom(bAtom)
    return (
        <div>
            { an }
            <div>
                <button onClick={ () => {
                    setAn((x) => x + 1)
                    setB()
                } }>+1</button>
            </div>
        </div>
    )
}
/**
 * the `new WeakMap()` will only be created when the `bAtom` first used, then it never invoked
 * as this `bAtom` did't depend on any other atoms.
 * 
 * `set` also didn't invoke `get`
 */
const bAtom = atom(
    (get) => {
        console.log('new WeakMap() when get bAtom')
        return new WeakMap()
    },
    (get, set) => {
        console.log('set in bAtom')
    }
)
export default function App() {
    const [count, setCount] = useState(0)
    const [isActive, setIsActive] = useAtom(isActiveAtom)
    // const [an, setAn] = useAtom(anAtom)
    return (
        <div>
            <button onClick={ () => {
                setIsActive((x) => (!x))
            } }>{ isActive ? 'ON' : 'OFF' }</button>
            {
                isActive &&
                <TryAtom></TryAtom>
            }
            <style>{ jotaiDevToolsCss }</style>
            <JotaiDevTools theme="dark"></JotaiDevTools>
        </div>
    )
}
