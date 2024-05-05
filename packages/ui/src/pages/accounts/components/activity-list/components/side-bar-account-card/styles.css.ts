import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const mobileHiddenWrapper = style([
	responsiveStyle({
		mobile: { display: 'none' },
	}),
])

export const mobileCardWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	}),
	{},
])

export const mobileCardTransparentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		marginTop: 'large',
		marginBottom: 'medium',
		borderRadius: 'xlarge',
	}),
	{
		width: '75%',
		maxWidth: '480px',
		aspectRatio: '8 / 5',
		boxShadow:
			'0px 136px 192px rgba(0, 0, 0, 0.2), 0px 50px 50px rgba(0, 0, 0, 0.15), 0px 24px 24px rgba(0, 0, 0, 0.1), 0px 12px 12px rgba(0, 0, 0, 0.05)',
	},
])
