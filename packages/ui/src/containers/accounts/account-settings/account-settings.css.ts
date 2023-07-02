import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const settingsScrollPanelWrapper = style([
	sprinkles({
		position: 'relative',
		margin: {
			mobile: 'small',
			tablet: 'xlarge',
		},
		paddingBottom: {
			mobile: 'xlarge',
			tablet: 'none',
		},
	}),
	{},
])

export const settingsHomeWrapper = style([
	sprinkles({
		position: 'relative',
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{},
])

export const settingsSectionFlexColumnWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: {
			mobile: 'medium',
			tablet: 'large',
			desktop: 'xlarge',
		},
	}),
])
