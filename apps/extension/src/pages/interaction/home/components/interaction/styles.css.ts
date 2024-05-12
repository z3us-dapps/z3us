import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const interactionLoginBodyWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		padding: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
])

export const interactionLoginBodyTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
		paddingTop: 'medium',
	}),
])

export const interactionLoginBodyButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		paddingTop: 'large',
	}),
])

export const interactionLoginFooterWrapper = style([
	sprinkles({
		position: 'relative',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingTop: 'large',
		padding: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
])

export const interactionScrollWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	responsiveStyle({
		mobile: { height: '100vh' },
	}),
])
