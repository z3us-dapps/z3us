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

export const landingPageHeaderWrapper = style([
	sprinkles({
		position: 'relative',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'lead800',
	}),
	{},
])

export const landingPageHeaderInnerWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { height: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingHeaderZ3usLink = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
	}),
	{},
])

globalStyle(`${landingHeaderZ3usLink} > div`, {
	transition: vars.transition.fastall,
})

globalStyle(`${landingHeaderZ3usLink}:hover > div:nth-child(1)`, {
	background: vars.color.blue_magenta400,
})

globalStyle(`${landingHeaderZ3usLink}:hover > div:nth-child(2) svg`, {
	fill: vars.color.blue_magenta400,
})

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
