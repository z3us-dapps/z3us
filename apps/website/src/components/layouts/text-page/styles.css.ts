import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const textPageContentWrapper = style([
	sprinkles({
		paddingY: {
			mobile: 'xlarge',
			tablet: 'xxlarge',
			desktop: 'xxxlarge',
		},
	}),
	{
		margin: '0 auto',
	},
	responsiveStyle({
		mobile: {
			maxWidth: '100%',
		},
		tablet: {
			maxWidth: '90%',
		},
		desktop: {
			maxWidth: '70%',
		},
	}),
])

export const textPageFooterWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		marginTop: 'xlarge',
		paddingTop: {
			mobile: 'large',
			tablet: 'none',
		},
		borderTop: 1,
		borderColor: 'lead800',
		borderStyle: 'solid',
	}),
	{},
])
