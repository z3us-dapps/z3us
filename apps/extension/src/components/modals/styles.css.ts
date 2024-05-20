import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const modalContentWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		padding: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
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
])

export const modalContentFormButtonWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		paddingTop: 'large',
	}),
])

export const modalContentFormBorderWrapper = style([
	sprinkles({
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		marginTop: 'large',
		paddingTop: 'large',
	}),
])

export const modalPersonaFormWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: {
			mobile: 'medium',
		},
	}),
])

export const modalFormAddFieldWrapper = style([
	sprinkles({
		borderTop: 1,
		borderColor: 'borderDivider',
		borderStyle: 'solid',
		paddingTop: 'large',
		marginTop: 'small',
	}),
])

export const modalFormFieldWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
	}),
])

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
	responsiveStyle({
		mobile: { height: '48px' },
		tablet: { height: '64px' },
	}),
])

export const headerWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
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
		gap: 'xsmall',
		paddingBottom: {
			mobile: 'small',
			tablet: 'medium',
		},
	}),
])

export const signAlertDialogFormWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
	}),
])

export const signAlertDialogFormFooterWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-end',
		gap: {
			mobile: 'small',
			tablet: 'medium',
		},
		width: 'full',
		paddingTop: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
])

export const formFieldModalGroupWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
		paddingBottom: {
			mobile: 'medium',
		},
	}),
])

globalStyle(`${formFieldModalGroupWrapper} > div`, {
	flexGrow: '1',
})
