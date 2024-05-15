import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const accountsAddAccountButton = style([
	sprinkles({
		position: 'absolute',
		display: ['none', 'block'],
		zIndex: 2,
	}),
	{
		top: '22px',
		right: '22px',
	},
])

export const accountCardOpacity = style([
	sprinkles({
		transition: 'slow',
	}),
	{
		opacity: '0.3 !important',
	},
	{
		selectors: {
			[`&:hover`]: {
				opacity: '1.0 !important',
			},
		},
	},
])

export const accountList = style([
	sprinkles({
		width: 'full',
	}),
])

export const accountListGridScrollWrapper = style([
	sprinkles({
		width: 'full',
		paddingBottom: {
			mobile: 'xsmall',
			tablet: 'small',
		},
	}),
	{
		overflowX: 'auto',
		height: 'auto',
	},
	responsiveStyle({
		mobile: {
			paddingTop: '23px',
			paddingLeft: '24px',
			paddingRight: '24px',
		},
		tablet: {
			paddingTop: '0',
			paddingLeft: vars.spacing.xlarge,
			paddingRight: vars.spacing.large,
		},
	}),
])

export const accountListGridWrapper = style([
	sprinkles({
		width: 'full',
		display: 'grid',
		gap: {
			mobile: 'medium',
			tablet: 'large',
			desktop: 'large',
		},
	}),
	{
		width: 'max-content',
	},
	responsiveStyle({
		mobile: {
			gridTemplateRows: 'repeat(1, 180px)',
			gridAutoFlow: 'column',
		},
		tablet: {
			gridTemplateRows: 'repeat(1, 160px)',
			gridAutoFlow: 'column',
		},
	}),
])

export const accountListGridTwoRowWrapper = style([
	sprinkles({}),
	responsiveStyle({
		tablet: {
			gridTemplateRows: 'repeat(2, 160px)',
			gridAutoFlow: 'column',
		},
	}),
])

export const accountListGridCard = style([
	sprinkles({
		display: 'block',
	}),
	responsiveStyle({
		mobile: {
			width: '312px',
			height: '180px',
		},
		tablet: {
			width: '274px',
			height: '160px',
		},
	}),
])

globalStyle(`${accountListGridCard} > div`, {
	aspectRatio: 'unset',
	height: '100%',
})
