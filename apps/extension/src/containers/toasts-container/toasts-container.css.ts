import { globalStyle, style } from '@vanilla-extract/css'

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
				background: vars.color.bleached_silk400,
				color: vars.color.lead400,
				boxShadow: vars.color.shadowDropdown,
			},
			[`.${darkMode} &`]: {
				border: '0px solid',
				background: vars.color.lead400,
				color: vars.color.bleached_silk500,
				boxShadow: vars.color.shadowDropdown as any,
			},
		},
	},
])

globalStyle(`${toastsWrapper} [data-description]`, {
	// TODO: need to fix the type error when not wrapped ``
	color: `${vars.color.colorNeutral}`,
})

globalStyle(`${toastsWrapper}.toast-success`, {
	// TODO: create unique toast shadows
	border: '1px solid green',
})

globalStyle(`${toastsWrapper}.toast-error`, {
	border: '1px solid red',
})

globalStyle(`${toastsWrapper}.toast-caution`, {
	border: '1px solid orange',
})
