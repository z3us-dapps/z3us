import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'

export const cardButtonsQrCode = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

globalStyle(`${cardButtonsQrCode} path:nth-child(1)`, {
	fill: '#161718 !important',
})

globalStyle(`.${darkMode} ${cardButtonsQrCode} path:nth-child(1)`, {
	fill: '#a6a6a6 !important',
})

globalStyle(`${cardButtonsQrCode} path:nth-child(2)`, {
	fill: '#ffffff !important',
})

globalStyle(`.${darkMode} ${cardButtonsQrCode} path:nth-child(2)`, {
	fill: '#161718 !important',
})
