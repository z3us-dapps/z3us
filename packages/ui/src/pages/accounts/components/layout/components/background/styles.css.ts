import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const accountsBgCardWrapper = style([
	sprinkles({
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		background: 'backgroundWallet',
		pointerEvents: 'none',
	}),
	{
		top: '-48px',
	},
	responsiveStyle({
		tablet: { display: 'none' },
	}),
])

export const accountsBgSkinWrapper = style([
	sprinkles({
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		pointerEvents: 'none',
	}),
	{
		top: '-48px',
	},
])

globalStyle(`${accountsBgSkinWrapper} img`, {
	opacity: '0.9',
})

globalStyle(`.${darkMode} ${accountsBgSkinWrapper} img`, {
	opacity: '0.9',
})

export const accountsBgCardResourceBgWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
	}),
])
