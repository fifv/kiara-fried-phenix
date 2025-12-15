import clsx from "clsx"
import { useState } from "react"
import { P, match } from "ts-pattern"
import { nanoid } from 'nanoid'
import { produce } from "immer"
import { useLocalStorage } from "usehooks-ts"
import { pull, uniq } from "lodash-es"

import './checkout-calculator.css'

interface Player {
    id: string
    name: string
}
interface Entry {
    id: string
    name: string
    consumerIds: string[]
    payerIds: string[]
    amountPerPlayer: number
    // amountInputMode: 'amountOfAll' | 'amountOfEachConsumer' | 'amountOfEachPayer'
}
const emptyEntryTemplateGenerator = (): Entry => {
    return {
        consumerIds: [],
        id: nanoid(6),
        name: "",
        payerIds: [],
        amountPerPlayer: 0,
    }
}
const emptyPlayerTemplateGenerator = (): Player => {
    return {
        name: "",
        id: nanoid(6),
    }
}
export default function App() {
    const [count, setCount] = useState(0)
    const [players, setPlayers] = useLocalStorage<Player[]>('checkout-calculator/players', [])
    const [entries, setEntries] = useLocalStorage<Entry[]>('checkout-calculator/entries',
        Array(3).fill(0).map((item) => emptyEntryTemplateGenerator())
    )


    return (
        <div id="CheckoutCalculator">
            <div className={ clsx(
                'flex items-center m-2',
            ) }>
                <button className={ clsx(
                    'w-24 h-8',
                ) } onClick={ () => {
                    setPlayers((entries) => [
                        emptyPlayerTemplateGenerator(),
                        ...entries,
                    ])
                } }>+ Player</button>
                {
                    players.map((player, i) => {
                        return (
                            <div className={ clsx(
                                'relative',
                            ) }>
                                <input
                                    className={ clsx(
                                        'input',
                                        'w-24 ',
                                        'rounded py-1 px-2 mx-1 font-mono outline outline-white/20',
                                    ) }
                                    value={ player.name }
                                    onChange={ (e) => {
                                        player.name = e.currentTarget.value
                                        setPlayers(players.slice())
                                    } }
                                ></input>
                                <button
                                    className={ clsx(
                                        'py-0 px-0 mx-0 h-6 w-6 p-0 m-12',
                                        'absolute right-2 top-1/2 -translate-y-1/2',
                                    ) }
                                    onClick={ () => {
                                        players.splice(i, 1)
                                        setPlayers(players.slice())
                                    } }
                                >×</button>
                            </div>
                        )
                    })
                }
            </div>

            <div className={ clsx(
                'w-2/3',
            ) }>
                <button className={ clsx(
                    'bg-green-600 m-2 w-32',
                ) } onClick={ () => {
                    setEntries((entries) => [
                        emptyEntryTemplateGenerator(),
                        ...entries,
                    ])
                } }>+ Entry</button>


                {
                    entries.map((entry, i) => {
                        const consumersCount = entry.consumerIds.length
                        return (
                            <div className={ clsx(
                                'm-2 rounded bg-slate-500/5 p-2',
                            ) }>
                                <div className={ clsx(
                                    'flex items-center gap-1',
                                ) }>
                                    <button
                                        className={ clsx(
                                            'py-0 px-2 mx-2',
                                        ) }
                                        onClick={ () => {
                                            entries.splice(i, 1)
                                            setEntries(entries.slice())
                                        } }
                                    >×</button>
                                    在<input
                                        className={ clsx(
                                            'rounded py-1 px-2 mx-1 font-mono min-w-[100px]',
                                        ) }
                                        value={ entry.name }
                                        onChange={ (e) => {
                                            entry.name = e.currentTarget.value
                                            setEntries(entries.slice())
                                        } }
                                    ></input>
                                    上,
                                    <div className={ clsx(
                                        'flex flex-col gap-1 shrink-0',
                                    ) }>
                                        {
                                            players.map((player) => {
                                                const isSelected = entry.consumerIds.includes(player.id)
                                                return (
                                                    <div className={ clsx(
                                                        'border rounded px-1 select-none cursor-pointer ',
                                                        !isSelected && 'text-white/30 border-white/10',
                                                        isSelected && 'border-white/30 bg-green-600',
                                                    ) }
                                                        onClick={ () => {
                                                            if (isSelected) {
                                                                pull(entry.consumerIds, player.id)
                                                                setEntries(entries.slice())
                                                            } else {
                                                                entry.consumerIds.push(player.id)
                                                                entry.consumerIds = uniq(entry.consumerIds)
                                                                setEntries(entries.slice())
                                                            }
                                                        } }
                                                    >{ player.name }</div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="shrink-0">消費了</div>

                                    <div className={ clsx(
                                        'flex flex-col mx-2 shrink-0',
                                    ) }>
                                        <div>每人<input
                                            disabled={ consumersCount === 0 }
                                            className={ clsx(
                                                '',
                                                consumersCount === 0 && 'text-white/30 text-xs italic',
                                                'rounded h-6 px-2 mx-1 font-mono w-28',
                                            ) }
                                            value={
                                                consumersCount > 0
                                                    ? (entry.amountPerPlayer).toFixed(1)
                                                    : '請先選擇消費者'
                                            }
                                            onChange={ (e) => {
                                                entry.amountPerPlayer = parseFloat(e.currentTarget.value)
                                                if (isNaN(entry.amountPerPlayer)) {
                                                    entry.amountPerPlayer = 0
                                                }
                                                setEntries(entries.slice())
                                            } }
                                        ></input>¥</div>
                                        <div>總計<input
                                            disabled={ consumersCount === 0 }
                                            className={ clsx(
                                                consumersCount === 0 && 'text-white/30 text-xs italic',
                                                'rounded h-6 px-2 mx-1 font-mono w-28',
                                            ) }
                                            value={
                                                consumersCount > 0
                                                    ? (entry.amountPerPlayer * consumersCount).toFixed(1)
                                                    : '請先選擇消費者'
                                            }
                                            onChange={ (e) => {
                                                entry.amountPerPlayer = parseFloat(e.currentTarget.value) / consumersCount
                                                if (isNaN(entry.amountPerPlayer)) {
                                                    entry.amountPerPlayer = 0
                                                }
                                                setEntries(entries.slice())
                                            } }
                                        ></input>¥</div>
                                    </div>

                                    由
                                    <div className={ clsx(
                                        'flex flex-col gap-1 shrink-0',
                                    ) }>
                                        {
                                            players.map((player) => {
                                                const isSelected = entry.payerIds.includes(player.id)
                                                return (
                                                    <div className={ clsx(
                                                        'border rounded px-1 select-none cursor-pointer ',
                                                        !isSelected && 'text-white/30 border-white/10',
                                                        isSelected && 'border-white/30 bg-green-600',
                                                    ) }
                                                        onClick={ () => {
                                                            if (isSelected) {
                                                                pull(entry.payerIds, player.id)
                                                                setEntries(entries.slice())
                                                            } else {
                                                                entry.payerIds.push(player.id)
                                                                entry.payerIds = uniq(entry.payerIds)
                                                                setEntries(entries.slice())
                                                            }
                                                        } }
                                                    >{ player.name }</div>
                                                )
                                            })
                                        }
                                    </div>
                                    墊付
                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <div className={ clsx(
                'fixed top-12 right-24',
            ) }>
                {
                    players.map((player) => {
                        let consumedAmount = 0
                        let paidAmount = 0
                        for (const entry of entries) {
                            if (entry.consumerIds.includes(player.id)) {
                                consumedAmount += entry.amountPerPlayer
                            }
                            if (entry.payerIds.includes(player.id)) {
                                paidAmount += entry.amountPerPlayer * entry.consumerIds.length / entry.payerIds.length
                            }
                        }
                        const shouldPayAmount = consumedAmount - paidAmount
                        return (
                            <div className={ clsx(
                                'bg-slate-400/5 rounded px-2 select-none cursor-pointer  m-2 p-2',
                            ) }
                                onClick={ () => {

                                } }
                            >
                                <div className={ clsx(
                                    'font-bold',
                                ) }>{ player.name }</div>

                                <div className="flex items-center gap-1">
                                    <div className="text-xs text-white/50">消費</div>
                                    <div className="font-mono font-bold">{ consumedAmount.toFixed(1) }</div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <div className="text-xs text-white/50">實付</div>
                                    <div className="font-mono font-bold"> { paidAmount.toFixed(1) }</div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <div className="text-xs text-white/50">{ shouldPayAmount > 0 ? '還要再付' : '收款' }</div>
                                    <div className={ clsx(
                                        'font-mono font-bold',
                                        shouldPayAmount > 0 ? 'text-red-400' : 'text-green-400  ',
                                    ) }>{ Math.abs(shouldPayAmount).toFixed(1) }</div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


