import { style } from '@vanilla-extract/css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const transferWrapper = style([
	sprinkles({
		padding: {
			mobile: 'medium',
			tablet: 'xlarge',
			desktop: 'xxlarge',
		},
	}),
	{},
])

export const transferUiTextSeperator = style([
	sprinkles({
		height: 'medium',
		background: 'borderDividerSecondary',
	}),
	{
		width: '1px',
	},
])

export const transferUiTextAreaMessage = style([
	sprinkles({}),
	{
		height: '100px',
	},
])

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
