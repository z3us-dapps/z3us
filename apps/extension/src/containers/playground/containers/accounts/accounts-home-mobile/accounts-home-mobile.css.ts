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
	{
		overflow: 'hidden',
	},
])

export const accountsHomeHeaderAccount = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'purple200',
		width: 'full',
		position: 'sticky',
		top: 0,
	}),
	{
		height: '400px',
		marginBottom: '-58px',
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
		background: 'purple400',
		transition: 'fast',
		opacity: 0,
	}),
	{
		height: '58px',
		zIndex: '-1',
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
		// top: '50px',
		border: '0px solid red',
		// maxHeight: '900px',
		height: '400px',
		// overflow: 'clip',
	},
])
