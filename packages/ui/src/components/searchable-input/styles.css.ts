import { style } from '@vanilla-extract/css'

import { sharedItemStyles } from 'ui/src/components/dropdown-menu/styles.css'
import type { Sprinkles } from 'ui/src/theme/sprinkles.css'
import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const inputWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const searchableInputSimpleBarWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { maxHeight: '40vh' },
		tablet: { maxHeight: '40vh' },
	}),
])

export const searchableInputScrollAreaWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
	{
		minHeight: '44px',
	},
])

export const searchableInputButtonWrapper = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		gap: 'xsmall',
	}),
	{
		boxSizing: 'border-box',
		outline: 'none',
		height: '40px',
		maxWidth: '100%',
	},
])

export const searchableInputWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const searchableInputRightIconWrapper = style([
	sprinkles({
		pointerEvents: 'none',
	}),
])

export const searchableInputClearButton = style([
	sprinkles({
		position: 'absolute',
	}),
	{
		top: '8px',
		right: '8px',
	},
])
