/* eslint-disable @typescript-eslint/no-unused-vars */
// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

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

export const accountsHomeHeaderAccount = style([
	sprinkles({
		background: 'backgroundPrimary',
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
		// backgroundImage:
		// 	'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center top',
		backgroundSize: '924px 540px',
	},
])

export const accountsHomeHeadAll = style([
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
		height: '180px',
	},
])

export const accountsHomeAllChart = style([
	sprinkles({
		background: 'wax200',
		borderRadius: 'full',
		boxShadow: 'shadowPanel',
	}),
	{
		height: '80px',
		width: '80px',
	},
])

export const accountsHomeHeaderSticky = style([
	sprinkles({
		position: 'sticky',
		width: 'full',
		height: 'full',
		zIndex: 1,
		pointerEvents: 'none',
	}),
	{
		top: '-1px',
		paddingTop: '1px',
	},
])

export const accountsHomeHeaderStickyScrolled = style([
	sprinkles({
		width: 'full',
		// transition: 'fast',
		opacity: 0,
		background: 'backgroundPrimary',
	}),
	{
		height: '58px',
		// backgroundImage:
		// 	'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center top',
		backgroundSize: '924px 540px',
		pointerEvents: 'none',
	},
])

export const accountsHomeHeaderStickyScrolledIs = style([
	sprinkles({
		opacity: 1,
	}),
	{
		pointerEvents: 'all',
	},
])

export const accountsHomeHeaderStickyVis = style([
	sprinkles({
		width: 'full',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		position: 'relative',
		zIndex: 1,
		background: 'backgroundSecondary',
		pointerEvents: 'auto',
	}),
	{
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

export const tabsWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		display: 'flex',
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const tabsWrapperScrollBtn = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		zIndex: 1,
	}),
	{
		left: '50%',
		marginLeft: '-16px',
	},
])

globalStyle(`${tabsWrapperScrollBtn} > svg`, {
	transition: vars.transition.fast,
})

export const tabsWrapperScrollBtnScrolled = style([
	sprinkles({
		position: 'absolute',
	}),
])

export const tabsWrapperScrollBtnHidden = style([
	sprinkles({
		opacity: 0,
		transition: 'fast',
		pointerEvents: 'none',
	}),
])

globalStyle(`${tabsWrapperScrollBtnScrolled} > svg`, {
	transition: 'all 150ms ease-out',
	transform: 'rotateX(180deg) scale3d(1,1,1)',
	backfaceVisibility: 'hidden',
	// transform: 'rotate(180deg)',
})

export const tabsWrapperButton = style([
	sprinkles({
		width: 'full',
		cursor: 'pointer',
		position: 'relative',
		transition: 'fast',
		background: { lightMode: 'btnTertiaryBackground', hover: 'btnTertiaryBackgroundHover' },
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		flex: 1,
		outline: 0,
		height: '58px',

		selectors: {
			'&:focus-visible': {
				zIndex: '1',
			},
		},
	},
])

export const tabsWrapperButtonActive = style([
	{
		selectors: {
			'&:after': {
				content: '""',
				position: 'absolute',
				height: '2px',
				width: '100%',
				background: vars.color.purple600,
				left: '0',
				bottom: '0',
				pointerEvents: 'none',
			},
		},
	},
])

export const tabsWrapperButtonLeft = style([
	sprinkles({
		borderTopLeftRadius: 'large',
	}),
	{},
])

export const tabsWrapperButtonRight = style([
	sprinkles({
		borderTopRightRadius: 'large',
	}),
	{},
])

export const inputSearchWrapper = style([
	sprinkles({
		width: 'full',
		paddingX: 'medium',
		paddingY: 'medium',
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const inputSearch = style([
	sprinkles({
		width: 'full',
		padding: 'small',
	}),
	{},
])

export const mobileAccountsListWrapper = style([
	sprinkles({
		width: 'full',
	}),
	{
		border: '0px solid red',
	},
])

export const mobileAccountsListContainer = style([
	sprinkles({
		width: 'full',
	}),
])

globalStyle(`${mobileAccountsListContainer} > div:first-child > div`, {
	borderTop: 'none',
})
