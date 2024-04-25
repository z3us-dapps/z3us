import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const validatorSkeletonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	}),
	{},
])

export const validatorSkeletonHeaderWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{},
])

export const validatorSkeletonAvatar = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
	}),
	{
		width: '64px',
		height: '64px',
	},
])

export const validatorSkeletonFee = style([
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

export const validatorSkeletonFeeAmount = style([
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

export const validatorSkeletonFeeCurrency = style([
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

export const validatorSkeletonBodyWrapper = style([
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

export const validatorSkeletonBodyDetail = style([
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

export const validatorSkeletonBodyItem = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 'large',
	}),
	{},
])

export const validatorSkeletonBodyItemLeft = style([
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

export const validatorSkeletonBodyItemRight = style([
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
