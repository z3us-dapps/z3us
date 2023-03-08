/* eslint-disable @typescript-eslint/no-unused-vars */
// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
// import { vars } from 'ui/src/components-v2/system/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const accountsHomeMobileWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		left: 0,
		width: 'full',
		height: 'full',
	}),
	{},
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
	}),
	{
		height: '48px',
	},
])

export const accountsHomeMobileHeaderWalletWrapper = style([
	sprinkles({
		pointerEvents: 'auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		height: '48px',
		width: '48px',
	},
])

export const accountsHomeHeaderAccount = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		position: 'sticky',
		top: 0,
	}),
	{
		paddingTop: '48px',
		paddingBottom: '48px',
		marginBottom: '-58px',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center top',
		backgroundSize: '924px auto',
	},
])

export const accountsHomeHeaderSticky = style([
	sprinkles({
		position: 'sticky',
		width: 'full',
		height: 'full',
		zIndex: 1,
	}),
	{
		top: '-1px',
		paddingTop: '1px',
		height: '80px',
	},
])

export const accountsHomeHeaderStickyScrolled = style([
	sprinkles({
		width: 'full',
		transition: 'fast',
		opacity: 0,
	}),
	{
		height: '58px',
		backgroundImage:
			'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center top',
		backgroundSize: '924px auto',
	},
])

export const accountsHomeHeaderStickyScrolledInner = style([
	sprinkles({
		display: 'flex',
		width: 'full',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		height: '48px',
	},
])

export const accountsHomeHeaderStickyScrolledIs = style([
	sprinkles({
		opacity: 1,
	}),
	{},
])

export const accountsHomeHeaderStickyVis = style([
	sprinkles({
		width: 'full',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		position: 'relative',
		zIndex: 1,
		background: 'backgroundSecondary',
	}),
	{
		// top: '48px',
		height: '80px',
		marginTop: '-10px',
	},
])

export const accountsHomeHeaderStickyVisIs = style([
	sprinkles({}),
	{
		boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
	},
])

export const accountsAssetsPanel = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		width: 'full',
		background: 'backgroundPrimary',
		borderTopLeftRadius: 'xlarge',
		borderTopRightRadius: 'xlarge',
	}),
	{
		height: '400px',
	},
])

export const cardWrapperAll = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '312px',
		height: '180px',
	},
])
