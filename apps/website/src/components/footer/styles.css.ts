import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const footerWrapper = style([
	sprinkles({
		position: 'relative',
		marginTop: {
			tablet: 'xlarge',
		},
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
	}),
])

export const footerInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		paddingTop: {
			mobile: 'none',
			desktop: 'xlarge',
		},
		paddingBottom: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
	}),
])

export const footerLeftWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
		justifyContent: {
			mobile: 'center',
			tablet: 'flex-start',
		},
		gap: 'medium',
		flexGrow: 1,
	}),
])

export const footerRightWrapper = style([
	sprinkles({
		display: 'flex',
		gap: {
			tablet: 'medium',
		},
		alignItems: 'center',
		paddingTop: {
			mobile: 'large',
			tablet: 'none',
		},
		justifyContent: {
			mobile: 'center',
			tablet: 'flex-start',
		},
		flexDirection: {
			mobile: 'row-reverse',
			tablet: 'row',
		},
	}),
])

export const mobileLinks = style([
	sprinkles({
		gap: 'xsmall',
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
	}),
])

export const tabletLinks = style([
	sprinkles({
		gap: 'small',
		marginRight: 'small',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
])
