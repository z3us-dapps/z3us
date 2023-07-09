/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, keyframes, style } from '@vanilla-extract/css'

import { Sprinkles, darkMode, sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

export const scrollAreaRootWrapper = style([
	sprinkles({
		// background: 'backgroundPrimary',
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

export const scrollAreaRootDisabledWrapper = style([sprinkles({}), {}])

export const scrollAreaScrollbarWrapper = style([
	sprinkles({
		position: 'relative',
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
		opacity: '0.5',
		':hover': {
			opacity: '0.8',
		},
		// selectors: {
		// 	[`.${darkMode} &:hover`]: {
		// 		color: vars.color.white,
		// 	},
		// },
		// ':focus': {
		// 	outline: 'none',
		// 	color: vars.color.wax200,
		// },
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
		// flexGrow: 1,
		// background: 'purple300',
		// borderRadius: 'small',
	}),
	{
		background: 'brown',
	},
])

globalStyle(`${scrollAreaRootDisabledWrapper} > div`, {
	overflow: 'unset !important',
})

globalStyle(`${scrollAreaRootDisabledWrapper} > ${scrollAreaScrollbarWrapper}`, {
	display: 'none !important',
})
