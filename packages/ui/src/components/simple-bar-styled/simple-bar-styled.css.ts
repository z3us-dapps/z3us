import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const scrollAreaStyledWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		outline: 'none',
	},
])

globalStyle(`${scrollAreaStyledWrapper}:after`, {
	content: '" "',
	position: 'absolute',
	top: '-24px',
	height: '24px',
	left: '0',
	right: '0',
	pointerEvents: 'none',
	opacity: 0,
	transition: vars.transition.fast,
	boxShadow: `${vars.color.shadowScrollTop}`,
})

export const simpleBarStyledTopShadow = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

globalStyle(`${simpleBarStyledTopShadow}:after`, {
	opacity: 1,
})

globalStyle(`${scrollAreaStyledWrapper}:before`, {
	content: '" "',
	position: 'absolute',
	bottom: '-24px',
	height: '24px',
	left: '0',
	right: '0',
	zIndex: 1,
	pointerEvents: 'none',
	opacity: 0,
	transition: vars.transition.fast,
	boxShadow: `${vars.color.shadowScrollBottom}`,
})

export const simpleBarStyledBottomShadow = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

globalStyle(`${simpleBarStyledBottomShadow}:before`, {
	opacity: 1,
})

globalStyle(
	`${scrollAreaStyledWrapper} .simplebar-content-wrapper:focus, ${scrollAreaStyledWrapper} .simplebar-content-wrapper:focus-visible`,
	{
		border: 'none',
		outline: 'none',
	},
)
