import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const cardWrapperAll = style([
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

export const card = style([
	sprinkles({
		position: 'absolute',
		borderRadius: 'xlarge',
		flexShrink: 0,
		overflow: 'hidden',
	}),
	{
		width: '100%',
		height: '100%',
		backgroundSize: 'cover',
		transformOrigin: 'top center',
		listStyle: 'none',

		':after': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			border: '1px solid',
			borderColor: 'rgba(255,255,255, 0.5)',
			pointerEvents: 'none',
			borderRadius: vars.border.radius.xlarge,
			opacity: '0.5',
		},
	},
])

export const cardShadow = style([
	{
		boxShadow:
			'0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 16px 48px -8px rgba(0, 0, 0, 0.1), 0px 32px 48px rgba(0, 0, 0, 0.05)',
		selectors: {
			[`.${darkMode} &`]: {
				boxShadow:
					'0px 136px 192px rgba(0, 0, 0, 0.2), 0px 50px 50px rgba(0, 0, 0, 0.15), 0px 24px 24px rgba(0, 0, 0, 0.1), 0px 12px 12px rgba(0, 0, 0, 0.05)',
			},
		},
	},
])

export const cardAllWrapper = style([
	sprinkles({
		background: {
			lightMode: 'backgroundPrimary',
			darkMode: 'backgroundPrimary',
		},
	}),
	{},
])

export const cardAccountShine = style([
	sprinkles({
		position: 'absolute',
		pointerEvents: 'none',
	}),
	{
		width: '300%',
		height: '300%',
		left: '-300%',
		top: '0%',
		background: 'linear-gradient(45deg,rgba(255,255,255,.0) 25%, rgba(255,255,255,.3) 40%, rgba(255,255,255,.01) 75%)',
		backgroundPosition: '0 0',
	},
])

globalStyle(`${card}:hover ${cardAccountShine}`, {
	top: '-200%',
	left: '0%',
	opacity: '1',
	transition: 'all 0.8s ease',
	background: 'linear-gradient(45deg,rgba(255,255,255,.0) 35%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.01) 75%)',
})

export const cardAccountWrapper = style([
	sprinkles({
		position: 'relative',
		paddingX: 'large',
		paddingY: 'medium',
		display: 'flex',
		flexDirection: 'column',
		height: 'full',
		transition: 'fast',
	}),
])

export const cardAccountText = style([
	sprinkles({
		color: {
			lightMode: 'white',
			darkMode: 'white',
		},
	}),
])

export const cardAccountTextAll = style([
	sprinkles({
		color: {
			lightMode: 'colorStrong',
			darkMode: 'white',
		},
	}),
])

export const cardAccountTextSpaced = style([
	sprinkles({
		position: 'relative',
	}),
	{
		letterSpacing: '0.11em',
	},
])

export const copyAddressButtonWrapper = style([
	{
		marginTop: '-4px',
	},
])

export const accountDropdownWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		marginTop: 'medium',
		marginRight: 'medium',
	}),
	{},
])

export const accountCardZ3USlogoWrapper = style([
	sprinkles({
		bottom: 0,
		right: 0,
		marginRight: 'large',
		marginBottom: 'large',
		pointerEvents: 'none',
	}),
	{
		position: 'absolute',
	},
])

export const accountDropdownContentWrapper = style([
	{
		minWidth: '160px',
	},
])

export const accountCardIconWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		flexShrink: 0,
		overflow: 'hidden',
	}),
	{
		width: '40px',
		backgroundSize: 'cover',
		aspectRatio: '8 / 6',
	},
])

export const cardAccountImageWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		pointerEvents: 'none',
		width: 'full',
		height: 'full',
		maxWidth: 'full',
	}),
	{},
])

export const cardAccountLarge = style([
	sprinkles({
		position: 'absolute',
	}),
	{},
])

globalStyle(`${cardAccountImageWrapper} img`, {
	position: 'absolute',
	top: 0,
	right: 0,
	maxWidth: '120%',
	width: '120%',
	height: 'auto',
	opacity: '0',
})

