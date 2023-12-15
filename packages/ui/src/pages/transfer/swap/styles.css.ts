import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const swapDropdownContentWrapper = style([
	{
		minWidth: '160px',
	},
])

export const swapFromButtonWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: 'medium',
	}),
	{},
])

export const swapExchangeButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		paddingBottom: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{},
])

export const swapValidationWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		paddingBottom: 'medium',
	}),
	{},
])

export const swapFormFieldWrapper = style([
	sprinkles({
		display: 'flex',
		width: 'full',
		flexDirection: 'column',
		gap: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const swapFormWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const swapFieldGroupWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'small',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		marginTop: 'xlarge',
		paddingTop: 'xlarge',
	}),
	{},
])

export const swapAddFieldButtonWrapper = style([
	sprinkles({
		paddingTop: 'xlarge',
	}),
	{},
])

globalStyle(`${swapFormWrapper}  ${swapFieldGroupWrapper}:first-child`, {
	borderTop: 'none',
	marginTop: '0',
	paddingTop: '0',
})

globalStyle(`${swapFieldGroupWrapper} > div:nth-child(1)`, {
	flexGrow: 1,
})

globalStyle(`${swapFieldGroupWrapper} > div:nth-child(2)`, {
	marginTop: '48px',
	flexShrink: 0,
})
