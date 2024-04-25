import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const accountBreadCrumbContainerWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const accountBreadCrumbWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{
		minHeight: '24px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		maxWidth: 'calc(100% - 20px)',
	},
])

globalStyle(`${accountBreadCrumbWrapper} svg`, {
	flexShrink: 0,
})

export const accountBreadCrumb = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		position: 'relative',
	}),
	{
		maxWidth: '45%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
])

globalStyle(`${accountBreadCrumbWrapper} a, ${accountBreadCrumbWrapper} span`, {
	display: 'inline',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
})
