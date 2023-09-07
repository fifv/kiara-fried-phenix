import clsx from "clsx"
import { useRef, useState } from "react"
import './try19-animate-menu.scss'
export default function App() {
    const [count, setCount] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const refSvg = useRef<SVGSVGElement>(null)
    const refPathTop = useRef<SVGPathElement>(null)
    const refPathMiddle = useRef<SVGPathElement>(null)
    const refPathBottom = useRef<SVGPathElement>(null)
    return (
        <div>
            <div className="hamb relative aa" aria-label="Open Menu" onClick={ () => {
                // const animation = refSvg.current?.animate([
                //     {
                //         transform: "rotate(0deg)",
                //     },
                //     {
                //         transform: "rotate(45deg)",
                //     },
                // ], {
                //     duration: 300,
                //     fill: "both",
                // })
                // refPathTop.current?.animate([
                //     {
                //         strokeDashoffset: '0px',
                //     },
                //     {
                //         strokeDashoffset: '-64px',
                //     },
                // ], {
                //     duration: 300,
                //     fill: "both",
                // })
                // refPathMiddle.current?.animate([
                //     {
                //         transform: "rotate(0deg)",
                //     },
                //     {
                //         transform: "rotate(90deg)",
                //     },
                // ], {
                //     duration: 300,
                //     fill: "both",
                // })
                // refPathBottom.current?.animate([
                //     {
                //         strokeDashoffset: '0px',
                //     },
                //     {
                //         strokeDashoffset: '-64px',
                //     },
                // ], {
                //     duration: 300,
                //     fill: "both",
                // })
                setIsActive((x) => (!x))
            } }>
                <svg ref={ refSvg } className={ clsx(
                    'ham select-none h-[60px] w-[60px] cursor-pointer duration-300 ',
                    '[&>*]:fill-none [&>*]:stroke-white [&>*]:stroke-[5] [&>*]:duration-300 [&>*]:[stroke-linecap:round]',
                    isActive && 'rotate-45'
                ) } viewBox="0 0 100 100">
                    <path ref={ refPathTop } className={ clsx(
                        'lineTop [stroke-dasharray:40_160]',
                        isActive && '[stroke-dashoffset:-64px]',
                    ) } d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
                    <path ref={ refPathMiddle } className={ clsx(
                        'lineMiddle origin-[50%] [stroke-dasharray:40_142]',
                        isActive && 'rotate-90'
                    ) } d="m 30,50 h 40"></path>
                    <path ref={ refPathBottom } className={ clsx(
                        'lineBottom origin-[50%] [stroke-dasharray:40_85]',
                        isActive && '[stroke-dashoffset:-64px]',
                    ) } d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
                </svg>
            </div>
        </div>
    )
}
