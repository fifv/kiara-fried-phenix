import clsx from "clsx"
import { useState } from "react"
export default function App() {
	const [count, setCount] = useState(0)
	// 	                      ^?
	return (
		<>
			<div className="text-red-600/30">
				^^^here is fixed box, red border^^^
			</div>
			<div className={ clsx(
				"fixed ",
				// "relative ",
				"border  border-red-600 top-8 h-80 w-1/2 overflow-auto"
			) }>
				<div
					/**
					 * 不知道為什麼,如果absolute和scrollee在一起,會相對這個scrollee
					 */
					className="absolute top-1 left-3 w-24 h-20 border text-yellow-400 border-yellow-300"
				>
					i'm absolute
				</div>
				<div className="border relative h-full #overflow-auto border-blue-600 text-blue-600/20">
					here is long list
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur qui ad voluptatibus asperiores omnis, quas veniam unde fugit excepturi consequuntur veritatis nostrum deleniti animi explicabo ea iure quo laboriosam quasi accusamus modi, atque ab! Mollitia temporibus aut, officiis animi id deleniti natus suscipit a incidunt possimus delectus vitae inventore? Pariatur veniam ab voluptas, eum velit ducimus soluta eligendi accusantium ipsum consectetur rem. Minus aspernatur, dignissimos perferendis praesentium recusandae itaque adipisci, ex ipsum deserunt, non repudiandae! Sapiente exercitationem ipsa quo, fuga voluptate atque eos ut nesciunt necessitatibus. Quos enim earum inventore exercitationem quia? Atque, tenetur cum. Mollitia eveniet eos dolore perferendis, assumenda sapiente aliquid tempore illum reiciendis fugit id asperiores molestiae odio porro, voluptatem, veniam at praesentium sequi? Id dignissimos ad quasi fuga nam libero quis natus porro quaerat aperiam aliquid voluptas cum labore consequatur, voluptatibus sed ullam rerum! Numquam, assumenda a quisquam rerum, ut atque pariatur nisi ipsum temporibus sapiente delectus dignissimos quas, exercitationem adipisci perferendis ipsa architecto! Iste magni a velit! Dolore, sapiente! Facere magni omnis provident nemo accusamus, velit consectetur voluptatem molestias laborum reprehenderit repudiandae numquam quia vel quas, sunt assumenda iusto perferendis inventore ipsum minus aliquid sit. Delectus, excepturi provident! Nisi nesciunt perferendis modi natus at aut error inventore repellat cupiditate sint, vitae vero sunt non dolorum mollitia corrupti fugit quaerat pariatur quis esse. Ipsam exercitationem sed ab reprehenderit animi dolore praesentium recusandae hic, mollitia fuga similique, nihil soluta quod et, earum placeat. Incidunt debitis nobis in cumque, at delectus ipsum nisi vero dignissimos officia molestiae eum tempora quasi rerum laboriosam alias repellendus iure porro totam ullam distinctio? Id, aperiam vitae et cupiditate vel voluptatem cumque hic nostrum numquam animi iusto, temporibus quo rem! Sed culpa aliquam quae deleniti odio veniam? Fugiat odit nemo quam voluptatem necessitatibus harum consectetur dicta libero consequatur delectus quaerat eaque recusandae voluptatibus, esse nisi, maiores veniam quod eveniet iure? Fugit ad consectetur dolorum necessitatibus dicta laboriosam ea dolore voluptas odio. Incidunt dolorem debitis labore ipsum laboriosam obcaecati beatae consequatur illo, eveniet aspernatur dignissimos sed tenetur possimus consequuntur odio ipsam molestias cumque ex earum aperiam assumenda voluptas laborum doloribus. Non sequi, libero nostrum porro veniam vel. Perspiciatis vitae sit deleniti dolorum doloribus minima iure iste expedita totam rem nulla repellat tempore dicta distinctio maiores, explicabo debitis quidem quaerat ea quibusdam, praesentium voluptates! Voluptatum rem, doloribus vitae repellendus omnis ipsa voluptates, sed illo sunt, aliquam atque aliquid ab? Fugiat sint ducimus doloribus ad porro quos dignissimos. Autem quos illo illum accusamus, eaque est facilis esse minus aliquam recusandae repellendus omnis! Architecto doloremque veniam quo eos perferendis neque cupiditate. In sequi non soluta! Maxime quaerat dolorem, totam natus iusto eligendi ipsum provident eos atque mollitia, porro debitis! Ipsa voluptatibus, architecto facere voluptas dignissimos possimus minima nostrum obcaecati ullam illo esse eos impedit commodi nobis maxime vero culpa eum corrupti hic suscipit quia laboriosam! Mollitia itaque optio velit eos cum nostrum doloremque expedita cupiditate eveniet hic temporibus molestias fugit aliquid laborum ipsa, earum perferendis, voluptatum voluptate saepe vel similique tempora incidunt sed! Numquam impedit ipsam earum?
				</div>
			</div>
		</>
	)
}
