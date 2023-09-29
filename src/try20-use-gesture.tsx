import { useState } from "react"
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import clsx from "clsx"
type Vector2 = [number, number]

function PullRelease() {
    const [movement, setMovement] = useState<Vector2 | null>()
    const [xy, setXy] = useState<Vector2 | null>()
    const [initial, setInitial] = useState<Vector2 | null>()
    const [intentional, setIntentional] = useState<boolean | null>()
    const [delta, setDelta] = useState<Vector2 | null>()
    const [offset, setOffset] = useState<Vector2 | null>()
    const [lastOffset, setLastOffset] = useState<Vector2 | null>()
    const [velocity, setVelocity] = useState<Vector2 | null>()
    const [distance, setDistance] = useState<Vector2 | null>()
    const [direction, setDirection] = useState<Vector2 | null>()
    const [overflow, setOverflow] = useState<Vector2 | null>()
    const [startTime, setStartTime] = useState<number | null>()
    const [timeDelta, setTimeDelta] = useState<number | null>()
    const [elapsedTime, setElapsedTime] = useState<number | null>()
    const [timeStamp, setTimeStamp] = useState<number | null>()
    const [type, setType] = useState<string | null>()
    const [target, setTarget] = useState<EventTarget | null>()
    const [currentTarget, setCurrentTarget] = useState<EventTarget | null>()
    const [first, setFirst] = useState<boolean | null>()
    const [last, setLast] = useState<boolean | null>()
    const [active, setActive] = useState<boolean | null>()
    const [memo, setMemo] = useState<boolean | null>()
    const [canceled, setCanceled] = useState<boolean | null>()
    const [down, setDown] = useState<boolean | null>()
    const [buttons, setButtons] = useState<number | null>()
    const [touches, setTouches] = useState<number | null>()
    const [args, setArgs] = useState<any | null>()
    const [ctrlKey, setCtrlKey] = useState<boolean | null>()
    const [altKey, setAltKey] = useState<boolean | null>()
    const [shiftKey, setShiftKey] = useState<boolean | null>()
    const [metaKey, setMetaKey] = useState<boolean | null>()
    const [locked, setLocked] = useState<boolean | null>()
    const [dragging, setDragging] = useState<boolean | null>()
    const [moving, setMoving] = useState<boolean | null>()
    const [scrolling, setScrolling] = useState<boolean | null>()
    const [wheeling, setWheeling] = useState<boolean | null>()
    const [pinching, setPinching] = useState<boolean | null>()
    const [axis, setAxis] = useState<'x' | 'y' | null>()
    const [pressed, setPressed] = useState<boolean | null>()
    const [swipe, setSwipe] = useState<Vector2 | null>()
    const [tap, setTap] = useState<boolean | null>()

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({
        event,         // the source event
        movement,
        xy,            // [x,y] values (pointer position or scroll offset)
        initial,       // xy value when the gesture started
        intentional,   // is the gesture intentional
        delta,         // movement delta (movement - previous movement)
        offset,        // offset since the first gesture
        lastOffset,    // offset when the last gesture started
        velocity,      // momentum of the gesture per axis (in px/ms)
        distance,      // offset distance per axis
        direction,     // direction per axis
        overflow,      // whether the offset is overflowing bounds (per axis)
        startTime,     // gesture start time (ms)
        timeDelta,     // Time delta (ms) with the previous event
        elapsedTime,   // gesture elapsed time (ms)
        timeStamp,     // timestamp of the event
        type,          // event type
        target,        // event target
        currentTarget, // event currentTarget
        first,         // true when it's the first event
        last,          // true when it's the last event
        active,        // true when the gesture is active
        memo,          // value returned by your handler on its previous run
        cancel,        // function you can call to interrupt some gestures
        canceled,      // whether the gesture was canceled (drag and pinch)
        down,          // true when a mouse button or touch is down
        buttons,       // number of buttons pressed
        touches,       // number of fingers touching the screen
        args,          // arguments you passed to bind (React only)
        ctrlKey,       // true when control key is pressed
        altKey,        // "      "  alt     "      "
        shiftKey,      // "      "  shift   "      "
        metaKey,       // "      "  meta    "      "
        locked,        // whether document.pointerLockElement is set
        dragging,      // is the component currently being dragged
        moving,        // "              "              "  moved
        scrolling,     // "              "              "  scrolled
        wheeling,      // "              "              "  wheeled
        pinching,       // "              "              "  pinched
        axis,
        pressed,
        swipe,
        tap,
    }) => {
        setMovement(movement)
        setXy(xy)
        setInitial(initial)
        setIntentional(intentional)
        setDelta(delta)
        setOffset(offset)
        setLastOffset(lastOffset)
        setVelocity(velocity)
        setDistance(distance)
        setDirection(direction)
        setOverflow(overflow)
        setStartTime(startTime)
        setTimeDelta(timeDelta)
        setElapsedTime(elapsedTime)
        setTimeStamp(timeStamp)
        setType(type)
        setTarget(target)
        setCurrentTarget(currentTarget)
        setFirst(first)
        setLast(last)
        setActive(active)
        setMemo(memo)
        setCanceled(canceled)
        setDown(down)
        setButtons(buttons)
        setTouches(touches)
        setArgs(args)
        setCtrlKey(ctrlKey)
        setAltKey(altKey)
        setShiftKey(shiftKey)
        setMetaKey(metaKey)
        setLocked(locked)
        setDragging(dragging)
        setMoving(moving)
        setScrolling(scrolling)
        setWheeling(wheeling)
        setPinching(pinching)
        setAxis(axis)
        setPressed(pressed)
        setSwipe(swipe)
        setTap(tap)

        api.start({
            // x: down ? movement[0] : 0,
            // y: down ? movement[1] : 0,
            // x: offset[0],
            // y: offset[1],

            // x: mx,
            // y: my,
            immediate: down
            // immediate: true,
        })
    }, {
        axis: "x",
    })
    // Bind it to a component
    return <>
        <animated.div className={ clsx(
            'bg-green-300 w-60 h-60 rounded select-none touch-none',
        ) } { ...bind() } style={ { x, y } } />
        <div className={ clsx(
            'flex flex-col flex-wrap max-h-[500px] font-mono font-bold',
            '[&>*]:flex [&>*]: ',
            '[&>*>*]:w-36 ',
        ) }>
            <div><div>movement:</div><div>{ movement?.[0].toFixed(2) }</div><div>{ movement?.[1].toFixed(2) }</div></div>
            <div><div>xy:</div><div>{ xy?.[0].toFixed(2) }</div><div>{ xy?.[1].toFixed(2) }</div></div>
            <div><div>initial:</div><div>{ initial?.[0].toFixed(2) }</div><div>{ initial?.[1].toFixed(2) }</div></div>
            <div><div>delta:</div><div>{ delta?.[0].toFixed(2) }</div><div>{ delta?.[1].toFixed(2) }</div></div>
            <div><div>offset:</div><div>{ offset?.[0].toFixed(2) }</div><div>{ offset?.[1].toFixed(2) }</div></div>
            <div><div>lastOffset:</div><div>{ lastOffset?.[0].toFixed(2) }</div><div>{ lastOffset?.[1].toFixed(2) }</div></div>
            <div><div>velocity:</div><div>{ velocity?.[0].toFixed(2) }</div><div>{ velocity?.[1].toFixed(2) }</div></div>
            <div><div>distance:</div><div>{ distance?.[0].toFixed(2) }</div><div>{ distance?.[1].toFixed(2) }</div></div>
            <div><div>swipe:</div><div>{ swipe?.[0].toFixed(2) }</div><div>{ swipe?.[1].toFixed(2) }</div></div>
            <div><div>direction:</div><div>{ direction }</div></div>
            <div><div>overflow:</div><div>{ overflow }</div></div>

            <br />
            <div><div>startTime:</div><div>{ startTime?.toFixed(2) }</div></div>
            <div><div>timeDelta:</div><div>{ timeDelta?.toFixed(2) }</div></div>
            <div><div>elapsedTime:</div><div>{ elapsedTime?.toFixed(2) }</div></div>
            <div><div>timeStamp:</div><div>{ timeStamp?.toFixed(2) }</div></div>

            <br />
            <div><div>type:</div><div>{ type }</div></div>
            <div><div>buttons:</div><div>{ buttons }</div></div>
            <div><div>touches:</div><div>{ touches }</div></div>
            <br />

            <div><div className={ clsx(intentional ? 'text-green-500' : 'text-gray-500') }>intentional</div></div>
            <div><div className={ clsx(first ? 'text-green-500' : 'text-gray-500') }>first</div></div>
            <div><div className={ clsx(last ? 'text-green-500' : 'text-gray-500') }>last</div></div>
            <div><div className={ clsx(active ? 'text-green-500' : 'text-gray-500') }>active</div></div>
            <div><div className={ clsx(memo ? 'text-green-500' : 'text-gray-500') }>memo</div></div>
            <div><div className={ clsx(canceled ? 'text-green-500' : 'text-gray-500') }>canceled</div></div>
            <div><div className={ clsx(down ? 'text-green-500' : 'text-gray-500') }>down</div></div>
            <div><div className={ clsx(ctrlKey ? 'text-green-500' : 'text-gray-500') }>ctrlKey</div></div>
            <div><div className={ clsx(altKey ? 'text-green-500' : 'text-gray-500') }>altKey</div></div>
            <div><div className={ clsx(shiftKey ? 'text-green-500' : 'text-gray-500') }>shiftKey</div></div>
            <div><div className={ clsx(metaKey ? 'text-green-500' : 'text-gray-500') }>metaKey</div></div>
            <div><div className={ clsx(locked ? 'text-green-500' : 'text-gray-500') }>locked</div></div>
            <div><div className={ clsx(dragging ? 'text-green-500' : 'text-gray-500') }>dragging</div></div>
            <div><div className={ clsx(moving ? 'text-green-500' : 'text-gray-500') }>moving</div></div>
            <div><div className={ clsx(scrolling ? 'text-green-500' : 'text-gray-500') }>scrolling</div></div>
            <div><div className={ clsx(wheeling ? 'text-green-500' : 'text-gray-500') }>wheeling</div></div>
            <div><div className={ clsx(pinching ? 'text-green-500' : 'text-gray-500') }>pinching</div></div>
            <div><div className={ clsx(tap ? 'text-green-500' : 'text-gray-500') }>tap</div></div>
            <div><div className={ clsx(pressed ? 'text-green-500' : 'text-gray-500') }>pressed</div></div>

            <br />
            <div><div>args:</div><div>{ args?.toString() }</div></div>
        </div>
    </>
}
export default function App() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <PullRelease></PullRelease>
        </div>
    )
}
