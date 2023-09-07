/**
 * This file is hard linked between kfp and bgp..?
 */
import clsx from "clsx"
import { clamp } from "lodash-es"
import { RefObject, useEffect, useRef, useState } from "react"
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
// import { svg } from '../../bangumi-player/client/src/components/Icons'
const svg = {
    leftDouble: <FiChevronsLeft />,
    rightDouble: <FiChevronsRight />,
}
export default function Test() {
    const [value1, setValue1] = useState(0.5) /* 0~1 */
    const [value2, setValue2] = useState(0.5) /* 0~1 */
    const [isSliderPointerDown, setIsSliderPointerDown] = useState(false)
    const [valueDelta, setValueDelta] = useState(0)
    /**
     *  FIX\ME: delta不準確
     * 如果setValue1((s) => s + valueDelta),還偶爾出現上萬的delta -_-||
     * ..........淦,是chrome dev 111.0.5545.3的bug
     * 在canary 111.0.5563.0和vavildi裡面都是非常正常
     * 恩?重裝了dev然後...好了..???
     * 到底是誰的bug,在beta裡也出現了,然後重啟就沒了
     */
    return (
        <div className="w-screen h-[calc(100vh-70px)] border border-red-600">
            <Slider
                className="absolute h-20 w#-5/6 m-2 bottom-0 left-20 right-20"
                isVertical={ false }
                value={ value1 }
                onValueChange={ (newValue, isPointerDown: boolean, newValueDelta: number) => {
                    // setValue1((s) => s + newValueDelta)
                    // setValue1(value1 + newValueDelta)
                    setValue1(newValue)
                    setIsSliderPointerDown(isPointerDown)
                    if (isSliderPointerDown) {
                        setValueDelta((s) => s + newValueDelta)
                    } else {
                        setValueDelta(newValueDelta)
                    }
                    // if (Math.abs(newValueDelta) > 1) {
                    //     console.log(isPointerDown, newValue, newValueDelta)
                    // }
                    console.log(
                        isPointerDown,
                        'newValueDelta', newValueDelta,
                        'value1', value1,
                        'newValue', newValue,
                        'value1 + newValueDelta', value1 + newValueDelta,
                        newValue === value1 + newValueDelta ? '' : 'diff',
                        Math.abs(newValueDelta) > 1 ? 'bigggggg' : '',
                    )
                } }
                isShowDebugInfo
                bufferedPercentRanges={ [
                    {
                        start: 0.5,
                        end: 0.8
                    },
                    {
                        start: 0.2,
                        end: 0.3
                    },
                ] }
            />
            <Slider
                className="absolute h#-5/6 w-20 m-2 left-0 bottom-10 top-10"
                isVertical={ true }
                value={ value2 }
                onValueChange={ (newValue, isPointerDown: boolean, newValueDelta: number) => {
                    setValue2(newValue)
                    setIsSliderPointerDown(isPointerDown)
                    setValueDelta(newValueDelta)
                    console.log(isPointerDown, newValue, newValueDelta)
                } }
                isShowDebugInfo
                bufferedPercentRanges={ [
                    {
                        start: 0.7,
                        end: 0.8
                    },
                    {
                        start: 0.2,
                        end: 0.3
                    },
                ] }
            />
            <DeltaIndicator
                isVisiable={ isSliderPointerDown && valueDelta !== 0 }
                position={
                    false
                    || (valueDelta < 0 && 'left')
                    || (valueDelta > 0 && 'right')
                    || ('center')
                }
            >
                <div className="flex items-center justify-center gap-1 font-serif">
                    { valueDelta < 0 && svg.leftDouble }
                    { valueDelta.toFixed(3) }
                    { valueDelta > 0 && svg.rightDouble }
                </div>

            </DeltaIndicator>




        </div >
    )
}
export function DeltaIndicator({ isVisiable, children, position = 'center' }: {
    isVisiable: boolean,
    children?: React.ReactNode,
    position?: 'left' | 'center' | 'right',
}) {
    return (
        <div className={ clsx(
            "DeltaIndicator fixed top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-600/40 text-white/60 px-3 py-1 rounded  pointer-events-none",
            '',
            isVisiable
                ? "opacity-1 #transition-[left]"
                : 'opacity-0 transition-opacity '
            ,
            false
            || (position === 'center' && 'left-1/2 ')
            || (position === 'left' && 'left-1/3 ')
            || (position === 'right' && 'left-2/3 ')
            ,
        ) }>{ children }</div>
    )
}
/**
 * 默認沒有 position,height,width, 請用className自己加
 * You should check valueDelta!==0 to fire event
 */
