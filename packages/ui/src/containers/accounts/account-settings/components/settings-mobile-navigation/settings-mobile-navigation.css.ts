import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const settingsMobileLinksWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
	}),
	{},
])

export const settingsMobileIndexLinkWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingX: 'small',
		paddingY: 'large',
		gap: 'xsmall',
		borderTop: 1,
		borderTopStyle: 'solid',
		borderColor: 'borderDivider',
		textDecoration: 'none',
		transition: 'fast',
		background: {
			lightMode: 'transparent',
			hover: 'bai_pearl300',
		},
		boxShadow: {
			hover: 'shadowActivePanel',
		},
	}),
	{},
])

globalStyle(`${settingsMobileLinksWrapper} ${settingsMobileIndexLinkWrapper}:first-child`, {
	borderTop: 'none',
})

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

export const settingsMobileIndexArrowWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
		paddingLeft: 'medium',
		transition: 'fast',
	}),
	{
		opacity: '0.2',
	},
])

globalStyle(`${settingsMobileIndexLinkWrapper}:hover`, {
	borderRadius: vars.border.radius.large,
	borderColor: 'transparent',
})

globalStyle(`${settingsMobileIndexLinkWrapper}:hover ${settingsMobileIndexArrowWrapper}`, {
	opacity: 1,
})
