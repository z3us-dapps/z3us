import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

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

export const transferFormMessageWrapper = style([
	sprinkles({
		paddingBottom: {
			mobile: 'medium',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const transferFormMessageTextArea = style([
	sprinkles({}),
	{
		fontFamily: vars.fonts.code,
	},
	responsiveStyle({
		mobile: {
			minHeight: '180px',
		},
		tablet: {
			minHeight: '280px',
		},
	}),
])
