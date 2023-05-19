/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, style } from '@vanilla-extract/css'

import { Sprinkles, sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

export const fadeIn = keyframes({
	'0%': { opacity: '0' },
	'100%': { opacity: '1' },
})

export const fadeOut = keyframes({
	'0%': { opacity: '1' },
	'100%': { opacity: '0' },
})

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

export const popoverContentWrapper = style([
	sprinkles({
		position: 'relative',
		background: 'backgroundSecondary',
		boxShadow: 'shadowDropdown',
		paddingX: 'small',
		paddingY: 'medium',
		color: 'colorNeutral',
		borderRadius: 'medium',
	}),
	{
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
		minWidth: '70px',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		animationDuration: '300ms',
		selectors: {
			'&[data-state="open"]': {
				animationName: fadeIn,
				animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animationName: fadeOut,
				animationFillMode: 'forwards',
			},
		},
	},
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
