import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const qrPopOverCode = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

// globalStyle(`${qrPopOverCode} path:nth-child(1)`, {
// 	fill: '#161718 !important',
// })

// globalStyle(`${qrPopOverCode} path:nth-child(2)`, {
// 	fill: '#ffffff !important',
// })

// globalStyle(`.${darkMode} ${qrPopOverCode} path:nth-child(1)`, {
// 	fill: '#a6a6a6 !important',
// })

// globalStyle(`.${darkMode} ${qrPopOverCode} path:nth-child(2)`, {
// 	fill: '#161718 !important',
// })
