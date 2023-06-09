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
					boxShadow: `inset 0px 0px 0px 1px ${vars.color.borderDivider}`,
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

recipeGlobalStyle(tableRecipe({ sizeVariant: 'medium', styleVariant: 'primary' }), 'thead tr th:first-child', {
	borderTopLeftRadius: `${vars.border.radius.medium}`,
})

recipeGlobalStyle(tableRecipe({ sizeVariant: 'medium', styleVariant: 'primary' }), 'thead tr th:last-child', {
	borderTopRightRadius: `${vars.border.radius.medium}`,
})

export const tableThRecipe = recipe({
	base: {
		textAlign: 'left',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					background: 'backgroundPrimary',
					color: 'colorStrong',
				}),
				{},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			small: {},
			medium: [
				sprinkles({
					paddingX: 'medium',
					paddingY: 'medium',
				}),
				{
					fontSize: '14px',
					fontWeight: '500',
				},
			],
			large: {},
		},
	},
})

export const tableTrRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [sprinkles({
				transition: 'fast',
				background: {
					// hover: 'backgroundPrimary'
				}
				}), {}],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			small: {},
			medium: [sprinkles({}), {}],
			large: {},
		},
	},
})

export const tableTdRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({}),
				{
					boxShadow: `inset 0px 1px 0px 0px ${vars.color.borderDivider}`,
				},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			small: {},
			medium: [
				sprinkles({
					paddingX: 'medium',
					paddingY: 'medium',
				}),
				{
					fontSize: '14px',
					lineHeight: '14px',
				},
			],
			large: {},
		},
	},
})
