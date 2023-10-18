import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const accountCardIconWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{
		width: '40px',
		backgroundSize: 'cover',
		aspectRatio: '8 / 5.5',
	},
	responsiveStyle({
		// tablet: {
		// 	display: 'grid',
		// 	gap: vars.spacing.large,
		// 	gridTemplateColumns: '1fr',
		// },
		// desktop: {
		// 	display: 'grid',
		// 	gap: vars.spacing.large,
		// 	gridTemplateColumns: '36% 1fr',
		// },
	}),
])
