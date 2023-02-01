import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const activityWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'auto',
		flexGrow: 1,
		borderBottomRightRadius: 'large',
		borderBottomLeftRadius: 'large',
	}),
	{
		width: '100%',
	},
	// responsiveStyle({
	// 	mobile: { width: '100%' },
	// 	tablet: { width: '33%' },
	// 	desktop: { width: '25%' },
	// }),
])

export const activtyItem = style([
	sprinkles({
		position: 'relative',
		paddingX: 'xlarge',
		transition: 'fast',
		background: {
			hover: 'backgroundPrimary',
		},
	}),
])

export const activtyItemInner = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingTop: 'medium',
		paddingBottom: 'medium',
		gap: 'small',
	}),
	{
		width: '100%',
	},
])

export const indicatorCircle = style([
	sprinkles({
		position: 'relative',
		background: 'backgroundPrimary',
		borderRadius: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		width: '36px',
		height: '36px',
	},
])

globalStyle(`${activtyItem}:first-child > div`, {
	borderTop: 'none',
})

globalStyle(`${activtyItem}:hover ${indicatorCircle}`, {
	background: vars.color.white,
})

globalStyle(`.${darkMode} ${activtyItem}:hover ${indicatorCircle}`, {
	background: vars.color.lead500,
})
