import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const formWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		padding: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{},
])

export const formInputWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		paddingBottom: {
			mobile: 'medium',
		},
	}),
	{},
])

export const formInputSubmitButtonWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingTop: 'medium',
	}),
	{},
])

export const formFieldGroupWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
		paddingBottom: {
			mobile: 'medium',
		},
	}),
	{},
])

globalStyle(`${formFieldGroupWrapper} > div`, {
	flexGrow: '1',
})
