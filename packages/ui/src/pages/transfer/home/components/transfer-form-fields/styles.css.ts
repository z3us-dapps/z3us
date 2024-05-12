import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const transferFormGridBoxWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
	}),
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
])

export const transferFormGridBoxWrapperLeft = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xxsmall',
	}),
])

export const transferFormMessageWrapper = style([
	sprinkles({
		position: 'relative',
	}),
])

export const transferFormCountWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
	}),
	{
		marginTop: '-18px',
	},
])

export const transferFormMessageTextArea = style([
	sprinkles({}),
	responsiveStyle({
		mobile: {
			minHeight: '70px',
		},
		tablet: {
			minHeight: '70px',
		},
	}),
])

export const transferFormEncryptWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
		paddingTop: 'xsmall',
		justifyContent: 'flex-end',
	}),
])

export const transferActionTrashButtonWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	responsiveStyle({
		mobile: {
			position: 'absolute',
			top: 0,
			right: 0,
			marginRight: '0px',
			marginTop: '32px',
			zIndex: 3,
		},
		desktop: {
			marginRight: '-36px',
			marginTop: '42px',
		},
	}),
])

export const transferActionAddButtonWrapper = style([
	sprinkles({}),
	responsiveStyle({
		mobile: {
			marginTop: '8px',
			marginBottom: '12px',
		},
		tablet: {
			marginTop: '12px',
			marginBottom: '12px',
		},
	}),
])

export const transferActionAddSourceWrapper = style([
	sprinkles({
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',

		marginBottom: {
			mobile: 'small',
			tablet: 'medium',
		},
	}),
	responsiveStyle({
		mobile: {
			marginTop: '6px',
			paddingTop: '18px',
		},
		tablet: {
			marginTop: '10px',
			paddingTop: '22px',
		},
	}),
])

export const transferActionTokensNftsAddButton = style([
	sprinkles({}),
	{
		marginTop: '0px',
		marginBottom: '0px',
	},
])

export const transferActionFieldParentWrapper = style([
	sprinkles({
		position: 'relative',
		display: {
			tablet: 'flex',
		},
	}),
])

globalStyle(`${transferActionFieldParentWrapper} > div:first-child`, {
	flexGrow: 1,
})

export const transferActionFieldWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
	}),
])

globalStyle(`${transferActionFieldWrapper} > div:first-child`, {
	flexGrow: 1,
})

export const transferActionTrashTokensNftsButton = style([
	sprinkles({
		position: 'relative',
	}),
	responsiveStyle({
		mobile: {
			marginTop: '24px',
			marginLeft: '8px',
		},
		desktop: {
			position: 'absolute',
			marginLeft: '-52px',
			marginTop: '24px',
			zIndex: 1,
			top: 0,
			left: 0,
		},
	}),
])

export const transferActionToAssetWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'large',
	}),
])

export const transferActionTabsWrapper = style([
	sprinkles({
		marginTop: 'large',
	}),
])

export const transferActionTabsContentWrapper = style([
	sprinkles({
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingX: 'medium',
		paddingBottom: 'medium',
		borderBottomLeftRadius: 'large',
		borderBottomRightRadius: 'large',
	}),
	{
		marginTop: '-20px',
		paddingTop: '32px',
	},
])
