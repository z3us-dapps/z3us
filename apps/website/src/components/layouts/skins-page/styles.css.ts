import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

const bgColor = '#242428'

globalStyle(`html.${darkMode} body`, {
	backgroundColor: bgColor,
})

globalStyle(`html body`, {
	overflowX: 'hidden',
})

export const faqPageWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	}),
	{
		background: bgColor,
		minHeight: '100vh',
	},
])

export const faqFlexWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		width: 'full',
		paddingTop: {
			mobile: 'xxlarge',
			tablet: 'xxxlarge',
		},
		paddingBottom: {
			mobile: 'xlarge',
			tablet: 'xxlarge',
		},
	}),
	{},
])

export const faqHeaderWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
	}),
	{
		maxWidth: '690px',
	},
])

export const faqPageBodyWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		color: 'white',
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
	responsiveStyle({}),
])

export const landingPageFooterWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		tablet: { marginTop: '-72px' },
	}),
])

export const faqAccordionHeader = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		color: 'white',
	}),
	{},
])

export const faqAccordionTrigger = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		background: 'transparent',
		border: 0,
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingY: 'large',
		paddingRight: 'large',
		textAlign: 'left',
		color: 'white',
	}),
	{
		fontWeight: '500',
		outline: 'none',
	},

	responsiveStyle({
		mobile: {
			fontSize: '20px',
			lineHeight: '28px',
		},
		tablet: {
			fontSize: '22px',
			lineHeight: '30px',
		},
		// desktop: { width: '25%' },
	}),
])

export const faqAccordionContentWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
])

export const faqAccordionContentInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		paddingY: 'xlarge',
	}),
	{},
])

globalStyle(`${faqAccordionContentInnerWrapper} ul`, {
	listStyle: 'square inside',
	marginTop: '10px',
	marginBottom: '10px',
})

export const faqAccordionArrowRight = style([
	sprinkles({
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		top: 0,
		right: 0,
		transition: 'fastall',
	}),
	{
		marginTop: '22px',
	},
])

globalStyle(`${faqAccordionTrigger}[data-state="open"] ${faqAccordionArrowRight}`, {
	transform: `rotate(90deg)`,
})

export const accountsCardWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		gap: 'large',
	}),
	{
		maxWidth: '680px',
		maxHeight: '380px',
	},
])

export const cardWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'xlarge',
		overflow: 'hidden',
	}),
	{
		aspectRatio: '8 / 5',
	},
	responsiveStyle({
		mobile: {
			width: '100%',
		},
		desktop: {
			width: '100%',
		},
	}),
])
