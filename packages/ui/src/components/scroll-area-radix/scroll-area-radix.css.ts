import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

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
			background: 'linear-gradient(0deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)',
			height: '12px',
			bottom: '0px',
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
			background: 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.03) 50%, rgba(0,0,0,0) 100%)',
			height: '12px',
			top: '0px',
			opacity: '0',
			transition: vars.transition.fastall,
		},
	},
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

export const scrollAreaScrollbarWrapper = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
		display: 'flex',
		padding: 'xxsmall',
		cursor: 'pointer',
		transition: 'fast',
	}),
	{
		// TODO: rounded prop
		paddingTop: '8px',
		paddingBottom: '8px',
		paddingRight: '2px',
		paddingLeft: '2px',
		width: '10px',
		userSelect: 'none',
		transition: 'background 160ms ease-out',
		opacity: '0.3',
		':hover': {
			opacity: '0.5',
		},
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
		background: '#000',
		'::before': {
			content: '""',
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: '100%',
			height: '100%',
			minWidth: '44px',
			minHeight: '44px',
		},
	},
	{
		selectors: {
			[`.${darkMode} &`]: {
				background: '#eee',
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

export const scrollAreaIntersectionSlice = style([
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

globalStyle(`.${darkMode} ${scrollAreaShowBottomShadowsWrapper}::before`, {
	background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 54%, rgba(0,0,0,0) 100%)',
})

globalStyle(`.${darkMode} ${scrollAreaShowBottomShadowsWrapper}::after`, {
	background: 'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 54%, rgba(0,0,0,0) 100%)',
})

globalStyle(`${scrollAreaRootDisabledWrapper} > div`, {
	overflow: 'unset !important',
})

globalStyle(`${scrollAreaRootDisabledWrapper} > ${scrollAreaScrollbarWrapper}`, {
	display: 'none !important',
})
