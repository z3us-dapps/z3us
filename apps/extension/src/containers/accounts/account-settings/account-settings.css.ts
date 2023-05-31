import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'


export const settingsMobileWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const settingsDesktopWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		paddingX: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
		paddingBottom: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
		height: 'full',
	}),
	{},
])

export const settingsDesktopContainerWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		maxWidth: 'xxlarge',
		display: 'flex',
	}),
	{},
])


export const settingsDesktopLeftMenu = style([
	sprinkles({
		position: 'relative',
	}),
	{
		// border: '1px solid blue',
		width: '300px',
	},
])

export const settingsDesktopRightWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{
		// border: '1px solid red',
	},
])

