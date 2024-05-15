import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const totalValueWrapper = style([
	sprinkles({
		display: 'inline-flex',
		cursor: 'pointer',
	}),
])

export const tokenDetailWrapper = style([
	sprinkles({
		flexShrink: 0,
	}),
	responsiveStyle({
		mobile: { background: vars.color.backgroundPrimary },
		tablet: { background: vars.color.backgroundSecondary },
	}),
])

export const assetInfoWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: {
			mobile: 'small',
			tablet: 'xlarge',
		},
	}),
])

export const chartBgWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	responsiveStyle({
		mobile: { height: '160px' },
		tablet: { height: '200px' },
	}),
])

export const nftIconWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 'large',
	}),
])

export const nftIcon = style([
	sprinkles({
		width: 'full',
	}),
	{
		height: 'auto',
		width: '100%',
		boxShadow: 'none',
	},
])

export const accountCardButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: 'large',
		marginY: 'large',
		zIndex: 1,
	}),
])

export const assetChartBtnWrapper = style([
	sprinkles({
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: {
			mobile: 'medium',
			tablet: 'small',
			desktop: 'small',
		},
		paddingTop: {
			mobile: 'medium',
			desktop: 'small',
		},
		paddingX: {
			mobile: 'small',
			desktop: 'small',
		},
	}),
])

export const tag = style([
	{
		inlineSize: 'min-content',
		whiteSpace: 'nowrap',
	},
])

export const tagsWrapper = style([
	sprinkles({
		display: 'flex',
		flexWrap: 'wrap',
		gap: 'small',
		width: 'full',
	}),
	{
		minHeight: '40px',
	},
])

export const tabsWrapper = style([
	sprinkles({
		width: 'full',
		marginTop: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
])

export const tokenSummaryWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		borderTop: 1,
		borderTopStyle: 'solid',
		borderColor: 'borderDivider',
		paddingX: {
			mobile: 'large',
			tablet: 'large',
		},
		paddingTop: {
			mobile: 'large',
			tablet: 'xlarge',
		},
		paddingBottom: {
			mobile: 'xlarge',
			tablet: 'xxlarge',
		},
	}),
])

export const tokenSummaryRightMaxWidth = style([
	responsiveStyle({
		mobile: { maxWidth: '130px' },
		tablet: { maxWidth: '130px' },
		desktop: { maxWidth: '200px' },
	}),
])

export const tokenMetaDataIconWrapper = style([
	{
		marginLeft: '-4px',
		transform: 'translateY(5px)',
	},
])
