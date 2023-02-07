import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style, globalStyle } from '@vanilla-extract/css'

export const cardWrapperAll = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '312px',
		height: '180px',
	},
	// responsiveStyle({
	// 	mobile: { width: '100%' },
	// 	tablet: { width: '33%' },
	// 	desktop: { width: '25%' },
	// }),
])

export const cardWrapperAccount = style([
	sprinkles({
		position: 'absolute',
	}),
	{
		width: '312px',
		height: '180px',
	},
	// responsiveStyle({
	// 	mobile: { width: '100%' },
	// 	tablet: { width: '33%' },
	// 	desktop: { width: '25%' },
	// }),
])

export const cardWrapperAccountList = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 'medium',
	}),
	{
		width: 'auto',
		height: '180px',
		// background: 'yellow',
		// background: '#8d949c',
		// perspective: '600px',
		whiteSpace: 'nowrap',
	},
])

export const card = style([
	sprinkles({
		position: 'absolute',
		borderRadius: 'xlarge',
		flexShrink: 0,
	}),
	{
		width: '312px',
		height: '180px',
		backgroundSize: '100% auto',
		transformOrigin: 'top center',
		listStyle: 'none',
		overflow: 'hidden',
		boxShadow:
			'0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',
		':after': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			border: '1px solid',
			borderColor: vars.color.white,
			pointerEvents: 'none',
			borderRadius: vars.border.radius.xlarge,
			opacity: '0.5',
		},
		selectors: {
			[`.${darkMode} &`]: {
				boxShadow:
					'0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',
			},
		},
	},
])

export const cardAccountShine = style([
	sprinkles({
		position: 'absolute',

		pointerEvents: 'none',
		top: 0,
		left: 0,
	}),
	{
		width: '300%',
		height: '300%',
		// top: '0%',
		left: '-200%',
		// top: '0%',
		// left: '0%',
		background: 'linear-gradient(45deg,rgba(255,255,255,.01) 25%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.01) 75%)',
		backgroundPosition: '0 0',

		// opacity: '0',
	},
])

globalStyle(`${card}:hover ${cardAccountShine}`, {
	top: '-100%',
	left: '100%',
	opacity: '1',
	transition: 'all 1s ease',
})

export const cardAccountText = style([
	sprinkles({
		position: 'relative',
	}),
	{
		letterSpacing: '0.11em',
	},
])

export const teststyle = style([
	sprinkles({
		position: 'relative',
		background: {
			hover: 'red800',
			focus: 'red900',
		},
	}),
	{
		border: '1px solid red',
		'@media': {
			[`screen and (min-width: 480px)`]: {
				flexBasis: '50%',
			},
		},
	},
	responsiveStyle({
		mobile: { width: '100%' },
		tablet: { width: '33%' },
		desktop: { width: '25%' },
	}),
])

export const tempNav = sprinkles({
	position: 'fixed',
	bottom: 0,
	right: 0,
	zIndex: 1,
})
