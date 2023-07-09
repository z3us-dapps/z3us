import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from '../system/sprinkles.css'

export const scrollAreaRootWrapper = style([sprinkles({}), {}])

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
		padding: '2px',
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
		// position: 'relative',
	}),
	{},
])

export const scrollAreaRootDisabledWrapper = style([sprinkles({}), {}])

globalStyle(`${scrollAreaRootDisabledWrapper} > div`, {
	overflow: 'unset !important',
})

globalStyle(`${scrollAreaRootDisabledWrapper} > ${scrollAreaScrollbarWrapper}`, {
	display: 'none !important',
})
