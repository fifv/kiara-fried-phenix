import clsx from "clsx"
import { useCallback, useEffect, useRef, useState } from "react"
import { memoize } from 'micro-memoize'

export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <TryDrawImage></TryDrawImage>
            <CompareDrawImage></CompareDrawImage>
        </div>
    )
}

/**
 * To render a byte array of RGBA data to canvas:
 * 1. convert to Uint8ClampedArray()
 * 2. wrap with ImageData()
 * 3. putImageData() OR createImageBitmap() then drawImage()
 */
function TryDrawImage() {
    const [count, setCount] = useState(0)
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const refCanvas2 = useRef<HTMLCanvasElement>(null)

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
        }
        const observer = new ResizeObserver(handleResize)
        if (refCanvas.current) {
            observer.observe(refCanvas.current)
        }
        if (refCanvas2.current) {
            observer.observe(refCanvas2.current)
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
            // const width = Math.floor(canvas.width / 2)
            // const height = Math.floor(canvas.height / 4)
            const width = 500
            const height = 500
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
                data[i + 0] = 0xFF * (Math.abs(3 * ((colInRowIndex - width * 1 / 3) % width) / width)) /* * randomOnce *//* Math.random() */ // R
                data[i + 1] = 0xFF * (Math.abs(3 * ((colInRowIndex - width * 2 / 3) % width) / width)) /* * Math.random() */ // G
                data[i + 2] = 0xFF * (Math.abs(3 * (-Math.abs(colInRowIndex - width / 2) + width / 2) / width))/* * Math.random() */ // B
                data[i + 3] = 0xFF /* * Math.random() */ // A
            }

            // initial draw
            /**
             * This will clear rect then draw
             */
            ctx?.putImageData(imageData, 0, 0)
        }
    }
    async function drawImageBitmap() {
        const ctx = refCanvas.current?.getContext('2d')
        if (ctx) {
            // const imageData = ctx?.createImageData(300, 150)
            // // fill our ImageData with noise
            // const data = new Uint32Array(imageData.data.buffer)
            // for (let i = 0; i < data.length; i++) {
            //     data[i] = Math.random() * 0xFFFFFF + 0xFF000000
            // }

            const data = new Uint8ClampedArray(300 * 300 * 4)
            /* the process of pass Uint8ClampedArray to imageData is refer */
            const imageData = new ImageData(data, 300, 300)
            for (let i = 0; i < data.length; i += 4) {
                data[i + 0] = 0x00 * Math.random() // R
                data[i + 1] = 0xFF * Math.random() // G
                data[i + 2] = 0x00 * Math.random() // B
                data[i + 3] = 0x33 /* * Math.random() */ // A
            }
            // initial draw
            /* the process of convert imageData to imageBitmap is copy */
            const imageBitmap = await createImageBitmap(imageData, { resizeQuality: "high", })
            // const imageBitmap = await createImageBitmap(new Blob(data))
            /**
             * This will blend new layer (by alpha)
             */
            ctx?.drawImage(imageBitmap, 0, 0)
        }
    }
    return (
        <div className={ clsx(
            'select-none',
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
            <button onClick={ async () => {
                drawImageBitmap()
            } }
                onPointerMove={ (e) => {
                    if (e.buttons === 1) {
                        drawImageBitmap()
                    }
                } }
            >drawImage(imageBitmap)</button>
            <div className="flex">
                <canvas style={ {
                    /**
                     * This is tricky...
                     * Normally the actual size of canvas is decided by css (100vw, etc.)
                     * But the actual pixels amount is affected by width={ 600 } height={ 400 }
                     * you can fill [R,G,B,A]*600*400, then it is scaled by css! to fit the visual size
                     * 
                     */
                    width: '40vw',
                    height: '60vh'
                } } /* width={ 600 } height={ 400 } */ className={ clsx(
                    "border border-green-400",
                    // '[image-rendering:pixelated]',

                ) } ref={ refCanvas }></canvas>
                <canvas style={ {
                    /**
                     * This is tricky...
                     * Normally the actual size of canvas is decided by css (100vw, etc.)
                     * But the actual pixels amount is affected by width={ 600 } height={ 400 }
                     * you can fill [R,G,B,A]*600*400, then it is scaled by css! to fit the visual size
                     * 
                     */
                    width: '40vw',
                    height: '60vh',
                } } /* width={ 600 } height={ 400 } */ className={ clsx(
                    'border border-green-400',
                    '[image-rendering:pixelated]',
                ) } ref={ refCanvas2 }></canvas>
            </div>
            <button onClick={ async () => {
                const data = new Uint8ClampedArray(300 * 300 * 4)
                const imageData = new ImageData(data, 300, 300)
                for (let i = 0; i < data.length; i += 4) {
                    data[i + 0] = 0xFF * Math.random() // R
                    data[i + 1] = 0x00 /* * Math.random() */ // R
                    data[i + 2] = 0x00 /* * Math.random() */ // R
                    data[i + 3] = 0x33 /* * Math.random() */ // R
                }


                const canvas = refCanvas.current

                const ctx = canvas?.getContext('2d')
                if (canvas && ctx) {
                    console.time('imageBitmap')
                    for (let i = 0; i < 1_000; i++) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        /**
                         * createImageBitmap is extremely slow
                         */
                        const imageBitmap = await createImageBitmap(imageData)
                        ctx.drawImage(imageBitmap, 0, 0)
                    }
                    console.timeEnd('imageBitmap')

                    /* This is always faster */
                    console.time('imageData')
                    for (let i = 0; i < 1_000; i++) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.putImageData(imageData, 0, 0)
                    }
                    console.timeEnd('imageData')
                }


                const canvas2 = refCanvas2.current
                const ctxBitmap = canvas2?.getContext('bitmaprenderer')
                if (canvas2 && ctxBitmap) {
                    console.time('ctxBitmap.transferFromImageBitmap')
                    for (let i = 0; i < 1_000; i++) {
                        const imageBitmap = await createImageBitmap(imageData,/* 0,0,imageData.width,imageData.height */)
                        ctxBitmap.transferFromImageBitmap(imageBitmap,)
                    }
                    console.timeEnd('ctxBitmap.transferFromImageBitmap')
                }
            } }>benchmark</button>
            {/* <img src="src/assets/ttt.c.png" alt="" width={ 9999 } height={ 720 }
                className={ clsx(
                    // '[image-rendering:pixelated]'
                ) } /> */}
        </div >
    )
}

