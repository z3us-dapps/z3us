import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const settingsTitleWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
		},
	}),
])

export const settingsSectionBorderWrapper = style([
	sprinkles({
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingBottom: {
			mobile: 'large',
			tablet: 'xlarge',
		},
		paddingX: {
			mobile: 'small',
			tablet: 'none',
		},
	}),
])

export const settingsSectionWrapper = style([
	sprinkles({
		paddingX: {
			mobile: 'xlarge',
			tablet: 'none',
		},
	}),
])

export const settingsTitleBackLinkWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
	}),
])
