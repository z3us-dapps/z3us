import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const accountsStickyWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		gap: 'small',
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 2,
		paddingX: {
			tablet: 'xlarge',
		},
		paddingTop: {
			tablet: 'xlarge',
		},
		paddingBottom: {
			tablet: 'large',
		},
	}),
	{},
])

export const main = style([
	sprinkles({
		position: 'relative',
		overflowY: 'scroll',
		display: {
			mobile: 'block',
			tablet: 'flex',
		},
		justifyContent: 'center',
		flexDirection: {
			mobile: 'column',
			tablet: 'row-reverse',
		},
		gap: {
			tablet: 'large',
			desktop: 'xlarge',
		},
		paddingTop: {
			tablet: 'large',
			desktop: 'xlarge',
		},
		height: 'full',
	}),
])

export const panelLeft = style([
	sprinkles({
		overflowY: 'scroll',
	}),
	{
		'::before': {
			borderTopLeftRadius: vars.border.radius.xxlarge,
			borderTopRightRadius: vars.border.radius.xxlarge,
			left: '3px',
			right: '3px',
		},
		'::after': {
			borderBottomLeftRadius: vars.border.radius.xxlarge,
			borderBottomRightRadius: vars.border.radius.xxlarge,
			left: '3px',
			right: '3px',
		},
	},
	responsiveStyle({
		mobile: {
			background: vars.color.backgroundSecondary,
			position: 'sticky',
			width: '100%',
			zIndex: 1,
			minHeight: '100vh',
		},
		tablet: {
			position: 'relative',
			top: 'unset',
			width: '100%',
			minHeight: 'unset',
			maxHeight: 'calc(100vh - 112px)',
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
		},
		desktop: {
			maxHeight: 'calc(100vh - 142px)',
		},
	}),
])

export const panelRight = style([
	sprinkles({
		overflowY: 'scroll',
	}),
	{
		'::before': {
			borderTopLeftRadius: vars.border.radius.xxlarge,
			borderTopRightRadius: vars.border.radius.xxlarge,
			left: '3px',
			right: '3px',
		},
		'::after': {
			borderBottomLeftRadius: vars.border.radius.xxlarge,
			borderBottomRightRadius: vars.border.radius.xxlarge,
			left: '3px',
			right: '3px',
		},
	},
	responsiveStyle({
		mobile: {
			position: 'sticky',
			top: 0,
			width: '100%',
			height: 'calc(100vw / 8 * 5 + 60px)',
			maxHeight: 'calc(100vh - 163px)',
			maxWidth: 'unset',
		},
		tablet: {
			position: 'relative',
			top: 'unset',
			height: '100vh',
			maxHeight: 'calc(100vh - 112px)',
			minHeight: 'unset',
			maxWidth: '392px',
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
		},
		desktop: {
			maxHeight: 'calc(100vh - 142px)',
		},
	}),
])
