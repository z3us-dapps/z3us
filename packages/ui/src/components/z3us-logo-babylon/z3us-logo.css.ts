import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

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
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		outline: 'none',
		width: '24px',
		height: '24px',
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

export const z3usBrandTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		overflow: 'hidden',
		cursor: 'pointer',
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		outline: 'none',
		width: '120px',
		height: '20px',
	},
])

export const z3usBrandTextSvgWrapper = style([
	sprinkles({
		position: 'relative',
		transition: 'fastall',
		fill: {
			lightMode: 'bai_pearl0',
			darkMode: 'bleached_silk300',
			hover: 'blue_magenta400',
		},
	}),
])

export const z3usBrandTextWrapperScreen = style([
	{
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: vars.color.purple500,
		transform: 'translateY(50%)',
		// transform: 'translateY(100%)',
		pointerEvents: 'none',
		transition: 'ease-in .2s',
	},
])

globalStyle(`${z3usBrandTextWrapper}:hover ${z3usBrandTextWrapperScreen}`, {
	transform: 'translateY(0%)',
})
