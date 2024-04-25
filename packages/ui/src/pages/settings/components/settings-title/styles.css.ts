import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const settingsTitleWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		paddingBottom: {
			mobile: 'large',
			tablet: 'xlarge',
		},
		paddingX: {
			mobile: 'none',
			tablet: 'none',
		},
	}),
])

export const settingsSectionBorderWrapper = style([
	sprinkles({
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
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

export const settingsSubTitleWrapper = style([
	sprinkles({}),
	{
		maxWidth: '540px',
	},
])
