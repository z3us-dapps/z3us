import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const tableWrapper = style([
	sprinkles({
		backgroundColor: 'backgroundSecondary',
		paddingX: {
			tablet: 'large',
		},
	}),
	{
		height: 'calc(100vh - 56px)',
	},
])

export const tableTokensWrapper = style([sprinkles({}), {}])

globalStyle(`${tableTokensWrapper} table tr td:nth-child(1)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '60%',
		},
	},
})

globalStyle(`${tableTokensWrapper} table tr td:nth-child(2)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '40%',
		},
	},
})

export const tableLsusWrapper = style([sprinkles({}), {}])

globalStyle(`${tableLsusWrapper} table tr td:nth-child(1)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '30%',
		},
	},
})

globalStyle(`${tableLsusWrapper} table tr td:nth-child(2)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '15%',
		},
	},
})

globalStyle(`${tableLsusWrapper} table tr td:nth-child(3)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '20%',
		},
	},
})

globalStyle(`${tableLsusWrapper} table tr td:nth-child(4)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '35%',
		},
	},
})

export const tableLpusWrapper = style([sprinkles({}), {}])

globalStyle(`${tableLpusWrapper} table tr td:nth-child(1)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '40%',
		},
	},
})

globalStyle(`${tableLpusWrapper} table tr td:nth-child(2)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '20%',
		},
	},
})

globalStyle(`${tableLpusWrapper} table tr td:nth-child(3)`, {
	'@media': {
		'screen and (max-width: 768px)': {
			width: '40%',
		},
	},
})

export const cellWrapper = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
	}),
])

export const cellContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		gap: {
			mobile: 'small',
		},
	}),
])
