import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const settingsSectionBorderWrapper = style([
	sprinkles({
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
])

export const settingsSectionWrapper = style([
	sprinkles({
		paddingBottom: {
			mobile: 'large',
			tablet: 'large',
			desktop: 'xlarge',
		},
		paddingX: {
			mobile: 'none',
			tablet: 'none',
		},
	}),
])

export const settingsSectionGridBasic = style([
	sprinkles({
		display: {
			mobile: 'flex',
			desktop: 'grid',
		},
		flexDirection: 'column',
		gap: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{
		gridTemplateColumns: '260px 1fr',
	},
])

export const settingsSectionGridBasicSpacer = style([
	sprinkles({
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
])
