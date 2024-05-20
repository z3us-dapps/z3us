import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const scrollAreaWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
	}),
	{
		border: 'none',
		outline: 'none',
	},
])

export const scrollAreaWrapperDisabled = style([
	sprinkles({
		pointerEvents: 'none',
	}),
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

globalStyle(`${scrollAreaWrapper} .simplebar-content:focus, ${scrollAreaWrapper} .simplebar-content:focus-visible`, {
	border: 'none',
	outline: 'none',
})

globalStyle(
	`${scrollAreaWrapper} .simplebar-content-wrapper:focus, ${scrollAreaWrapper} .simplebar-content-wrapper:focus-visible`,
	{
		border: 'none',
		outline: 'none',
	},
)
