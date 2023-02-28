import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const desktopWrapper = sprinkles({
	height: 'vh100',
	width: 'vw100',
	flexDirection: 'column',

	display: {
		mobile: 'none',
		desktop: 'flex',
	},
})

export const desktopBody = sprinkles({
	position: 'relative',
	flexGrow: 1,
})
