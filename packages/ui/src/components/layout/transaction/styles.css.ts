import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const transactionInfoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		alignItems: 'flex-end',
		height: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const transactionRowDotted = style([
	sprinkles({
		position: 'relative',
		borderStyle: 'dashed',
		flexGrow: 1,
		borderBottom: 1,
		borderColor: 'borderDividerSecondary',
		marginBottom: 'xsmall',
		marginX: 'medium',
	}),
	{},
])

export const transactionInfoCopyBtnWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		transform: 'translateY(4px)',
	},
])

export const transactionExtraRowsWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
	}),
	{
		marginTop: '-8px',
	},
])

export const transactionDetailsWrapper = style([
	sprinkles({
		position: 'relative',
		borderStyle: 'solid',
		borderTop: 1,
		borderColor: 'borderDivider',
		flexGrow: 1,
		alignItems: 'flex-start',
		paddingTop: {
			mobile: 'large',
			tablet: 'large',
		},
		marginTop: {
			mobile: 'large',
			tablet: 'large',
		},
		paddingX: {
			mobile: 'large',
			tablet: 'large',
		},
	}),
	{},
])
