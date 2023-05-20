/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, style } from '@vanilla-extract/css'

import { Sprinkles, sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

export const scrollAreaRootWrapper = style([
	sprinkles({}),
	{
		width: '200px',
		height: '225px',
		backgroundColor: 'black',
		// scrollbarWidth: '10px',
		//   --scrollbar-size: 10px;
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
		display: 'flex',
		padding: 'xsmall',
		background: 'green300',
	}),
	{
		userSelect: 'none',
		transition: 'background 160ms ease-out',
	},
])

export const scrollAreaThumbWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		background: 'purple300',
		borderRadius: 'small',
	}),
	{},
])
