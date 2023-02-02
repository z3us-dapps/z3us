import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
// import { vars } from 'ui/src/components-v2/system/theme.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style, globalStyle } from '@vanilla-extract/css'

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
	gap: '1rem',
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
		background: 'red100',
		display: 'flex',
	}),
	{
		height: '80px',
	},
])

export const itemWrapperLoading = style([
	sprinkles({
		background: 'red900',
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

//
// .z3-c-account-list--list {
// 	.z3-c-account-list__container {
// 		display: grid;
// 		gap: 1rem;
// 		grid-template-columns: 1fr;
// 	}
// }
//
// .z3-c-account-list--tile-two {
// 	.z3-c-account-list__container {
// 		display: grid;
// 		gap: 1rem;
// 		grid-template-columns: 1fr 1fr;
// 	}
// }
//
// .z3-c-account-list--tile-three {
// 	.z3-c-account-list__container {
// 		display: grid;
// 		gap: 1rem;
// 		grid-template-columns: 1fr 1fr 1fr;
// 	}
// }
//
// .z3-c-account-list__item-wrapper {
// 	color: var(--color-font-primary);
// 	background-color: var(--color-background-secondary);
// 	padding: var(--spacing-3);
// 	height: 80px;
// }
