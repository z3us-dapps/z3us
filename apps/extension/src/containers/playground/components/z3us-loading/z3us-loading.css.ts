import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const loaderWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		alignItems: 'center',
		justifyContent: 'center',
		height: 'full',
		width: 'full',
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
		// background: 'white',
		borderWidth: 'xsmall',
		borderStyle: 'solid',
		borderColor: 'wax300',
		// overflow: 'clip',
	}),
	{
		width: '48px',
		height: '48px',
	},
])

export const logoWrapperInner = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		background: 'wax300',
		overflow: 'clip',
	}),
	{
		width: '41px',
		height: '41px',
	},
])

export const logoSvg = style([
	sprinkles({
		display: 'none',
		position: 'relative',
		fill: 'white',
	}),
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
