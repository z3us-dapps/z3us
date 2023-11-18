import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const addAccountDialog = style([
	sprinkles({}),
	{
		minHeight: '85vh',
	},
])

export const addAccountDialogContentWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
])

export const addAccountDialogHeader = style([
	sprinkles({
		display: 'flex',
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
		gap: {
			mobile: 'small',
			tablet: 'none',
		},
	}),
	{},
])

export const addAccountDialogTitleWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
	}),
])

export const addAccountCheckBoxWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: 'xsmall',
		display: 'flex',
		alignItems: {
			mobile: 'flex-start',
			tablet: 'flex-end',
		},
		flexDirection: 'column',
		paddingRight: 'large',
	}),
])

export const addAccountSwitchWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: {
			mobile: 'row-reverse',
			tablet: 'row',
		},
		alignItems: 'center',
		gap: 'small',
		paddingTop: {
			mobile: 'medium',
			tablet: 'small',
		},
	}),
])

export const addAccountGridWrapper = style([
	sprinkles({
		position: 'relative',
		marginTop: 'xlarge',
		display: 'grid',
	}),
	{},
	responsiveStyle({
		mobile: {
			gap: vars.spacing.medium,
			gridTemplateColumns: '1fr',
		},
		tablet: {
			gap: vars.spacing.medium,
			gridTemplateColumns: '1fr 1fr 1fr',
		},
		desktop: {
			gap: vars.spacing.xlarge,
			gridTemplateColumns: '1fr 1fr 1fr',
		},
	}),
])

export const addAccountCardWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		aspectRatio: '8 / 4.5',
	},
])
