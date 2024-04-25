import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

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

export const transactionErrorMessage = style([
	sprinkles({
		position: 'relative',
		paddingX: 'xlarge',
		marginTop: 'medium',
	}),
	{
		wordWrap: 'break-word',
	},
])

export const transactionDetailsNoGapWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		gap: {
			mobile: 'none',
			tablet: 'medium',
		},
	}),
	{},
])
export const transactionDetailsGapWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		gap: {
			mobile: 'medium',
			tablet: 'medium',
		},
	}),
	{},
])

export const transactionMessageWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { height: '60px' },
		tablet: { height: '100px' },
	}),
])

export const balanceChangeWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		paddingTop: 'medium',
		paddingBottom: 'medium',
	}),
	{},
])

export const balanceChangeLabelWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		paddingBottom: 'medium',
	}),
	{},
])

export const balanceChangeItemsFlexWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		gap: 'medium',
	}),
	{},
])

export const balanceChangeItem = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDividerSecondary',
		borderRadius: 'xsmall',
		overflow: 'hidden',
	}),
	{
		minHeight: '100px',
	},
])

export const balanceChangeItemHeader = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		background: 'backgroundPrimary',
		paddingX: 'small',
		paddingY: 'small',
		gap: 'small',
	}),
	{},
])

export const balanceChangeItemContent = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		paddingX: 'medium',
	}),
	{},
])

globalStyle(`${balanceChangeItemContent} > div:first-child`, {
	borderTop: 'none',
})

export const balanceChangeItemContentRow = style([
	sprinkles({
		display: 'flex',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingY: 'medium',
	}),
	{},
])
