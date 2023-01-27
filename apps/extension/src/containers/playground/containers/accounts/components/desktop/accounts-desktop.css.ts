import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const desktopWrapper = sprinkles({
	color: 'defaultColor',
	height: 'vh100',
	width: 'vw100',
	flexDirection: 'column',

	display: {
		mobile: 'none',
		tablet: 'flex',
	},
})

export const desktopBody = sprinkles({
	position: 'relative',
	flexGrow: 1,
})

// .card-wrapper {
// 	position: relative;
// 	margin: 0 auto;
// 	width: 312px;
// 	height: 180px;
// }
//
// .card {
// 	position: absolute;
// 	width: 312px;
// 	height: 180px;
// 	border-radius: 8px;
// 	transform-origin: top center;
// 	list-style: none;
// 	/* border: 1px solid blue; */
// }