const generateImageData = memoize(function generateImageData(width: number, height: number) {
    const data = new Uint8ClampedArray(width * height * 4)
    /* the process of pass Uint8ClampedArray to imageData is refer */
    for (let i = 0; i < data.length; i += 4) {
        data[i + 0] = 0xFF * Math.random() // R
        data[i + 1] = 0xFF * Math.random() // G
        data[i + 2] = 0xFF * Math.random() // B
        data[i + 3] = 0xFF /* * Math.random() */ // A
    }
    return data
}, {})


function CompareDrawImage() {
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const refCanvas2 = useRef<HTMLCanvasElement>(null)
    const [result1, setResult1] = useState('')
    const [result2, setResult2] = useState('')

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
                    // entry.target.width = 2000
                    // entry.target.height = 2000
                }
            })
        }
        const observer = new ResizeObserver(handleResize)
        if (refCanvas.current) {
            observer.observe(refCanvas.current)
        }
        if (refCanvas2.current) {
            observer.observe(refCanvas2.current)
        }
        return () => {
            observer.disconnect()
        }
    }, [])



    function drawImageData() {
        const canvas = refCanvas.current
        const t1 = performance.now()
        const ctx = canvas?.getContext('2d')
        const t2 = performance.now()
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const data = generateImageData(canvas.width, canvas.height)
            const t3 = performance.now()
            const imageData = new ImageData(data, canvas.width, canvas.height)
            const t4 = performance.now()
            /**
             * This will clear rect then draw
            */
            ctx?.putImageData(imageData, 0, 0)
            const t5 = performance.now()
            setResult1(`getContext: ${(t2 - t1).toFixed(3)}ms generateImageData: ${(t3 - t2).toFixed(3)}ms new ImageData: ${(t4 - t3).toFixed(3)}ms putImageData: ${(t5 - t4).toFixed(3)}ms total: ${(t5 - t1).toFixed(3)}ms`)
        }
    }

    /**
     * In all siturations, to draw an ArrayBuffer on canvas, drawImage(imageBitmap) is always 6x-8x slower than putImageData(imageData)
     * the most time consuming step is createImageBitmap(), which copies data, while the drawImage() call itself is always instant, 
     * but putImageData(imageData) takes the most of time
     * But it has some advantages: it support different resize algorithms, the speed ranges from 35ms to 300ms on 2222x2222 to 4444x4444
     */
    async function drawImageBitmap() {
        const canvas = refCanvas2.current
        const t1 = performance.now()
        const ctx = canvas?.getContext('2d')
        const t2 = performance.now()
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const data = generateImageData(canvas.width, canvas.height)
            const t3 = performance.now()
            const imageData = new ImageData(data, canvas.width, canvas.height)
            const t4 = performance.now()
            /* the process of convert imageData to imageBitmap is copy */
            const imageBitmap = await createImageBitmap(imageData, {
                // resizeQuality: "pixelated", resizeHeight: canvas.height * 2, resizeWidth: canvas.width * 2
            })
            const t5 = performance.now()
            // const imageBitmap = await createImageBitmap(new Blob(data))
            /**
             * This will blend new layer (by alpha)
            */
            ctx?.drawImage(imageBitmap, 0, 0)
            const t6 = performance.now()
            setResult2(`getContext: ${(t2 - t1).toFixed(3)}ms generateImageData: ${(t3 - t2).toFixed(3)}ms new ImageData: ${(t4 - t3).toFixed(3)}ms createImageBitmap: ${(t5 - t4).toFixed(3)}ms drawImage: ${(t6 - t5).toFixed(3)}ms total: ${(t6 - t1).toFixed(3)}ms`)
        }
    }

    return (
        <div className={ clsx(
            'select-none',
        ) }>
            <div className={ clsx(
                'font-bold text-blue-400',
            ) }>CompareDrawImage  </div>
            <button onClick={ () => {
                const canvas = refCanvas.current
                if (canvas) {
                    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
                }
                const canvas2 = refCanvas2.current
                if (canvas2) {
                    canvas2.getContext('2d')?.clearRect(0, 0, canvas2.width, canvas2.height)
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
            <button onClick={ async () => {
                drawImageBitmap()
            } }
                onPointerMove={ (e) => {
                    if (e.buttons === 1) {
                        drawImageBitmap()
                    }
                } }
            >drawImage(imageBitmap)</button>
            <div>{ result1 }</div>
            <div>{ result2 }</div>
            <div className="flex">
                <canvas style={ {
                    /**
                     * This is tricky...
                     * Normally the actual size of canvas is decided by css (100vw, etc.)
                     * But the actual pixels amount is affected by width={ 600 } height={ 400 }
                     * you can fill [R,G,B,A]*600*400, then it is scaled by css! to fit the visual size
                     * 
                     */
                    width: '2000px',
                    height: '2000px'
                } } /* width={ 600 } height={ 400 } */ className={ clsx(
                    "border border-green-400",
                    // '[image-rendering:pixelated]',

                ) } ref={ refCanvas }></canvas>
                <canvas style={ {
                    width: '2000px',
                    height: '2000px',
                } } /* width={ 600 } height={ 400 } */ className={ clsx(
                    'border border-green-400',
                    '[image-rendering:pixelated]',
                ) } ref={ refCanvas2 }></canvas>
            </div>
        </div >

    )
}
