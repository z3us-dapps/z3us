import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const leftPanel = style([
	sprinkles({
		position: 'relative',
	}),
	{
		alignSelf: 'flex-start',
	},
])

export const rightPanel = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'clip',
	}),
	{
		alignSelf: 'flex-start',
		width: '392px',
		maxHeight: '100%',
	},
])
