import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

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
				boxShadow: vars.color.shadowDropdown,
			},
			'&[data-styled="true"][data-type=success]': {
				border: '0px solid',
				background: vars.color.bleached_silk400,
				color: vars.color.lead400,
				boxShadow: vars.color.shadowDropdown,
			},
			[`.${darkMode} &[data-styled="true"][data-type=success]`]: {
				border: '0px solid',
				background: vars.color.lead400,
				color: vars.color.bleached_silk500,
				boxShadow: vars.color.shadowDropdown,
			},
			'&[data-styled="true"][data-type=error]': {
				border: '0px solid',
				background: vars.color.bleached_silk400,
				color: vars.color.lead400,
				boxShadow: vars.color.shadowDropdown,
			},
			[`.${darkMode} &[data-styled="true"][data-type=error]`]: {
				border: '0px solid',
				background: vars.color.lead400,
				color: vars.color.bleached_silk500,
				boxShadow: vars.color.shadowDropdown,
			},
		},
	},
])

globalStyle(`${toastsWrapper}[data-styled="true"][data-type=success] [data-icon] svg`, {
	color: vars.color.green600,
})

globalStyle(`${toastsWrapper}[data-styled="true"][data-type=error] [data-icon] svg`, {
	color: vars.color.red600,
})

globalStyle(`${toastsWrapper}[data-styled="true"] [data-close-button]`, {
	background: `${vars.color.bleached_silk400} !important`,
	color: `${vars.color.lead400} !important`,
	border: `none !important`,
	boxShadow: vars.color.shadowDropdown,
})

globalStyle(`.${darkMode} ${toastsWrapper}[data-styled="true"] [data-close-button]`, {
	background: `${vars.color.lead400} !important`,
	color: `${vars.color.bleached_silk500} !important`,
	border: `none !important`,
	boxShadow: vars.color.shadowDropdown,
})
