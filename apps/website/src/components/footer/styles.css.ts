import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const footerWrapper = style([
	sprinkles({
		position: 'relative',
		marginTop: 'xlarge',
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
	}),
	{},
])

export const footerBorderWrapper = style([
	sprinkles({
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
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
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
		paddingTop: {
			mobile: 'large',
			tablet: 'none',
		},
		justifyContent: {
			mobile: 'flex-end',
			tablet: 'flex-start',
		},
		flexDirection: {
			mobile: 'row-reverse',
			tablet: 'row',
		},
	}),
	{},
])

export const mobileLinks = style([
	sprinkles({
		gap: 'xsmall',
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
	}),
	{},
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
	{},
])
