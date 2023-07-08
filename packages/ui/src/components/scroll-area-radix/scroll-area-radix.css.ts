/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, style } from '@vanilla-extract/css'

import { Sprinkles, sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

export const scrollAreaRootWrapper = style([
	sprinkles({
		background: 'backgroundPrimary',
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

export const scrollAreaScrollbarWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		padding: 'xsmall',
		background: 'green300',
	}),
	{
		width: '10px',
		userSelect: 'none',
		transition: 'background 160ms ease-out',

		':hover': {
			opacity: '0.5',
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
		// background: 'purple300',
		borderRadius: 'small',
	}),
	{
		background: 'blue',

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
			background: 'red',
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
