/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

const bgColor = '#242428'

globalStyle(`html.${darkMode} body`, {
	backgroundColor: bgColor,
})

globalStyle(`html body`, {
	overflowX: 'hidden',
})

export const landingPageWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		background: bgColor,
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
	{},
	responsiveStyle({
		mobile: {
			top: '430px',
			left: '-40px',
			width: '260px',
			height: 'auto',
		},
		tablet: {
			top: '474px',
			left: '-40px',
			width: '386px',
			height: 'auto',
		},
		desktop: {
			top: '314px',
			left: '-140px',
			width: '786px',
			height: '1222px',
		},
	}),
])

export const landingPageLargeImgFloatRight = style([
	sprinkles({
		position: 'absolute',
		pointerEvents: 'none',
	}),
	{},
	responsiveStyle({
		mobile: {
			top: '0px',
			right: '-20px',
			width: '160px',
			height: 'auto',
		},
		tablet: {
			top: '0px',
			right: '0px',
			width: '310px',
			height: 'auto',
			transform: 'translateX(100px)',
		},
		desktop: {
			top: '0px',
			right: '-160px',
			width: '710px',
			height: '474px',
		},
	}),
])

export const landingPageDarkWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
	}),
	{
		background: bgColor,
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageInvadersHeroWrapper = style([
	sprinkles({}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingTop: '72px' },
		tablet: { marginTop: '-180px' },
		desktop: { marginTop: '-140px' },
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

export const landingPageBelowFeatureWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		tablet: { paddingTop: '40px' },
		desktop: { paddingTop: '20px' },
	}),
])

export const landingLeftHeroTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
	responsiveStyle({
		tablet: { paddingTop: '0px', paddingBottom: '0px', maxWidth: '640px' },
	}),
])

export const landingLeftAllInTextWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { paddingTop: '100px' },
		tablet: { paddingTop: '100px' },
		desktop: { paddingTop: '20px' },
	}),
])

export const landingFeaturePointBlockWrapper = style([
	sprinkles({
		position: 'relative',
		paddingY: {
			mobile: 'xxlarge',
			tablet: 'xxxlarge',
		},
		display: 'flex',
		flexDirection: 'column',
		gap: 'xlarge',
		justifyContent: 'space-between',
		alignItems: 'center',
	}),
	{
		margin: '0 auto',
		'@media': {
			'screen and (min-width: 1200px)': {
				border: '1px solid red',
				flexDirection: 'row',
				gap: vars.spacing.large,
				marginTop: '120px',
				paddingTop: '120px',
				paddingBottom: '0px',
				maxWidth: '1040px',
			},
		},
	},
])

export const landingFeaturePointMobileReverse = style([
	sprinkles({
		flexDirection: 'column-reverse',
	}),
	{
		'@media': {
			'screen and (min-width: 1200px)': {
				flexDirection: 'row',
			},
		},
	},
])

export const landingFeaturePointBlockBorder = style([
	sprinkles({
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const landingFeaturePointBlock = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { paddingTop: '0px', paddingBottom: '0px', maxWidth: '490px' },
		// desktop: { width: '25%' },
	}),
])

globalStyle(`${landingFeaturePointBlock} ul`, {
	marginTop: vars.spacing.medium,
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'column',
	gap: '6px',
})

globalStyle(`${landingFeaturePointBlock} ul li`, {
	display: 'flex',
	alignItems: 'center',
	gap: '6px',
})

export const landingFeaturePointImgBlock = style([
	sprinkles({
		position: 'relative',
	}),
	{
		// border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { paddingTop: '0px', paddingBottom: '0px', width: '490px' },
		// desktop: { width: '25%' },
	}),
])

export const landingFeaturePointImg = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '100%', height: 'auto' },
	}),
])

export const landingMakeItYourOwnImgLarge = style([
	sprinkles({
		position: 'relative',
	}),
	{
		// border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { marginTop: '118px', marginLeft: '190px' },
		// desktop: { width: '25%' },
	}),
])

export const landingMakeItYourOwnAccountsColumn = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		left: 0,
		display: 'flex',
		flexDirection: 'column',
		gap: 'large',
	}),
	{
		// border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { width: '316px', marginLeft: '0px' },
		// desktop: { width: '25%' },
	}),
])

export const landingAddressBookImgOneLarge = style([
	sprinkles({
		top: 0,
		left: 0,
	}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '100%', height: 'auto' },
		tablet: { marginLeft: '-70px', marginBottom: '120px' },
		// desktop: { width: '25%' },
	}),
])

export const landingAddressBookImgTwoLarge = style([
	sprinkles({
		top: 0,
		left: 0,
	}),
	{
		position: 'absolute',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { marginTop: '118px', marginLeft: '90px' },
		// desktop: { width: '25%' },
	}),
])

export const landingNftOneLarge = style([
	sprinkles({}),
	{
		// border: '1px solid red',
	},
	responsiveStyle({
		mobile: { maxWidth: '100%', height: 'auto' },
		tablet: { marginBottom: '118px' },
		// desktop: { width: '25%' },
	}),
])

