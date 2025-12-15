import { useState } from "react"
import { autoUpdate, useFloating } from '@floating-ui/react'
import { range } from "lodash-es"
import { clsx } from "clsx"
export default function App() {
    return (<>
        {
            range(100).map((item) => <div key={ item }>
                <ButtonWithTooltip></ButtonWithTooltip>
            </div>)
        }
    </>)

}

function ButtonWithTooltip() {
    const [count, setCount] = useState(0)
    const { refs, floatingStyles } = useFloating({
        whileElementsMounted: autoUpdate,
    })
    return (
        <div className={ clsx(
            ' outline-red-400',
        ) }>
            <button ref={ refs.setReference }>Click Me</button>
            <div ref={ refs.setFloating } style={ floatingStyles }>what's this?</div>
        </div>
    )
}

