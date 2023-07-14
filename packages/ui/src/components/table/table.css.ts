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

// recipeGlobalStyle(tableRecipe({ sizeVariant: 'medium', styleVariant: 'primary' }), 'thead tr th:first-child', {
// 	borderTopLeftRadius: `${vars.border.radius.medium}`,
// })

// recipeGlobalStyle(tableRecipe({ sizeVariant: 'medium', styleVariant: 'primary' }), 'thead tr th:last-child', {
// 	borderTopRightRadius: `${vars.border.radius.medium}`,
// })

export const tableThRecipe = recipe({
	base: {
		textAlign: 'left',
	},
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
				paddingTop: vars.spacing.medium,
				paddingBottom: vars.spacing.medium,
			},
		},
	],
})

export const tableTrRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					transition: 'fast',
					background: {
						// hover: 'backgroundPrimary'
					},
				}),
				{},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			medium: [sprinkles({}), {}],
			large: [sprinkles({}), {}],
		},
	},
})

export const tableTdRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					// background: 'backgroundSecondary',
				}),
				{
					// boxShadow: `inset 0px 1px 0px 0px ${vars.color.borderDivider}`,
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
				sprinkles({}),
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
				paddingTop: vars.spacing.medium,
				paddingBottom: vars.spacing.medium,
			},
		},
	],
})
