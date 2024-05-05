import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { darkMode, sprinkles } from 'ui/src/theme/sprinkles.css'
import { breakpoints, recipeResponsiveGlobalStyle, responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

const LIGHT_SHADOW = '0px 13px 13px -14px rgba(0, 0, 0, 0.4)'
const DARK_SHADOW = '0px 13px 13px -14px rgba(0, 0, 0, 0.4)'

export const tableWrapper = style([
	sprinkles({
		display: 'block',
		position: 'relative',
		paddingBottom: 'large',
		zIndex: 2,
	}),
	{
		transition: 'min-height 300ms ease',
	},
])

export const tableEmptyStateWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		paddingY: {
			mobile: 'large',
			tablet: 'xxlarge',
		},
	}),
	{},
])

export const tableLoadingWrapper = style([
	sprinkles({
		position: 'relative',
		pointerEvents: 'none',
	}),
	{},
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

export const tableRootTopStickyPosition = style([
	sprinkles({
		position: 'relative',
	}),
])

globalStyle(`${tableRootTopStickyPosition} thead`, {
	display: 'none',
	'@media': {
		[`screen and (min-width: ${breakpoints.tablet}px)`]: {
			top: '-1px !important',
			display: 'table-header-group',
		},
	},
})

export const accountTheadShadow = style([
	sprinkles({
		position: 'relative',
	}),
])

globalStyle(`${accountTheadShadow} thead tr th:first-child::before`, {
	boxShadow: LIGHT_SHADOW,
})

globalStyle(`.${darkMode} ${accountTheadShadow} thead tr th:first-child::before`, {
	boxShadow: DARK_SHADOW,
})

export const tFootWrapper = style([
	sprinkles({
		position: 'relative',
		pointerEvents: 'none',
		display: 'none',
	}),
	{},
])

export const tFootWrapperVisible = style([
	sprinkles({
		opacity: 1,
	}),
	{
		display: 'table-footer-group',
	},
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

export const tableHeaderTruncateWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
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
					background: vars.color.backgroundSecondary,
				},
			],
			secondary: [
				sprinkles({
					borderBottom: 1,
					borderBottomStyle: 'solid',
					borderRight: 1,
					borderRightStyle: 'solid',
					borderColor: 'borderDivider',
				}),
				{
					background: vars.color.backgroundPrimary,
				},
			],
		},
		sizeVariant: {
			medium: [sprinkles({}), {}],
			large: {},
		},
		isScrolledTop: {
			true: {},
		},
	},
})

export const tableThRecipe = recipe({
	base: {
		transition: vars.transition.fast,
		cursor: 'pointer',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					color: {
						lightMode: 'colorNeutral',
						hover: 'colorStrong',
					},
				}),
				{},
			],
			secondary: [
				sprinkles({
					color: {
						lightMode: 'colorNeutral',
						hover: 'colorStrong',
					},
				}),
				{},
			],
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
		loading: {
			true: {
				opacity: '0.2',
				pointerEvents: 'none',
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
				textAlign: 'left',
				paddingTop: vars.spacing.medium,
				paddingBottom: vars.spacing.medium,
				paddingLeft: vars.spacing.medium,
				paddingRight: vars.spacing.medium,
			},
		},
		{
			variants: {
				sizeVariant: 'medium',
				styleVariant: 'secondary',
			},
			style: {
				background: vars.color.backgroundPrimary,
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
			true: {},
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
		{
			variants: {
				sizeVariant: 'large',
				styleVariant: 'primary',
			},
			style: {},
		},
		{
			variants: {
				sizeVariant: 'large',
				styleVariant: 'primary',
				isRowSelectable: true,
			},
			style: {
				cursor: 'pointer',
			},
		},
	],
})

export const tableTdRecipe = recipe({
	base: {
		position: 'relative',
		transition: vars.transition.fast,
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
				sprinkles({
					borderLeft: 1,
					borderLeftStyle: 'solid',
					borderBottom: 1,
					borderBottomStyle: 'solid',
					borderColor: 'borderDivider',
					paddingY: {
						mobile: 'medium',
						tablet: 'medium',
					},
					paddingX: {
						mobile: 'medium',
						tablet: 'medium',
					},
				}),
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
						mobile: 'medium',
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

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'thead', {
	mobile: {
		position: 'relative',
		transition: vars.transition.fast,
	},
})

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'thead tr', {
	mobile: {
		position: 'relative',
	},
})

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'thead tr th:first-child::before',
	{
		mobile: {
			position: 'absolute',
			content: "''",
			transition: vars.transition.fast,
			top: '0',
			left: '-15px',
			right: '-15px',
			bottom: '2px',
			background: vars.color.backgroundSecondary,
		},
	},
)

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr', {
	mobile: {
		height: '76px',
		position: 'relative',
	},
	tablet: {
		height: '80px',
	},
})

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:hover', {
	tablet: {
		backgroundColor: vars.color.btnTertiaryBackgroundHover,
		boxShadow: vars.color.shadowActivePanel,
	},
})

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr.tr-selected', {
	tablet: {
		backgroundColor: vars.color.btnTertiaryBackgroundHover,
		boxShadow: vars.color.shadowActivePanel,
	},
})

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr:hover',
	{
		tablet: {
			backgroundColor: vars.color.btnTertiaryBackgroundHover,
			boxShadow: vars.color.shadowActivePanel,
		},
	},
	true,
)

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr td:after', {
	mobile: {
		opacity: 0,
	},
	tablet: {
		opacity: 1,
	},
})

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr', {
	mobile: {
		borderBottom: '1px',
		borderBottomStyle: 'solid',
		borderBottomColor: vars.color.borderDivider,
	},
	tablet: {
		borderBottom: '0px',
	},
})

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:after', {
	mobile: {
		content: '""',
		position: 'absolute',
		left: `calc(${vars.spacing.small} * 1)`,
		right: `calc(${vars.spacing.small} * 1)`,
		top: `calc(${vars.spacing.small} * 1)`,
		bottom: `calc(${vars.spacing.small} * 1)`,
		backgroundColor: vars.color.btnTertiaryBackgroundHover,
		transition: vars.transition.fast,
		borderRadius: vars.border.radius.medium,
		pointerEvents: 'none',
		background: vars.color.btnTertiaryBackgroundHover,
		opacity: 0,
	},
	tablet: {
		display: 'none',
	},
})

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
	'tbody tr.tr-selected td::after',
	{
		tablet: {
			opacity: '0',
		},
	},
)

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr:hover td::after',
	{
		tablet: {
			opacity: '0',
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

recipeResponsiveGlobalStyle(tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }), 'tbody tr:hover:after', {
	mobile: {
		opacity: '1',
	},
	tablet: {
		opacity: '1',
	},
})

recipeResponsiveGlobalStyle(
	tableRecipe({ sizeVariant: 'large', styleVariant: 'primary' }),
	'tbody tr td:nth-child(1):after',
	{
		mobile: {
			left: 0,
			right: 0,
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

globalStyle(`${tableLoadingWrapper} .td-cell-loading`, {
	opacity: 1,
})

globalStyle(`${tableLoadingWrapper} .td-cell`, {
	opacity: 0,
})
