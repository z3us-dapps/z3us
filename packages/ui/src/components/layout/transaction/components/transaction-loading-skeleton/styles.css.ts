import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const transactionSkeletonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	}),
	{},
])

export const transactionSkeletonHeaderWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{},
])

export const transactionSkeletonAvatar = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
	}),
	{
		width: '64px',
		height: '64px',
	},
])

export const transactionSkeletonFee = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		marginTop: 'medium',
		height: 'large',
	}),
	{
		width: '24px',
	},
])

export const transactionSkeletonFeeAmount = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		marginTop: 'small',
		height: 'xlarge',
	}),
	{
		width: '140px',
	},
])

export const transactionSkeletonFeeCurrency = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		marginTop: 'medium',
		height: 'large',
	}),
	{
		width: '60px',
	},
])

export const transactionSkeletonBodyWrapper = style([
	sprinkles({
		position: 'relative',
		marginTop: 'large',
		paddingTop: 'large',
		paddingX: 'large',
		display: 'flex',
		flexDirection: 'column',
		borderTop: 1,
		borderColor: 'borderDivider',
		borderStyle: 'solid',
	}),
	{},
])

export const transactionSkeletonBodyDetail = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		marginTop: 'small',
		marginBottom: 'large',
		height: 'large',
	}),
	{
		width: '120px',
	},
])

export const transactionSkeletonBodyItem = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 'large',
	}),
	{},
])

export const transactionSkeletonBodyItemLeft = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		marginTop: 'small',
		height: 'large',
	}),
	{
		width: '60px',
	},
])

export const transactionSkeletonBodyItemRight = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		marginTop: 'small',
		height: 'large',
	}),
	{
		width: '120px',
	},
])
