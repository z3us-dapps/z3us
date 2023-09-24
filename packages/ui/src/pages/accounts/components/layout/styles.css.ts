import { createVar, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const mobileHidden = style([
	responsiveStyle({
		mobile: {
			display: 'none',
		},
		tablet: {
			display: 'block',
		},
	}),
])

export const mobileOnlyVisible = style([
	responsiveStyle({
		mobile: {
			display: 'block',
		},
		tablet: {
			display: 'none',
		},
	}),
])

export const distanceFromTop = createVar()

export const stickyBelowSidebar = style([
	responsiveStyle({
		mobile: {
			position: 'sticky',
			top: distanceFromTop,
			zIndex: 2,
		},
		tablet: {
			position: 'relative',
			top: 'unset',
		},
	}),
])

export const wrapper = style([
	sprinkles({
		display: 'flex',
		gap: {
			mobile: 'small',
			tablet: 'large',
			desktop: 'xlarge',
		},
		flexDirection: {
			mobile: 'column-reverse',
			tablet: 'row',
		},
		width: 'full',
		maxWidth: 'xxlarge',
	}),
	{},
])

export const content = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 'large',
	}),
	{},
	responsiveStyle({
		mobile: {
			width: '100%',
		},
		tablet: {
			width: '60%',
		},
	}),
])

export const sidebar = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',

		alignItems: 'center',
		gap: 'large',
		zIndex: 1,
	}),
	{},
	responsiveStyle({
		mobile: {
			aspectRatio: '2/1',
			position: 'sticky',
			width: '100%',
			maxHeight: '50%',
			top: 0,
		},
		tablet: {
			aspectRatio: 'unset',
			position: 'relative',
			width: '40%',
		},
	}),
])