// CARDS
globalStyle(`${cardAccountImageWrapper}${cardAccountLarge}.angel img`, {
	position: 'absolute',
	bottom: 0,
	right: '-20px',
	maxWidth: '100%',
	width: '266px',
	height: 'auto',
	opacity: '0',
})

globalStyle(`${cardAccountImageWrapper}${cardAccountLarge}.apple-hermes img`, {
	position: 'absolute',
	bottom: 0,
	right: '-20px',
	maxWidth: '100%',
	width: '266px',
	height: 'auto',
	opacity: '0',
})

globalStyle(`${cardAccountImageWrapper}${cardAccountLarge}.athens img`, {
	position: 'absolute',
	top: 0,
	right: '0px',
	maxWidth: '110%',
	width: '110%',
	height: 'auto',
	opacity: '0',
})

globalStyle(`${cardAccountImageWrapper}${cardAccountLarge}.man img`, {
	position: 'absolute',
	top: 0,
	right: '-20px',
	maxWidth: '100%',
	width: '250px',
	height: 'auto',
	opacity: '0',
})

// COLORS orange
globalStyle(`${cardAccountImageWrapper}.orange img:nth-child(1)`, {
	mixBlendMode: 'darken',
	opacity: '1',
})

globalStyle(`${cardAccountImageWrapper}.orange img:nth-child(2)`, {
	mixBlendMode: 'luminosity',
	opacity: '0.3',
})

globalStyle(`${cardAccountImageWrapper}.orange img:nth-child(3)`, {
	mixBlendMode: 'difference',
	opacity: '0.1',
})

globalStyle(`${cardAccountImageWrapper}.orange img:nth-child(4)`, {
	mixBlendMode: 'color-burn',
	opacity: '0.1',
})

// COLORS lipstick
globalStyle(`${cardAccountImageWrapper}.lipstick img:nth-child(1)`, {
	mixBlendMode: 'hue',
	opacity: '0.9',
})

globalStyle(`${cardAccountImageWrapper}.lipstick img:nth-child(2)`, {
	mixBlendMode: 'color-burn',
	opacity: '0.9',
})

globalStyle(`${cardAccountImageWrapper}.lipstick img:nth-child(3)`, {
	mixBlendMode: 'color-dodge',
	opacity: '0.2',
})

globalStyle(`${cardAccountImageWrapper}.lipstick img:nth-child(4)`, {
	mixBlendMode: 'exclusion',
	opacity: '0.4',
})

// COLORS electric-violet
globalStyle(`${cardAccountImageWrapper}.electric-violet img:nth-child(1)`, {
	mixBlendMode: 'hue',
	opacity: '0.9',
})

globalStyle(`${cardAccountImageWrapper}.electric-violet img:nth-child(2)`, {
	mixBlendMode: 'color-burn',
	opacity: '0.9',
})

globalStyle(`${cardAccountImageWrapper}.electric-violet img:nth-child(3)`, {
	mixBlendMode: 'color-dodge',
	opacity: '0.2',
})

globalStyle(`${cardAccountImageWrapper}.electric-violet img:nth-child(4)`, {
	mixBlendMode: 'exclusion',
	opacity: '0.4',
})

// COLORS blue
globalStyle(`${cardAccountImageWrapper}.blue img:nth-child(1)`, {
	mixBlendMode: 'hue',
	opacity: '0.9',
})

globalStyle(`${cardAccountImageWrapper}.blue img:nth-child(2)`, {
	mixBlendMode: 'color-burn',
	opacity: '0.9',
})

globalStyle(`${cardAccountImageWrapper}.blue img:nth-child(3)`, {
	mixBlendMode: 'color-dodge',
	opacity: '0.2',
})

globalStyle(`${cardAccountImageWrapper}.blue img:nth-child(4)`, {
	mixBlendMode: 'exclusion',
	opacity: '0.4',
})
