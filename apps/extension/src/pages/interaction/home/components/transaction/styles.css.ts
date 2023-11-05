import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const transactionManifestWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 'large',
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
