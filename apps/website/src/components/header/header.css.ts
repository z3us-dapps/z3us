import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const headerWrapper = style([
	sprinkles({
		position: 'sticky',
		zIndex: 1,
		top: 0,
		// TODO: inner shadow border
		// borderBottom: 1,
		// borderBottomStyle: 'solid',
		// borderColor: 'transparent',
	}),
	{},
])

// TODO: inner shadow border
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
	{},
	responsiveStyle({
		mobile: { height: '58px' },
		tablet: { height: '70px' },
	}),
])

export const landingLogoWrapper = style([
	sprinkles({
		display: 'flex',
	}),
	responsiveStyle({
		mobile: { width: '100px' },
		tablet: { width: 'auto' },
	}),
])

export const landingHeaderBrandWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
		alignItems: 'center',
	}),
	{},
])

export const headerMobileMenuWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			desktop: 'none',
		},
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

export const navigationCopyAddressWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
	{},
])
