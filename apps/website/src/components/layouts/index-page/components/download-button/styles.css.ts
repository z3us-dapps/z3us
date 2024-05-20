/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const landingCalloutButtonIcon = style([
	sprinkles({
		position: 'relative',
		background: 'white',
		borderRadius: 'full',
		marginRight: 'xsmall',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		marginLeft: '5px',
		width: '20px',
		height: '20px',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { paddingBottom: '72px', maxWidth: '500px', marginRight: '200px' },
		// desktop: { width: '25%' },
	}),
])
