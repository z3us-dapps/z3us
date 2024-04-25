/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, style } from '@vanilla-extract/css'

import type { Sprinkles } from 'ui/src/theme/sprinkles.css'
import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

import { fadeIn, fadeOut, sharedPopoverBgSelectorStyles, sharedPopoverBgSprinkles } from '../dropdown-menu/styles.css'

export const popoverContentWrapper = style([
	sprinkles({
		...(sharedPopoverBgSprinkles as Sprinkles),
	}),
	{
		overscrollBehavior: 'contain',
		padding: '0',
		margin: '0',
		minWidth: '70px',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		animationDuration: '300ms',
		selectors: {
			...sharedPopoverBgSelectorStyles,
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
