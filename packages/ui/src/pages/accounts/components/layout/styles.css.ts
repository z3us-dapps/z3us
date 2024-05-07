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

export const accountsStickyBoxShadow = style([
	sprinkles({
		transition: 'fast',
	}),
	{
		boxShadow: '0px 10px 11px -7px rgba(0, 0, 0, 0.4)',
	},
])

export const main = style([
	sprinkles({
		position: 'relative',
		height: 'full',
		width: 'full',
	}),
	{},
])

export const mainMobileScroll = style([
	sprinkles({
		height: 'full',
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
	}),
	{},
	responsiveStyle({
		mobile: {
			overflow: 'overlay',
		},
		tablet: {
			overflow: 'unset',
		},
	}),
])

export const panelLeftScroll = style([
	sprinkles({}),
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
			overflow: 'unset',
			background: vars.color.backgroundSecondary,
			position: 'sticky',
			width: '100%',
			zIndex: 1,
			minHeight: '100vh',
		},
		tablet: {
			overflow: 'auto',
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

export const panelRightScroll = style([
	sprinkles({}),
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
			overflow: 'unset',
			position: 'sticky',
			top: 0,
			width: '100%',
			height: 'auto',
		},
		tablet: {
			overflow: 'auto',
			position: 'relative',
			top: 'unset',
			height: '100vh',
			maxHeight: 'calc(100vh - 112px)',
			minHeight: 'unset',
			maxWidth: '320px',
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
		},
		desktop: {
			maxWidth: '392px',
			maxHeight: 'calc(100vh - 142px)',
		},
	}),
])
