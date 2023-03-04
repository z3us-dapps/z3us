import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style, globalStyle, globalKeyframes } from '@vanilla-extract/css'
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
	{
		// border: '1px solid red',
		// transition: 'all 0.3s ease-out',
	},
])

export const accountListHeaderWrapperShadow = style([
	sprinkles({
		// paddingTop: 'medium',
		// paddingBottom: 'medium',
	}),
	{
		boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
		// paddingBottom: vars.spacing.small,
	},
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

// globalStyle(`${itemWrapper} > a:hover`, {
// 	background: vars.color.wax500,
// })
//
// globalStyle(`.${darkMode} ${itemWrapper} > a:hover`, {
// 	background: vars.color.wax500,
// })

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

export const itemWrapperLoading = style([sprinkles({})])

export const itemWrapperMotion = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
])

// export const teststyle = style([
// 	sprinkles({
// 		position: 'relative',
// 		background: {
// 			hover: 'red800',
// 			focus: 'red900',
// 		},
// 	}),
// 	{
// 		border: '1px solid red',
// 		'@media': {
// 			[`screen and (min-width: 480px)`]: {
// 				flexBasis: '50%',
// 			},
// 		},
// 	},
// 	responsiveStyle({
// 		mobile: { width: '100%' },
// 		tablet: { width: '33%' },
// 		desktop: { width: '25%' },
// 	}),
// ])

export const tokenListGridWrapper = style([
	{
		position: 'relative',
		display: 'grid',
		gap: '1rem',
		gridTemplateColumns: '1fr 104px 104px 134px',
	},
])

export const tokenListHeaderButton = style([
	{
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
	},
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

export const tokenListSkeleton = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		overflow: 'hidden',
		background: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead400',
		},
	}),
	{
		border: '0px solid red',

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

// globalKeyframes(rotate, {
// 	'0%': { transform: 'translateX(0%)' },
// 	'100%': { transform: 'translateX(200%)' },
// })
