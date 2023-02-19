import { style, globalStyle } from '@vanilla-extract/css'
import { sprinkles } from '../system/sprinkles.css'
// import { fadeIn, fadeOut, sharedItemStyles } from '../dropdown-menu/dropdown-menu.css'

export const scrollAreaWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		overflow: 'hidden',
	}),
	{},
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
		background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)',
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
		background: 'linear-gradient(0deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 69%, rgba(0,0,0,0) 100%)',
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

// export const selectTriggerIconOnly = style({})
//
// globalStyle(`${selectTriggerIconOnly} > span:nth-child(1)`, {
// 	pointerEvents: 'none',
// 	width: '0',
// 	height: '0',
// 	position: 'absolute',
// 	opacity: 0,
// })
//
// export const selectContent = style([
// 	sprinkles({
// 		position: 'relative',
// 		zIndex: 2,
// 		background: 'backgroundSecondary',
// 		boxShadow: 'shadowMedium',
// 		paddingX: 'small',
// 		paddingY: 'medium',
// 		color: 'colorNeutral',
// 		borderRadius: 'medium',
// 	}),
// 	{
// 		minWidth: '7rem',
// 		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
// 		willChange: 'transform, opacity',
// 		animationDuration: '150ms',
// 		selectors: {
// 			'&[data-state="open"]': {
// 				animationName: fadeIn,
// 			},
// 			'&[data-state="closed"]': {
// 				animationName: fadeOut,
// 			},
// 		},
// 	},
// ])
//
// export const selectMenuItem = style([
// 	sprinkles({
// 		...(sharedItemStyles as Sprinkles),
// 	}),
// 	{
// 		outline: 'none',
// 	},
// ])
