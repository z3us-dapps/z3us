import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

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
		position: 'relative',
	}),
	{},
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
	{},
	responsiveStyle({
		mobile: {
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
	{},
])

export const transferActionTrashButtonWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
	}),
	{
		marginRight: '-36px',
		marginTop: '40px',
		zIndex: 3,
	},
])

export const transferActionAddButtonWrapper = style([
	sprinkles({}),
	{
		marginTop: '32px',
		marginBottom: '16px',
	},
])

export const transferActionTokensNftsAddButton = style([
	sprinkles({}),
	{
		marginTop: '0px',
		marginBottom: '0px',
	},
])

export const transferActionTrashTokensNftsButton = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		left: 0,
	}),
	{
		marginLeft: '-52px',
		marginTop: '8px',
		zIndex: 1,
	},
])

export const transferActionToAssetWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'large',
	}),
	{},
])

export const transferActionTabsWrapper = style([
	sprinkles({
		marginTop: 'large',
	}),
	{},
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
