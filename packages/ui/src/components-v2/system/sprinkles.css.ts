import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { vars } from './theme.css'

const space = {
	none: 0,
	small: '4px',
	medium: '8px',
	large: '16px',
}

const responsiveProperties = defineProperties({
	conditions: {
		mobile: {},
		tablet: { '@media': 'screen and (min-width: 768px)' },
		desktop: { '@media': 'screen and (min-width: 1024px)' },
	},
	defaultCondition: 'mobile',
	properties: {
		position: ['absolute', 'relative', 'fixed'],
		display: ['none', 'flex', 'block', 'inline'],
		flexDirection: ['row', 'column'],
		justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
		flexWrap: ['wrap', 'nowrap'],
		paddingTop: space,
		paddingBottom: space,
		paddingLeft: space,
		paddingRight: space,
		marginTop: space,
		marginBottom: space,
		marginLeft: space,
		marginRight: space,
		pointerEvents: ['none', 'auto'],
		overflow: ['hidden', 'clip'],
		opacity: [0, 1],
		textAlign: ['left', 'center', 'right'],
		minWidth: [0],
		maxWidth: vars.contentWidth,
		transition: {
			slow: 'transform .3s ease, opacity .3s ease',
			fast: 'transform .15s ease, opacity .15s ease',
		},
	},
	shorthands: {
		padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
		paddingX: ['paddingLeft', 'paddingRight'],
		paddingY: ['paddingTop', 'paddingBottom'],
		margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
		marginX: ['marginLeft', 'marginRight'],
		marginY: ['marginTop', 'marginBottom'],
		placeItems: ['justifyContent', 'alignItems'],
	},
})

const unresponsiveProperties = defineProperties({
	properties: {
		top: [0],
		bottom: [0],
		left: [0],
		right: [0],
		flexShrink: [0],
		flexGrow: [0, 1],
		zIndex: [-1, 0, 1],
		width: { full: '100%', vw100: '100vw' },
		height: { full: '100%', vh100: '100vh' },
		borderRadius: vars.border.radius,
		cursor: ['pointer'],
	},
	shorthands: {
		inset: ['top', 'bottom', 'left', 'right'],
	},
})

export const lightMode = 'light'
export const darkMode = 'dark'

const colorProperties = defineProperties({
	conditions: {
		lightMode: {},
		darkMode: { selector: `.${darkMode} &` },
	},
	defaultCondition: 'lightMode',
	properties: {
		background: vars.color,
		color: vars.color,
	},
})

export const sprinkles = createSprinkles(responsiveProperties, unresponsiveProperties, colorProperties)

export type Sprinkles = Parameters<typeof sprinkles>[0]
