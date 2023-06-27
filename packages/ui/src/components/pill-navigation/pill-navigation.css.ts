import { style } from '@vanilla-extract/css'

import { vars } from 'ui/src/components/system/theme.css'

import { darkMode, sprinkles } from '../system/sprinkles.css'

export const pillNavigationLink = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		borderRadius: 'full',
		paddingX: 'medium',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'fast',
		height: 'xlarge',
		background: {
			lightMode: 'transparent',
			hover: 'white',
		},
	}),
	{
		selectors: {
			[`.${darkMode} &:hover`]: {
				background: vars.color.lead400,
			},
		},
	},
])

export const pillNavigationActive = style([
	sprinkles({
		position: 'absolute',
		display: 'block',
		width: 'full',
		height: 'full',
		borderRadius: 'full',
		top: 0,
		left: 0,
		background: {
			lightMode: 'white',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		selectors: {
			[`.${darkMode} &`]: {
				// boxShadow: vars.color.shadowDropdown as any,
			},
		},
	},
])

export const pillNavigationText = style([
	sprinkles({
		position: 'relative',
		transition: 'fastall',
	}),
])

export const pillNavigationTextActive = style([
	sprinkles({
		color: {
			lightMode: 'colorStrong',
			darkMode: 'colorStrong',
		},
	}),
])
