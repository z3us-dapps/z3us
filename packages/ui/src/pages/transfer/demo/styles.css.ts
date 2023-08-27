import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const transferFormOuterWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
		paddingTop: 'medium',
	}),
	{},
])

export const transferFormWrapper = style([
	sprinkles({
		position: 'relative',
		// maxWidth: 'small',
		width: 'full',
		// padding: {
		// 	mobile: 'medium',
		// 	tablet: 'xxlarge',
		// 	desktop: 'xxlarge',
		// },
	}),
	{
		// border: '1px solid red',
	},
])

export const transferFormGridBoxWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'grid',
		paddingBottom: 'xlarge',
		marginBottom: 'xlarge',
	}),
	{},
	responsiveStyle({
		tablet: {
			gap: '1rem',
			gridTemplateColumns: '260px 1fr',
		},
		// desktop: {
		// 	gap: '1rem',
		// 	gridTemplateColumns: '1fr 304px',
		// },
	}),
])

export const transferFormGridBoxWrapperLeft = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xxsmall',
	}),
	{},
])

export const transferFormGridBoxWrapperBorder = style([
	sprinkles({
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const transferFormMessageTextArea = style([
	sprinkles({}),
	{
		minHeight: '80px',
	},
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
