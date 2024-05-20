import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const navigationMobileWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
		position: 'absolute',
		bottom: 0,
		flexShrink: 0,
		justifyContent: 'center',
		borderTop: 1,
		zIndex: 1,
		borderTopStyle: 'solid',
		width: 'full',
		borderColor: 'borderDivider',
		background: 'backgroundSecondary',
	}),
	{
		height: '48px',
	},
])

export const navigationMenuLinkMobile = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		justifyContent: 'center',
		position: 'relative',
		textDecoration: 'none',
		transition: 'fast',
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
		background: {
			lightMode: 'backgroundSecondary',
			hover: 'backgroundPrimary',
		},
	}),
	{
		outline: 0,
		width: '84px',
		flexBasis: '84px',
		selectors: {
			'&:focus-visible': {
				position: 'relative',
				zIndex: 1,
			},
		},
	},
])

export const navigationMenuLinkMobileCircle = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
		transition: 'fast',
	}),
	{
		width: '32px',
		height: '32px',
	},
])

export const navigationMenuLinkMobileCircleSelect = style([
	sprinkles({
		color: 'white',
		background: 'purple400',
	}),
])
