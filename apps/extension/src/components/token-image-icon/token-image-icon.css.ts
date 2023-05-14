import {  style } from '@vanilla-extract/css'

import { recipe } from '@vanilla-extract/recipes';

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const tokenImageWrapper = recipe({
  base: {
    margin: 'none',
    padding: 'none',
    position: 'relative',
    flexShrink: 0
  },
  variants: {
    size: {
      small: { width: '20px', height: '20px'},
      medium: { width: '24px', height: '24px'},
      large: { width: '32px', height: '32px'},
    },
    rounded: {
      true: { borderRadius: 999 }
    }
  },

  compoundVariants: [
  ],
  defaultVariants: {
    size: 'medium',
    rounded: true
  }
});

export const tokenImageFallbackTextWrapper = recipe({
  base: {
    flexShrink: 0,
    textTransform: 'uppercase',
  },
  variants: {
    size: {
      small: { fontSize: '9px', lineHeight: '9px' },
      medium: { fontSize: '10px', lineHeight: '10px' },
      large: { fontSize: '11px', lineHeight: '11px' },
    },
  },
  defaultVariants: {
    size: 'medium',
  }
});


export const tokenImageAvatarRootWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
	}),
	{},
])

export const tokenImageAvatarImageWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		borderRadius: 'full',
	}),
	{
		objectFit: 'cover',
	},
])

export const tokenImageAvatarFallbackWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])

