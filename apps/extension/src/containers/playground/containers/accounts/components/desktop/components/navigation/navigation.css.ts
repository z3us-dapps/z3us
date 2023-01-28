import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'
import { style, globalStyle } from '@vanilla-extract/css'

export const navigationWrapper = sprinkles({
	zIndex: 1,
	display: 'flex',
	justifyContent: 'center',
	paddingLeft: 'large',
	paddingRight: 'large',
	borderBottom: 1,
	borderBottomStyle: 'solid',
	borderColor: {
		lightMode: 'bleached_silk600',
		darkMode: 'lead800',
	},
})

export const navigationContainer = style([
	sprinkles({
		position: 'relative',
		maxWidth: 'xlarge',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
	}),
	{
		height: '80px',
	},
])

export const navigationLogoLink = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		overflow: 'hidden',
		cursor: 'pointer',
		background: {
			lightMode: 'black',
			darkMode: 'white',
		},
	}),
	{
		width: '100px',
		height: '15px',
		selectors: {
			// [`.${darkMode} &`]: {},
			// [`${parent} & svg`]: {
			// 	fill: 'backgroundPrimary',
			// },
		},
	},
])

export const navigationLogoLinkScreen = style([
	{
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: vars.color.purple500,
		transform: 'translateY(100%)',
		pointerEvents: 'none',
		transition: 'ease-in .2s',
	},
])

globalStyle(`${navigationLogoLink}:hover ${navigationLogoLinkScreen}`, {
	transform: 'translateY(0%)',
})

export const logoSvg = style([
	sprinkles({
		position: 'relative',
		fill: 'backgroundPrimary',
	}),
])

export const navigationMenu = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
	}),
	{
		height: 'auto',
	},
])

// .z3-c-accounts-navigation {
// 	background: var(--color-background-primary);
// 	padding-left: var(--spacing-8);
// 	padding-right: var(--spacing-8);
// 	box-shadow: var(--color-shadow-header);
// 	z-index: 1;
//
// 	.z3-c-accounts-navigation__logo {
// 		display: block;
// 		width: 100px;
// 		height: auto;
// 		overflow: hidden;
// 		position: relative;
// 		background: var(--color-font-primary);
//
// 		svg {
// 			fill: var(--color-background-primary);
// 			position: relative;
// 		}
//
// 		&:before {
// 			content: '';
// 			position: absolute;
// 			top: 0;
// 			left: 0;
// 			width: 100%;
// 			height: 100%;
// 			background: var(--color-brand-primary-base);
// 			transition: var(--transitions-sm-all);
// 			transform: translateY(100%);
// 			pointer-events: none;
// 		}
//
// 		&:hover {
// 			&:before {
// 				transform: translateY(0%);
// 			}
// 		}
// 	}
//
// 	> ul {
// 		display: flex;
// 		gap: var(--spacing-3);
// 	}
// }
//
// .z3-c-accounts-navigation__container {
// 	height: var(--spacing-16);
// 	width: 100%;
// 	max-width: var(--screens-xl);
// 	margin: 0 auto;
// 	display: flex;
// 	align-items: center;
// 	flex-shrink: 0;
// }
//
// .z3-c-accounts-navigation__menu-right {
// 	display: flex;
// 	gap: var(--spacing-1);
// }
//
// .z3-c-accounts-navigation__menu {
// 	width: 100%;
// 	display: flex;
// 	justify-content: center;
// 	gap: 1rem;
//
// 	a {
// 		position: relative;
// 		display: flex;
// 		align-items: center;
// 		cursor: pointer;
//
// 		&:hover {
// 			> div {
// 				&::before {
// 					opacity: 1;
// 				}
// 			}
// 		}
//
// 		> .z3-c-accounts-navigation__menu-item {
// 			height: 100%;
// 			display: flex;
// 			align-items: center;
// 			justify-content: center;
// 			flex-direction: column;
// 			position: relative;
// 			font-size: 0.813rem;
// 			font-weight: 700;
// 			cursor: pointer;
// 			position: relative;
// 			padding: 0.4rem 0.8rem;
// 			border-radius: var(--border-radius-md);
// 			color: var(--color-font-primary);
// 			transition: var(--transitions-md-all);
//
// 			&.z3-c-accounts-navigation__menu-item--active {
// 				color: var(--color-font-inverse);
// 				&::before {
// 					content: '';
// 				}
// 			}
//
// 			&::before {
// 				content: '';
// 				transition: var(--transitions-sm-all);
// 				height: var(--spacing-8);
// 				opacity: 0;
// 				position: absolute;
// 				top: 0;
// 				bottom: 0;
// 				left: 0;
// 				right: 0;
// 				position: absolute;
// 				background-color: var(--color-background-btn-ghost-hover);
// 				pointer-events: none;
// 				border-radius: var(--border-radius-md);
// 			}
//
// 			p {
// 				position: relative;
// 			}
//
// 			.z3-c-accounts-navigation__menu-bg-line {
// 				position: absolute;
// 				bottom: 0;
// 				left: 0;
// 				width: 100%;
// 				height: 100%;
// 				background: var(--color-brand-secondary-base);
// 				opacity: 1;
// 				pointer-events: none;
// 				border-radius: var(--border-radius-md);
// 			}
// 		}
// 	}
// }
