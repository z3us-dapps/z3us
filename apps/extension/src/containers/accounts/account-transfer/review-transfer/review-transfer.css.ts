import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const messageWrapper = style([
	sprinkles({
		padding: 'medium',
		background: 'backgroundPrimary',
		borderRadius: 'medium',
		borderWidth: 'xxsmall',
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const tokensWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		padding: 'medium',
		background: 'backgroundPrimary',
		borderRadius: 'medium',
		borderWidth: 'xxsmall',
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])


export const tokenRowWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'medium',
		paddingTop: 'small',
		borderTop: 1,
		borderStyle: 'dashed',
		borderColor: 'borderDividerSecondary',
	}),
	{
	},
])

globalStyle(`${tokensWrapper} > ${tokenRowWrapper}:first-child`, {
	paddingTop: '0',
	borderTop: '0',
})


export const transferSendingDialog = style([
	sprinkles({
	}),
	{
		width: '400px',
		height: '400px',
	},
])
