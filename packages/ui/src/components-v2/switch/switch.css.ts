import { style } from '@vanilla-extract/css'

import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'
// width: 42px;
//   height: 25px;
//   background-color: var(--blackA9);
//   border-radius: 9999px;
//   position: relative;
//   box-shadow: 0 2px 10px var(--blackA7);
//   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

export const switchRootWrapper = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		borderRadius: 'full',
		border: 0
	}),
	{
		outline: 'none',
		width: '42px',
		height: '25px',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		backgroundColor: 'black',

	},
])

  // display: block;
  // width: 21px;
  // height: 21px;
  // background-color: white;
  // border-radius: 9999px;
  // box-shadow: 0 2px 2px var(--blackA7);
  // transition: transform 100ms;
  // transform: translateX(2px);
  // will-change: transform;

export const switchThumb = style([
	sprinkles({
		display: 'block',
		borderRadius: 'full',
		transition: 'fastall',
	}),
	{
		width: '21px',
		height: '21px',
		backgroundColor: 'white',
		transform: 'translateX(2px)',
		willChange: 'transform',
	},
])

export const switchRecipe = recipe({
	base: {
		margin: 0,
		padding: 0,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	variants: {
		styleVariant: {
			neutral: { background: 'backgroundPrimary' },
			caution: [
				sprinkles({
					background: 'orange600',
					color: 'colorStrong',
				}),
				{},
			],
		},
		sizeVariant: {
			small: {},
			medium: [
				sprinkles({
					// borderRadius: 'xlarge',
					// paddingX: 'small',
					// paddingY: 'small',
				}),
				{
					// height: '26px',
					// fontSize: '13px',
					// lineHeight: '13px',
					// paddingLeft: '8px',
					// paddingRight: '8px',
				},
			],
			large: {},
		},
	},

	// Applied when multiple variants are set at once
	compoundVariants: [
		{
			variants: {
				styleVariant: 'neutral',
				sizeVariant: 'large',
			},
			style: {
				background: 'ghostwhite',
			},
		},
	],

	defaultVariants: {
		styleVariant: 'neutral',
		sizeVariant: 'medium',
	},
})
