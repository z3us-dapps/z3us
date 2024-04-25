import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const phraseContainerWrapper = style([
	sprinkles({
		marginTop: 'small',
		marginBottom: 'large',
	}),
	{
		containerType: 'inline-size',
	},
])

export const phraseGridWrapper = style([
	sprinkles({
		display: 'grid',
	}),
	{
		gap: vars.spacing.medium,
		gridTemplateColumns: '1fr',
		containerType: 'inline-size',
		'@container': {
			'(min-width: 300px)': {
				gap: vars.spacing.medium,
				gridTemplateColumns: '1fr 1fr',
			},
			'(min-width: 400px)': {
				gap: vars.spacing.medium,
				gridTemplateColumns: '1fr 1fr 1fr',
			},
		},
	},
])

export const inputLeftIconClass = style([
	sprinkles({
		pointerEvents: 'none',
	}),
	{},
])

export const inputBlurWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'block',
	}),
	{},
])

export const inputBlurWordWrapper = style([
	sprinkles({
		position: 'absolute',
		display: 'block',
		transition: 'fastall',
		top: 0,
		left: 0,
	}),
	{
		filter: 'blur(4px)',
		left: '38px',
		top: '16px',
	},
])

globalStyle(`${inputBlurWrapper}:hover ${inputBlurWordWrapper}`, {
	filter: 'blur(0px)',
})
