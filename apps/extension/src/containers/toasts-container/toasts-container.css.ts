import { style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const toastsWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		selectors: {
			'&[data-styled="true"]': {
				border: '0px solid',
				// borderColor: vars.color.wax400,
				background: vars.color.bleached_silk400,
				color: vars.color.lead400,
				// todo fix as any
				boxShadow: vars.color.shadowDropdown as any,
			},

			[`.${darkMode} &`]: {
				border: '0px solid',
				// borderColor: vars.color.wax400,
				background: vars.color.lead400,
				color: vars.color.bleached_silk500,
				// todo fix as any
				boxShadow: vars.color.shadowDropdown as any,
			},
		},
	},
])
