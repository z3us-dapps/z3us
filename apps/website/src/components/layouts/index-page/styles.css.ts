/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const landingPageWrapper = style([
	sprinkles({
		position: 'relative',
		background: 'lead500',
	}),
	{
		minHeight: '100vh',
	},
])

export const landingPageBodyWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageDarkWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPagePurpleWrapper = style([
	sprinkles({
		position: 'relative',
		background: 'blue_magenta400',
	}),
	{
		// backgroundColor: '#7C4DFF',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

// globalStyle(`${landingPageWrapper} thead`, {
// 	top: '50px !important',
// })

// export const stakingTableMinHeightWrapper = style([
// 	sprinkles({}),
// 	{
// 		minHeight: '420px',
// 	},
// ])

// export const stakingTableWrapper = style([
// 	sprinkles({
// 		position: 'relative',
// 		paddingX: {
// 			tablet: 'large',
// 		},
// 	}),
// 	{},
// ])

export const landingHeroTextWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { paddingTop: '72px', paddingBottom: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingCalloutFlexWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-end',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px', paddingBottom: '72px', maxWidth: '500px' },
		// desktop: { width: '25%' },
	}),
])

export const landingCalloutTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'large',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { paddingBottom: '72px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '25%' },
	}),
])

export const landingCalloutButtonIcon = style([
	sprinkles({
		position: 'relative',
		background: 'white',
		borderRadius: 'full',
		marginRight: 'xsmall',
	}),
	{
		width: '20px',
		height: '20px',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingBottom: '72px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '25%' },
	}),
])

export const landingHeroCalloutImg = style([
	sprinkles({
		position: 'relative',
		display: 'block',
		boxShadow: 'shadowActivePanel',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingBottom: '72px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '25%' },
	}),
])
