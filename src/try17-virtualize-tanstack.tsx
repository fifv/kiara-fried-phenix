import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { useEffect, useRef, useState, } from "react"
import './try17-virtualize-tanstack.scss'
import clsx from "clsx"
import { range } from "lodash-es"
export function AppManualLane() {
    console.log('re-render')


    const [count, setCount] = useState(0)
    const refContainer = useRef<HTMLDivElement>(null)

    const [containerWidth, setContainerWidth] = useState(window.innerWidth)
    const data = range(100)
    const ELEM_WIDTH = 200
    const countPerRow = Math.floor(containerWidth / ELEM_WIDTH) || 2
    const rowsCount = Math.ceil(data.length / countPerRow)

    useEffect(() => {
        function handleResize() {
            console.log('refContainer.current?.getClientRects().item(0)?.width:', refContainer.current?.getClientRects().item(0)?.width)
            setContainerWidth(refContainer.current?.getClientRects().item(0)?.width ?? window.innerWidth)
        }
        addEventListener('resize', handleResize)
        return () => {
            removeEventListener('resize', handleResize)
        }
    }, [])

    const rowVirtualizer = useWindowVirtualizer({
        count: rowsCount,
        // getScrollElement: () => (),
        estimateSize: () => 100,
        overscan: 10,
        paddingStart: 50,
        paddingEnd: 50,
    })

    return (
        <div
            className={ clsx(
                /**
                 * shit. container IS a tailwind layout component
                 */
                'scrollContainer w-full relative border pt-10',
            ) }
            ref={ refContainer }
            style={ {
                height: `${rowVirtualizer.getTotalSize()}px`,
            } }
        >
            <div className={ clsx(
                'border',
            ) }>test</div>
            {/* Only the visible items in the virtualizer, manually positioned to be in view */ }
            {
                rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    const rowData = data.slice(virtualItem.index * countPerRow, (virtualItem.index + 1) * countPerRow)

                    return <div
                        className={
                            clsx(
                                'row  flex justify-center flex-nowrap w-full',
                            ) }
                        key={ virtualItem.key }
                        style={ {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: `${virtualItem.size}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                        } }
                    >
                        <div className={ clsx(
                            'absolute top-12',
                        ) }>

                            Row { virtualItem.index }
                        </div>

                        {

                            rowData.map((rowDatum, index) => (
                                <div className={ clsx(
                                    'p-2',
                                ) }
                                    style={ {
                                        width: `${ELEM_WIDTH}px`,
                                    } }>

                                    <div className={ clsx(
                                        'border h-full rounded',
                                    ) }

                                    >
                                        { rowDatum }
                                    </div>
                                </div>
                            ))

                        }

                    </div>
                })
            }
        </div>
    )
}
/**
 * seems hard to use
 * it can't adapt to `lanes: countPerRow` dynamically
 * and since use `left` to position items, it is hard to centerize items
 */
export default function AppBuiltinLane() {
    console.log('re-render')


    const [count, setCount] = useState(0)
    const refContainer = useRef<HTMLDivElement>(null)

    const [containerWidth, setContainerWidth] = useState(window.innerWidth)
    const data = range(100)
    const ELEM_WIDTH = 200
    const countPerRow = Math.floor(containerWidth / ELEM_WIDTH) || 2
    const rowVirtualizer = useWindowVirtualizer({
        count: data.length,
        // getScrollElement: () => (),
        estimateSize: () => 100,
        overscan: 10,
        paddingStart: 50,
        paddingEnd: 50,
        lanes: countPerRow,
    })
    useEffect(() => {
        function handleResize() {
            console.log('refContainer.current?.getClientRects().item(0)?.width:', refContainer.current?.getClientRects().item(0)?.width)
            setContainerWidth(refContainer.current?.getClientRects().item(0)?.width ?? window.innerWidth)
        }
        addEventListener('resize', handleResize)
        return () => {
            removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
    }, [])



    return (
        <div
            className={ clsx(
                /**
                 * shit. container IS a tailwind layout component
                 */
                'scrollContainer w-full relative border pt-10',
            ) }
            ref={ refContainer }
            style={ {
                height: `${rowVirtualizer.getTotalSize()}px`,
            } }
        >
            <div className={ clsx(
                'border',
            ) }>test</div>
            {/* Only the visible items in the virtualizer, manually positioned to be in view */ }
            {
                rowVirtualizer.getVirtualItems().map((virtualItem) => {
                    // const rowData = data.slice(virtualItem.index * countPerRow, (virtualItem.index + 1) * countPerRow)

                    return <div
                        className={
                            clsx(
                                'row  flex justify-center flex-nowrap',
                            ) }
                        key={ virtualItem.key }
                        style={ {
                            position: 'absolute',
                            top: 0,
                            left: `${virtualItem.lane * ELEM_WIDTH}px`,
                            height: `${virtualItem.size}px`,
                            width: `${ELEM_WIDTH}px`,
                            transform: `translateY(${virtualItem.start}px)`,
                        } }
                    >
                        <div className={ clsx(
                            'absolute top-12',
                        ) }>

                            Row { virtualItem.index }
                        </div>

                        <div className={ clsx(
                            'p-2',
                        ) }
                            style={ {
                                width: `${ELEM_WIDTH}px`,
                            } }>

                            <div className={ clsx(
                                'border h-full rounded',
                            ) }

                            >
                            </div>
                        </div>

                    </div>
                })
            }
        </div>
    )
}
