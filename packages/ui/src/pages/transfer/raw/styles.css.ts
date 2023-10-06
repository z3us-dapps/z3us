import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const transferFormWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
])

export const transferFormGridBoxWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
	responsiveStyle({
		tablet: {
			display: 'grid',
			gap: vars.spacing.large,
			gridTemplateColumns: '1fr',
		},
		desktop: {
			display: 'grid',
			gap: vars.spacing.large,
			gridTemplateColumns: '36% 1fr',
		},
	}),
])

export const transferFormGridBoxWrapperBorder = style([
	sprinkles({
		borderTop: 1,
		borderTopStyle: 'solid',
		borderColor: 'borderDivider',
		marginTop: {
			mobile: 'large',
			tablet: 'xlarge',
			desktop: 'xlarge',
		},
		paddingTop: {
			mobile: 'large',
			tablet: 'xlarge',
			desktop: 'xlarge',
		},
	}),
	{},
])

export const transferFormGridBoxWrapperLeft = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xxsmall',
	}),
	{},
])

export const transferFormMessageTextArea = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: {
			minHeight: '80px',
		},
		tablet: {
			minHeight: '80px',
		},
		desktop: {
			minHeight: '60px',
		},
	}),
])
