import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const scrollAreaNativeWrapper = style([
	sprinkles({
		overflow: 'auto',
		height: 'full',
	}),
	{
		scrollbarColor: 'transparent transparent',
		scrollbarWidth: 'thin',
		transition: 'scrollbar-color 0.3s',
	},
])

globalStyle(`${scrollAreaNativeWrapper}::-webkit-scrollbar`, {
	width: '8px',
})

globalStyle(`${scrollAreaNativeWrapper}:hover`, {
	scrollbarColor: `${vars.color.scrollbarThumb} transparent`,
})

globalStyle(`${scrollAreaNativeWrapper}::-webkit-scrollbar-thumb`, {
	borderRadius: '5px',
})
