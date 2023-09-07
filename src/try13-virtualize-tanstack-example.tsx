import React, { useCallback, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import {
    elementScroll,
    useVirtualizer,
    VirtualizerOptions,
} from '@tanstack/react-virtual'

function easeInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}
function VirList() {
    const parentRef = useRef<HTMLDivElement | null>(null)
    const scrollingRef = useRef<number>()

    const scrollToFn: VirtualizerOptions<any, any>['scrollToFn'] =
        useCallback((offset, canSmooth, instance) => {
            const duration = 1000
            const start = parentRef.current.scrollTop
            const startTime = (scrollingRef.current = Date.now())

            const run = () => {
                if (scrollingRef.current !== startTime) return
                const now = Date.now()
                const elapsed = now - startTime
                const progress = easeInOutQuint(Math.min(elapsed / duration, 1))
                const interpolated = start + (offset - start) * progress

                if (elapsed < duration) {
                    elementScroll(interpolated, canSmooth, instance)
                    requestAnimationFrame(run)
                } else {
                    elementScroll(interpolated, canSmooth, instance)
                }
            }

            requestAnimationFrame(run)
        }, [])

    const rowVirtualizer = useVirtualizer({
        count: 10000,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 20,
        scrollToFn,
    })

    const randomIndex = Math.floor(Math.random() * 10000)

    const VirList_ =
        <>
            <p>
                This smooth scroll example uses the <code>`scrollToFn`</code> to
                implement a custom scrolling function for the methods like{ ' ' }
                <code>`scrollToIndex`</code> and <code>`scrollToOffset`</code>
            </p>
            <div>
                <button onClick={ () => rowVirtualizer.scrollToIndex(randomIndex) }>
                    Scroll To Random Index ({ randomIndex })
                </button>
            </div>
            <div
                ref={ parentRef }
                className="List border border-red-600"
                style={ {
                    height: `200px`,
                    width: `400px`,
                    overflow: 'auto',
                } }
            >
                <div
                    style={ {
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    } }
                >
                    { rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <div
                            key={ virtualRow.index }
                            className={ virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven' }
                            style={ {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                                transform: `translateY(${virtualRow.start}px)`,
                            } }
                        >
                            Row { virtualRow.index }
                        </div>
                    )) }
                </div>
            </div>
        </>
    return VirList_

}

export default function App() {
    const [isActive, setIsActive] = useState(true)
    return (
        <div>

            <button onClick={ () => {
                setIsActive((x) => (!x))
            } }>{ isActive.toString() }</button>


            { isActive && <VirList></VirList> }

            <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima sunt autem nulla perspiciatis atque eligendi aliquam consectetur labore amet necessitatibus. Ipsam, nesciunt veniam ad vel fugit pariatur repellat nobis dolore.
            </div>
        </div>
    )

}

