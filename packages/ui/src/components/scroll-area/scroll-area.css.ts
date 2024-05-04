import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const scrollAreaWrapper = style([
	sprinkles({
		overflowY: 'auto',
	}),
	{
		border: '1px solid red',
		outline: 'none',
	},
])

export const scrollAreaWrapperDisablePointerEvents = style([
	sprinkles({
		pointerEvents: 'none',
	}),
	{},
])

export const scrollAreaSimpleBarDisabledWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
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

globalStyle(`${scrollAreaSimpleBarDisabledWrapper} .simplebar-wrapper`, {
	overflow: 'unset',
})

globalStyle(`${scrollAreaSimpleBarDisabledWrapper} .simplebar-mask`, {
	overflow: 'unset',
	position: 'relative',
})

globalStyle(`${scrollAreaSimpleBarDisabledWrapper} .simplebar-offset`, {
	overflow: 'unset',
	position: 'unset !important' as 'unset',
})
