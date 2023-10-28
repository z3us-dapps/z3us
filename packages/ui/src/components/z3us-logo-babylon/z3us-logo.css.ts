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
		// cursor: 'pointer',
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
			lightMode: 'wax400',
			darkMode: 'bleached_silk300',
			// hover: 'blue_magenta400',
		},
	}),
])

export const z3usLogoLargeWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		borderRadius: 'full',
		overflow: 'hidden',
		fill: 'backgroundPrimary',
		transition: 'fastall',
	}),
	{},
])

export const z3usLogoLargeMediumWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '232px',
		height: '232px',
		boxShadow: '0px 10px 44px 0px #00000059',
	},
])

export const z3usLogoFillPurpleWrapper = style([
	{
		fill: vars.color.purple500,
	},
])
