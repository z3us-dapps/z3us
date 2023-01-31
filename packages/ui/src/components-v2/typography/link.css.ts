import { style } from '@vanilla-extract/css'
import { darkMode, sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

export const underlineOnHover = style({
	selectors: {
		'&:not(:hover)': {
			textDecoration: 'none',
		},
	},
})

export const underlineNever = style({
	textDecoration: 'none',
	':hover': {
		textDecoration: 'none',
	},
})

export const highlightOnHover = style([
	sprinkles({
		transition: 'slow',
	}),
	{
		':hover': {
			transition: 'ease-in .2s',
		},
		selectors: {
			[`.${darkMode} &:hover`]: {
				color: vars.color.white,
			},
		},
		':focus': {
			outline: 'none',
			color: vars.color.wax200,
		},
	},
])
