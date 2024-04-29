import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const accountsAddAccountButton = style([
	sprinkles({
		position: 'absolute',
		zIndex: 2,
	}),
	{
		top: '-124px',
		right: '18px',
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
		overflowY: 'scroll',
		flexWrap: 'wrap',
		flexShrink: 0,
		height: 'full',
		width: 'full',
		marginTop: 'medium',
		paddingX: 'xlarge',
		paddingBottom: 'xlarge',
		gap: 'medium',
		alignItems: 'center',
		justifyContent: 'center',
	}),
])

export const accountCard = style([
	{
		flex: '0 0 auto',
		height: 'full',
	},
])

export const accountCardRecipe = recipe({
	variants: {
		widthVariant: {
			row: responsiveStyle({
				mobile: {
					width: '100%',
				},
				tablet: {
					width: '47%',
				},
				desktop: {
					width: '48%',
				},
			}),
			column: responsiveStyle({
				mobile: {
					width: '100%',
				},
				tablet: {
					width: '47%',
				},
				desktop: {
					width: '30%',
				},
			}),
		},
	},
})
