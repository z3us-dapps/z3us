import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
// import { vars } from 'ui/src/components-v2/system/theme.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style, globalStyle, globalKeyframes } from '@vanilla-extract/css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const wrapper = sprinkles({
	position: 'relative',
	overflow: 'hidden',
})

export const listContainer = style([
	sprinkles({
		position: 'relative',
	}),
	{
		// display: 'grid',
		// gap: '1rem',
		// gridTemplateColumns: '1fr',
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
		marginX: 'xlarge',
	}),
	{
		height: '72px',
	},
])

export const itemWrapperInner = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		alignItems: 'center',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingTop: 'medium',
		paddingBottom: 'medium',
		gap: 'small',
	}),
	{
		width: '100%',
	},
])

export const itemWrapperLoading = style([sprinkles({})])

export const itemWrapperMotion = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
])

export const teststyle = style([
	sprinkles({
		position: 'relative',
		background: {
			hover: 'red800',
			focus: 'red900',
		},
	}),
	{
		border: '1px solid red',
		'@media': {
			[`screen and (min-width: 480px)`]: {
				flexBasis: '50%',
			},
		},
	},
	responsiveStyle({
		mobile: { width: '100%' },
		tablet: { width: '33%' },
		desktop: { width: '25%' },
	}),
])

export const tokenListGridWrapper = style([
	{
		display: 'grid',
		gap: '1rem',
		gridTemplateColumns: '1fr 104px 104px 134px',
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
			transform: 'translateX(-100%)',
			animation: 'globalRotate 2s infinite',
			backgroundImage:
				'linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))',
		},
		selectors: {
			[`.${darkMode} &::after`]: {
				backgroundImage:
					'linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))',
			},
		},
	},
])

const rotate = 'globalRotate'

globalKeyframes(rotate, {
	'0%': { transform: 'translateX(0%)' },
	'100%': { transform: 'translateX(200%)' },
})
