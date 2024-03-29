import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

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
		display: {
			mobile: 'none',
			tablet: 'block',
		},
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{
		height: '228px',
	},
])

export const accountsHorizontalAbsoluteWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'absolute',
		top: 0,
		left: 0,
	}),
	{},
])

export const accountsHorizontalCardsWrapper = style([
	sprinkles({
		display: 'flex',
		paddingX: 'xlarge',
		paddingBottom: 'xlarge',
		flexShrink: 0,
		gap: 'large',
	}),
	{
		minHeight: '100px',
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
