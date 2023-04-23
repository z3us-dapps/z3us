import { globalStyle, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const navigationWrapper = sprinkles({
	zIndex: 1,
	display: 'flex',
	justifyContent: 'center',
	paddingLeft: 'large',
	paddingRight: 'large',
	borderBottom: 1,
	borderBottomStyle: 'solid',
	borderColor: {
		lightMode: 'bleached_silk600',
		darkMode: 'lead500',
	},
})

export const navigationContainer = style([
	sprinkles({
		position: 'relative',
		maxWidth: 'xxlarge',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
	}),
	{
		height: '70px',
	},
])

export const navigationMenu = style([
	sprinkles({
		flexGrow: 1,
		gap: 'medium',
		paddingLeft: 'xlarge',
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
	{},
])

export const navigationMenuTabletWrapper = style([
	sprinkles({
		flexGrow: 1,
		paddingLeft: 'medium',
		display: {
			mobile: 'none',
			tablet: 'flex',
			desktop: 'none',
		},
	}),
	{},
])

export const navigationMenuLink = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		justifyContent: 'center',
		position: 'relative',
		textDecoration: 'none',
		borderRadius: 'xlarge',
		transition: 'fast',
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		outline: 'none',
		height: `${calc(vars.grid).multiply(8)}`,
		':hover': {
			background: vars.color.white,
		},
		selectors: {
			[`.${darkMode} &:hover`]: {
				background: vars.color.lead400,
			},
		},
	},
])

export const navigationMenuLinkText = style([
	sprinkles({
		position: 'relative',
		transition: 'fast',
	}),
])

export const navigationMenuLinkTextSelected = style([
	sprinkles({
		color: {
			lightMode: 'colorStrong',
			darkMode: 'colorStrong',
		},
	}),
])

export const navigationMenuActiveLine = style([
	sprinkles({
		position: 'absolute',
		inset: 0,
		pointerEvents: 'none',
		borderRadius: 'xlarge',
		background: {
			lightMode: 'white',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		height: '100%',
		width: '100%',
	},
])

export const copiedAnimationWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		height: '24px',
		width: '24px',
	},
])

export const accountsHomeMobileHeader = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		left: 0,
		width: 'full',
		pointerEvents: 'none',
		display: 'flex',
		justifyContent: 'flex-end',
		transition: 'fast',
	}),
	{
		height: '48px',
	},
])

export const accountsHomeMobileHeaderShadow = style([
	sprinkles({
		boxShadow: 'shadowPanel',
		background: 'backgroundSecondary',
	}),
	{},
])

export const accountsHomeMobileHeaderWalletWrapper = style([
	sprinkles({
		pointerEvents: 'auto',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'small',
	}),
	{
		height: '48px',
		width: '100%',
	},
])

export const navigationMobileWrapper = style([
	sprinkles({
		display: 'flex',
		borderTop: 1,
		zIndex: 1,
		borderTopStyle: 'solid',
		width: 'full',
		borderColor: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead400',
		},
	}),
	{
		height: '56px',
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
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		outline: 0,
		width: '25%',
		flexBasis: '25%',
		// outline: 'none',
		// height: `${calc(vars.grid).multiply(8)}`,
		// ':hover': {
		// 	background: vars.color.white,
		// },
		// selectors: {
		// 	[`.${darkMode} &:hover`]: {
		// 		background: vars.color.lead400,
		// 	},
		// },
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
	{},
])

globalStyle(`${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircle}`, {
	background: vars.color.lead300,
	color: vars.color.white,
})

globalStyle(`${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircleSelect}`, {
	color: vars.color.white,
	background: vars.color.purple400,
})

globalStyle(`.${darkMode} ${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircle}`, {
	color: vars.color.white,
	background: vars.color.lead300,
})

globalStyle(`.${darkMode} ${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircleSelect}`, {
	color: vars.color.white,
	background: vars.color.purple400,
})
