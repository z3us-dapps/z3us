import { style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

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
		display: 'flex',
		position: 'relative',
		borderRadius: 'full',
		paddingX: 'medium',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'fast',
		height: 'xlarge',
		background: {
			lightMode: 'transparent',
			hover: 'white',
		},
	}),
	{
		selectors: {
			[`.${darkMode} &:hover`]: {
				background: vars.color.lead400,
			},
		},
	},
])

export const settingsDesktopNavigationActive = style([
	sprinkles({
		position: 'absolute',
		display: 'block',
		width: 'full',
		height: 'full',
		borderRadius: 'full',
		top: 0,
		left: 0,
		background: {
			lightMode: 'white',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		selectors: {
			[`.${darkMode} &`]: {
				// boxShadow: vars.color.shadowDropdown as any,
			},
		},
	},
])

export const settingsDesktopNavigationText = style([
	sprinkles({
		position: 'relative',
		transition: 'fastall',
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
