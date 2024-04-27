import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const accountsAddAccountButton = style([
	sprinkles({
		position: 'absolute',
	}),
	{
		top: '-124px',
		right: '18px',
		zIndex: 2,
	},
])

export const accountsHorizontalWrapper = style([
	sprinkles({
		position: 'relative',
		overflow: 'scroll',
		marginTop: 'medium',
		width: 'full',
	}),
	responsiveStyle({
		mobile: {
			minHeight: '228px',
		},
		tablet: {
			minHeight: '370px',
		},
		desktop: {
			minHeight: '406px',
		},
	}),
])

export const accountsHorizontalAbsoluteWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'absolute',
		top: 0,
		left: 0,
		height: 'full',
		width: 'full',
	}),
])

export const accountsHorizontalCardsWrapper = style([
	sprinkles({
		display: 'flex',
		paddingX: 'xlarge',
		paddingBottom: 'xlarge',
		flexShrink: 0,
		gap: 'large',
		height: 'full',
		width: 'full',
		flexWrap: 'wrap',
		flexDirection: 'column',
	}),
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

export const card = style([
	sprinkles({
		flex: '1',
	}),
	responsiveStyle({
		mobile: {
			width: '100%',
			height: '100%',
		},
		tablet: {
			width: '50%',
			height: '50%',
		},
		desktop: {
			width: '33%',
			height: '50%',
		},
	}),
])
