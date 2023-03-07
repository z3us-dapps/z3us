import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const cardButtonsWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: 'large',
	}),
	{},
])
