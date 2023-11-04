import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const modalContentWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		padding: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
	// responsiveStyle({
	// 	mobile: { height: '48px' },
	// 	tablet: { height: '64px' },
	// }),
])

export const modalContentTitleTextWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
		paddingBottom: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{},
])

export const modalContentFormButtonWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
])

export const modalContentFormBorderWrapper = style([
	sprinkles({
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		marginTop: 'large',
		paddingTop: 'large',
	}),
	{},
])

export const modalPersonaFormWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: {
			mobile: 'medium',
		},
	}),
	{},
])

// OLD
export const headerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		paddingY: 'medium',
		background: 'backgroundSecondary',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		transition: 'fast',
	}),
	{},
	responsiveStyle({
		mobile: { height: '48px' },
		tablet: { height: '64px' },
	}),
])

export const headerWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const scrollWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'large',
	}),
	{
		paddingTop: '64px',
	},
	responsiveStyle({
		mobile: { paddingTop: '48px' },
		tablet: { paddingTop: '64px' },
	}),
])

export const content = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '90%', top: '48px', bottom: '48px' },
		tablet: { maxWidth: '480px', top: '48px', bottom: '48px' },
		desktop: { maxWidth: '480px', top: '72px', bottom: '72px' },
	}),
])

export const signAlertDialogContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		paddingBottom: 'large',
	}),
	{},
])

export const signAlertDialogFormWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
	}),
	{},
])

export const signAlertDialogFormFooterWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-end',
		gap: 'small',
		width: 'full',
	}),
	{},
])
