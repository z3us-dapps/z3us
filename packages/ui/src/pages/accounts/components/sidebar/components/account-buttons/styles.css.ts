import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const cardButtonsWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		paddingTop: {
			mobile: 'medium',
			tablet: 'none',
		},
		paddingBottom: {
			mobile: 'large',
			tablet: 'medium',
		},
		borderBottom: {
			tablet: '1',
		},
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
])

export const cardButtonsWrapperAllAccounts = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
	}),
	responsiveStyle({
		mobile: {
			paddingTop: vars.spacing.xsmall,
			paddingBottom: vars.spacing.large,
		},
		tablet: {
			paddingBottom: 'none',
			paddingTop: 'none',
		},
	}),
])
