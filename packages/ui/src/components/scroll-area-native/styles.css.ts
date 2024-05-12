import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const scrollAreaNativeWrapper = style([
	sprinkles({
		overflow: 'auto',
		height: 'full',
	}),
	{
		scrollbarColor: 'transparent transparent',
		scrollbarWidth: 'thin',
		transition: 'scrollbar-color 0.3s',
	},
])

globalStyle(`${scrollAreaNativeWrapper}::-webkit-scrollbar`, {
	width: '8px',
})

globalStyle(`${scrollAreaNativeWrapper}:hover`, {
	scrollbarColor: `${vars.color.scrollbarThumb} transparent`,
})

globalStyle(`${scrollAreaNativeWrapper}::-webkit-scrollbar-thumb`, {
	borderRadius: '5px',
})

export const scrollAreaNativeHiddenScrollBarsWrapper = style([
	sprinkles({
		overflow: 'auto',
		height: 'full',
	}),
	{
		scrollbarWidth: 'none',
	},
])

export const scrollAreaNativeShadowWrapper = style([
	sprinkles({
		position: 'relative',
	}),
])

export const scrollAreaNativeShadowBottomEnabled = style([
	sprinkles({
		width: 'full',
		zIndex: 1,
		position: 'absolute',
		bottom: 0,
		left: 0,
		pointerEvents: 'none',
	}),
	{
		background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
		height: '15px',
		transition: vars.transition.fastall,
	},
])

export const scrollAreaNativeShadowTopEnabled = style([
	sprinkles({
		width: 'full',
		zIndex: 1,
		position: 'absolute',
		top: 0,
		left: 0,
	}),
	{
		height: '15px',
		background: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))',
		transition: vars.transition.fastall,
	},
])

export const scrolledButtonWrapper = style([
	sprinkles({
		position: 'absolute',
		display: 'block',
		transition: 'fast',
		zIndex: 2,
		bottom: 0,
		right: 0,
		marginRight: 'medium',
		marginBottom: 'medium',
		opacity: 0,
		pointerEvents: 'none',
	}),
])

export const scrolledButtonWrapperVisible = style([
	sprinkles({
		pointerEvents: 'auto',
	}),
	{ opacity: 0.7 },
])
