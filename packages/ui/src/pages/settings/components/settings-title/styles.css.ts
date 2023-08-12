import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const settingsTitleWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
		},
		paddingBottom: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		paddingX: {
			mobile: 'small',
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
		maxWidth: '640px',
	},
])
