import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const accountsAddAccountButton = style([
	sprinkles({
		position: 'absolute',
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
		paddingX: 'xlarge',
		paddingBottom: 'small',
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
			tablet: 'medium',
			desktop: 'large',
		},
	}),
	{
		gridTemplateRows: 'repeat(1, 160px)',
		gridAutoFlow: 'column',
	},
])

export const accountListGridTwoRowWrapper = style([
	sprinkles({}),
	{
		gridTemplateRows: 'repeat(2, 160px)',
	},
])

export const accountListGridCard = style([
	sprinkles({
		display: 'block',
	}),
	{
		width: '274px',
		height: '160px',
	},
])

globalStyle(`${accountListGridCard} > div`, {
	aspectRatio: 'unset',
	height: '100%',
})
