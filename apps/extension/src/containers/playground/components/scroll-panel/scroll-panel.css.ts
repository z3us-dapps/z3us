import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style, globalStyle } from '@vanilla-extract/css'

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

globalStyle(`${panelWrapper} .simplebar-content:focus, ${panelWrapper} .simplebar-content:focus-visible`, {
	border: 'none',
	outline: 'none',
})

globalStyle(
	`${panelWrapper} .simplebar-content-wrapper:focus, ${panelWrapper} .simplebar-content-wrapper:focus-visible`,
	{
		border: 'none',
		outline: 'none',
	},
)
