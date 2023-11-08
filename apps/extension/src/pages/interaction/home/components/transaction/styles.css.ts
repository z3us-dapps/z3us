import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const transactionManifestWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 'medium',
		flexGrow: 1,
	}),
	{},

	responsiveStyle({
		mobile: {
			height: 'calc(100vh - 240px)',
		},
		tablet: {
			height: 'calc(100vh - 290px)',
		},
	}),
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
	}),
	{
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
