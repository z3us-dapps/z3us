import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

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
	{},
])

export const accountListGridScrollWrapper = style([
	sprinkles({
		width: 'full',
		paddingX: {
			mobile: 'large',
			tablet: 'xlarge',
		},
		paddingBottom: {
			mobile: 'large',
			tablet: 'small',
		},
	}),
	{
		overflowX: 'auto',
		height: 'auto',
	},
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
	{},
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
	{},
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
