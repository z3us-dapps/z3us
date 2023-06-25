import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const footerWrapper = style([
	sprinkles({
		position: 'relative',
		marginTop: 'xlarge',
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead500',
		},
	}),
	{},
])

export const footerInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		paddingY: {
			mobile: 'large',
			desktop: 'xlarge',
		},
	}),
	{},
])

export const footerLeftWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'medium',
		flexGrow: 1,
	}),
	{},
])

export const footerRightWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'medium',
		alignItems: 'center',
	}),
	{},
])
