import classNames from "classnames"
import { useState } from "react"
export default function App() {
	const [count, setCount] = useState(0)
	return (
		<div>
			{/* <svg viewBox="0 0 36 36">
				<path
					d="
						M18 2.0845
						a 15.9155 15.9155 0 0 1 0 31.831
						a 15.9155 15.9155 0 0 1 0 -31.831
					"
					fill="none"
					stroke="#444"
					stroke-width="1"
					stroke-dasharray="75, 100"
				/>
			</svg> */}
			<svg
				className="w-52  border"
				/**
				 * viewBox指定的是畫布的邏輯大小,實際大小靠css
				 * 假如用css固定240px * 240px,那麼實際的總框框就是這麼大
				 * viewBox指定width height 80 * 80,那麼裡面的cy={ 50 },80對應實際的240px,50對應150px
				 * viewBox指定min-x min-y (10,10),那麼畫布左上角那個點就是(10,10),右下角就是(90,90)=(10+80,10+80)
				 * 
				 */
				viewBox="0 0 100 100"
			>
				<circle
					cx={ 50 }
					cy={ 50 }
					r={ 50 }
					stroke="blue"
					strokeWidth={ 0 }
					fill="yellow"
				/>
			</svg>
			<RadialProgress className="w-32 h-32 border" value={ 0.5 }>
				<div>fiffowij</div>
			</RadialProgress>
		</div>
	)
}
export function RadialProgress({ children, className, stroke, value }: {
	children?: React.ReactNode,
	className?: string,
	stroke?: string,
	/* 0 ~ 1 */
	value: number,
}) {
	return (
		<div className={ classNames("relative grid items-center justify-center", className) }>
			<svg
				className={ classNames("absolute ",) }
				viewBox="0 0 36 36"
			>
				<path
					/**
					 * 網上找來的
					 * 以36x36為畫布
					 * 半徑x和y都是15.9155,與邊框間距2.0845
					 * 從top-center(18,2.0845)畫一個半圓弧到bottom-center(18,31.831),再一個半圓弧到top-center(18,2.0845)
					 * 小寫a表示最後坐標那個用相對路徑而不是絕對路徑
					 */
					d="
				M 18 2.0845
				a 15.9155,15.9155 0 0 1 0,31.831
				a 15.9155,15.9155 0 0 1 0,-31.831
			"
					fill="none"
					stroke={ stroke ?? "yellow" }
					strokeWidth="1"
					strokeDasharray={ `${value * 100}, 100` }
				/>
			</svg>
			{ children }
		</div>
	)
}
