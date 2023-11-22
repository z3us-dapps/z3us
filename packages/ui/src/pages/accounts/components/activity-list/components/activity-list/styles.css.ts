import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const activityWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		background: 'backgroundSecondary',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		marginTop: {
			tablet: 'small',
		},
		paddingTop: {
			tablet: 'small',
		},
		paddingBottom: {
			tablet: 'small',
		},
	}),
	{},
	responsiveStyle({
		tablet: { borderTop: '1px solid', borderColor: vars.color.borderDivider },
	}),
])

export const activityTitleText = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'block',
		},
		position: 'relative',
		paddingTop: 'medium',
		paddingX: {
			tablet: 'large',
		},
	}),
])

export const activityItem = style([
	sprinkles({
		position: 'relative',
		paddingX: {
			tablet: 'large',
		},
		transition: 'fast',
	}),
])

export const activityItemOuter = style([
	sprinkles({
		position: 'relative',
		paddingY: 'small',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const activityItemInner = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: 'borderDivider',
		transition: 'fast',
		border: 0,

		paddingX: {
			mobile: 'large',
			tablet: 'none',
		},
	}),
	{
		height: '60px',
		width: '100%',
		'::before': {
			content: '""',
			position: 'absolute',
			opacity: 0,
			transition: vars.transition.fast,
			top: 0,
			bottom: 0,
			left: `calc(${vars.spacing.small} * 1)`,
			right: `calc(${vars.spacing.small} * 1)`,
			borderRadius: vars.border.radius.medium,
			pointerEvents: 'none',
			background: vars.color.btnTertiaryBackgroundHover,
		},
		selectors: {
			'&:focus-visible': {
				outline: 'none',
			},
			'&:hover::before': {
				opacity: 1,
			},
		},
	},
	responsiveStyle({
		tablet: {
			'::before': {
				boxShadow: `${vars.color.shadowActivePanel}`,
				left: `calc(${vars.spacing.medium} * -1)`,
				right: `calc(${vars.spacing.medium} * -1)`,
			},
		},
	}),
])

globalStyle(`${activityWrapper} > div > div > div > div:first-child ${activityItemOuter}`, {
	borderTop: 'none',
})

export const activityItemInnerBtn = style([
	sprinkles({
		display: 'grid',
		position: 'relative',
		width: 'full',
		alignItems: 'center',
		gap: 'medium',
		cursor: 'pointer',
	}),
	{
		paddingTop: '12px',
		selectors: {
			'&:focus-visible': {
				outline: 'none',
			},
			'&:focus-visible::before': {
				outline: 'none',
				border: 'none',
			},
			'&:hover::before': {
				opacity: 1,
			},
		},
	},
	responsiveStyle({
		mobile: {
			gap: vars.spacing.small,
			gridTemplateColumns: '24px 1fr 1fr 130px',
		},
	}),
])

export const activityItemTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	}),
	{},
])

export const activityItemStatusWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])

export const activityItemTextPriceWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		gap: 'xxsmall',
		paddingTop: 'xxsmall',
	}),
	{},
])

export const activityItemTextEventsWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexGrow: 1,
	}),
	{},
])

export const activityItemBalanceChangeWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{},
])

globalStyle(`${activityItemBalanceChangeWrapper} > div:not(:first-child)`, {
	marginLeft: '-4px',
})

export const activityItemInnerSelected = style([
	sprinkles({}),
	{
		boxShadow: 'none',
		'::before': {
			opacity: 1,
		},
	},
])

export const activityItemInnerSelectedContent = style([
	sprinkles({
		width: 'full',
	}),
	{},
])

export const indicatorCircle = style([
	sprinkles({
		position: 'relative',
		color: 'colorStrong',
		background: 'backgroundPrimary',
		borderRadius: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	}),
	{
		width: '36px',
		height: '36px',
	},
])
