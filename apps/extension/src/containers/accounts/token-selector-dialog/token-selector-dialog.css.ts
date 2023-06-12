import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const tokenSelectorHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 'large',
		padding: 'large',
		marginBottom: 'medium',
		background: 'backgroundSecondary',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		borderStyle: 'solid',
		borderBottom: 1,
		borderColor: 'borderDivider',
		transition: 'fast',
		zIndex: 1,
	}),
	{},
	// responsiveStyle({
	// 	mobile: { height: '48px' },
	// 	tablet: { height: '64px' },
	// }),
])

export const tokenSelectorHeaderWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const searchElement = style([
	sprinkles({
		width: 'full',
	}),
	{},
])

export const tokenSelectorContent = style([
	{},
	responsiveStyle({
		mobile: { maxWidth: '90%', top: '32px', bottom: '32px' },
		tablet: { maxWidth: '480px', top: '48px', bottom: '48px' },
		desktop: { maxWidth: '480px', top: '72px', bottom: '72px' },
	}),
])

export const tokenListItemWrapper = style([
	sprinkles({
		width: 'full',
		paddingX: 'small',
	}),
	{
		height: '64px',
	},
])

export const tokenListItemWrapperButton = style([
	sprinkles({
		width: 'full',
		cursor: 'pointer',
		height: 'full',
		display: 'flex',
		margin: 'none',
		alignItems: 'center',
		transition: 'fast',
		paddingX: 'medium',
		borderRadius: 'small',
		background: {
			lightMode: 'backgroundSecondary',
			hover: 'backgroundPrimary',
		},
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		selectors: {
			'&:focus-visible': {
				position: 'relative',
				zIndex: 1,
			},
		},
	},
])

export const tokenListItemWrapperInnerButton = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'medium',
		width: 'full',
	}),
	{},
])

export const tokenListItemTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xxsmall',
		flexGrow: 1,
		minWidth: 0,
	}),
	{},
])

export const tokenListTagWrapper = style([
	sprinkles({
		display: 'flex',
		flexShrink: 0,
	}),
	{},
])
