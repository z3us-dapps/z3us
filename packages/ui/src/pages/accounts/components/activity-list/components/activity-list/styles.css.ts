import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
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

export const activityItem = style([
	sprinkles({
		position: 'relative',
		paddingX: {
			mobile: 'medium',
			tablet: 'large',
		},
		transition: 'fast',
	}),
])

export const activityItemOuter = style([
	sprinkles({
		position: 'relative',
		paddingY: 'xsmall',
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
			left: `calc(${vars.spacing.small} * -1)`,
			right: `calc(${vars.spacing.small} * -1)`,
			borderRadius: vars.border.radius.medium,
			pointerEvents: 'none',
			background: vars.color.bai_pearl600,
		},
		selectors: {
			[`.${darkMode} &::before`]: {
				background: vars.color.lead400,
			},
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
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		paddingTop: 'medium',
		paddingBottom: 'medium',
		width: 'full',
		gap: 'medium',
		cursor: 'pointer',
	}),
	{
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
])

export const activityItemTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	}),
	{},
])

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
