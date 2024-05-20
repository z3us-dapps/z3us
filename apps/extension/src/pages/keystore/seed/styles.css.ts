import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const keystoreNewWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
])

globalStyle(`${keystoreNewWrapper} *`, {
	userSelect: 'none',
})

export const keystoreSelectWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'small',
		alignItems: 'center',
		paddingBottom: 'medium',
	}),
])

export const keystoreClearButtonWrapper = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'flex-end',
	}),
])

export const keystorePossibleWordWrapper = style([
	sprinkles({
		display: 'grid',
		gap: 'medium',
	}),
	{
		gridTemplateColumns: '1fr 1fr 1fr 1fr',
		minHeight: '40px',
	},
])

export const keystoreRestoreWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'medium',
	}),
	{
		containerType: 'inline-size',
	},
])

export const keystoreRestoreGridWrapper = style([
	sprinkles({
		display: 'grid',
	}),
	{
		gap: vars.spacing.medium,
		gridTemplateColumns: '1fr',
		containerType: 'inline-size',
		'@container': {
			'(min-width: 300px)': {
				gridTemplateColumns: '1fr 1fr',
			},
			'(min-width: 400px)': {
				gap: vars.spacing.medium,
				gridTemplateColumns: '1fr 1fr 1fr',
			},
		},
	},
])

export const keystoreRestoreErrorWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'large',
	}),
])

export const keystoreRestoreInputWordOverlay = style([
	sprinkles({
		position: 'absolute',
		pointerEvents: 'none',
		opacity: 0,
	}),
	{
		filter: 'blur(4px)',
		top: '15px',
		left: '37px',
	},
])

globalStyle(`${keystoreRestoreGridWrapper} input:not(:focus):not(:hover)`, {
	color: 'transparent',
})

globalStyle(`${keystoreRestoreGridWrapper} input:not(:focus):not(:hover) + div > div > span`, {
	opacity: 1,
})

export const keystoreRestoreInputWrapper = style([
	sprinkles({
		position: 'relative',
	}),
])

export const keystoreRestoreInputClassWrapper = style([
	sprinkles({
		pointerEvents: 'none',
	}),
])

export const keystoreNewPhraseGridButtonWrapper = style([
	sprinkles({
		display: 'grid',
		gap: 'small',
		marginTop: 'small',
		marginBottom: 'large',
	}),
	{
		gridTemplateColumns: '1fr 1fr 1fr 1fr',
	},
])

export const keystoreNewPhraseGridWrapper = style([
	sprinkles({
		display: 'grid',
		gap: 'medium',
		marginTop: 'small',
		marginBottom: 'large',
		userSelect: 'none',
	}),
	responsiveStyle({
		mobile: { gridTemplateColumns: '1fr 1fr' },
		tablet: { gridTemplateColumns: '1fr 1fr 1fr' },
	}),
])

export const keystoreRestoreContinueBtnWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: {
			mobile: 'small',
			tablet: 'medium',
		},
	}),
])

export const keystoreContinueBtnWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
	}),
])
