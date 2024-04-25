import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const mobileStackedNavVisibleWrapper = style([
	sprinkles({
		display: {
			mobile: 'block',
			tablet: 'none',
		},
	}),
	{},
])

export const mobileStackedNavHiddenWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
		},
	}),
	{},
])

export const mobileStackedNavLinksWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		paddingBottom: 'xlarge',
	}),
	{},
])

export const mobileStackedNavLinkWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		paddingX: 'small',
		paddingY: 'large',
		gap: 'medium',
		textDecoration: 'none',
		transition: 'fast',
		borderRadius: 'large',
		color: 'purple500',
		background: {
			lightMode: 'transparent',
			hover: 'backgroundPrimary',
		},
		boxShadow: {
			hover: 'shadowActivePanel',
		},
	}),
	{
		marginTop: '-1px',
		':after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			backgroundColor: vars.color.borderDivider,
			pointerEvents: 'none',
			height: '1px',
		},
	},
])

export const mobileStackedNavLinkTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
		flexGrow: 1,
	}),
	{},
])

export const mobileStackedNavLinkIconWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	}),
	{
		width: '24px',
		height: '24px',
	},
])

export const mobileStackedNavLinkArrowWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
		paddingLeft: 'medium',
		transition: 'fast',
	}),
	{
		opacity: '0.7',
	},
])

globalStyle(`${mobileStackedNavLinkWrapper}:hover ${mobileStackedNavLinkArrowWrapper}`, {
	opacity: 1,
	transform: 'translateX(-5px)',
})

globalStyle(`${mobileStackedNavLinksWrapper} ${mobileStackedNavLinkWrapper}:first-child`, {
	marginTop: '0',
})

globalStyle(`${mobileStackedNavLinksWrapper} ${mobileStackedNavLinkWrapper}:first-child:after`, {
	display: 'none',
})

globalStyle(`${mobileStackedNavLinksWrapper} ${mobileStackedNavLinkWrapper}:hover:after`, {
	left: `calc(${vars.spacing.medium} * 1)`,
	right: `calc(${vars.spacing.medium} * 1)`,
})

globalStyle(
	`${mobileStackedNavLinksWrapper} ${mobileStackedNavLinkWrapper}:hover + ${mobileStackedNavLinkWrapper}:after`,
	{
		left: `calc(${vars.spacing.medium} * 1)`,
		right: `calc(${vars.spacing.medium} * 1)`,
	},
)
