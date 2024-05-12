import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const listWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	}),
])

export const listItemWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		gap: {
			mobile: 'medium',
		},
		border: 0,
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		color: 'colorNeutral',
	}),
	{
		outline: 'none',
		':hover': {
			borderColor: 'transparent',
		},
		selectors: {
			'&:nth-child(1)': {
				borderTop: '0',
			},
		},
		':before': {
			content: '""',
			position: 'absolute',
			left: `calc(${vars.spacing.small} * -1)`,
			right: `calc(${vars.spacing.small} * -1)`,
			top: 0,
			bottom: 0,
			boxShadow: vars.color.shadowActivePanel,
			backgroundColor: vars.color.btnTertiaryBackgroundHover,
			transition: vars.transition.fast,
			borderRadius: vars.border.radius.medium,
			pointerEvents: 'none',
			opacity: 0,
		},
	},
	responsiveStyle({
		mobile: { minHeight: '68px' },
	}),
])

export const listItemInnerWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		width: 'full',
		gap: {
			mobile: 'medium',
		},
	}),
])

export const listItemLink = style([
	sprinkles({
		cursor: 'pointer',
		transition: 'fast',
	}),
])

globalStyle(
	`${listItemLink}:hover::before`,
	responsiveStyle({
		mobile: {
			opacity: 1,
			boxShadow: vars.color.shadowActivePanel,
			backgroundColor: vars.color.btnTertiaryBackgroundHover,
		},
	}),
)

export const listIconWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	responsiveStyle({
		mobile: { minWidth: '32px', minHeight: '32px' },
	}),
])

export const listTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	}),
])

// OLD
export const layoutTwoColInnerWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		maxWidth: 'xxlarge',
		display: 'flex',
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
		gap: {
			mobile: 'xsmall',
			tablet: 'xlarge',
		},
	}),
])

export const layoutTwoColLeftWrapper = style([
	sprinkles({
		position: 'relative',
		display: {
			mobile: 'flex',
			tablet: 'flex',
		},
		flexDirection: 'column',
		gap: 'medium',
		paddingLeft: {
			desktop: 'medium',
		},
		paddingTop: {
			tablet: 'xlarge',
			desktop: 'xxlarge',
		},
		alignItems: 'self-start',
		flexShrink: 0,
	}),
	responsiveStyle({
		tablet: { width: '20%' },
		desktop: { width: '260px' },
	}),
])

globalStyle(`${layoutTwoColLeftWrapper} ul`, {
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
})

export const layoutTwoColRightWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	responsiveStyle({
		desktop: { maxWidth: '820px' },
	}),
])
