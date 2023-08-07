import { keyframes, style } from '@vanilla-extract/css'

import type { Sprinkles } from '../system/sprinkles.css'
import { sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

// import { vars } from 'ui/src/components/system/theme.css'

export const fadeIn = keyframes({
	'0%': { opacity: '0' },
	'100%': { opacity: '1' },
})

export const fadeOut = keyframes({
	'0%': { opacity: '1' },
	'100%': { opacity: '0' },
})

export const sharedItemStyles = {
	position: 'relative',
	color: 'colorNeutral',
	cursor: 'pointer',
	display: 'flex',
	flexShrink: 0,
	alignItems: 'center',
	paddingY: 'small',
	paddingX: 'small',
	borderRadius: 'small',
	transition: 'fast',
	background: {
		hover: 'btnSecondaryBackgroundHover',
		active: 'btnSecondaryBackground',
		focusVisible: 'btnSecondaryBackgroundHover',
	},
}

export const sharedPopoverBgSprinkles = {
	background: 'backgroundSecondary',
	boxShadow: {
		lightMode: 'shadowDropdown',
	},
	color: 'colorNeutral',
	borderRadius: 'medium',
	position: 'relative',
	zIndex: 2,
}

export const sharedPopoverBgStyles = {
	transform: 'translateX(-50%)',
	width: '100%',
	left: '50%',
	animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
	transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
	willChange: 'transform, opacity',
	animationDuration: '150ms',
}

export const sharedPopoverBgSelectorStyles = {
	'&[data-state="open"]': {
		animationName: fadeIn,
		animationFillMode: 'forwards',
	},
	'&[data-state="closed"]': {
		animationName: fadeOut,
		animationFillMode: 'forwards',
	},
	'&:focus-visible': {
		outline: 'none',
	},
}

export const dropdownMenuContent = style([
	sprinkles({
		...(sharedPopoverBgSprinkles as Sprinkles),
		padding: 'small',
	}),
	{
		...sharedPopoverBgStyles,
		selectors: {
			...sharedPopoverBgSelectorStyles,
		},
	},
])

export const dropdownMenuSubContent = style([
	sprinkles({
		...(sharedPopoverBgSprinkles as Sprinkles),
		padding: 'small',
	}),
	{
		...sharedPopoverBgStyles,
		selectors: {
			...sharedPopoverBgSelectorStyles,
		},
	},
])

export const dropdownMenuSubTrigger = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{
		outline: 'none',
		minHeight: '40px',
		maxWidth: '100%',
	},
])

export const dropdownMenuItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{
		outline: 'none',
		minHeight: '40px',
	},
])

export const dropdownMenuRadioItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
	}),
	{
		outline: 'none',
		minHeight: '40px',
		maxWidth: '100%',
	},
])

export const dropdownMenuSeparator = style([
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
		marginLeft: 'medium',
	}),
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
		flexShrink: 0,
	}),
	{},
])

export const dropdownMenuVirtuosoWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const dropdownMenuVirtuosoContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
])

export const dropdownMenuVirtuosoSimpleBarWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { maxHeight: '40vh' },
		tablet: { maxHeight: '40vh' },
	}),
])

export const dropdownMenuVirtuosoScrollAreaWrapper = style([
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
