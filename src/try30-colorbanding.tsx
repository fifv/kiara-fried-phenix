import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
/**
 * To render a byte array of RGBA data to canvas:
 * 1. convert to Uint8ClampedArray()
 * 2. wrap with ImageData()
 * 3. putImageData() OR createImageBitmap() then drawImage()
 */
export default function App() {
    const refCanvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        function handleResize(entries: ResizeObserverEntry[]) {
            console.log('resize:', entries)
            entries.forEach((entry) => {
                if (entry.target instanceof HTMLCanvasElement) {
                    /**
                     * resize canvas will clear it
                     */
                    entry.target.width = (entry.devicePixelContentBoxSize[0]?.inlineSize ?? 0) / 1
                    entry.target.height = (entry.devicePixelContentBoxSize[0]?.blockSize ?? 0) / 1
                }
            })
            drawImageData()
        }
        const observer = new ResizeObserver(handleResize)
        if (refCanvas.current) {
            observer.observe(refCanvas.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [])
    function drawImageData() {
        const canvas = refCanvas.current
        const ctx = canvas?.getContext('2d')
        if (canvas && ctx) {
            // const imageData = ctx?.createImageData(300, 150)
            // /* fill our ImageData with noise */
            // const data = new Uint32Array(imageData.data.buffer)
            // for (let i = 0; i < data.length; i++) {
            //     data[i] = Math.random() * 0xFFFFFF + 0xFF000000
            //     /* ehh... ABGR? */
            //     // data[i] = 0xFF0000FF
            // }
            const width = Math.floor(canvas.width / 1)
            const height = Math.floor(canvas.height / 4)
            // const width = 500
            // const height = 500
            console.log('canvas:', 'width', canvas.width, 'height', canvas.height, 'render: ', 'width', width, 'height', height)
            const data = new Uint8ClampedArray(width * height * 4)
            const imageData = new ImageData(data, width, height)
            // for (let i = 0; i < data.length; i += 4) {
            //     /* Note here is data, not imageData */
            //     data[i + 0] = 0x00 /* * Math.random() */ // R
            //     data[i + 1] = 0xFF /* * Math.random() */ // G
            //     data[i + 2] = 0x00 /* * Math.random() */ // B
            //     data[i + 3] = 0x33 /* * Math.random() */ // A
            // }
            // for (let i = 0; i < data.length; i += 4) {
            //     /* grid */
            //     const pixelIndex = ~~(i / 4)
            //     const rowIndex = ~~(pixelIndex / width)
            //     const colInRowIndex = pixelIndex % width
            //     data[i + 0] = 0x00 /* * Math.random() */ // R
            //     data[i + 1] = 0xFF * +((colInRowIndex % 8 < 4 ? 0 : 1) !== (rowIndex % 8 < 4 ? 0 : 1)) /* * Math.random() */ // G
            //     data[i + 2] = 0x00 /* * Math.random() */ // B
            //     data[i + 3] = 0xFF /* * Math.random() */ // A
            // }
            let randomOnce = Math.random()
            // for (let i = 0; i < data.length; i += 4) {
            //     /* rainbow */
            //     const pixelIndex = ~~(i / 4)
            //     const rowIndex = ~~(pixelIndex / width)
            //     const colInRowIndex = pixelIndex % width
            //     data[i + 0] = 0xFF * (2 - (rowIndex / height + colInRowIndex / width)) /* * randomOnce *//* Math.random() */ // R
            //     data[i + 1] = 0xFF * (rowIndex / height) /* * Math.random() */ // G
            //     data[i + 2] = 0xFF * ((colInRowIndex /* + randomOnce * width */) % width / width)/* * Math.random() */ // B
            //     data[i + 3] = 0xFF /* * Math.random() */ // A
            // }
            for (let i = 0; i < data.length; i += 4) {
                /* rainbow */
                const pixelIndex = ~~(i / 4)
                const rowIndex = ~~(pixelIndex / width)
                const colInRowIndex = pixelIndex % width
                // data[i + 0] = 0xFF * (Math.abs(3 * ((colInRowIndex - width * 1 / 3) % width) / width)) /* * randomOnce *//* Math.random() */ // R
                // data[i + 1] = 0xFF * (Math.abs(3 * ((colInRowIndex - width * 2 / 3) % width) / width)) /* * Math.random() */ // G
                // data[i + 2] = 0xFF * (Math.abs(3 * (-Math.abs(colInRowIndex - width / 2) + width / 2) / width))/* * Math.random() */ // B
                // data[i + 3] = 0xFF /* * Math.random() */ // A
                const grayMin = 0x0
                // const grayMax = 0x7F
                const grayMax = 0x40
                // const grayMax = 0x100
                if (rowIndex < 8) {
                    data[i + 0] = 0xFF
                    data[i + 1] = 0xFF
                    data[i + 2] = 0xFF
                    data[i + 3] = (colInRowIndex % Math.round(width / (grayMax - grayMin + 1)) === 0) ? 0xFF : 0x0
                } else {
                    // data[i + 0] = grayMin + Math.ceil((grayMax - grayMin) * (colInRowIndex / width)) /* * randomOnce *//* Math.random() */ // R
                    // data[i + 1] = grayMin + Math.ceil((grayMax - grayMin) * (colInRowIndex / width)) /* * randomOnce *//* Math.random() */ // R
                    // data[i + 2] = grayMin + Math.ceil((grayMax - grayMin) * (colInRowIndex / width)) /* * randomOnce *//* Math.random() */ // R
                    data[i + 0] = grayMin + ~~(colInRowIndex / Math.round(width / (grayMax - grayMin + 1))) /* * randomOnce *//* Math.random() */ // R
                    data[i + 1] = grayMin + ~~(colInRowIndex / Math.round(width / (grayMax - grayMin + 1))) /* * randomOnce *//* Math.random() */ // R
                    data[i + 2] = grayMin + ~~(colInRowIndex / Math.round(width / (grayMax - grayMin + 1))) /* * randomOnce *//* Math.random() */ // R
                    // data[i + 1] = 0xFF * (Math.abs(3 * ((colInRowIndex - width * 2 / 3) % width) / width)) /* * Math.random() */ // G
                    // data[i + 2] = 0xFF * (Math.abs(3 * (-Math.abs(colInRowIndex - width / 2) + width / 2) / width))/* * Math.random() */ // B
                    data[i + 3] = 0xFF /* * Math.random() */ // A
                }
            }

            // initial draw
            /**
             * This will clear rect then draw
             */
            ctx?.putImageData(imageData, 0, 0)
        }
    }

    return (
        <div className={ clsx(
            'select-none',
            'bg-black',
        ) }>
            <button onClick={ () => {
                const canvas = refCanvas.current
                if (canvas) {
                    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
                }
            } }
            >X</button>
            <button onClick={ () => {
                drawImageData()
            } }
                onPointerMove={ (e) => {
                    if (e.buttons === 1) {
                        drawImageData()
                    }
                } }
            >putImageData(imageData)</button>

            <div className="flex">
                <canvas style={ {
                    /**
                     * This is tricky...
                     * Normally the actual size of canvas is decided by css (100vw, etc.)
                     * But the actual pixels amount is affected by width={ 600 } height={ 400 }
                     * you can fill [R,G,B,A]*600*400, then it is scaled by css! to fit the visual size
                     * 
                     */
                    width: '99vw',
                    // width: '999px',
                    height: '60vh'
                } } /* width={ 600 } height={ 400 } */ className={ clsx(
                    "border border-green-400",
                    // '[image-rendering:pixelated]',

                ) } ref={ refCanvas }></canvas>

            </div>

            <div className={ clsx(
                'border border-green-400 w-[99vw] h-24',
                'bg-linear-to-r from-black ',
                // 'to-white',
                'to-[#404040]'
            ) }></div>

            <div className={ clsx(
                'w-screen h-screen',
            ) }></div>
            <PureColorTester />
        </div >
    )
}


function PureColorTester() {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    return (
        <div className={ clsx(
            'w-screen h-screen relative',
        ) }
            style={ {
                // background: `rgb( ${count / 100 * 255}, ${count / 100 * 255}, ${count / 100 * 255})`
            } }
        >
            <input type="range" className={ clsx(
                '',
                '',
            ) }
                onChange={ (e) => {
                    setCount(e.currentTarget.valueAsNumber)
                } }
                value={ count }
            />
            <input type="range" className={ clsx(
                '',
                '',
            ) }
                onChange={ (e) => {
                    setCount2(e.currentTarget.valueAsNumber)
                } }
                value={ count2 }
            />
            <div
                className={ clsx(
                    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    'w-24 h-24',
                ) }
                style={ {
                    background: `rgb( ${count / 100 * 255}, ${count / 100 * 255}, ${count / 100 * 25500})`,
                    width: count2 * 10,
                    height: count2 * 10,
                } }
            ></div>


        </div>
    )
}
