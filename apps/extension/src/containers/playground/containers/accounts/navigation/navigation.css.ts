import { globalStyle, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const navigationWrapper = sprinkles({
	zIndex: 1,
	display: 'flex',
	justifyContent: 'center',
	paddingLeft: 'large',
	paddingRight: 'large',
	borderBottom: 1,
	borderBottomStyle: 'solid',
	borderColor: {
		lightMode: 'bleached_silk600',
		darkMode: 'lead500',
	},
})

export const navigationContainer = style([
	sprinkles({
		position: 'relative',
		maxWidth: 'xxlarge',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
	}),
	{
		height: '70px',
	},
])

export const navigationLogoLink = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		overflow: 'hidden',
		cursor: 'pointer',
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

export const navigationMenu = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		gap: 'medium',
		paddingLeft: 'xlarge',
	}),
	{},
])

export const navigationMenuLink = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		justifyContent: 'center',
		position: 'relative',
		textDecoration: 'none',
		borderRadius: 'xlarge',
		transition: 'fast',
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		outline: 'none',
		height: `${calc(vars.grid).multiply(8)}`,
		':hover': {
			background: vars.color.white,
		},
		selectors: {
			[`.${darkMode} &:hover`]: {
				background: vars.color.lead400,
			},
		},
	},
])

export const navigationMenuLinkText = style([
	sprinkles({
		position: 'relative',
		transition: 'fast',
	}),
])

export const navigationMenuLinkTextSelected = style([
	sprinkles({
		color: {
			lightMode: 'colorStrong',
			darkMode: 'colorStrong',
		},
	}),
])

export const navigationMenuActiveLine = style([
	sprinkles({
		position: 'absolute',
		inset: 0,
		pointerEvents: 'none',
		borderRadius: 'xlarge',
		background: {
			lightMode: 'white',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		height: '100%',
		width: '100%',
	},
])

export const copiedAnimationWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		height: '24px',
		width: '24px',
	},
])
