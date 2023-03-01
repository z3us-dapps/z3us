import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

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

export const logoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 'full',
		background: 'transparent',
		// background: 'white',
		borderWidth: 'xsmall',
		borderStyle: 'solid',
		borderColor: 'wax300',
	}),
	{
		width: '48px',
		height: '48px',
	},
])

export const logoWrapperInner = style([
	sprinkles({
		position: 'relative',
		// background: 'red600',
		borderRadius: 'full',
		// overflow: 'clip',
		background: 'wax300',
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
		fill: 'wax500',
		pointerEvents: 'none',
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
		fill: 'wax500',
		pointerEvents: 'none',
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
