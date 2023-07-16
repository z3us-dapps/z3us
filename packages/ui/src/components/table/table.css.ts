/* eslint-disable @typescript-eslint/no-unused-vars */
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'
import { recipeGlobalStyle } from '../system/theme-utils'
import { vars } from '../system/theme.css'

export const tableRootWrapper = style([
	sprinkles({
		display: 'block',
		position: 'relative',
	}),
	{
		maxWidth: '100%',
	},
])

export const tableIconWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		transform: 'translateY(-1px)',
		width: '24px',
		height: '24px',
	},
])

export const tableRecipe = recipe({
	base: {
		margin: 0,
		padding: 0,
		borderSpacing: 0,
		borderCollapse: 'collapse',
		tableLayout: 'fixed',
		width: '100%',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					borderRadius: 'medium',
				}),
				{
					// boxShadow: `inset 0px 0px 0px 1px ${vars.color.borderDivider}`,
				},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			small: {},
			medium: [sprinkles({}), {}],
			large: {},
		},
	},
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr td:first-child:after', {
	left: vars.spacing.medium,
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr td:last-child:after', {
	right: vars.spacing.medium,
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:hover td::after', {
	opacity: '0',
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:hover', {
	backgroundColor: vars.color.backgroundPrimary,
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:hover + tr td::after', {
	opacity: '0',
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:first-child td::after', {
	opacity: '0',
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr td:first-child', {
	borderTopLeftRadius: vars.spacing.medium,
	borderBottomLeftRadius: vars.spacing.medium,
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr td:last-child', {
	borderTopRightRadius: vars.spacing.medium,
	borderBottomRightRadius: vars.spacing.medium,
})

// recipeGlobalStyle(tableRecipe({ sizeVariant: 'medium', styleVariant: 'primary' }), 'thead tr th:first-child', {
// 	borderTopLeftRadius: `${vars.border.radius.medium}`,
// })

// recipeGlobalStyle(tableRecipe({ sizeVariant: 'medium', styleVariant: 'primary' }), 'thead tr th:last-child', {
// 	borderTopRightRadius: `${vars.border.radius.medium}`,
// })

export const tableThRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					// background: 'backgroundSecondary',
					color: 'colorNeutral',
				}),
				{},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			medium: [
				sprinkles({}),
				{
					fontSize: '12px',
					lineHeight: '18px',
					fontWeight: '500',
				},
			],
			large: [
				sprinkles({}),
				{
					fontSize: '12px',
					lineHeight: '18px',
					fontWeight: '500',
				},
			],
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'large',
				styleVariant: 'primary',
			},
			style: {
				textAlign: 'left',
				paddingTop: vars.spacing.medium,
				paddingBottom: vars.spacing.medium,
				paddingLeft: vars.spacing.medium,
				paddingRight: vars.spacing.medium,
			},
		},
	],
})

export const tableTrRecipe = recipe({
	base: {
		position: 'relative',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					transition: 'fastall',
					// background: {
					// 	hover: 'backgroundPrimary',
					// },
					boxShadow: {
						hover: 'shadowActivePanel',
					},
				}),
				{
					// boxShadow: `inset 0px 1px 0px 0px ${vars.color.borderDivider}`,
				},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			medium: [sprinkles({}), {}],
			large: [sprinkles({}), {}],
		},
		selected: {
			true: {
				boxShadow: vars.color.shadowActivePanel,
			},
		},
		isRowSelectable: {
			true: {
				cursor: 'pointer',
			},
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'large',
				styleVariant: 'primary',
			},
			style: {
				borderRadius: vars.border.radius.medium,
			},
		},
	],
})

export const tableTdRecipe = recipe({
	base: {
		position: 'relative',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					// position: 'relative',
				}),
				{
					// boxShadow: `inset 0px 1px 0px 0px ${vars.color.borderDivider}`,
					'::after': {
						content: '""',
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						height: '1px',
						pointerEvents: 'none',
						background: vars.color.borderDivider,
						opacity: '1',
						transition: vars.transition.fast,
					},
				},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			medium: [
				sprinkles({}),
				{
					fontSize: '13px',
					lineHeight: '28px',
					fontWeight: '500',
				},
			],
			large: [
				{
					fontSize: '14px',
					lineHeight: '20px',
					fontWeight: '500',
				},
			],
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'large',
				styleVariant: 'primary',
			},
			style: {
				paddingTop: '26px',
				paddingBottom: '26px',
				paddingLeft: vars.spacing.medium,
				paddingRight: vars.spacing.medium,
			},
		},
	],
})
