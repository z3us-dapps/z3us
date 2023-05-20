import { style } from '@vanilla-extract/css'
import { sharedItemStyles } from 'ui/src/components-v2/dropdown-menu/dropdown-menu.css'

import { Sprinkles, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const searchableInputWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

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
		minHeight: '200px',
	},
])

export const searchableInputButtonWrapper = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
		width: 'full',
		display: 'flex',
		alignItems: 'center',
	}),
	{
		boxSizing: 'border-box',
		outline: 'none',
		height: '40px',
		maxWidth: '100%',
	},
])
