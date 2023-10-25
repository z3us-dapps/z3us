import { style } from '@vanilla-extract/css'
import { vars } from 'packages/ui/src/components/system/theme.css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const addAccountDialog = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 1,
		marginTop: 'large',
		marginRight: 'large',
	}),
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
	}),
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
		alignItems: 'flex-end',
		flexDirection: 'column',
		paddingRight: 'large',
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
			gap: vars.spacing.large,
			gridTemplateColumns: '1fr',
		},
		tablet: {
			gap: vars.spacing.large,
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
