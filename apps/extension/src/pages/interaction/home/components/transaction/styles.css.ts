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
		// border: 1,
		// borderStyle: 'solid',
		// borderColor: 'borderDivider',
		// paddingX: 'medium',
		// paddingBottom: 'medium',
		// borderBottomLeftRadius: 'large',
		// borderBottomRightRadius: 'large',
		// background: {
		// 	lightMode: 'bai_pearl200',
		// 	darkMode: 'wax700',
		// },
		// boxShadow: {
		// 	focusVisible: 'btnSecondaryShadowFocus',
		// },
	}),
	{
		// marginTop: '-20px',
		// paddingTop: '32px',
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
	sprinkles({
		marginTop: 'medium',
	}),
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

export const transactionPreviewBlockWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		paddingTop: 'medium',
	}),
	{},
])

export const transactionChangeCurrencyBtn = style([
	sprinkles({
		position: 'absolute',
		right: 0,
	}),
	{
		top: '-6px',
	},
])

export const transactionPreviewBlock = style([
	sprinkles({
		display: 'block',
		padding: 'medium',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDividerSecondary',
		borderRadius: 'medium',
		background: {
			lightMode: 'bai_pearl200',
			darkMode: 'wax700',
		},
	}),
	{},
])
