import { style, keyframes } from '@vanilla-extract/css'
import { sprinkles, Sprinkles } from '../system/sprinkles.css'

const fadeIn = keyframes({
	'0%': { transform: 'scale(0.90) translateY(-20px)', opacity: '0' },
	'100%': { transform: 'scale(1.00) translateY(0px)', opacity: '1' },
})

const fadeOut = keyframes({
	'0%': { transform: 'scale(1.00) translateY(0px)', opacity: '1' },
	'100%': { transform: 'scale(0.90) translateY(0px)', opacity: '0' },
})

export const selectTrigger = style([sprinkles({}), {}])

export const selectContent = style([sprinkles({}), {}])

// old

export const dropdownMenuContent = style([
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
	paddingY: 'small',
	paddingX: 'small',
	borderRadius: 'small',
	transition: 'fast',
	background: {
		hover: 'btnSecondaryBackgroundHover',
		active: 'btnSecondaryBackground',
		focusVisible: 'btnSecondaryBackgroundHover',
	},
	// @TOOO: bring this back when upgrading the package https://www.radix-ui.com/docs/primitives/components/dropdown-menu
	// boxShadow: {
	// 	focusVisible: 'btnSecondaryShadowFocus',
	// },
}

export const dropdownMenuItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{
		outline: 'none',
	},
])

export const dropdownMenuRadioItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{
		outline: 'none',
	},
])

export const dropdownMenuSeperator = style([
	sprinkles({
		position: 'relative',
		marginY: 'small',
		marginX: 'small',
		background: 'backgroundPrimary',
	}),
	{
		height: '1px',
	},
])

export const dropdownMenuArrow = style([
	sprinkles({
		position: 'relative',
		fill: 'backgroundSecondary',
	}),
	{},
])

export const dropdownMenuLabel = style([
	sprinkles({
		position: 'relative',
		padding: 'small',
	}),
	{},
])

export const dropdownMenuRadioGroup = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const dropdownMenuItemIndicator = style([
	sprinkles({
		position: 'relative',
		flexShrink: 0,
		flexGrow: 0,
		display: 'flex',
		alignItems: 'center',
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

export const dropdownMenuItemLeftSlot = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])
