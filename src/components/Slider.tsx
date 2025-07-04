/**
 * This file is hard linked between kfp and bgp..?
 * but the hardlink seems to be broken when the parent folder moved?
 */
import clsx from "clsx"
import { clamp } from "lodash-es"
import { Fragment, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { match, } from 'ts-pattern'
// import { showMessage } from "../utils/utils"
// import { svg } from '../../bangumi-player/client/src/components/Icons'
const svg = {
    leftDouble: <FiChevronsLeft />,
    rightDouble: <FiChevronsRight />,
}
export function useDeltaIndicator(props?: {
    getIndicatorContent?: (currentDeltaSum: number) => ReactNode
}) {
    const getIndicatorContent = props?.getIndicatorContent

    const [delta, setDelta] = useState(0)
    // const [isForceShow, setIsForceShow] = useState(true)
    const [isShowDeltaIndicator, setIsShowDeltaIndicator] = useState(false)
    // const [isPersistShowDeltaIndicator, setIsPersistShowDeltaIndicator] = useState(false)
    // const isShowDeltaIndicator = (shouldShowDeltaIndicator || isForceShow)/*  && delta !== 0 */
    const refShowDeltaIndicatorTimer = useRef<NodeJS.Timeout | undefined>(undefined)
    /**
     * when pointerdown in Test, it directly `showDeltaIndicator`, then Slider onValueChange which triggers `showDeltaIndicator` again
     * it's fucking difficult to understand why the second one get old state, but use ref just fix everything
     */
    const refIsPersistShowDeltaIndicator = useRef(false)
    /**
     * 
     */
    const showDeltaIndicator = useCallback(
        function showDeltaIndicator(newDelta: number, willPersistShowDeltaIndicator?: boolean) {
            // console.log("🚀 ~ file: Slider.tsx:37 ~ showDeltaIndicator ~ newDelta:", newDelta)

            if (willPersistShowDeltaIndicator != null) {
                refIsPersistShowDeltaIndicator.current = willPersistShowDeltaIndicator
            } else {
                willPersistShowDeltaIndicator = refIsPersistShowDeltaIndicator.current
            }
            // console.trace(newDelta, isShowDeltaIndicator, 'willPersistShowDeltaIndicator', willPersistShowDeltaIndicator)
            if (newDelta !== 0 || willPersistShowDeltaIndicator) {
                setIsShowDeltaIndicator(true)
                if (isShowDeltaIndicator) {
                    setDelta(delta => delta + newDelta)
                } else {
                    setDelta(newDelta)
                }
            }
            clearTimeout(refShowDeltaIndicatorTimer.current)
            if (!willPersistShowDeltaIndicator) {
                refShowDeltaIndicatorTimer.current = setTimeout(function () {
                    setIsShowDeltaIndicator(false)
                }, 500)
            }
        }, [isShowDeltaIndicator]
    )

    const cancelPersistDeltaIndicator = useCallback(
        function cancelPersistDeltaIndicator() {
            refIsPersistShowDeltaIndicator.current = false
            clearTimeout(refShowDeltaIndicatorTimer.current)
            refShowDeltaIndicatorTimer.current = setTimeout(function () {
                setIsShowDeltaIndicator(false)
            }, 500)
        }, []
    )


    const DeltaIndicator =
        <div className={ clsx(
            'DeltaIndicator',
            'fixed top-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1',
            'bg-slate-600/40 text-white/60  rounded  pointer-events-none',
            '',
            isShowDeltaIndicator
                ? "opacity-1 #transition-[left]"
                : 'opacity-0 transition-opacity '
            ,
            false
            || (delta < 0 && 'left-1/3 ')
            || (delta > 0 && 'left-2/3 ')
            || ('left-1/2 ')
            ,
        ) }>
            {
                getIndicatorContent?.(delta)
                ?? <div className="flex items-center justify-center gap-1">
                    { delta < 0 && svg.leftDouble }
                    { delta.toFixed(3) }
                    { delta > 0 && svg.rightDouble }
                </div>
            }
        </div>

    return {
        DeltaIndicator,
        showDeltaIndicator,
        cancelPersistDeltaIndicator,
    }
}
/**
 * @deprecated This is used for auto detect value change, but seems useless
 * when video playing, the value is always changing, it's hard to detect whether the change is due to time elasping or manual
 */
export function DeltaIndicator({ /* isVisiable, */ /* children, */isForceShow, /* position = 'center', */ value, getIndicatorContent }: {
    // isVisiable: boolean,
    // children?: React.ReactNode,
    isForceShow?: boolean
    // position?: 'left' | 'center' | 'right',
    value: number
    getIndicatorContent?: (value: number, delta: number) => ReactNode

}) {
    const [delta, setDelta] = useState(0)
    const [shouldShowDeltaIndicator, setShouldShowDeltaIndicator] = useState(false)
    const isShowDeltaIndicator = (shouldShowDeltaIndicator || isForceShow)/*  && delta !== 0 */
    const refShowDeltaIndicatorTimer = useRef<NodeJS.Timeout | undefined>(undefined)

    const refPrevValue = useRef<number>(value)

    function _tempShowDeltaIndicator(newDelta: number) {
        setShouldShowDeltaIndicator(true)
        if (isShowDeltaIndicator) {
            setDelta(delta => delta + newDelta)
        } else {
            setDelta(newDelta)
        }
        clearTimeout(refShowDeltaIndicatorTimer.current)
        refShowDeltaIndicatorTimer.current = setTimeout(function () {
            setShouldShowDeltaIndicator(false)
        }, 500)
    }

    useEffect(() => {

        // log.log('setShouldShowDeltaIndicator(true)')
        if (isForceShow) {

        } else {
            clearTimeout(refShowDeltaIndicatorTimer.current)
            refShowDeltaIndicatorTimer.current = setTimeout(function () {
                // log.log('setShouldShowDeltaIndicator(false)')
                setShouldShowDeltaIndicator(false)
            }, 500)

        }

    }, [isForceShow])


    useEffect(() => {
        refPrevValue.current = value
    })
    // useEffect(() => {
    //     if (!isShowDeltaIndicator) {
    //         setDelta(0)
    //     }
    // }, [isShowDeltaIndicator])
    return (

        <div className={ clsx(
            'DeltaIndicator',
            'fixed top-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1',
            'bg-slate-600/40 text-white/60  rounded  pointer-events-none',
            '',
            isShowDeltaIndicator
                ? "opacity-1 #transition-[left]"
                : 'opacity-0 transition-opacity '
            ,
            false
            || (delta < 0 && 'left-1/3 ')
            || (delta > 0 && 'left-2/3 ')
            || ('left-1/2 ')
            ,
        ) }>
            {
                getIndicatorContent?.(value, delta)
                ?? <div className="flex items-center justify-center gap-1">
                    { delta < 0 && svg.leftDouble }
                    { delta.toFixed(3) }
                    { delta > 0 && svg.rightDouble }
                </div>
            }
        </div>
    )
}
/**
 * thoughts: how to play with `touches`
 * First, use e.targetTouches instead of e.touches. 
 * And you will get the touches fired on the element where eventlistener added,
 * ignoring other elements' touches
 * 
 * The `TouchList` appears to be sorted in ascending order by `identifier`
 * but when firstFingerDown, then secondFingerDown, then firstFingerUp, the .item(0) will become identifier=1 (the only one touch)
 * 
 */
/**
 * 想象一個場景,video正在play,進度條動的飛快,此時slide...會怎麼樣呢?
 * mouse指哪打哪,不用考慮這個問題
 * 但是touch不一樣了,
 */
/**
 * slide -> onValueChange -> setValue(newValue) -> `value` passed to Slider
 * what if I slide fast and meachine is too slow too handle all the setState?
 * Some setState just got discarded.
 * Then, the slider progressed less than expected, it will lag behind finger
 * 
 * Imagine: 
 * fast
 *   setValue(value + newValueDelta)
 *   setValue(value + newValueDelta)
 *   setValue(value + newValueDelta)
 * may cause the value didn't change for all three fn, so only the last one toke effect
 * and the first two's newValueDelta lost
 * so you should use
 *   setValue(value => value + newValueDelta)
 *   setValue(value => value + newValueDelta)
 *   setValue(value => value + newValueDelta)
 * then nothing lost, good!
 * 
 */
/**
 * 時刻記住,react不一定來得及更新value,導致多次trigger event with same props
 * 
 */
/**
 * TEST:
 * 
 * mouse:
 * fast slide : accurate
 * pointerdown -> enter
 * slide outside
 * click other buttom during sliding
 * 
 * 
 * touch:
 * fast slide : accurate
 * multifinger
 */

/**
 * 默認沒有 position,height,width, 請用className自己加
 * You should check valueDelta!==0 to fire event
 * 
 */
export function Slider({ isShowSlider = true,
    isVertical,
    className,
    value,
    children,
    isShowDebugInfo: isDebug,
    isDisableMouse = false,
    isDisableSlide = false,
    isLockAxis = false,
    bufferedPercentRanges,
    hoverIndicatorPosition,
    isEnableHoverIndicator = false,
    onValueChange, getHoverIndicatorContent, onWheel, onPointerDown, onPointerUp,
}: {
    isShowSlider?: boolean
    isVertical: boolean
    isDisableSlide?: boolean
    className?: string
    /**
     * 0~1
     */
    value: number
    enableIndicator?: boolean
    indicatorPosition?: 'left' | 'center' | 'right'
    enableHoverIndicator?: boolean
    /**
     * combined with isVertical
     */
    hoverIndicatorPosition?: 'top/left' | 'bottom/right'
    isEnableHoverIndicator?: boolean
    children?: React.ReactNode
    isShowDebugInfo?: boolean
    isDisableMouse?: boolean
    isLockAxis?: boolean
    bufferedPercentRanges?: {
        start: number
        end: number
    }[]
    // ratio?: number
    // setValue
    /**
     * onValueChange() only called when value change by sliding
     * It will NOT be called if the passed value changed
     * 
     * everything rely on old value in closure is dangerous, so use newValueDelta
     */
    onValueChange?: (newValue: number, isPointerDown: boolean, newValueDelta: number) => void
    onPointerDown?: () => void
    onPointerUp?: () => void
    getHoverIndicatorContent?: (valueHover: number) => ReactNode
    // onIndicatorChange?: (isShowIndicator: boolean, valueDelta: number) => void,
    onWheel?: (e: WheelEvent) => void
}) {
    value = clamp(value, 0, 1)

    /**
     * when able to touch, disable all mouse event
     */
    // const [isAbleTouch, setIsAbleTouch] = useState(false)
    // const refIsPointerDown = useRef(false)
    const refPrevTouch = useRef<Touch | null>(null)
    const refTouchIdentifier = useRef<number | null>(null)
    const refPointerIdForTouch = useRef<number | null>(null)
    const refActionArea = useRef<HTMLDivElement>(null)
    // const refFirstPointerTouchEvent = useRef<React.PointerEvent | null>(null)
    // const refFirstValueWhenPointerTouchStart = useRef<number | null>(null)
    const refPrevPointerTouchEvent = useRef<React.PointerEvent | null>(null)
    const refPrevPointerMouseEvent = useRef<React.PointerEvent | null>(null)
    const refIsAbleTouchSlide = useRef(true)
    const refIsFirstPointerTouchMove = useRef(true)

    // const [value, setValue] = useState(0.5) /* 0~1 */
    const [valueHover, setValueHover] = useState(value) /* 0~1 */
    const [isHovered, setIsHovered] = useState(false)
    const [isPointerDown, setIsPointerDown] = useState(false)


    const _____Functions_____ = 0
    function handleValueChange(newValue: number, newValueDelta: number) {
        onValueChange?.(newValue, isPointerDown, newValueDelta)
    }

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
        const rect = e.currentTarget.getBoundingClientRect()

        if (e.pointerType === 'mouse' && !isDisableMouse) {
            e.stopPropagation()
            /**
             * 這才是解法,按下其他鍵要取消capture狀態
             * 如果拖動的時候按右鍵,好像不會觸發pointerdown,而是move?
             */
            if (e.buttons > 1) {
                e.currentTarget.releasePointerCapture(e.pointerId)
                // refIsPointerDown.current = false
                setIsPointerDown(false)
                onPointerUp?.()
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
                 * 不加break,down能changeValue
                 * refIsPointerDown.current改用了ref,本來是state,但是state改了之後本次function還是沒有生效的,用ref就正常了
                 */
                case 'pointerdown': {
                    /**
                     * 不能讓其他鍵生效
                     */
                    if (e.buttons === 1) {
                        // refIsPointerDown.current = true
                        setIsPointerDown(true)
                        onPointerDown?.()

                        /**
                         * 好東西啊,超出瀏覽器都能正常觸發event
                         */
                        e.currentTarget.setPointerCapture(e.pointerId)
                        handleValueChange(newValue, newValue - value)
                        refPrevPointerMouseEvent.current = e
                    }
                    break
                }

                /**
                 * \就剩pointerenter和pointermove了
                 * 其實我根本沒有監聽enter
                 * 
                 * move分為按著的move和不按的move
                 */
                case 'pointermove': {
                    setValueHover(newValue)
                    setIsHovered(true)
                    /**
                     * 可能會出現右鍵點滑條,然後點開,觸發pointerleave然後跳進度
                    */
                    if (e.buttons === 1 && isPointerDown && refPrevPointerMouseEvent.current) {
                        const movementX = clamp(e.clientX, rect.left, rect.right) - clamp(refPrevPointerMouseEvent.current.clientX, rect.left, rect.right)
                        const movementY = clamp(e.clientY, rect.top, rect.bottom) - clamp(refPrevPointerMouseEvent.current.clientY, rect.top, rect.bottom)
                        if (movementX !== 0 || movementY !== 0) {
                            if (isVertical) {
                                const newValueDelta = -movementY / rect.height
                                handleValueChange(newValue, newValueDelta)
                            } else {
                                const newValueDelta = movementX / rect.width
                                handleValueChange(newValue, newValueDelta)
                            }
                            // handleValueChange(newValue, newValue - value)
                            refPrevPointerMouseEvent.current = e
                        }
                    }
                    break
                }
                case 'pointerup': {
                    // refIsPointerDown.current = false
                    setIsPointerDown(false)
                    onPointerUp?.()

                    // if (e.buttons === 1) {
                    //     handleValueChange(newValue, 0)
                    // } else {
                    //     handleValueChange(value, 0)
                    // }
                    /**
                     * 這個好像不加也行,doc裡說了pointerup會自動release
                    */
                    e.currentTarget.releasePointerCapture(e.pointerId)
                    break
                }
                case 'pointerleave': {
                    // setValueHover(0)
                    setIsHovered(false)
                    break
                }

            }

            /**
             * Archive: e.type === mousemove
             * 
             * 好像這是touch觸發不了的...不對
             * 滑動不會觸發,但是tap會觸發...???
             */

        } else if (e.pointerType === 'touch' && !isDisableSlide) {
            switch (e.type) {
                case 'pointerdown': {
                    if (refPointerIdForTouch.current === null) {
                        refPointerIdForTouch.current = e.pointerId
                        // refFirstPointerTouchEvent.current = e
                        refPrevPointerTouchEvent.current = e
                        // refFirstValueWhenPointerTouchStart.current = value
                        refIsFirstPointerTouchMove.current = true
                        e.currentTarget.setPointerCapture(e.pointerId)
                        setIsPointerDown(true)
                        onPointerDown?.()
                    }

                    break
                }
                case 'pointermove': {
                    /**
                     * seems that e.movementY is quite imprecise, it's an integer
                     * make sure use `!== null` to check number, instead of !!
                     */
                    if (e.pointerId === refPointerIdForTouch.current && refPrevPointerTouchEvent.current) {
                        const movementX = e.clientX - refPrevPointerTouchEvent.current?.clientX
                        const movementY = e.clientY - refPrevPointerTouchEvent.current?.clientY
                        // console.log(e.clientX)
                        /**
                         * sometimes pointermove fired immediately after pointerdown with `movement{X|Y} === 0`
                         * ALWAYS remember this behavior!!! This leads to many fucking bugs
                         */
                        if (movementX !== 0 || movementY !== 0) {
                            if (refIsFirstPointerTouchMove.current) {
                                refIsAbleTouchSlide.current =
                                    isVertical
                                        ? Math.abs(movementX) < Math.abs(movementY)
                                        : Math.abs(movementX) > Math.abs(movementY)
                                refIsFirstPointerTouchMove.current = false
                            }
                            if (!isLockAxis || (refIsAbleTouchSlide.current)) {
                                if (isVertical) {
                                    /**
                                     * 減少垂直滑動的誤觸
                                     */
                                    // if (Math.abs(movementX) < Math.abs(movementY)) {
                                    const newValue = clamp(
                                        value + (-movementY / rect.height), /* clientY減少說明向上移動,實際value增加,兩者相反 */
                                        0, 1
                                    )
                                    handleValueChange(newValue, newValue - value)
                                    // }
                                } else {
                                    // if (Math.abs(movementX) > Math.abs(movementY)) {

                                    const newValue = clamp(
                                        // refFirstValueWhenPointerTouchStart.current + ((e.clientX - refFirstPointerTouchEvent.current.clientX) / rect.width) * 1,
                                        value + (movementX / rect.width),
                                        0, 1
                                    )
                                    handleValueChange(newValue, newValue - value)
                                    // }
                                }
                            }
                        }
                        refPrevPointerTouchEvent.current = e
                    }
                    break
                }
                /**
                 * when horizontally touch three finger on K30U or MIPAD4,
                 * pointerleave will be triggered, (3 times for all 3 pointer)
                 */
                case 'pointercancel':
                case 'pointerleave':
                case 'pointerup': {
                    // alert(e.type + e.pointerId)
                    if (e.pointerId === refPointerIdForTouch.current) {

                        e.currentTarget.releasePointerCapture(e.pointerId)
                        refPointerIdForTouch.current = null
                        setIsPointerDown(false)
                        onPointerUp?.()
                    }
                    // document.body.append(e.type + e.pointerId + ' ')
                    break
                }


                default:
                    break
            }
        }
    }




    /**
     * use e.targetTouches to ignore touches started at other place
     * so each Slider won't infect each other
     */
    /**
     * @deprecated use hanldePointerEvent instead
     */
    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        /**
         * 太鬼了,Touch不能用...來destruct??why??
         */
        // setIsAbleTouch(true)
        if (refTouchIdentifier.current === null) {
            const touch = e.targetTouches.item(0) as Touch & { type: string }
            // console.log(touch)
            refPrevTouch.current = touch

            refTouchIdentifier.current = touch.identifier
            // handleValueChange(value, 0)
            setIsPointerDown(true)
            onPointerDown?.()
        }


        // touch.type = e.type
        // setInfoTouch(touch)
    }
    /**
     * @deprecated use hanldePointerEvent instead
     */
    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        /**
         * FIX\ME: multiple random touch causes large jump of delta
         */
        /**
         * identifiedTouch has been removed...
         */
        if (refTouchIdentifier.current !== null) {
            const touch = (() => {
                for (let i = 0; i < e.targetTouches.length; i++) {
                    const touch = e.targetTouches.item(i)
                    if (touch.identifier === refTouchIdentifier.current) {
                        return touch as Touch & { type: string }
                    }
                }
            })()
            // console.log(touch)
            // console.log(touch.identifier)
            const rect = e.currentTarget.getBoundingClientRect()
            /**
             * see MDN, touches list will be randomly order, so make sure only track the same finger
             */
            // console.log('refPrevTouch.current.identifier', refPrevTouch.current?.identifier, 'touch?.identifier', touch?.identifier)
            if (touch && refPrevTouch.current) {
                const deltaY = touch.clientY - refPrevTouch.current.clientY
                const deltaX = touch.clientX - refPrevTouch.current.clientX
                // showMessage('touchmove'+deltaX, false)
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
                        handleValueChange(newValue, newValue - value)
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
                        handleValueChange(newValue, newValue - value)
                    }
                }
                refPrevTouch.current = touch
                // touch.type = e.type
                // setInfoTouch(touch)
            }
        }
    }
    /**
     * here the e.targetTouches do NOT contain the one ended
     */
    /**
     * @deprecated use hanldePointerEvent instead
     */
    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        // console.log('.touches',e.touches);
        let isCurrentTouchEnded = true
        for (let i = 0; i < e.targetTouches.length; i++) {
            const touch = e.targetTouches.item(i)
            /**
             * found, so not ended
             */
            if (touch.identifier === refTouchIdentifier.current) {
                isCurrentTouchEnded = false
            }
        }
        // if (e.targetTouches.length === 0) {
        // }
        if (isCurrentTouchEnded) {
            refTouchIdentifier.current = null
            // handleValueChange(value, 0)
            setIsPointerDown(false)
            onPointerUp?.()
        }
        /**
         * Archive: ?
         * touchEnd的時候,touches已經為空了
         * 然後老問題,Touch不能spread
         */

    }

    useEffect(() => {
        const actionArea = refActionArea.current
        function handelWheel(e: WheelEvent) {
            e.preventDefault()
            e.stopPropagation()
            onWheel?.(e)
        }
        onWheel && actionArea?.addEventListener('wheel', handelWheel)
        return () => {
            onWheel && actionArea?.removeEventListener('wheel', handelWheel)
        }
    }, [onWheel])

    const _____Components_____ = 0
    const HoverIndicator =
        <div className={ clsx(
            'CurrentIndicator absolute ',
            ' px-3 py-1 w-max h-max',
            'bg-slate-600/40 text-white/60  rounded  pointer-events-none text-xs',
            isVertical
                ? hoverIndicatorPosition === 'bottom/right' ? 'right-0 translate-y-1/2 translate-x-full' : 'left-0  -translate-y-1/2 -translate-x-full'
                : hoverIndicatorPosition === 'bottom/right' ? 'bottom-0  translate-y-full -translate-x-1/2' : 'top-0  -translate-y-full -translate-x-1/2',
        ) }
            style={
                isVertical
                    ? {
                        bottom: `${valueHover * 100}%`
                    }
                    : {
                        left: `${valueHover * 100}%`
                    }
            }
        >
            <div className={ clsx(
                'indicatorArrow',
                'absolute bg-transparent w-0 h-0  ',
                // 'rotate-45',
                'border-t-[6px] border-b-[6px] border-l-[6px] border-r-[6px]',
                /**
                 * what an amazing triangle
                 */
                isVertical
                    ? hoverIndicatorPosition === 'bottom/right'
                        ? 'left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-slate-600/40 border-b-transparent border-l-transparent border-t-transparent'
                        : 'right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-slate-600/40 border-b-transparent border-t-transparent border-r-transparent'
                    : hoverIndicatorPosition === 'bottom/right'
                        ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-full   border-b-slate-600/40 border-t-transparent border-l-transparent border-r-transparent'
                        : 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-slate-600/40 border-b-transparent border-l-transparent border-r-transparent'


            ) }></div>
            { getHoverIndicatorContent?.(valueHover) ?? valueHover.toFixed(3) }
        </div>
    return (
        <>
            <div
                ref={ refActionArea }
                className={ clsx(
                    "Slider bor!der border-blue-600  touch-none select-none grid items-center justify-items-center group ",
                    isShowSlider && 'cursor-pointer',
                    { isAbleTouch: "" },
                    className,
                ) }
                onContextMenu={ (e) => {
                    e.preventDefault()
                } }
                // onWheel={ onWheel }

                // onTouchStart={ handleTouchStart }
                // onTouchMove={ handleTouchMove }
                // onTouchEnd={ handleTouchEnd }


                // { ...(!isDisableMouse && {
                //     onPointerMove: hanldePointerEvent,
                //     onPointerDown: hanldePointerEvent,
                //     onPointerUp: hanldePointerEvent,
                //     onPointerLeave: hanldePointerEvent,
                // }) }
                onPointerMove={ hanldePointerEvent }
                onPointerDown={ hanldePointerEvent }
                onPointerUp={ hanldePointerEvent }
                onPointerLeave={ hanldePointerEvent }
                onPointerCancel={ hanldePointerEvent }
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
                            isVertical
                                ? "group-hover:w-2"
                                : "group-hover:h-2"
                        ) }
                        style={ {
                            // width: `${value * 100}%`
                        } }
                    >
                        {/* 好像越下面越靠前 */ }

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
                            ) }
                            style={ {
                                [isVertical ? 'height' : 'width']: `${value * 100}%`
                            } }
                        ></div>
                        <div
                            className={ clsx(
                                "shadowBar absolute  ",
                                valueHover > value
                                    ? 'bg-slate-100/30'
                                    : 'bg-black/30',
                                !isHovered && 'hidden'
                            ) }
                            style={
                                isVertical
                                    ? {
                                        // [isVertical ? 'height' : 'width']: `${Math.max(valueHover, value) * 100}%`,
                                        height: `${100}%`,
                                        width: `100%`,
                                        transformOrigin: 'bottom',
                                        /**
                                         * scale need chrome>=104
                                         * should use bottom, because translate's 50% is based on itself, rather than its parent
                                         */
                                        transform: `scale(100%, ${(valueHover - value) * 100}%)`,
                                        bottom: `${value * 100}%`,
                                        left: 0,
                                    }
                                    : {
                                        height: `100%`,
                                        width: `${100}%`,
                                        transformOrigin: 'left',
                                        transform: `scale(${(valueHover - value) * 100}%, 100%)`,
                                        left: `${value * 100}%`,
                                        top: 0,
                                    }
                            }
                        ></div>

                    </div>
                }
                { isEnableHoverIndicator && isHovered && HoverIndicator }

            </div>
            {/* <DeltaIndicator
                // isVisiable={ isShowDeltaIndicator }
                // position={
                //     false
                //     || (delta < 0 && 'left')
                //     || (delta > 0 && 'right')
                //     || ('center')
                // }
                value={ value }
                isForceShow={ isPointerDown }

            ></DeltaIndicator> */}

            {
                isDebug &&
                // false &&
                <SliderDebugger refActionArea={ refActionArea } />
            }
        </>
    )
}

