import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const knownAddressFlexWrapper = style([
	sprinkles({
		display: 'flex',
		width: 'full',
		justifyContent: 'flex-end',
	}),
	{},
])

export const knownAddressWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		color: 'green500',
		height: 'large',
		paddingBottom: 'small',
	}),
	{
		marginTop: `calc(${vars.spacing.large} * -1)`,
		maxWidth: '60%',
	},
])
