import { keyframes, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const fadeIn = keyframes({
	'0%': { transform: 'rotate(0deg)' },
	'100%': { transform: 'rotate(360deg)' },
})

export const loaderWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		alignItems: 'center',
		justifyContent: 'center',
		height: 'full',
		width: 'full',
		background: 'transparent',
	}),
	{},
])

export const loaderText = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])

export const logoWrapperShineAnimation = style([
	sprinkles({
		position: 'absolute',
		borderRadius: 'full',
	}),
	{
		top: '-1px',
		left: '-1px',
		background: 'red',
		backgroundImage: `linear-gradient(135deg, ${vars.color.bleached_silk800} 0%, ${vars.color.bleached_silk800} 25%, ${vars.color.purple500} 50%, ${vars.color.bleached_silk800} 100%)`,
		animationDuration: '2000ms',
		animationName: fadeIn,
		animationIterationCount: 'infinite',
		width: '50px',
		height: '50px',
		selectors: {
			[`.${darkMode} &`]: {
				backgroundImage: `linear-gradient(135deg, ${vars.color.wax300} 0%, ${vars.color.wax300} 25%, ${vars.color.blue_magenta300} 50%, ${vars.color.wax300} 100%)`,
			},
		},
	},
])

export const logoOuterWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '48px',
		height: '48px',
	},
])

export const logoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 'full',
		width: 'full',
		height: 'full',
		borderWidth: 'xsmall',
		borderStyle: 'solid',
		borderColor: {
			lightMode: 'bleached_silk800',
			darkMode: 'wax300',
		},
		background: {
			lightMode: 'bleached_silk500',
			darkMode: 'wax500',
		},
	}),
	{},
])

export const logoWrapperInner = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		overflow: 'hidden',
		background: {
			lightMode: 'bleached_silk500',
			darkMode: 'wax300',
		},
	}),
	{
		width: '41px',
		height: '41px',
	},
])

export const logoSvgLeft = style([
	sprinkles({
		display: 'block',
		position: 'absolute',
		pointerEvents: 'none',
		fill: {
			lightMode: 'bleached_silk800',
			darkMode: 'wax500',
		},
	}),
	{
		width: '35px',
		height: 'auto',
		top: '8px',
		left: '-1px',
	},
])

export const logoSvgRight = style([
	sprinkles({
		display: 'block',
		position: 'absolute',
		pointerEvents: 'none',
		fill: {
			lightMode: 'bleached_silk800',
			darkMode: 'wax500',
		},
	}),
	{
		width: '35px',
		height: 'auto',
		top: '16px',
		right: '-3px',
	},
])

export const ellipsisWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		gap: '0.3em',
	},
])

export const ellipsisElement = style([
	sprinkles({
		borderRadius: 'full',
	}),
	{
		backgroundColor: 'currentColor',
		width: '0.2em',
		height: '0.2em',
	},
])
