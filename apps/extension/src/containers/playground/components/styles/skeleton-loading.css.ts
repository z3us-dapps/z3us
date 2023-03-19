import { globalKeyframes, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const tokenListGridCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
	}),
	{
		width: '40px',
		height: '40px',
	},
])

export const tokenListSkeleton = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		overflow: 'hidden',
		background: {
			lightMode: 'bleached_silk500',
			darkMode: 'lead400',
		},
	}),
	{
		'::after': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			// transform: 'translateX(-100%)',
			animation: 'globalRotate 2s infinite',
			backgroundRepeat: 'no-repeat',
			// backgroundSize: '315px 250px, 315px 180px, 100px 100px, 225px 30px',
			backgroundPosition: '-200px 0px',
			backgroundImage:
				'linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))',
		},
		selectors: {
			[`.${darkMode} &::after`]: {
				backgroundImage:
					'linear-gradient(90deg, rgba(125, 125, 125, 0) 0, rgba(125, 125, 125, 0.2) 20%, rgba(125, 125, 125, 0.5) 60%, rgba(125, 125, 125, 0))',
			},
		},
	},
])

const rotate = 'globalRotate'

globalKeyframes(rotate, {
	'0%': { backgroundPosition: '-200px 0px' },
	'100%': { backgroundPosition: '200px 0px' },
})
