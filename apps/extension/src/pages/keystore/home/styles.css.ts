import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const keystoreHomeStyleWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		width: 'full',
		padding: {
			mobile: 'xlarge',
		},
	}),
	{},
	responsiveStyle({
		mobile: { minHeight: '600px' },
		tablet: { minHeight: 'unset' },
	}),
])

export const keystoreHomeButtonWrapper = style([
	sprinkles({
		display: 'flex',
		paddingTop: 'small',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
])
