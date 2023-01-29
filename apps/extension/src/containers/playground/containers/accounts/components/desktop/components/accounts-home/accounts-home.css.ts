import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
// import { vars } from 'ui/src/components-v2/system/theme.css'
// import { calc } from '@vanilla-extract/css-utils'
import { style, globalStyle } from '@vanilla-extract/css'

export const rightPanel = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '392px',
	},
])

// .z3-c-accounts-home {
// 	height: 100%;
// 	position: relative;
// 	padding-left: var(--spacing-8);
// 	padding-right: var(--spacing-8);
// 	background-color: var(--color-background-secondary);
// 	display: flex;
// 	justify-content: center;
// }
//
// .z3-c-accounts-home__container {
// 	padding-top: var(--spacing-8);
// 	gap: var(--spacing-8);
// 	max-width: var(--screens-xl);
// 	width: 100%;
// 	height: calc(100% - var(--spacing-8));
// 	display: flex;
// 	align-items: flex-start;
// }
//
// .z3-c-accounts-home__assets {
// 	width: 60%;
// 	background-color: var(--color-background-primary);
// 	border-radius: var(--border-radius-xl2);
// 	box-shadow: var(--color-shadow-panel);
// 	display: flex;
// 	flex-shrink: 0;
// 	flex-direction: column;
// 	max-height: 100%;
// }
//
// .z3-c-accounts-home__assets-header {
// 	padding: var(--spacing-5);
//
// 	> div {
// 		&:first-child {
// 			padding-bottom: var(--spacing-1);
// 		}
// 	}
//
// 	section {
// 		display: flex;
// 		align-items: center;
// 		gap: var(--spacing-2);
// 		margin-top: var(--spacing-4);
// 		padding-bottom: var(--spacing-4);
//
// 		div:first-child {
// 			flex: 1;
// 		}
// 	}
// }
//
// .z3-c-accounts-home__cards {
// 	background-color: var(--color-background-primary);
// 	border-radius: var(--border-radius-xl2);
// 	box-shadow: var(--color-shadow-panel);
// 	display: flex;
// 	flex-shrink: auto;
// 	flex-basis: auto;
// 	flex-grow: 1;
// 	flex-direction: column;
// 	max-height: 100%;
// }
