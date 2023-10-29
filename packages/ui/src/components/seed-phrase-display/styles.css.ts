import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

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
		gap: 'medium',
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
			'(min-width: 600px)': {
				gap: vars.spacing.large,
				gridTemplateColumns: '1fr 1fr 1fr',
			},
		},
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
