import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const accountListHeaderWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 1,
		width: 'full',
		paddingX: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		paddingTop: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		transition: 'slowall',
	}),
	{},
])

export const accountListHeaderWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
])

export const wrapper = sprinkles({
	position: 'relative',
	overflow: 'hidden',
})

export const listContainer = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const breadCrumbTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		flexGrow: 1,
	}),
	{
		minWidth: '0px',
		maxWidth: '100%',
	},
])

export const itemContainer = style([
	sprinkles({
		position: 'relative',
	}),
	{
		height: 'auto',
	},
])

export const itemWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		paddingX: {
			mobile: 'large',
			desktop: 'xlarge',
		},
	}),
	{
		height: '72px',
	},
])

globalStyle(`${itemWrapper} > a`, {
	width: '100%',
	textDecoration: 'none',
	cursor: 'pointer',
	color: 'borderDivider',
})

export const itemLoadingWrapper = style([
	sprinkles({
		position: 'relative',
		paddingX: {
			mobile: 'large',
			desktop: 'xlarge',
		},
	}),
])

export const itemWrapperInner = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		paddingTop: 'medium',
		paddingBottom: 'medium',
		gap: 'small',
		height: 'full',
		width: 'full',
		color: 'borderDivider',
		transition: 'fast',
	}),
	{
		boxShadow: '0 -1px 0 0',
	},
])

export const itemWrapperInnerHover = style([
	sprinkles({}),
	{
		'::before': {
			content: '""',
			position: 'absolute',
			transition: vars.transition.fast,
			top: 0,
			opacity: 0,
			bottom: 0,
			left: `calc(${vars.spacing.medium} * -1)`,
			right: `calc(${vars.spacing.medium} * -1)`,
			pointerEvents: 'none',
			// TODO: fix needing to make these a string
			boxShadow: `${vars.color.shadowActivePanel}`,
			color: `${vars.color.borderDivider}`,
			borderRadius: vars.border.radius.medium,
			background: vars.color.bai_pearl200,
		},
		selectors: {
			[`.${darkMode} &::before`]: {
				background: vars.color.lead400,
			},
			'&:hover': {
				boxShadow: 'none',
			},
			'&:hover::before': {
				opacity: 1,
			},
		},
	},
])

export const itemWrapperInnerSelected = style([
	sprinkles({
		position: 'relative',
	}),
	{
		boxShadow: 'none',
		'::before': {
			opacity: 1,
		},
	},
])

export const itemWrapperMotion = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
])

export const tokenListGridWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'grid',
	}),
	{
		gap: '1rem',
	},
	responsiveStyle({
		mobile: { gap: '1rem', gridTemplateColumns: '1fr 1fr' },
		desktop: { gap: '1rem', gridTemplateColumns: '1fr 104px 104px 134px' },
	}),
])

export const tokenListWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: {
			mobile: 'medium',
			desktop: 'large',
		},
	}),
])

export const tokenListHeaderButton = style([
	sprinkles({
		alignItems: 'center',
	}),
])

export const tokenListGridCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		flexShrink: 0,
	}),
	{
		width: '40px',
		height: '40px',
	},
])

export const tokenListAccountColumn = style([
	sprinkles({
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
])

export const tokenListCategoryColumn = style([
	sprinkles({
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
])

export const itemCategoryWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
		alignItems: 'center',
	}),
])

export const itemAccountWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
		alignItems: 'center',
	}),
])
