/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, style } from '@vanilla-extract/css'

import { Sprinkles, sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

const slideDown = keyframes({
	from: { height: 0 },
	to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
	from: { height: 'var(--radix-accordion-content-height)' },
	to: { height: 0 },
})

export const accordionHeaderWrapper = style([sprinkles({}), {}])

export const accordionTriggerWrapper = style([sprinkles({}), {}])

export const accordionContentWrapper = style([
	sprinkles({
		margin: 'none',
		padding: 'none',
		overflow: 'hidden',
	}),
	{
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		animationDuration: '300ms',
		selectors: {
			'&[data-state="open"]': {
				animationName: slideDown,
				animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animationName: slideUp,
				animationFillMode: 'forwards',
			},
		},
	},
])
