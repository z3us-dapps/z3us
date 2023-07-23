/* eslint-disable @typescript-eslint/no-unused-vars */
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'
import { recipeResponsiveGlobalStyle, responsiveStyle } from '../system/theme-utils'
import { vars } from '../system/theme.css'

export const tableWrapper = style([
	sprinkles({
		display: 'block',
		position: 'relative',
	}),
	{
		transition: 'min-height 300ms ease',
		minHeight: '420px',
	},
])

export const tableMinHeightWrapper = style([
	{
		minHeight: '10px',
	},
])

export const tableRootWrapper = style([
	sprinkles({
		display: 'block',
		position: 'relative',
	}),
	{
		maxWidth: '100%',
	},
])

export const tFootWrapper = style([
	sprinkles({
		position: 'relative',
		opacity: 0,
		pointerEvents: 'none',
	}),
	{
		display: 'table-footer-group',
	},
])

export const tFootWrapperVisible = style([
	sprinkles({
		opacity: 1,
	}),
])

export const footerLoadingDefaultWrapper = style([
	sprinkles({}),
	{
		height: '30px',
	},
])

export const footerLoadingIconWrapper = style([
	sprinkles({
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		top: 0,
	}),
	{
		left: '50%',
		marginLeft: '-20px',
		width: '40px',
	},
	responsiveStyle({
		mobile: { height: '60px' },
		tablet: { height: '50px' },
	}),
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
				{},
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

export const tableThRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
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
				}),
				{},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			medium: [sprinkles({}), {}],
			large: [sprinkles({}), {}],
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
				borderRadius: vars.border.radius.large,
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
				sprinkles({}),
				{
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
				sprinkles({
					paddingY: {
						mobile: 'medium',
						tablet: 'large',
					},
					paddingX: {
						mobile: 'large',
						tablet: 'medium',
					},
				}),
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
			style: {},
		},
	],
})

export const tableLoadingWrapperRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [sprinkles({}), {}],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			medium: [sprinkles({}), {}],
			large: [sprinkles({}), {}],
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'large',
				styleVariant: 'primary',
			},
			style: {
				paddingLeft: '12px',
				paddingRight: '12px',
			},
		},
	],
})

recipeResponsiveGlobalStyle(tableLoadingWrapperRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), '', {
	tablet: {
		paddingTop: '48px',
	},
})

export const tableLoadingRowRecipe = recipe({
	base: {
		alignItems: 'center',
		width: '100%',
		gap: '12px',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					borderTop: 1,
					borderStyle: 'solid',
					borderColor: 'borderDivider',
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
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'large',
				styleVariant: 'primary',
			},
			style: {
				textAlign: 'left',
				height: '84px',
			},
		},
	],
})

recipeResponsiveGlobalStyle(tableLoadingRowRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), '', {
	tablet: {
		display: 'flex',
	},
})

recipeResponsiveGlobalStyle(
	tableLoadingRowRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'> div.td-mobile-loading',
	{
		mobile: {
			display: 'flex !important',
			width: '100% !important',
		},
	},
)

export const tableLoadingCellRecipe = recipe({
	base: {
		flexGrow: '1',
		alignItems: 'center',
		width: '100%',
		gap: '12px',
	},
	variants: {
		styleVariant: {
			primary: [sprinkles({}), {}],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			medium: [sprinkles({}), {}],
			large: [sprinkles({}), {}],
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
				height: '84px',
			},
		},
	],
})

recipeResponsiveGlobalStyle(tableLoadingCellRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), '', {
	tablet: {
		display: 'flex',
	},
})

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:hover', {
	tablet: {
		backgroundColor: vars.color.bai_pearl200,
		boxShadow: vars.color.shadowActivePanel,
	},
})

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr:hover .tr-text-elem',
	{
		mobile: {
			color: vars.color.purple500,
		},
		tablet: {
			color: 'unset',
		},
	},
)

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr.tr-selected', {
	tablet: {
		backgroundColor: vars.color.bai_pearl200,
		boxShadow: vars.color.shadowActivePanel,
	},
})

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr:hover',
	{
		tablet: {
			backgroundColor: vars.color.wax500,
			boxShadow: vars.color.shadowActivePanel,
		},
	},
	true,
)

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr.tr-selected',
	{
		tablet: {
			backgroundColor: vars.color.wax500,
			boxShadow: vars.color.shadowActivePanel,
		},
	},
	true,
)

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr.tr-selected + tr td::after',
	{
		tablet: {
			opacity: '0',
		},
	},
)

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr:first-child td::after',
	{
		mobile: {
			opacity: '0',
		},
		tablet: {
			opacity: '1',
		},
	},
)

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr:hover + tr td::after',
	{
		tablet: {
			opacity: '0',
		},
	},
)

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr td:nth-child(1):after',
	{
		mobile: {
			left: vars.spacing.large,
			right: vars.spacing.large,
		},
		tablet: {
			left: vars.spacing.medium,
			right: 0,
		},
	},
)

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr td:last-child:after',
	{
		mobile: {
			right: vars.spacing.large,
		},
		tablet: {
			right: vars.spacing.medium,
		},
	},
)

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr td:first-child', {
	tablet: {
		borderTopLeftRadius: vars.spacing.medium,
		borderBottomLeftRadius: vars.spacing.medium,
	},
})

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr td:last-child', {
	tablet: {
		borderTopRightRadius: vars.spacing.medium,
		borderBottomRightRadius: vars.spacing.medium,
	},
})
