import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const keystoreNewWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
	{},
])

export const keystoreNewTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
		paddingTop: 'small',
		paddingBottom: 'large',
	}),
	{},
])

export const keystoreNewPhraseGridButtonWrapper = style([
	sprinkles({
		display: 'grid',
		gap: 'small',
		marginTop: 'small',
		marginBottom: 'large',
	}),
	{
		gridTemplateColumns: '1fr 1fr 1fr 1fr',
	},
])

export const keystoreNewPhraseGridWrapper = style([
	sprinkles({
		display: 'grid',
		gap: 'medium',
		marginTop: 'small',
		marginBottom: 'large',
		userSelect: 'none',
	}),
	{},
	responsiveStyle({
		mobile: { gridTemplateColumns: '1fr 1fr' },
		tablet: { gridTemplateColumns: '1fr 1fr 1fr' },
	}),
])

export const keystoreInputBlurWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'block',
	}),
	{},
])

export const keystoreInputBlurWordWrapper = style([
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

globalStyle(`${keystoreInputBlurWrapper}:hover ${keystoreInputBlurWordWrapper}`, {
	filter: 'blur(0px)',
})
