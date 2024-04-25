import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

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

export const outletWrapper = style([
	responsiveStyle({
		mobile: {
			minHeight: '380px',
		},
		tablet: {
			minHeight: '600px',
		},
	}),
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
		paddingX: {
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			tablet: 'large',
			desktop: 'xlarge',
		},
		height: 'full',
	}),
	{
		margin: '0 auto',
		msOverflowStyle: 'none' /* IE and Edge */,
		scrollbarWidth: 'none' /* Firefox */,
		'::-webkit-scrollbar': {
			display: 'none',
		},
	},
])

export const panelLeft = style([
	sprinkles({
		overflowY: 'scroll',
	}),
	{
		msOverflowStyle: 'none' /* IE and Edge */,
		scrollbarWidth: 'none' /* Firefox */,
		'::-webkit-scrollbar': {
			display: 'none',
		},
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
			top: '30vh',
			width: '100%',
			zIndex: 1,
		},
		tablet: {
			position: 'relative',
			top: 'unset',
			height: 'unset',
			width: '60%',
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
		msOverflowStyle: 'none' /* IE and Edge */,
		scrollbarWidth: 'none' /* Firefox */,
		'::-webkit-scrollbar': {
			display: 'none',
		},
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
			height: '50vh',
		},
		tablet: {
			position: 'relative',
			top: 'unset',
			width: '40%',
			height: '100vh',
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
