/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const dropZoneWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	// responsiveStyle({
	// 	mobile: {
	// 		width: '100%',
	// 		paddingBottom: '56.25%',
	// 		height: '0px',
	// 	},
	// 	desktop: {
	// 		width: '97%',
	// 		paddingBottom: '56.25%',
	// 		height: '0px',
	// 	},
	// }),
])

export const dropZoneAreaWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'xlarge',
		padding: 'xlarge',
		borderStyle: 'dashed',
		borderColor: 'borderDividerSecondary',
		border: 1,
	}),
	// responsiveStyle({
	// 	mobile: {
	// 		width: '100%',
	// 		paddingBottom: '56.25%',
	// 		height: '0px',
	// 	},
	// 	desktop: {
	// 		width: '97%',
	// 		paddingBottom: '56.25%',
	// 		height: '0px',
	// 	},
	// }),
])
