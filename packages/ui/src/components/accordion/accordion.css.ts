import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

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
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		animationDuration: '300ms',
		selectors: {
			'&[data-state="open"]': {
				animationName: slideDown,
			},
			'&[data-state="closed"]': {
				animationName: slideUp,
			},
		},
	},
])
