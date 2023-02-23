import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const mobileWrapper = sprinkles({
	height: 'vh100',
	width: 'vw100',
	flexDirection: 'column',

	display: {
		mobile: 'flex',
		desktop: 'none',
	},
})
