import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const card = style([
	sprinkles({
		position: 'absolute',
		borderRadius: 'xlarge',
		flexShrink: 0,
	}),
	{
		width: '100%',
		height: '100%',
		backgroundSize: '100% auto',
		transformOrigin: 'top center',
		listStyle: 'none',
		overflow: 'hidden',
		boxShadow:
			'0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 0, 0, 0.08), 0px 16px 48px -8px rgba(0, 0, 0, 0.1), 0px 32px 48px rgba(0, 0, 0, 0.05)',
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
					'0px 136px 192px rgba(0, 0, 0, 0.2), 0px 50px 50px rgba(0, 0, 0, 0.15), 0px 24px 24px rgba(0, 0, 0, 0.1), 0px 12px 12px rgba(0, 0, 0, 0.05)',
			},
		},
	},
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
