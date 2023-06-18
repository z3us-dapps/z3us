import { style } from '@vanilla-extract/css'

import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { sprinkles } from 'ui/src/components/system/sprinkles.css'


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
		tablet: { maxWidth: '140px' },
		desktop: { maxWidth: '140px' },
	}),
])

