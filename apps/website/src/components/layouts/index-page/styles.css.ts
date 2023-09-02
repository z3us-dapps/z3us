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

export const landingPageLargeImgFloatLeft = style([
	sprinkles({
		position: 'absolute',
		pointerEvents: 'none',
	}),
	{
		top: '314px',
		left: '-140px',
		// border: '1px solid red',
		width: '786px',
		height: '1222px',

		// width={786}
		// height={1222}
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageLargeImgFloatRight = style([
	sprinkles({
		position: 'absolute',
		pointerEvents: 'none',
	}),
	{
		top: '0px',
		right: '-200px',
		width: '710px',
		height: '474px',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageLargeImgFloatBottom = style([
	sprinkles({
		position: 'absolute',
		pointerEvents: 'none',
	}),
	{
		top: '700px',
		width: '1440px',
		height: '1119px',
		left: '50%',
		marginLeft: '-720px',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageDarkWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		background: 'lead500',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageInvadersWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		overflow: 'hidden',
	}),
	{},
])

export const landingPageInvadersFlipped = style([
	sprinkles({}),
	{
		transform: 'scaleY(-1)',
	},
])

export const landingPageInvadersInnerWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '1440px',
		height: '244px',
		'::before': {
			content: '""',
			position: 'absolute',
			right: 0,
			height: '107px',
			bottom: 0,
			width: '2000px',
			marginRight: '-2000px',
			pointerEvents: 'none',
			backgroundColor: '#7C4DFF',
		},
		'::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			height: '104px',
			bottom: 0,
			width: '2000px',
			marginLeft: '-2000px',
			pointerEvents: 'none',
			backgroundColor: '#7C4DFF',
		},
	},
])

export const landingPagePurpleWrapper = style([
	sprinkles({
		position: 'relative',
		// background: 'blue_magenta400',
	}),
	{
		backgroundColor: '#7C4DFF',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingLeftHeroTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		// background: 'blue_magenta400',
	}),
	{
		// border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { paddingTop: '0px', paddingBottom: '0px', maxWidth: '640px' },
		// desktop: { width: '25%' },
	}),
])

export const landingFeaturePointBlockWrapper = style([
	sprinkles({
		position: 'relative',
		paddingY: 'xxlarge',
		display: 'flex',
		justifyContent: 'space-between',
		// background: 'blue_magenta400',
	}),
	{
		// border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '0px', paddingBottom: '0px', maxWidth: '640px' },
		// desktop: { width: '25%' },
	}),
])

export const landingFeaturePointBlock = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		// background: 'blue_magenta400',
	}),
	{
		// border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { paddingTop: '0px', paddingBottom: '0px', maxWidth: '490px' },
		// desktop: { width: '25%' },
	}),
])

export const landingFeaturePointImgBlock = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{
		border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { paddingTop: '0px', paddingBottom: '0px', maxWidth: '240px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageFooterWrapper = style([
	sprinkles({
		position: 'relative',
		// background: 'blue_magenta400',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { marginTop: '-72px' },
		// desktop: { width: '25%' },
	}),
])

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
		tablet: { paddingBottom: '172px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '25%' },
	}),
])

export const landingCalloutButtonIcon = style([
	sprinkles({
		position: 'relative',
		background: 'white',
		borderRadius: 'full',
		marginRight: 'xsmall',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
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
		flexShrink: 0,
		flexGrow: 0,
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingBottom: '72px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '25%' },
	}),
])

export const landingHeroCalloutRoundedImg = style([
	sprinkles({
		borderRadius: 'xxlarge',
	}),
])

export const landingHeroExperienceImageWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 'xlarge',
	}),
	{},
])

export const landingHeroSendReceiveStakeWrapper = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 'xxlarge',
	}),
	{},
])

export const landingTextOpacity50 = style([{ opacity: '0.5' }])