export const landingNftTwoLarge = style([
	sprinkles({
		top: 0,
		left: 0,
	}),
	{
		position: 'absolute',
		// border: '1px solid red',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { marginTop: '118px', marginLeft: '190px' },
		// desktop: { width: '25%' },
	}),
])

export const landingMultiWalletImgOneLarge = style([
	sprinkles({
		top: 0,
		left: 0,
	}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '100%', height: 'auto' },
		tablet: { marginLeft: '-70px', marginBottom: '160px' },
		// desktop: { width: '25%' },
	}),
])

export const landingMultiWalletImgTwoLarge = style([
	sprinkles({
		top: 0,
		left: 0,
	}),
	{
		position: 'absolute',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { marginTop: '118px', marginLeft: '60px' },
		// desktop: { width: '25%' },
	}),
])

export const landingDetailsGridWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { marginTop: '118px', marginLeft: '60px' },
		// desktop: { width: '25%' },
	}),
])

export const landingDetailsGridHeader = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'xlarge',
		width: 'full',
	}),
	{},
])

export const landingDetailsGridBoxWrapper = style([
	sprinkles({
		display: 'grid',
	}),
	{},
	responsiveStyle({
		mobile: {
			gap: vars.spacing.xlarge,
			gridTemplateColumns: '1fr',
		},
		tablet: {
			gap: vars.spacing.xlarge,
			gridTemplateColumns: '1fr 1fr',
		},
		desktop: {
			gap: vars.spacing.xxlarge,
			gridTemplateColumns: '1fr 1fr 1fr',
		},
	}),
])

export const landingDetailsGridTextWrapper = style([
	sprinkles({
		paddingTop: {
			mobile: 'small',
			tablet: 'medium',
		},
		display: 'flex',
		flexDirection: 'column',
		gap: {
			tablet: 'xxsmall',
		},
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { marginTop: '118px', marginLeft: '60px' },
		// desktop: {
		// 	gap: vars.spacing.large,
		// 	gridTemplateColumns: '1fr 1fr 1fr',
		// },
	}),
])

export const landingPageFooterWrapper = style([
	sprinkles({
		position: 'relative',
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
		maxWidth: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { paddingTop: '80px', paddingBottom: '30px' },
		tablet: { paddingTop: '80px', paddingBottom: '50px' },
		desktop: { paddingTop: '80px', paddingBottom: '140px' },
	}),
])

globalStyle(`${landingHeroTextWrapper} svg`, {
	maxWidth: '100%',
	height: 'auto',
})

export const landingCalloutFlexWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-end',
	}),
	{},
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
		mobile: { paddingBottom: '400px' },
		tablet: { maxWidth: '560px', paddingBottom: '500px' },
		desktop: { paddingBottom: '172px', maxWidth: '560px', marginRight: '140px' },
	}),
])

export const landingCalloutText = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: {
			fontSize: '18px',
			lineHeight: '26px',
		},
		tablet: {
			fontSize: '20px',
			lineHeight: '28px',
		},
		desktop: {
			fontSize: '22px',
			lineHeight: '30px',
		},
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
		marginLeft: '5px',
		width: '20px',
		height: '20px',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingBottom: '72px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '25%' },
	}),
])

export const landingPageHeroImage = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
	}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '100%', height: 'auto' },
		// tablet: { paddingBottom: '72px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '1160px', height: '784px' },
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
])

export const landingHeroCalloutRoundedImg = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { borderRadius: vars.border.radius.medium },
		tablet: { borderRadius: vars.border.radius.xlarge },
	}),
])

export const landingHeroCalloutRoundedLargeImg = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { borderRadius: vars.border.radius.xxlarge },
		tablet: { borderRadius: vars.border.radius.xxlarge },
	}),
])

export const landingHeroExperienceImageWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		gap: 'xlarge',
		alignItems: 'self-start',
	}),
	{},
	responsiveStyle({
		mobile: { marginTop: '20px' },
		tablet: { marginTop: '30px', paddingBottom: '40px' },
		desktop: { marginTop: '40px' },
	}),
])

export const landingHeroExperienceImageOne = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '100%', height: 'auto' },
		tablet: { maxWidth: '100%', height: 'auto' },
	}),
])

export const landingHeroExperienceImageTwo = style([
	sprinkles({}),
	{
		display: 'none',
		'@media': {
			'screen and (min-width: 1200px)': {
				display: 'block',
			},
		},
	},
])

export const landingHeroSendReceiveStakeWrapper = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
		display: 'flex',
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
		gap: {
			mobile: 'xxlarge',
			tablet: 'none',
		},
		alignItems: {
			mobile: 'center',
			tablet: 'self-start',
		},
		justifyContent: {
			mobile: 'center',
			tablet: 'space-between',
		},
		marginTop: 'xxlarge',
	}),
	{},
])

export const landingHeroSendReceiveStakeImg = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '100%', height: 'auto' },
		tablet: { maxWidth: '32%' },
		desktop: { width: '100%' },
	}),
])

export const landingHeroImgMobileHidden = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { display: 'none' },
		tablet: { display: 'flex' },
	}),
])

export const landingTextOpacity50 = style([{ opacity: '0.5' }])

export const landingTextPurple = style([
	{
		color: vars.color.purple400,
	},
])
