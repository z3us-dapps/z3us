import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const accountBreadCrumbContainerWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		containerType: 'inline-size',
	},
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
		'@container': {
			'(min-width: 300px)': {
				maxWidth: '330px',
			},
			'(min-width: 400px)': {
				maxWidth: '420px',
			},
			'(min-width: 580px)': {
				maxWidth: '620px',
			},
			'(min-width: 720px)': {
				maxWidth: '720px',
			},
		},
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
