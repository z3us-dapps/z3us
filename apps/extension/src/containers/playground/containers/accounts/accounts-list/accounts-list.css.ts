import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const accountListHeaderWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 1,
		width: 'full',
		paddingX: 'xlarge',
		paddingTop: 'xlarge',
		transition: 'slowall',
	}),
	{},
])

export const accountListHeaderWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScroll',
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

export const virtuosoGridList = style([
	sprinkles({
		position: 'relative',
	}),
])

export const virtuosoGridTwo = style([
	sprinkles({
		position: 'relative',
	}),
])

export const virtuosoGridThree = style([
	sprinkles({
		position: 'relative',
	}),
])

globalStyle(`${virtuosoGridList} ${listContainer}`, {
	display: 'grid',
	gridTemplateColumns: '1fr',
})

globalStyle(`${virtuosoGridTwo} ${listContainer}`, {
	display: 'grid',
	gap: '1rem',
	gridTemplateColumns: '1fr 1fr',
})

globalStyle(`${virtuosoGridThree} ${listContainer}`, {
	display: 'grid',
	gap: '1rem',
	gridTemplateColumns: '1fr 1fr 1fr',
})

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
		paddingX: 'xlarge',
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
			background: vars.color.bleached_silk300,
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
	{
		position: 'relative',
		display: 'grid',
		gap: '1rem',
		gridTemplateColumns: '1fr 104px 104px 134px',
	},
])

export const tokenListWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'large',
	}),
])

export const tokenListHeaderButton = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
])

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