export default function Test() {
    const [value1Hori, setValue1] = useState(0.5) /* 0~1 */
    const [value2Vert, setValue2] = useState(0.5) /* 0~1 */
    const [isSliderPointerDown, setIsSliderPointerDown] = useState(false)
    const [valueDelta, setValueDelta] = useState(0)

    const { DeltaIndicator, showDeltaIndicator, cancelPersistDeltaIndicator } = useDeltaIndicator()
    useEffect(() => {
        function handleKeydown(e: KeyboardEvent) {
            if (e.key === 'ArrowLeft') {
                setValue1(x => clamp(x - 0.1, 0, 1))
                showDeltaIndicator(-0.1)
            } else if (e.key === 'ArrowRight') {
                setValue1(x => clamp(x + 0.1, 0, 1))
                showDeltaIndicator(0.1)
            }
        }
        document.addEventListener('keydown', handleKeydown)
        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [showDeltaIndicator])
    // useEffect(() => {
    //     const it = setInterval(function () {
    //         setValue1(x => (x * 100 + 1) % 100 / 100)
    //     }, 20)
    //     return () => {
    //         clearInterval(it)
    //     }
    // }, [])

    /**
     *  FIX\ME: delta不準確
     * 如果setValue1((s) => s + valueDelta),還偶爾出現上萬的delta -_-||
     * ..........淦,是chrome dev 111.0.5545.3的bug
     * 在canary 111.0.5563.0和vavildi裡面都是非常正常
     * 恩?重裝了dev然後...好了..???
     * 到底是誰的bug,在beta裡也出現了,然後重啟就沒了
     */
    return (
        <div className="w-screen #h-[calc(100vh-70px)] border border-red-600">
            <Slider
                className="absolute h-20 w#-5/6 m-2 bottom-0 left-20 right-20"
                isVertical={ false }
                value={ value1Hori }
                isEnableHoverIndicator
                // getHoverIndicatorContent={ (valueHover) => {
                //     return <div className="flex items-center justify-center gap-1 font-serif">
                //         { valueHover }
                //     </div>
                // } }
                onPointerDown={ () => {
                    // showDeltaIndicator(0, true)
                } }
                onPointerUp={ () => {
                    cancelPersistDeltaIndicator()
                } }

                onValueChange={ (newValue, isPointerDown: boolean, newValueDelta: number) => {
                    // flushSync(() => {

                    // })
                    // setValue1(newValue)
                    setValue1((s) => s + newValueDelta)
                    // setValue1(value1 + newValueDelta)
                    showDeltaIndicator(newValueDelta, true)
                    // console.log('isPointerDown', isPointerDown)
                    // setIsSliderPointerDown(isPointerDown)
                    // if (isSliderPointerDown) {
                    //     setValueDelta((s) => s + newValueDelta)
                    // } else {
                    //     setValueDelta(newValueDelta)
                    // }
                    // if (Math.abs(newValueDelta) > 1) {
                    //     console.log(isPointerDown, newValue, newValueDelta)
                    // }
                    console.log(
                        '[Slider: onValueChange]',
                        // 'isPointerDown:',isPointerDown,
                        'value1:', value1Hori,
                        'newValue:', newValue,
                        'newValueDelta:', newValueDelta,
                        'value1 + newValueDelta:', value1Hori + newValueDelta,
                        newValue === value1Hori + newValueDelta ? '' : 'diff',
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
                value={ value2Vert }
                isEnableHoverIndicator
                onValueChange={ (newValue, isPointerDown: boolean, newValueDelta: number) => {
                    setValue2(newValue)
                    setIsSliderPointerDown(isPointerDown)
                    setValueDelta(newValueDelta)
                    console.log(isPointerDown, newValue, newValueDelta)
                } }
                isShowDebugInfo
                hoverIndicatorPosition="bottom/right"
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
                onWheel={ (e) => {
                    if (e.deltaY > 0) {
                        setValue2(x => clamp(x - 0.05, 0, 1))
                        showDeltaIndicator(-0.05)
                    } else {
                        setValue2(x => clamp(x + 0.05, 0, 1))
                        showDeltaIndicator(+0.05)
                    }
                } }
            />
            {/* <DeltaIndicator
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

            </DeltaIndicator> */}

            { DeltaIndicator }
            <button className={ clsx(
                'ml-32',
            ) }
                onClick={ () => {
                    if (document.fullscreenElement) {
                        document.exitFullscreen()
                    } else {
                        document.documentElement.requestFullscreen()
                    }
                } }
            >Toggle Fullscreen</button>

        </div >
    )
}
function SliderDebugger({ /* isAbleTouch, */ refActionArea }: {
    // isAbleTouch: boolean,
    refActionArea: RefObject<HTMLElement>
}) {
    const [infoTouch, setInfoTouch] = useState<Touch | null>(null)
    const [infoTouchs, setInfoTouchs] = useState<Touch[] | null>(null)
    const [infoPointer, setInfoPointer] = useState<PointerEvent | null>(null)
    const [touchType, setTouchType] = useState("")
    useEffect(() => {
        function handlePointer(e: PointerEvent) {
            setInfoPointer(e)
            console.log()
        }
        function handleTouch(e: TouchEvent) {
            setInfoTouch((infoTouch) => e.targetTouches.item(0) ?? infoTouch)

            const touches = []
            for (let i = 0; i < e.targetTouches.length; i++) {
                const touch = e.targetTouches.item(i)
                touch && touches.push(touch)
            }
            setInfoTouchs(touches)

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
            <div className="#sm:grid grid grid-cols-2 text-xs sm:text-sm font-mono mb-12 border border-blue-300/30">
                <div>
                    <div className="text-purple-400 font-bold"> --Pointer-- </div>
                    <div><div className="inline-block w-28">{ "type:" } </div> 			<ChangeVisibleString string={ infoPointer?.type } /></div>
                    <div><div className="inline-block w-28">{ "pointerType:" } </div> 	<ChangeVisibleString string={ infoPointer?.pointerType } /></div>
                    <div><div className="inline-block w-28">{ "pointerId:" } </div> 	<ChangeVisibleString string={ infoPointer?.pointerId } /></div>
                    <div><div className="inline-block w-28">{ "screenX:" } </div> 		<ChangeVisibleString string={ infoPointer?.screenX.toFixed(2) } />	</div>
                    <div><div className="inline-block w-28">{ "screenY:" } </div> 		<ChangeVisibleString string={ infoPointer?.screenY.toFixed(2) } /></div>
                    <div><div className="inline-block w-28">{ "clientX:" } </div> 		<ChangeVisibleString string={ infoPointer?.clientX.toFixed(2) } /></div>
                    <div><div className="inline-block w-28">{ "clientY:" } </div> 		<ChangeVisibleString string={ infoPointer?.clientY.toFixed(2) } /></div>
                    <div><div className="inline-block w-28">{ "movementX:" } </div> 	<ChangeVisibleString string={ infoPointer?.movementX.toFixed(2) } /></div>
                    <div><div className="inline-block w-28">{ "movementY:" } </div> 	<ChangeVisibleString string={ infoPointer?.movementY.toFixed(2) } /></div>
                    <div><div className="inline-block w-28">{ "buttons:" } </div> 		<ChangeVisibleString string={ infoPointer?.buttons } /></div>
                </div>
                <div>
                    <div className="text-purple-400 font-bold"> --Touch-- </div>
                    <div><div className="inline-block w-28">{ "type:" } </div> 			<ChangeVisibleString string={ touchType } /></div>
                    {
                        infoTouchs?.map((infoTouch) =>
                            <Fragment key={ infoTouch.identifier }>
                                <div className="text-red-400"><div className="inline-block w-28">{ "identifier:" } </div> 	<ChangeVisibleString string={ infoTouch?.identifier } /></div>
                                <div><div className="inline-block w-28">{ "clientX:" } </div> 		<ChangeVisibleString string={ infoTouch?.clientX.toFixed(2) } /></div>
                                <div><div className="inline-block w-28">{ "clientY:" } </div> 		<ChangeVisibleString string={ infoTouch?.clientY.toFixed(2) } /></div>
                                <div><div className="inline-block w-28">{ "pageX:" } </div> 		<ChangeVisibleString string={ infoTouch?.pageX.toFixed(2) } /></div>
                                <div><div className="inline-block w-28">{ "pageY:" } </div> 		<ChangeVisibleString string={ infoTouch?.pageY.toFixed(2) } /></div>
                                <div><div className="inline-block w-28">{ "screenX:" } </div> 		<ChangeVisibleString string={ infoTouch?.screenX.toFixed(2) } /></div>
                                <div><div className="inline-block w-28">{ "screenY:" } </div> 		<ChangeVisibleString string={ infoTouch?.screenY.toFixed(2) } /></div>
                                <div><div className="inline-block w-28">{ "radiusX:" } </div> 		<ChangeVisibleString string={ infoTouch?.radiusX.toFixed(2) } /></div>
                                <div><div className="inline-block w-28">{ "radiusY:" } </div> 		<ChangeVisibleString string={ infoTouch?.radiusY.toFixed(2) } /></div>
                            </Fragment>
                        )
                    }
                </div>
            </div>
            {/* <div className="font-bold text-orange-300">Mode: { isAbleTouch ? 'Touch' : 'Mouse' }</div> */ }
        </>
    // console.log("type:", infoPointer?.type)
    return SliderDebugger

}
function ChangeVisibleString({ string }: { string: string | undefined | number }) {
    if (typeof string === 'number') {
        string = string.toString()
    }
    // console.log(string)
    return string?.split('').map((char, i) =>
        <ChangeVisibleChar key={ char + i } char={ char } />
    )
}
function ChangeVisibleChar({ char }: { char: string }) {
    const refPrevChar = useRef('')
    const refAnimation = useRef<Animation | undefined>(undefined)
    const refElem = useRef<HTMLSpanElement>(null)
    useEffect(() => {
        if (char !== refPrevChar.current) {
            if (refAnimation.current) {
                refAnimation.current?.cancel()
                refAnimation.current?.play()

            } else {

                refAnimation.current = refElem.current?.animate(
                    [
                        {
                            backgroundColor: 'DarkGoldenRod'
                        },
                        {
                            backgroundColor: 'transparent'
                        },
                    ],
                    {
                        fill: "both",
                        duration: 300,

                    }
                )
            }
        }
        refPrevChar.current = char
    }, [char])
    return (
        <span ref={ refElem }>{ char }</span>
    )
}
