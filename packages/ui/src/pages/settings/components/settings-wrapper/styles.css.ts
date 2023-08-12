import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

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
	responsiveStyle({
		mobile: { height: 'calc(100vh - 106px)' },
		tablet: { height: 'unset' },
	}),
])
