import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'
import { calc } from '@vanilla-extract/css-utils'
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
		darkMode: 'lead500',
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
		height: '72px',
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
		gap: 'large',
		justifyContent: 'center',
	}),
	{
		height: 'auto',
	},
])

export const navigationMenuLink = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		textDecoration: 'none',
		paddingX: 'small',
		borderRadius: 'small',
		transition: 'fast',
	}),
	{
		height: `${calc(vars.grid).multiply(8)}`,
		':hover': {
			background: vars.color.bleached_silk600,
		},
		selectors: {
			[`.${darkMode} &:hover`]: {
				background: vars.color.lead400,
			},
		},
	},
])

export const navigationMenuLinkText = style([
	sprinkles({
		position: 'relative',
	}),
])

export const navigationMenuActiveLine = style([
	sprinkles({
		position: 'absolute',
		inset: 0,
		pointerEvents: 'none',
		borderRadius: 'small',
		background: 'purple500',
	}),
	{
		height: '100%',
		width: '100%',
	},
])
