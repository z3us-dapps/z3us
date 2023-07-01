import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const settingsMobileIndexLinkWrapper = style([
	sprinkles({
		display: 'flex',
		paddingX: 'large',
		paddingY: 'large',
		gap: 'medium',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
		textDecoration: 'none',
		transition: 'fast',
		background: {
			lightMode: 'transparent',
			hover: 'backgroundPrimary',
		},
	}),
	{},
])

export const settingsMobileIndexLinkTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xxsmall',
	}),
	{},
])

export const settingsMobileIndexLinkIconWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	}),
	{
		width: '50px',
		height: '50px',
	},
])
