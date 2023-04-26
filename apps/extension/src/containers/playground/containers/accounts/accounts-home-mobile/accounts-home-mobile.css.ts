/* eslint-disable @typescript-eslint/no-unused-vars */
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

export const accountsColorBackground = style([
	sprinkles({
		background: 'backgroundPrimary',
		transition: 'fastall',
	}),
	{
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center top',
		backgroundSize: '924px 540px',
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
		transition: 'fastall',
	}),
	{
		paddingTop: '52px',
		paddingBottom: '48px',
		marginBottom: '-58px',
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

// TODO: should be a chart
export const accountsHomeAllChart = style([
	sprinkles({
		background: 'wax200',
		borderRadius: 'full',
		boxShadow: 'shadowScroll',
		flexShrink: 0,
		flexGrow: 0,
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
		opacity: 0,
		transition: 'fast',
	}),
	{
		height: '58px',
	},
])

export const accountsHomeHeaderStickyScrolledVisible = style([
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
	sprinkles({
		boxShadow: 'shadowScroll',
	}),
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

export const mobileAccountsListWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		background: 'backgroundSecondary',
	}),
	{
		minHeight: '384px',
	},
])

export const mobileAccountsListWrapperInner = style([
	sprinkles({
		width: 'full',
	}),
	{},
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

export const tabsWrapperScrollBtnHidden = style([
	sprinkles({
		opacity: 0,
		transition: 'fast',
		pointerEvents: 'none',
	}),
])

export const tabsWrapperScrollBtnScrolled = style([
	{
		position: 'absolute',
	},
])

globalStyle(`${tabsWrapperScrollBtn} > svg`, {
	transition: vars.transition.fast,
})

globalStyle(`${tabsWrapperScrollBtnScrolled} > svg`, {
	transition: 'all 150ms ease-out',
	transform: 'rotateX(180deg) scale3d(1,1,1)',
	backfaceVisibility: 'hidden',
})

export const tabsWrapperButton = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
		position: 'relative',
		width: 'full',
		display: 'flex',
		paddingX: 'medium',
		paddingY: 'medium',
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		gap: 'small',
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

export const mobileAccountsListContainer = style([
	sprinkles({
		width: 'full',
	}),
	{},
])

globalStyle(`${mobileAccountsListContainer} > div:first-child > div`, {
	borderTop: 'none',
})