export function Slider({ isShowSlider = true, isDisableMouse = false, bufferedPercentRanges, children, isVertical, className, value, isShowDebugInfo: isDebug, onValueChange, onWheel }: {
    isShowSlider?: boolean,
    isVertical: boolean,
    className?: string,
    /**
     * 0~1
     */
    value: number,
    children?: React.ReactNode,
    isShowDebugInfo?: boolean,
    isDisableMouse?: boolean,
    bufferedPercentRanges?: {
        start: number,
        end: number
    }[]
    // ratio?: number
    // setValue
    onValueChange: (newValue: number, isPointerDown: boolean, newValueDelta: number) => void,
    // onIndicatorChange?: (isShowIndicator: boolean, valueDelta: number) => void,
    onWheel?: (e: React.WheelEvent) => void,
}) {

    /**
     * when able to touch, disable all mouse event
     */
    const [isAbleTouch, setIsAbleTouch] = useState(false)
    const refIsPointerDown = useRef(false)
    // const [value, setValue] = useState(0.5) /* 0~1 */
    const [valueShadow, setValueHover] = useState(0) /* 0~1 */
    const refPrevTouch = useRef<Touch | null>(null)
    const refActionArea = useRef<HTMLDivElement>(null)
    const _____Functions_____ = 0

    /**
     * TO\DO: 滑鼠按住移動上去不要觸發,太容易誤觸了
     * TO\DO: 按住後可以自由拖動,不要離開就無效了.可能和什麼pointer capture有關
     * 
     * FIX\ME: 目前有細微bug:如果拖的時候按右鍵,不能取消slide
     */
    function hanldePointerEvent(e: React.PointerEvent) {
        /**
         * 原來Pointer有這個pointerType判斷
         */
        /**
         * 只有無按鍵或者按左鍵,其他鍵都不行
         * e.buttons === 0B00000001 || e.buttons === 0B00000000
         * e.buttons & ~0B00000001
         */
        if (e.pointerType === 'mouse') {
            e.stopPropagation()
            // if (!isAbleTouch) {
            const rect = e.currentTarget.getClientRects().item(0)
            if (rect) {
                /**
                 * 這才是解法,按下其他鍵要取消capture狀態
                 * 如果拖動的時候按右鍵,好像不會觸發pointerdown,而是move?
                 */
                if (e.buttons > 1) {
                    e.currentTarget.releasePointerCapture(e.pointerId)
                    refIsPointerDown.current = false
                }
                /**
                 * 如果按著其他鍵e.buttons > 1,如果能讓hover能有響應比較好,所以下面的不放else裡面
                 */
                const newValue = clamp(
                    isVertical
                        ? 1 - ((e.clientY - rect.top) / rect.height) /* Y越小,value越大,反的 */
                        : (e.clientX - rect.left) / rect.width,
                    0, 1
                )
                switch (e.type) {
                    /**
                     * \就剩pointerenter和pointermove了
                     * 其實我根本沒有監聽enter
                     * 
                     * move分為按著的move和不按的move
                     */
                    case 'pointermove': {
                        setValueHover(newValue)
                        /**
                         * 可能會出現右鍵點滑條,然後點開,觸發pointerleave然後跳進度
                         */
                        if (e.buttons === 1 && refIsPointerDown.current) {
                            // setValue(newValue)
                            onValueChange(newValue, true, newValue - value)
                        }
                        break
                    }
                    case 'pointerleave': {
                        setValueHover(0)
                        break
                    }
                    case 'pointerup': {
                        refIsPointerDown.current = false
                        if (e.buttons === 1) {
                            onValueChange(newValue, false, 0)
                        } else {
                            onValueChange(value, false, 0)
                        }
                        /**
                         * 這個好像不加也行,doc裡說了pointerup會自動release
                        */
                        e.currentTarget.releasePointerCapture(e.pointerId)
                        break
                    }
                    /**
                     * 不加break,down能changeValue
                     * refIsPointerDown.current改用了ref,本來是state,但是state改了之後本次function還是沒有生效的,用ref就正常了
                     */
                    case 'pointerdown': {
                        /**
                         * 不能讓其他鍵生效
                         */
                        if (e.buttons === 1) {
                            refIsPointerDown.current = true
                            /**
                             * 好東西啊,超出瀏覽器都能正常觸發event
                             */
                            e.currentTarget.setPointerCapture(e.pointerId)
                            onValueChange(newValue, true, newValue - value)
                        }
                        break
                    }

                }
            }
            // }

            /**
             * Archive: e.type === mousemove
             * 
             * 好像這是touch觸發不了的...不對
             * 滑動不會觸發,但是tap會觸發...???
             */

        }
    }
    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        /**
         * 太鬼了,Touch不能用...來destruct??why??
         */
        setIsAbleTouch(true)
        const touch = e.touches.item(0) as Touch & { type: string }
        refPrevTouch.current = touch
        onValueChange(value, true, 0)

        // touch.type = e.type
        // setInfoTouch(touch)
    }
    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        const touch = e.touches.item(0) as Touch & { type: string }
        const rect = e.currentTarget.getClientRects().item(0)
        if (rect && touch && refPrevTouch.current) {
            const deltaY = touch.clientY - refPrevTouch.current.clientY
            const deltaX = touch.clientX - refPrevTouch.current.clientX
            if (isVertical) {
                /**
                 * 減少垂直滑動的誤觸
                 */
                if (Math.abs(deltaX) < Math.abs(deltaY)) {
                    // setValue((value) => clamp(
                    // 	value + (-deltaY / rect.height) * 1, /* clientY減少說明向上移動,實際value增加,兩者相反 */
                    // 	0, 1
                    // ))
                    const newValue = clamp(
                        value + (-deltaY / rect.height) * 1, /* clientY減少說明向上移動,實際value增加,兩者相反 */
                        0, 1
                    )
                    onValueChange(newValue, true, newValue - value)
                }
            } else {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {

                    // setValue((value) => clamp(
                    // 	value + (deltaX / rect.width) * 1,
                    // 	0, 1
                    // ))
                    const newValue = clamp(
                        value + (deltaX / rect.width) * 1,
                        0, 1
                    )
                    onValueChange(newValue, true, newValue - value)
                }
            }
            refPrevTouch.current = touch
            // touch.type = e.type
            // setInfoTouch(touch)
        }
    }

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        onValueChange(value, false, 0)
        /**
         * touchEnd的時候,touches已經為空了
         * 然後老問題,Touch不能spread
         */
        // setInfoTouch(
        // 	(newInfoTouch) => {
        // 		if (newInfoTouch) {
        // 			newInfoTouch.type = e.type
        // 		}
        // 		return newInfoTouch
        // 	}
        // )
    }
    const _____Components_____ = 0
    return (
        <>
            <div
                ref={ refActionArea }
                className={ clsx(
                    " bor!der border-blue-600  touch-none select-none grid items-center justify-items-center group ",
                    isShowSlider && 'cursor-pointer',
                    { isAbleTouch: "" },
                    className,
                ) }
                onContextMenu={ (e) => {
                    e.preventDefault()
                } }
                onWheel={ onWheel }

                onTouchStart={ handleTouchStart }
                onTouchMove={ handleTouchMove }
                onTouchEnd={ handleTouchEnd }


                { ...(!isDisableMouse && {
                    onPointerMove: hanldePointerEvent,
                    onPointerDown: hanldePointerEvent,
                    onPointerUp: hanldePointerEvent,
                    onPointerLeave: hanldePointerEvent,
                }) }
            // onPointerMove={ hanldePointerEvent }
            // onPointerDown={ hanldePointerEvent }
            // onPointerUp={ hanldePointerEvent }
            // onPointerLeave={ hanldePointerEvent }
            >
                { children }
                {
                    isShowSlider &&
                    <div
                        className={ clsx(
                            "  relative bg-slate-100/10",
                            isVertical
                                ? 'h-full w-0.5'
                                : 'w-full h-0.5 '
                            ,
                            !isAbleTouch && (
                                isVertical
                                    ? "group-hover:w-2"
                                    : "group-hover:h-2"
                            ),
                        ) }
                        style={ {
                            // width: `${value * 100}%`
                        } }
                    >
                        {/* 好像越下面越靠前 */ }
                        <div
                            className={ clsx(
                                "shadowBar absolute bg-slate-100/30 ",
                                isVertical
                                    ? 'w-full bottom-0'
                                    : 'h-full left-0'
                                ,
                                { "": !isAbleTouch }
                            ) }
                            style={ {
                                [isVertical ? 'height' : 'width']: `${valueShadow * 100}%`
                                // [isVertical ? 'height' : 'width']: `${(valueShadow > value ? valueShadow : value) * 100}%`
                            } }
                        ></div>
                        {
                            bufferedPercentRanges?.map((bufferedPercentRange, index) =>
                                <div
                                    key={ index }
                                    /* sasuga chromium, weird buffered range. but firefox is all fine */
                                    className={ clsx(
                                        "bufferedBar absolute bg-slate-100/20 #bg-green-500",
                                        isVertical
                                            ? 'w-full h-full origin-bottom'
                                            : 'w-full h-full origin-left'
                                        ,
                                        { "": !isAbleTouch }
                                    ) }
                                    style={ {
                                        transform: `
                                        ${isVertical ? 'scaleY' : 'scaleX'}(${(bufferedPercentRange.end - bufferedPercentRange.start)}) 
                                        `,
                                        /**
                                         * translate 50% is relative to itself, not the parent
                                         */
                                        // ${isVertical ? 'translateY' : 'translateX' }(${ bufferedPercentRange.start * 100 } %)
                                        // [isVertical ? 'tra' : 'width']: `${(bufferedPercentRange.end - bufferedPercentRange.start) * 100}%`,
                                        [isVertical ? 'bottom' : 'left']: `${(bufferedPercentRange.start) * 100}%`,

                                        // [isVertical ? 'height' : 'width']: `${(valueShadow > value ? valueShadow : value) * 100}%`
                                    } }
                                ></div>
                            )
                        }
                        <div
                            className={ clsx(
                                "mainBar absolute bg-yellow-300  ",
                                isVertical
                                    ? 'w-full bottom-0'
                                    : 'h-full left-0'
                                ,
                                { "": !isAbleTouch }
                            ) }
                            style={ {
                                [isVertical ? 'height' : 'width']: `${(value) * 100}%`
                                // [isVertical ? 'height' : 'width']: `${(valueShadow < value && valueShadow !== 0 ? valueShadow : value) * 100}%`
                            } }
                        ></div>


                    </div>
                }
            </div>

            {
                isDebug &&
                <SliderDebugger isAbleTouch={ isAbleTouch } refActionArea={ refActionArea } />
            }
        </>
    )
}


