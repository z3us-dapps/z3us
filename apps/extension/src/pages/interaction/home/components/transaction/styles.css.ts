import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const transactionManifestWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 'medium',
		flexGrow: 1,
	}),
	{},
])

export const transactionManifestTabsWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		paddingBottom: 'medium',
	}),
	{},
])

export const transactionManifestTabsContentWrapper = style([
	sprinkles({
		display: 'none',
		flexDirection: 'column',
		flexGrow: 1,
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingX: 'medium',
		paddingBottom: 'medium',
		borderBottomLeftRadius: 'large',
		borderBottomRightRadius: 'large',
		background: {
			lightMode: 'bai_pearl200',
			darkMode: 'wax700',
		},
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		marginTop: '-20px',
		paddingTop: '32px',
		selectors: {
			'&:focus-visible': {
				outline: 'none',
			},
			'&[data-state="active"]': {
				display: 'flex',
			},
		},
	},
])

export const transactionManifestValidationWrapper = style([
	sprinkles({
		paddingTop: 'xsmall',
	}),
	{},
])

export const transactionManifestTextArea = style([
	sprinkles({}),
	{
		height: '280px',
	},
])

export const transactionPreviewWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const transactionPreviewFlexWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'self-start',
		gap: 'medium',
	}),
	{},
])

export const transactionPreviewFlatChange = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 'small',
	}),
	{},
])

export const transactionPreviewProofsWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'self-start',
		gap: 'small',
		paddingTop: 'medium',
	}),
	{},
])

export const transactionFeeSummaryWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'self-start',
		gap: 'xsmall',
		paddingTop: 'small',
	}),
	{},
])
