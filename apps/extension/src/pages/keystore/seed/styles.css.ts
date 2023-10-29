import { style } from '@vanilla-extract/css'

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
