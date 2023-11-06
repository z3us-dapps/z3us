import { globalStyle, style } from '@vanilla-extract/css'

import { fadeIn, fadeOut } from '../dropdown-menu/styles.css'
import { darkMode, sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

const SCROLLBAR_SIZE = '10px'

export const scrollAreaRootWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		'::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			pointerEvents: 'none',
			zIndex: '1',
			background: 'blue',
			boxShadow: `${vars.color.shadowScrollBottom}`,
			height: '12px',
			bottom: '-12px',
			opacity: '0',
			transition: vars.transition.fastall,
		},
		'::before': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			pointerEvents: 'none',
			zIndex: '1',
			boxShadow: `${vars.color.shadowScrollTop}`,
			height: '12px',
			top: '-12px',
			opacity: '0',
			transition: vars.transition.fastall,
		},
	},
])

export const scrollAreaEnabledStyles = style([
	sprinkles({
		overflow: 'hidden',
	}),
	{},
])

export const scrollAreaViewportWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
	}),
	{
		borderRadius: 'inherit',
	},
])

globalStyle(`${scrollAreaViewportWrapper} > div`, {
	display: 'block !important',
})

export const scrollAreaScrollbarWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		padding: 'xxsmall',
		cursor: 'pointer',
		transition: 'fast',
	}),
	{
		paddingTop: '2px',
		paddingBottom: '2px',
		paddingRight: '2px',
		paddingLeft: '2px',
		userSelect: 'none',
		transition: 'background 160ms ease-out',
		willChange: ' opacity',
		animationDuration: '300ms',
		selectors: {
			'&[data-state="visible"]': {
				animationName: fadeIn,
				animationFillMode: 'forwards',
			},
			'&[data-state="hidden"]': {
				animationName: fadeOut,
				animationFillMode: 'forwards',
			},
			'&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE, zIndex: 2 },
			'&[data-orientation="horizontal"]': {
				flexDirection: 'column',
				height: SCROLLBAR_SIZE,
			},
		},
	},
])

export const scrollAreaScrollbarRoundedWrapper = style([
	{
		paddingTop: '8px',
		paddingBottom: '8px',
	},
])

export const scrollAreaThumbWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		borderRadius: 'small',
	}),
	{
		width: '3px',
		background: vars.color.bleached_silk600,
		transition: 'background-color .15s ease',
		opacity: '0.6',
		'::before': {
			content: '""',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '100%',
			height: '100%',
			minWidth: '12px',
			minHeight: '44px',
		},
	},
	{
		selectors: {
			[`&:hover`]: {
				opacity: '0.7',
			},
			[`.${darkMode} &`]: {
				background: vars.color.lead900,
			},
		},
	},
])

export const scrollAreaCornerWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const scrollAreaRootDisabledWrapper = style([sprinkles({}), {}])

export const scrollAreaIntersectionSliceTop = style([
	sprinkles({
		position: 'relative',
		pointerEvents: 'none',
	}),
	{
		height: '1px',
		marginBottom: '-1px',
	},
])

export const scrollAreaIntersectionSliceBottom = style([
	sprinkles({
		position: 'relative',
		pointerEvents: 'none',
	}),
	{
		height: '1px',
	},
])

export const scrollAreaShowTopShadowsWrapper = style([
	{
		'::before': {
			opacity: '1',
		},
	},
])

export const scrollAreaShowBottomShadowsWrapper = style([
	{
		'::after': {
			opacity: '1',
		},
	},
])

export const scrolledButtonWrapper = style([
	sprinkles({
		position: 'absolute',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		transition: 'fast',
		zIndex: 2,
		bottom: 0,
		right: 0,
		marginRight: 'medium',
		marginBottom: 'medium',
		opacity: 0,
		pointerEvents: 'none',
	}),
	{},
])

export const scrolledButtonWrapperVisible = style([
	sprinkles({
		pointerEvents: 'auto',
	}),
	{ opacity: 0.7 },
])

globalStyle(`.${darkMode} ${scrollAreaShowBottomShadowsWrapper}::before`, {
	background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 54%, rgba(0,0,0,0) 100%)',
})

globalStyle(`.${darkMode} ${scrollAreaShowBottomShadowsWrapper}::after`, {
	background: 'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 54%, rgba(0,0,0,0) 100%)',
})

globalStyle(`${scrollAreaRootDisabledWrapper} > div`, {
	overflow: 'unset !important' as 'unset',
})

globalStyle(`${scrollAreaRootDisabledWrapper} > div > div`, {
	display: 'block !important' as 'block',
})

globalStyle(`${scrollAreaRootDisabledWrapper} > ${scrollAreaScrollbarWrapper}`, {
	display: 'none !important',
})
