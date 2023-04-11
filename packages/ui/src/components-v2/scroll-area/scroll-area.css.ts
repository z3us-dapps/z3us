import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from '../system/sprinkles.css'

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
	{},
])

export const scrollAreaTopShadow = style([
	sprinkles({
		position: 'absolute',
		opacity: 0,
		top: 0,
		left: 0,
		right: 0,
		height: 'large',
		transition: 'fast',
		pointerEvents: 'none',
	}),
	{
		background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)',
		selectors: {
			[`.${darkMode} &::before`]: {
				background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)',
			},
		},
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
		bottom: 0,
		left: 0,
		right: 0,
		height: 'large',
		transition: 'fast',
		pointerEvents: 'none',
	}),
	{
		background: 'linear-gradient(0deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)',
		selectors: {
			[`.${darkMode} &::before`]: {
				background: 'linear-gradient(0deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)',
			},
		},
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
