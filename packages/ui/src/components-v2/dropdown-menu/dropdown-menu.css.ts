import { style, keyframes } from '@vanilla-extract/css'
import { sprinkles, Sprinkles } from '../system/sprinkles.css'

const fadeIn = keyframes({
	'0%': { transform: 'scale(0.95)', opacity: '0' },
	'100%': { transform: 'scale(1.00)', opacity: '1' },
})

const fadeOut = keyframes({
	'0%': { transform: 'scale(1.00)', opacity: '1' },
	'100%': { transform: 'scale(0.95)', opacity: '0' },
})

export const dropdownMenuContent = style([
	sprinkles({
		background: 'backgroundSecondary',
		boxShadow: 'shadowMedium',
		paddingX: 'medium',
		paddingY: 'medium',
		color: 'colorNeutral',
		borderRadius: 'medium',
	}),
	{
		minWidth: '7rem',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',

		animationDuration: '150ms',
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

const sharedItemStyles = {
	position: 'relative',
	color: 'colorNeutral',
	display: 'flex',
	alignItems: 'center',
	width: 'full',
	paddingY: 'xsmall',
}

export const dropdownMenuItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{
		borderRadius: 'small',
	},
])

export const dropdownMenuSeperator = style([
	sprinkles({
		position: 'relative',
		marginY: 'medium',
		background: 'backgroundPrimary',
	}),
	{
		height: '1px',
	},
])

export const dropdownMenuArrow = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const dropdownMenuLabel = style([
	sprinkles({
		position: 'relative',
		marginBottom: 'small',
	}),
	{},
])

export const dropdownMenuRadioGroup = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const dropdownMenuRadioItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{},
])

export const dropdownMenuItemIndicator = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const dropdownMenuItemRightSlot = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])
