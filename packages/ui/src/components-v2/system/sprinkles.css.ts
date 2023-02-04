import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { vars } from './theme.css'

const responsiveProperties = defineProperties({
	conditions: {
		mobile: {},
		tablet: { '@media': 'screen and (min-width: 768px)' },
		desktop: { '@media': 'screen and (min-width: 1024px)' },
	},
	defaultCondition: 'mobile',
	properties: {
		position: ['absolute', 'relative', 'fixed'],
		display: ['none', 'flex', 'block', 'inline-flex'],
		flexDirection: ['row', 'column'],
		justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
		flexWrap: ['wrap', 'nowrap'],
		gap: vars.spacing,
		borderTop: [0, 1],
		borderBottom: [0, 1],
		borderLeft: [0, 1],
		borderRight: [0, 1],
		borderTopStyle: ['solid'],
		borderBottomStyle: ['solid'],
		borderLeftStyle: ['solid'],
		borderRightStyle: ['solid'],
		paddingTop: vars.spacing,
		paddingBottom: vars.spacing,
		paddingLeft: vars.spacing,
		paddingRight: vars.spacing,
		marginTop: vars.spacing,
		marginBottom: vars.spacing,
		marginLeft: vars.spacing,
		marginRight: vars.spacing,
		pointerEvents: ['none', 'auto'],
		overflow: ['hidden', 'clip', 'auto'],
		opacity: [0, 1],
		textAlign: ['left', 'center', 'right'],
		minWidth: [0],
		maxWidth: vars.contentWidth,
		transition: {
			slow: 'transform .3s ease, opacity .3s ease, background .3s ease',
			fast: 'transform .15s ease, opacity .15s ease, background .15s ease, color .15s ease, border .15s ease, box-shadow .15s ease',
		},
	},
	shorthands: {
		border: ['borderTop', 'borderBottom', 'borderLeft', 'borderRight'],
		borderStyle: ['borderTopStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderRightStyle'],
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
		borderWidth: vars.border.width,
		borderRadius: vars.border.radius,
		borderTopLeftRadius: vars.border.radius,
		borderTopRightRadius: vars.border.radius,
		borderBottomLeftRadius: vars.border.radius,
		borderBottomRightRadius: vars.border.radius,
		cursor: ['pointer'],
		textDecoration: ['none'],
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
		hover: { selector: '&:hover' },
		focus: { selector: '&:focus' },
		focusVisible: { selector: '&:focus-visible' },
	},
	defaultCondition: 'lightMode',
	properties: {
		background: vars.color,
		color: vars.color,
		fill: vars.color,
		borderColor: vars.color,
		boxShadow: vars.color,
	},
})

export const sprinkles = createSprinkles(responsiveProperties, unresponsiveProperties, colorProperties)

export type Sprinkles = Parameters<typeof sprinkles>[0]
