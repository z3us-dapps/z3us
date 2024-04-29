import { style } from '@vanilla-extract/css'

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
		display: 'flex',
		flexWrap: 'wrap',
		flexShrink: 0,
		height: 'full',
		width: 'full',
		flexDirection: 'column',
		marginTop: 'medium',
		paddingX: 'xlarge',
		paddingBottom: 'xlarge',
		gap: 'medium',
	}),
])

export const accountCard = style([
	{
		flex: '0 0 auto',
		height: 'full',
	},
	responsiveStyle({
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
])
