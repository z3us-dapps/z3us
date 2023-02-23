/* eslint-disable @typescript-eslint/no-unused-vars */
import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const activityWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		borderBottomRightRadius: 'large',
		borderBottomLeftRadius: 'large',
	}),
	{
		width: '100%',
		// maxHeight: '100%',
		// flex: '1 1 0',
	},
	// responsiveStyle({
	// 	mobile: { width: '100%' },
	// 	tablet: { width: '33%' },
	// 	desktop: { width: '25%' },
	// }),
])

export const activtyItem = style([
	sprinkles({
		position: 'relative',
		paddingX: 'large',
		transition: 'fast',
		// background: {
		// 	hover: 'backgroundPrimary',
		// },
	}),
])

export const activtyItemOuter = style([
	sprinkles({
		position: 'relative',
	}),
])

export const activtyItemExternalLinkWrapper = style([
	sprinkles({
		position: 'absolute',
		right: 0,
		top: 0,
		display: 'flex',
		alignItems: 'center',
		pointerEvents: 'none',
		opacity: 0,
	}),
	{
		height: '64px',
	},
])

export const activtyItemExternalLinkWrapperActive = style([
	sprinkles({
		opacity: 1,
	}),
	{},
])

globalStyle(`${activtyItemExternalLinkWrapperActive} > a`, {
	pointerEvents: 'auto',
})

export const activtyItemInner = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: 'borderDivider',

		transition: 'fast',
		border: 0,
		// boxShadow: {
		// 	focusVisible: 'btnSecondaryShadowFocus',
		// },
		// outline: 'none',
	}),
	{
		width: '100%',
		height: 'auto',
		boxShadow: '0 -1px 0 0',
		'::before': {
			content: '""',
			position: 'absolute',
			opacity: 0,
			transition: vars.transition.fast,
			top: 0,
			bottom: 0,
			left: `calc(${vars.spacing.medium} * -1)`,
			right: `calc(${vars.spacing.medium} * -1)`,
			pointerEvents: 'none',
			background: vars.color.lead400,
			borderRadius: vars.border.radius.medium,
			boxShadow:
				'0px 0px 0px 1px rgba(255, 255, 255, 0.15), 0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',
		},
		selectors: {
			'&:focus-visible': {
				outline: 'none',
			},
			// '&:focus-visible::before': {
			// 	outline: 'none',
			// 	border: 'none',
			// 	boxShadow: vars.color.btnSecondaryShadowFocus,
			// },
			'&:hover::before': {
				opacity: 1,
			},
		},
	},
])

// TODO: put a class on ListContainer to fix this
globalStyle(`${activityWrapper} > div > div > div > div:first-child ${activtyItemInner}`, {
	boxShadow: 'none',
})

export const activtyItemInnerBtn = style([
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

export const activtyItemInnerSelected = style([
	sprinkles({}),
	{
		boxShadow: 'none',
		'::before': {
			opacity: 1,
		},
	},
])

export const activtyItemInnerSelectedContent = style([
	sprinkles({
		width: 'full',
		// borderColor: 'borderDivider',
	}),
	{
		// boxShadow: '0 -1px 0 0',
		// border: '1px solid red',
	},
])

export const transactionDottedLine = style([
	sprinkles({
		flexGrow: 1,
	}),
	{
		borderTop: '1px dashed',
		borderColor: vars.color.wax300,
		height: '0px',
		marginTop: '10px',
		color: 'white',
	},
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
	}),
	{
		width: '36px',
		height: '36px',
	},
])

// globalStyle(`${activtyItem}:hover ${indicatorCircle}`, {
// 	background: vars.color.white,
// })
//
// globalStyle(`.${darkMode} ${activtyItem}:hover ${indicatorCircle}`, {
// 	background: vars.color.lead500,
// })
