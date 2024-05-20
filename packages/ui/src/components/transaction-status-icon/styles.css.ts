import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const transactionStatusIconWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
		borderWidth: 'xxsmall',
		borderStyle: 'solid',
		borderColor: 'borderDividerSecondary',
		background: 'backgroundPrimary',
		flexShrink: 0,
	}),
])

export const transactionStatusIconSmallWrapper = style([
	{
		width: '20px',
		height: '20px',
	},
])

export const transactionStatusIconMediumWrapper = style([
	{
		width: '24px',
		height: '24px',
	},
])

export const transactionStatusSuccess = style([
	sprinkles({
		color: 'green500',
	}),
])

export const transactionStatusFailure = style([
	sprinkles({
		color: 'red500',
	}),
])
