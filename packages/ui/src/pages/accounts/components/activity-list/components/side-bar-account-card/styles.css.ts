import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const mobileHiddenWrapper = style([
	responsiveStyle({
		mobile: { display: 'none' },
	}),
])

export const mobileCardWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
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
		marginBottom: 'large',
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
