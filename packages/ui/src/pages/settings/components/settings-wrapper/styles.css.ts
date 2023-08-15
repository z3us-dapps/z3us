import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const settingsSectionFlexColumnWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		padding: {
			mobile: 'small',
			tablet: 'xlarge',
		},
		gap: {
			mobile: 'medium',
			tablet: 'large',
			desktop: 'xlarge',
		},
	}),
	{},
])
