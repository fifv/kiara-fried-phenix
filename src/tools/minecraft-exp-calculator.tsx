import clsx from "clsx"
import { useState } from "react"
import { useLocalStorage } from "usehooks-ts"
interface HistoryEntry {
    expLevel: number
    totalExp: number
}
export default function App() {

    const [histories, setHistories] = useLocalStorage<HistoryEntry[]>('calc/histories', [])
    const [expLevelInput, setExpLevelInput] = useLocalStorage('calc/expLevelInput', '30')
    const expLevel = (() => {
        const expLevel = parseInt(expLevelInput)
        return isNaN(expLevel) ? 0 : expLevel
    })()
    const totalExp = (() => {
        if (expLevel >= 0 && expLevel < 17) {
            return expLevel ** 2 + 6 * expLevel
        } else if (expLevel >= 17 && expLevel < 32) {
            return 2.5 * expLevel ** 2 - 40.5 * expLevel + 360
        } else if (expLevel >= 32) {
            return 4.5 * expLevel ** 2 - 162.5 * expLevel + 2220
        } else {
            return 0
        }
    })()
    return (
        <div className="m-4">
            <div className="font-bold text-green-300 mt-2">Exp Level</div>
            <input
                type='text' id='value' value={ expLevelInput }
                className={ clsx(
                    'rounded px-2 font-mono',
                ) }
                onChange={ (e) => setExpLevelInput(e.currentTarget.value) }
                onKeyDown={ (e) => {
                    if (e.key === 'Enter') {
                        setHistories((histories) => [
                            {
                                expLevel,
                                totalExp,
                            },
                            ...histories,
                        ])
                    } else if (e.code === 'ArrowUp') {
                        e.preventDefault()
                        setExpLevelInput(expLevel + 1 + '')
                    } else if (e.code === 'ArrowDown') {
                        e.preventDefault()
                        setExpLevelInput(expLevel - 1 + '')
                    }
                } }
                onWheel={ (e) => {

                    let multi = 1
                    if (e.altKey) {
                        multi = 10
                    }
                    if (e.deltaY > 0) {
                        setExpLevelInput(expLevel - multi + '')
                    } else {
                        setExpLevelInput(expLevel + multi + '')
                    }
                } }
            />
            <div className="font-bold text-green-300 mt-2">Total Exp</div>
            <div className="font-mono">{ totalExp }</div>
            <div className="flex justify-start items-center mt-2 gap-4">
                <div className="font-bold text-green-300 ">Histories</div>
                {
                    histories.length > 0 &&
                    <button className="text-xs py-0.5 bg-gray-700/50 inline-block"
                        onClick={ () => {
                            setHistories([])
                        } }
                    >Clear</button>

                }
            </div>
            {
                !(histories.length > 0) &&
                <div className="italic opacity-25 text-xs">Press Enter to Log Result Here</div>
            }
            {
                histories.map((history, index) => (
                    <div className="flex justify-start items-center gap-4">
                        <button className="text-xs py-0.5 px-0.5 bg-gray-700/20 inline-block"
                            onClick={ () => {
                                setHistories((histories) => {
                                    const newHistories = histories.slice()
                                    newHistories.splice(index, 1)
                                    return newHistories
                                })
                            } }
                        >🧹</button>
                        <div className="min-w-[192px] font-mono">{ history.expLevel } { "->" } { history.totalExp }</div>
                    </div>
                ))
            }
        </div>
    )
}
