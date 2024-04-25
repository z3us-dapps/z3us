import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const cardButtonsWrapper = style([
	sprinkles({
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		paddingBottom: {
			tablet: 'medium',
		},
	}),
	responsiveStyle({
		tablet: { borderBottom: '1px solid', borderColor: vars.color.borderDivider },
	}),
])
