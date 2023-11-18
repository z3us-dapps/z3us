import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const inputBlurSingleWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'block',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'inputPrimaryBorderColor',
		background: 'inputPrimaryBackground',
		padding: 'medium',
		borderRadius: 'medium',
	}),
	{},
])

export const inputBlurSingleWordWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'block',
		transition: 'fastall',
	}),
	{
		fontFamily: vars.fonts.code,
		wordWrap: 'break-word',
		filter: 'blur(4px)',
	},
])

globalStyle(`${inputBlurSingleWrapper}:hover ${inputBlurSingleWordWrapper}`, {
	filter: 'blur(0px)',
})
