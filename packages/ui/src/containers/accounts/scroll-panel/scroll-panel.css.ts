import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		overflow: 'hidden',
		transition: 'slow',
	}),
	{},
	responsiveStyle({
		tablet: {
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
		},
	}),
])

export const mobileScrollWrapper = style([
	sprinkles({
		position: 'relative',
		// width: 'full',
		// height: 'full',
	}),
	{
		height: 'auto',
		border: '1px solid red',
	},
])

export const mobileSimpleBarWrapper = style([
	sprinkles({
		width: 'full',
		// left: 0,
		// right: 0,
		// top: 0,
		// bottom: 0,
	}),
	{
		border: '1px solid blue',
	},
	responsiveStyle({
		mobile: {
			position: 'absolute',
		},
		tablet: {
			position: 'relative',
		},
	}),
])

export const desktopScrollWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		// height: 'full',
	}),
	{
		height: '200px',
		border: '1px solid yellow',
	},
])

export const desktopSimpleBarWrapper = style([
	sprinkles({
		width: 'full',
		// left: 0,
		// right: 0,
		// top: 0,
		// bottom: 0,
	}),
	{
		height: '200px',
		border: '1px solid green',
	},
	responsiveStyle({
		mobile: {
			position: 'relative',
		},
		tablet: {
			position: 'relative',
		},
	}),
])

export const simpleBarDisabled = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	// responsiveStyle({
	// 	tablet: {
	// 		borderRadius: vars.border.radius.xlarge,
	// 		background: vars.color.backgroundSecondary,
	// 		boxShadow: vars.color.shadowPanel,
	// 	},
	// }),
])

globalStyle(`${simpleBarDisabled} .simplebar-wrapper`, {
	overflow: 'unset',
})

globalStyle(`${simpleBarDisabled} .simplebar-mask`, {
	overflow: 'unset',
	position: 'relative',
})

globalStyle(`${simpleBarDisabled} .simplebar-offset`, {
	overflow: 'unset',
	position: 'unset !important' as 'unset',
})

globalStyle(`${simpleBarDisabled} .simplebar-placeholder`, {
	display: 'none',
})
