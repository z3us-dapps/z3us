import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const settingsWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		height: 'full',
		paddingX: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingBottom: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
	}),
	{
		// border: '1px solid yellow',
		// overflow: 'hidden',
		// TODO: should be calc with footer and header variables
		// minHeight: 'calc(100vh - 120px)',
	},
	responsiveStyle({
		// mobile: { height: 'calc(500px)' },
		// mobile: { minHeight: 'calc(100vh - 120px)' },
		// tablet: { minHeight: 'unset' },
	}),
])

export const settingsHomeMobileMenuVisibleWrapper = style([
	sprinkles({
		display: {
			mobile: 'block',
			tablet: 'none',
		},
	}),
	{},
])

export const settingsHomeMobileMenuHiddenWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
		},
	}),
	{},
])

export const settingsHomeWrapper = style([
	sprinkles({
		position: 'relative',
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{},
])

export const settingsContainerWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		maxWidth: 'xxlarge',
		display: 'flex',
		gap: 'xlarge',
	}),
	{},
])

export const settingsDesktopLeftMenu = style([
	sprinkles({
		position: 'relative',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		gap: 'medium',
		paddingLeft: 'medium',
	}),
	{
		width: '260px',
		alignItems: 'self-start',
	},
])

export const settingsRightWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{},
])

export const settingsScrollPanelWrapper = style([
	sprinkles({
		position: 'relative',
		margin: {
			mobile: 'xlarge',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const settingsSectionFlexColumnWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xlarge',
	}),
])

export const settingsSectionGridBasic = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'grid',
		},
		flexDirection: 'column',
		gap: 'large',
	}),
	{
		gridTemplateColumns: '240px 1fr',
	},
])

export const settingsSectionGridBasicSpacer = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
])
