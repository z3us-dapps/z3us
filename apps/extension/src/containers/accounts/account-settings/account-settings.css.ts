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
		gap: 'xlarge',
	}),
	{},
])

export const settingsDesktopLeftMenu = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		paddingLeft: 'medium',
	}),
	{
		width: '260px',
		alignItems: 'self-start',
	},
])

export const settingsDesktopRightWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{},
])

export const settingsDesktopNavigationLink = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		paddingX: 'medium',
		paddingY: 'medium',
		alignItems: 'flex-start',
		transition: 'fast',
		background: {
			lightMode: 'transparent',
			hover: 'lead400',
		},
	}),
	{
		minWidth: '125px',
	},
])

export const settingsDesktopNavigationActive = style([
	sprinkles({
		position: 'absolute',
		display: 'block',
		width: 'full',
		height: 'full',
		borderRadius: 'medium',
		top: 0,
		left: 0,
		background: 'wax900',
		boxShadow: 'shadowActivePanel',
	}),
	{},
])

export const settingsDesktopNavigationText = style([
	sprinkles({
		position: 'relative',
		transition: 'fast',
	}),
])

export const settingsDesktopNavigationTextAcitve = style([
	sprinkles({
		color: {
			lightMode: 'colorStrong',
			darkMode: 'colorStrong',
		},
	}),
])

export const settingsSectionFlexColumnWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xlarge',
	}),
])

export const settingsSectionWrapper = style([
	sprinkles({
		paddingBottom: 'xlarge',
		paddingX: {
			mobile: 'xlarge',
			tablet: 'none',
		},
	}),
])

export const settingsSectionBorderWrapper = style([
	sprinkles({
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingBottom: 'xlarge',
		paddingX: {
			mobile: 'xlarge',
			tablet: 'none',
		},
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

export const settingsMobileIndexLinkWrapper = style([
	sprinkles({
		display: 'flex',
		paddingX: 'large',
		paddingY: 'large',
		gap: 'medium',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
		textDecoration: 'none',
		transition: 'fast',
		background: {
			lightMode: 'transparent',
			hover: 'backgroundPrimary',
		},
	}),
	{},
])

export const settingsMobileIndexLinkTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xxsmall',
	}),
	{},
])

export const settingsMobileIndexLinkIconWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	}),
	{
		width: '50px',
		height: '50px',
	},
])
