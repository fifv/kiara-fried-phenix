import { useEffect, useState } from "react"
export default function App() {
	const [count, setCount] = useState(0)
	useEffect(() => {
		draw()
	}, [])
	return (
		<div>
			<canvas id="canvas" className="border"></canvas>
		</div>
	)
}
/* ------ */
function draw() {
	const canvasElem = document.getElementById('canvas') as HTMLCanvasElement
	const ctx = canvasElem.getContext('2d')
	if (ctx) {
		canvasElem.height = 1300
		canvasElem.width = 800
		ctx.fillStyle = 'rgba(200,0,0,0.8)'
		ctx.fillRect(50, 50, 100, 100)
		ctx.fillStyle = 'rgba(0,0,200,0.5)'
		ctx.fillRect(100, 100, 100, 100)
		ctx.clearRect(150, 150, 50, 50)
		ctx.strokeStyle = 'rgba(0,200,200,1)'
		ctx.strokeRect(200, 200, 50, 50)

		ctx.beginPath()
		ctx.moveTo(150, 300)
		ctx.lineTo(150 + 50, 300 + 50 * 3 ** 0.5)
		ctx.lineTo(150 - 50, 300 + 50 * 3 ** 0.5)
		ctx.fillStyle = 'rgba(0,200,200,1)'
		ctx.fill()

		ctx.beginPath();
		ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(110, 75);
		ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
		ctx.moveTo(65, 65);
		ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
		ctx.moveTo(95, 65);
		ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
		ctx.stroke();


		ctx.beginPath();
		let positionX = 200
		let positionY = 300
		ctx.moveTo(positionX, positionY)
		let stepLength = 0
		for (let i = 1; i < 200; i++) {
			if (i % 2 === 0) {
				stepLength = -i * 5
			} else {
				stepLength = i * 5
			}
			ctx.lineTo(positionX, positionY)
			positionX += stepLength
			ctx.lineTo(positionX, positionY)
			positionY += stepLength
		}
		ctx.lineTo(positionX, positionY)
		ctx.stroke();


		ctx.beginPath();
		const offsetXHeart = 300
		ctx.moveTo(75 + offsetXHeart, 40);
		ctx.bezierCurveTo(75 + offsetXHeart, 37, 70 + offsetXHeart, 25, 50 + offsetXHeart, 25);
		ctx.bezierCurveTo(20 + offsetXHeart, 25, 20 + offsetXHeart, 62.5, 20 + offsetXHeart, 62.5);
		ctx.bezierCurveTo(20 + offsetXHeart, 80, 40 + offsetXHeart, 102, 75 + offsetXHeart, 120);
		ctx.bezierCurveTo(110 + offsetXHeart, 102, 130 + offsetXHeart, 80, 130 + offsetXHeart, 62.5);
		ctx.bezierCurveTo(130 + offsetXHeart, 62.5, 130 + offsetXHeart, 25, 100 + offsetXHeart, 25);
		ctx.bezierCurveTo(85 + offsetXHeart, 25, 75 + offsetXHeart, 37, 75 + offsetXHeart, 40);
		ctx.fill();

	}
}
