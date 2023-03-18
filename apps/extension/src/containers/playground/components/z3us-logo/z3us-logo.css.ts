import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const navigationLogoLink = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		overflow: 'hidden',
		cursor: 'pointer',
		borderRadius: 'full',
		background: {
			lightMode: 'black',
			darkMode: 'white',
		},
	}),
	{
		width: '24px',
		height: '24px',
		selectors: {
			// [`.${darkMode} &`]: {},
			// [`${parent} & svg`]: {
			// 	fill: 'backgroundPrimary',
			// },
		},
	},
])

export const navigationLogoLinkScreen = style([
	{
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: vars.color.purple500,
		transform: 'translateY(100%)',
		pointerEvents: 'none',
		transition: 'ease-in .2s',
	},
])

globalStyle(`${navigationLogoLink}:hover ${navigationLogoLinkScreen}`, {
	transform: 'translateY(0%)',
})

export const logoSvg = style([
	sprinkles({
		position: 'relative',
		fill: 'backgroundPrimary',
	}),
])