function SliderDebugger({ isAbleTouch, refActionArea }: {
    isAbleTouch: boolean,
    refActionArea: RefObject<HTMLElement>
}) {
    const [infoTouch, setInfoTouch] = useState<Touch | null>(null)
    const [infoPointer, setInfoPointer] = useState<PointerEvent | null>(null)
    const [touchType, setTouchType] = useState("")
    useEffect(() => {
        function handlePointer(e: PointerEvent) {
            setInfoPointer(e)
            console.log()
        }
        function handleTouch(e: TouchEvent) {
            setInfoTouch((infoTouch) => e.touches.item(0) ?? infoTouch)
            setTouchType(e.type)
        }
        const actionArea = refActionArea.current
        actionArea?.addEventListener('pointerdown', handlePointer)
        actionArea?.addEventListener('pointermove', handlePointer)
        actionArea?.addEventListener('pointerup', handlePointer)
        actionArea?.addEventListener('pointerleave', handlePointer)
        actionArea?.addEventListener('pointerenter', handlePointer)
        actionArea?.addEventListener('touchstart', handleTouch)
        actionArea?.addEventListener('touchmove', handleTouch)
        actionArea?.addEventListener('touchend', handleTouch)
        // actionArea?.addEventListener('pointerdown', (e) => {
        // 	console.log(e.pointerId);
        // })
        return () => {
            actionArea?.removeEventListener('pointerdown', handlePointer)
            actionArea?.removeEventListener('pointermove', handlePointer)
            actionArea?.removeEventListener('pointerup', handlePointer)
            actionArea?.removeEventListener('pointerleave', handlePointer)
            actionArea?.removeEventListener('pointerenter', handlePointer)
            actionArea?.removeEventListener('touchstart', handleTouch)
            actionArea?.removeEventListener('touchmove', handleTouch)
            actionArea?.removeEventListener('touchend', handleTouch)

        }
    }, [refActionArea])
    const SliderDebugger =
        <>
            <div className="sm:grid grid-cols-2">
                <div>
                    <div className="text-purple-400 font-bold"> --Touch-- </div>
                    <div><div className="inline-block w-28">{ "type:" } </div> 			{ touchType }			</div>
                    <div><div className="inline-block w-28">{ "clientX:" } </div> 		{ infoTouch?.clientX }		</div>
                    <div><div className="inline-block w-28">{ "clientY:" } </div> 		{ infoTouch?.clientY }		</div>
                    <div><div className="inline-block w-28">{ "pageX:" } </div> 		{ infoTouch?.pageX }		</div>
                    <div><div className="inline-block w-28">{ "pageY:" } </div> 		{ infoTouch?.pageY }		</div>
                    <div><div className="inline-block w-28">{ "screenX:" } </div> 		{ infoTouch?.screenX }		</div>
                    <div><div className="inline-block w-28">{ "screenY:" } </div> 		{ infoTouch?.screenY }		</div>
                    <div><div className="inline-block w-28">{ "radiusX:" } </div> 		{ infoTouch?.radiusX }		</div>
                    <div><div className="inline-block w-28">{ "radiusY:" } </div> 		{ infoTouch?.radiusY }		</div>
                </div>
                <div>
                    <div className="text-purple-400 font-bold"> --Pointer-- </div>
                    <div><div className="inline-block w-28">{ "type:" } </div> 			{ infoPointer?.type }			</div>
                    <div><div className="inline-block w-28">{ "pointerType:" } </div> 	{ infoPointer?.pointerType }			</div>
                    <div><div className="inline-block w-28">{ "pointerId:" } </div> 	{ infoPointer?.pointerId }			</div>
                    <div><div className="inline-block w-28">{ "screenX:" } </div> 		{ infoPointer?.screenX }		</div>
                    <div><div className="inline-block w-28">{ "screenY:" } </div> 		{ infoPointer?.screenY }		</div>
                    <div><div className="inline-block w-28">{ "clientX:" } </div> 		{ infoTouch?.clientX }		</div>
                    <div><div className="inline-block w-28">{ "clientY:" } </div> 		{ infoTouch?.clientY }		</div>
                    <div><div className="inline-block w-28">{ "movementX:" } </div> 	{ infoPointer?.movementX }	</div>
                    <div><div className="inline-block w-28">{ "movementY:" } </div> 	{ infoPointer?.movementY }	</div>
                    <div><div className="inline-block w-28">{ "buttons:" } </div> 		{ infoPointer?.buttons }		</div>
                </div>
            </div>
            <div className="font-bold text-orange-300">Mode: { isAbleTouch ? 'Touch' : 'Mouse' }</div>
        </>
    // console.log("type:", infoPointer?.type)
    return SliderDebugger

}