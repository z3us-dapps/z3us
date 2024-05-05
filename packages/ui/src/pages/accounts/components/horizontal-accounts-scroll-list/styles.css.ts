import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { responsiveStyle } from 'ui/src/theme/theme-utils'

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
	// responsiveStyle({
	// 	mobile: {
	// 		gridTemplateColumns: '1fr',
	// 	},
	// 	tablet: {
	// 		gridTemplateColumns: '1fr 1fr',
	// 	},
	// 	desktop: {
	// 		gridTemplateColumns: '1fr 1fr 1fr',
	// 	},
	// }),
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

// globalStyle(`${accountList}`, {
// 	'@media': {
// 		'screen and (max-width: 768px)': {
// 			border: '1px solid red',
// 		},
// 	},
// })
