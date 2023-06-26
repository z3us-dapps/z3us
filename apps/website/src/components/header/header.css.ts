import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const headerWrapper = style([
	sprinkles({
		position: 'relative',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'transparent',
	}),
	{},
])

export const headerWrapperBorderColor = style([
	sprinkles({
		borderColor: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead500',
		},
	}),
	{},
])

export const headerInnerWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{
		height: '70px',
	},
])

export const landingHeaderBrandWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{},
])

export const connectButtonWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'flex-end',
	}),
	{
		width: '140px',
	},
])

export const connectedMenuWrapper = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		paddingRight: 'small',
	}),
	{
		minHeight: '32px',
	},
])

export const connectedMenuVisibleWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'small',
		alignItems: 'center',
		width: 'full',
	}),
	{},
])
