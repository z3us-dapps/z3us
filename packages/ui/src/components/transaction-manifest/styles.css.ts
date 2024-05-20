import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const transactionManifestWrapper = style([
	sprinkles({
		position: 'relative',
		border: 1,
		borderStyle: 'solid',
		borderRadius: 'small',
		borderColor: 'borderDivider',
		background: 'backgroundSecondary',
		padding: 'medium',
	}),
	{
		fontFamily: vars.fonts.code,
		whiteSpace: 'pre',
		wordWrap: 'break-word',
	},
])

export const transactionManifestTextWrapper = style([
	sprinkles({}),
	{
		fontFamily: vars.fonts.code,
		whiteSpace: 'pre',
		wordWrap: 'break-word',
	},
])
