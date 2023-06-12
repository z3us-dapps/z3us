/* eslint-disable @typescript-eslint/no-unused-vars */
import { style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const accountsSelectWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		maxWidth: '240px',
	},
])

export const accountsCardWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		gap: 'large',
	}),
	{
		maxWidth: '340px',
	},
])
