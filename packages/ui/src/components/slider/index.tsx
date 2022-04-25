/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import { styled } from '@stitches/react'
import * as SliderPrimitive from '@radix-ui/react-slider'

export const StyledSlider = styled(SliderPrimitive.Root, {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	userSelect: 'none',
	touchAction: 'none',
	width: 200,

	'&[data-orientation="horizontal"]': {
		height: 20,
	},

	'&[data-orientation="vertical"]': {
		flexDirection: 'column',
		width: 20,
		height: 100,
	},
})

export const StyledTrack = styled(SliderPrimitive.Track, {
	backgroundColor: '$bgSlider',
	position: 'relative',
	flexGrow: 1,
	borderRadius: '9999px',

	'&[data-orientation="horizontal"]': { height: 3 },
	'&[data-orientation="vertical"]': { width: 3 },
})

export const StyledRange = styled(SliderPrimitive.Range, {
	backgroundColor: '$bgSliderRange',
	position: 'absolute',
	borderRadius: '9999px',
	height: '100%',
})

export const StyledThumb = styled(SliderPrimitive.Thumb, {
	position: 'relative',
	all: 'unset',
	display: 'block',
	width: 12,
	height: 12,
	backgroundColor: '$white',
	border: '2px solid $bgSliderTrack',
	boxShadow: '$sliderShadow',
	transition: `$default`,
	borderRadius: '50%',
	'&:hover': { boxShadow: '$sliderShadowHover' },
	'&:focus': { boxShadow: '$sliderShadowHover' },
})
