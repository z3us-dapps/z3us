import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

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
