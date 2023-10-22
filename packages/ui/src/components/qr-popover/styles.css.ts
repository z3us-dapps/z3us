import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'

export const qrPopOverWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		maxWidth: '300px',
	},
])

export const qrPopOverCode = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

globalStyle(`${qrPopOverCode} path:nth-child(1)`, {
	fill: '#161718 !important',
})

globalStyle(`.${darkMode} ${qrPopOverCode} path:nth-child(1)`, {
	fill: '#a6a6a6 !important',
})

globalStyle(`${qrPopOverCode} path:nth-child(2)`, {
	fill: '#ffffff !important',
})

globalStyle(`.${darkMode} ${qrPopOverCode} path:nth-child(2)`, {
	fill: '#161718 !important',
})
