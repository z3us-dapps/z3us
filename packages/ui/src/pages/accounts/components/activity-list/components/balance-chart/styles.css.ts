import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const allChartWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: {
			mobile: 'medium',
			tablet: 'small',
		},
		paddingX: {
			mobile: 'none',
			tablet: 'none',
		},
		paddingBottom: {
			mobile: 'medium',
			tablet: 'medium',
		},
		borderBottom: 0,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},

	responsiveStyle({
		tablet: {
			borderBottom: 1,
		},
	}),
])

export const allChartInnerWrapper = style([
	sprinkles({
		borderRadius: 'small',
		position: 'relative',
		width: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { aspectRatio: '8 / 5' },
		tablet: {
			aspectRatio: 'unset',
			background: 'unset',
		},
	}),
])

globalStyle(`${allChartInnerWrapper} .recharts-layer.recharts-pie-sector path:focus`, {
	outline: 'none !important',
})

globalStyle(`${allChartInnerWrapper} .recharts-layer.recharts-pie-sector path`, {
	transition: 'all 0.3s ease-out',
})

export const motionWrapper = style([
	sprinkles({
		height: 'full',
	}),
])

export const chartLoadingWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{
		minHeight: '200px',
	},
])

export const pieChartWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{
		margin: '0 auto',
	},
	responsiveStyle({
		mobile: { width: '60%', aspectRatio: '8 / 5' },
		tablet: {
			display: 'flex',
			height: '230px',
			width: '100%',
			aspectRatio: 'unset',
		},
	}),
])

export const mobileHomeBalanceWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
		flexDirection: 'column',
		alignItems: 'center',
	}),
	{},
])

export const mobileCardWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
		flexDirection: 'column',
		alignItems: 'center',
	}),
	{},
])

export const mobileCardTransparentWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 'large',
		borderRadius: 'xlarge',
		padding: 'large',
	}),
	{
		width: '75%',
		maxWidth: '480px',
		aspectRatio: '8 / 5',
		background: 'rgba(255, 255, 255, 0.15)',
		border: '1px solid rgba(255, 255, 255, 0.55)',
		boxShadow:
			'0px 136px 192px rgba(0, 0, 0, 0.2), 0px 50px 50px rgba(0, 0, 0, 0.15), 0px 24px 24px rgba(0, 0, 0, 0.1), 0px 12px 12px rgba(0, 0, 0, 0.05)',
	},
])

export const mobileCardTextSpaced = style([
	sprinkles({
		position: 'relative',
	}),
	{
		letterSpacing: '0.11em',
	},
])

export const mobileHiddenWrapper = style([
	responsiveStyle({
		mobile: { display: 'none' },
	}),
])

export const mobileAccountValueTotal = style([{ display: 'flex' }])

export const cardButtonsWrapper = style([
	sprinkles({
		display: 'none',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
	}),
	{},
])

export const cardButtonsWrapperVisible = style([
	{
		display: 'flex',
	},
])

export const accountDotBg = style([
	sprinkles({
		borderRadius: 'full',
		width: 'small',
		height: 'small',
		flexShrink: 0,
		marginRight: 'small',
	}),
	{
		background: 'grey',
	},
])

export const addressInfoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		alignItems: 'center',
		height: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const addressInfoWrapperLeft = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		alignItems: 'flex-end',
	}),
	{
		maxWidth: '150px',
	},
])

export const addressInfoWrapperRight = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
	}),
	{
		maxWidth: '100px',
	},
])

export const dottedSpacer = style([
	sprinkles({
		position: 'relative',
		borderStyle: 'dashed',
		flexGrow: 1,
		borderBottom: 1,
		borderColor: 'borderDividerSecondary',
		marginTop: 'small',
		marginX: 'small',
	}),
	{},
])
