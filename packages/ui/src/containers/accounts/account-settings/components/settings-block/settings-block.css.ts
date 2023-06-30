import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const settingsSectionBorderWrapper = style([
	sprinkles({
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingBottom: 'xlarge',
		paddingX: {
			mobile: 'xlarge',
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

export const settingsSectionGridBasic = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'grid',
		},
		flexDirection: 'column',
		gap: 'large',
	}),
	{
		gridTemplateColumns: '240px 1fr',
	},
])

export const settingsSectionGridBasicSpacer = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
])
