import { globalStyle, style } from '@vanilla-extract/css'

import type { Sprinkles } from 'ui/src/theme/sprinkles.css'
import { sprinkles } from 'ui/src/theme/sprinkles.css'

import { fadeIn, fadeOut, sharedItemStyles, sharedPopoverBgSprinkles } from '../dropdown-menu/styles.css'

export const selectTrigger = style([sprinkles({}), {}])

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
		...(sharedPopoverBgSprinkles as Sprinkles),
		padding: 'small',
	}),
	{
		minWidth: '120px',
		maxWidth: '260px',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		animationDuration: '150ms',
		selectors: {
			'&[data-state="open"]': {
				animationName: fadeIn,
			},
			'&[data-state="closed"]': {
				animationName: fadeOut,
			},
		},
	},
])

export const selectMenuItem = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
		alignItems: 'center',
		textAlign: 'left',
	}),
	{
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		fontSize: '14px',
		lineHeight: '16px',
		outline: 'none',
		height: '36px',
		maxWidth: '100%',
	},
])

globalStyle(`${selectMenuItem} > span:nth-child(1)`, {
	flex: 1,
	minWidth: '0px',
})

export const selectMenuItemCheckIcon = style([
	sprinkles({
		marginTop: 'xsmall',
		flexShrink: 0,
	}),
])

export const selectItemIndicator = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		marginLeft: 'small',
	}),
])

export const selectLabelWrapper = style([
	sprinkles({
		display: 'flex',
		flexShrink: 0,
		alignItems: 'center',
		paddingY: 'small',
		paddingX: 'small',
		borderRadius: 'small',
	}),
])

export const selectMenuSeparator = style([
	sprinkles({
		borderTop: 1,
		borderTopStyle: 'solid',
		borderColor: 'borderDivider',
		marginY: 'medium',
	}),
	{
		height: '1px',
	},
])

export const selectMenuScrollButton = style([
	sprinkles({
		...(sharedItemStyles as Sprinkles),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: {
			lightMode: 'colorNeutral',
			hover: 'colorStrong',
		},
	}),
	{
		height: '24px',
	},
])

export const selectIconWrapper = style([
	sprinkles({
		margin: 'none',
		padding: 'none',
	}),
])

export const selectFullWidthButton = style([{ justifyContent: 'space-between' }])
