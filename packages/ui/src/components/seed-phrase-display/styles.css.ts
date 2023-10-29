import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const phraseGridWrapper = style([
	sprinkles({
		display: 'grid',
		gap: 'medium',
		marginTop: 'small',
		marginBottom: 'large',
	}),
	{
		gridTemplateColumns: '1fr 1fr 1fr',
	},
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
