import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		background: 'backgroundSecondary',
		boxShadow: 'shadowMedium',
		borderRadius: 'xlarge',
		overflow: 'clip',
	}),
	{},
])
