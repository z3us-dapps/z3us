import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from '../system/sprinkles.css'

import { vars } from '../system/theme.css'

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
	top: '0',
	left: '0',
	right: '0',
	height: '24px',
	background: 'red',
	pointerEvents: 'none',
	opacity: 0,
	transition: vars.transition.fast,
})

globalStyle(`${scrollAreaStyledWrapper}:before`, {
	content: '" "',
	position: 'absolute',
	bottom: '0',
	left: '0',
	right: '0',
	height: '24px',
	background: 'red',
	zIndex: 1,
	pointerEvents: 'none',
	opacity: 0,
	transition: vars.transition.fast,
})

globalStyle(`${scrollAreaStyledWrapper} .simplebar-content-wrapper:focus, ${scrollAreaStyledWrapper} .simplebar-content-wrapper:focus-visible`, {
	border: 'none',
	outline: 'none',
})

export const simpleBarStyledTopShadow = style([
	sprinkles({
		position: 'relative',
	}), {
		border: "1px solid transparent"
	}
])

globalStyle(`${simpleBarStyledTopShadow}:after`, {
	content: '" "',
	position: 'absolute',
	top: '0',
	left: '0',
	right: '0',
	height: '24px',
	background: 'yellow',
	pointerEvents: 'none',
	opacity: 1,
	transition: vars.transition.fast,
})


export const simpleBarStyledBottomShadow = style([
	sprinkles({
		position: 'relative',
	}), {
		border: '1px solid transparent'
	}
])

globalStyle(`${simpleBarStyledBottomShadow}:before`, {
	content: '" "',
	position: 'absolute',
	bottom: '0',
	left: '0',
	right: '0',
	height: '24px',
	background: 'yellow',
	zIndex: 1,
	pointerEvents: 'none',
	opacity: 1,
	transition: vars.transition.fast,
})

export const scrollAreaWrapperDisabled = style([
	sprinkles({
		pointerEvents: 'none',
	}),
	{},
])

export const scrollAreaTopShadow = style([
	sprinkles({
		position: 'absolute',
		opacity: 0,
		top: 0,
		left: 0,
		right: 0,
		transition: 'fast',
		pointerEvents: 'none',
		boxShadow: 'shadowScrollTop',
	}),
	{
		height: '24px',
		top: '-24px',
	},
])

export const scrollAreaTopShadowVisible = style([
	sprinkles({
		opacity: 1,
	}),
])

export const scrollAreaBottomShadow = style([
	sprinkles({
		position: 'absolute',
		opacity: 0,
		left: 0,
		right: 0,
		transition: 'fast',
		pointerEvents: 'none',
		boxShadow: 'shadowScrollBottom',
	}),
	{
		height: '24px',
		bottom: '-24px',
	},
])

export const scrollAreaBottomShadowVisible = style([
	sprinkles({
		opacity: 1,
	}),
])

// globalStyle(`${scrollAreaWrapper} .simplebar-content:focus, ${scrollAreaWrapper} .simplebar-content:focus-visible`, {
// 	border: 'none',
// 	outline: 'none',
// })
//
// globalStyle(
// 	`${scrollAreaWrapper} .simplebar-content-wrapper:focus, ${scrollAreaWrapper} .simplebar-content-wrapper:focus-visible`,
// 	{
// 		border: 'none',
// 		outline: 'none',
// 	},
// )
