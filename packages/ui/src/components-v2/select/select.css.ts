import { style, globalStyle } from '@vanilla-extract/css'
import { sprinkles, Sprinkles } from '../system/sprinkles.css'
import { fadeIn, fadeOut, sharedItemStyles } from '../dropdown-menu/dropdown-menu.css'

export const selectTrigger = style([
	sprinkles({}),
	{
		border: '0px solid red',
	},
])

export const selectTriggerIconOnly = style({})

globalStyle(`${selectTriggerIconOnly} > span:nth-child(1)`, {
	pointerEvents: 'none',
	width: '0',
	height: '0',
	position: 'absolute',
	opacity: 0,
})

export const selectContent = style([
	sprinkles({
		background: 'backgroundSecondary',
		boxShadow: 'shadowMedium',
		paddingX: 'small',
		paddingY: 'medium',
		color: 'colorNeutral',
		borderRadius: 'medium',
	}),
	{
		minWidth: '7rem',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		// transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		animationDuration: '150ms',
		selectors: {
			'&[data-state="open"]': {
				animationName: fadeIn,
				// animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animationName: fadeOut,
				// animationFillMode: 'forwards',
			},
		},
	},
])

export const selectMenuItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{
		outline: 'none',
	},
])
