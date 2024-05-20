import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const tokenSelectBtnWrapper = style([
	sprinkles({
		position: 'absolute',
	}),
	{
		top: '4px',
		right: '5px',
		borderTopLeftRadius: '30px',
		borderBottomLeftRadius: '30px',
		borderTopRightRadius: '12px',
		borderBottomRightRadius: '12px',
	},

	responsiveStyle({
		mobile: { maxWidth: '140px' },
	}),
])
