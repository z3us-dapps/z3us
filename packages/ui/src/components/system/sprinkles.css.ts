import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import { vars } from './theme.css'

export const resetBase = style({
	margin: 0,
	padding: 0,
	border: 0,
	minWidth: 0,
	background: 'none',
	outline: 'none',
	boxSizing: 'border-box',
	fontSize: '100%',
	font: 'inherit',
	verticalAlign: 'baseline',
})

const responsiveProperties = defineProperties({
	conditions: {
		mobile: {},
		tablet: { '@media': 'screen and (min-width: 768px)' },
		desktop: { '@media': 'screen and (min-width: 1024px)' },
	},
	defaultCondition: 'mobile',
	properties: {
		position: ['absolute', 'relative', 'fixed', 'sticky'],
		display: ['none', 'flex', 'block', 'inline-flex', 'grid', 'table-cell', 'inline', 'contents'],
		flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
		justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'self-start'],
		flexWrap: ['wrap', 'nowrap'],
		gap: vars.spacing,
		borderTop: [0, 1],
		borderBottom: [0, 1],
		borderLeft: [0, 1],
		borderRight: [0, 1],
		borderTopStyle: ['solid', 'dashed'],
		borderBottomStyle: ['solid', 'dashed'],
		borderLeftStyle: ['solid', 'dashed'],
		borderRightStyle: ['solid', 'dashed'],
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
		minWidth: { ...vars.contentWidth, ...{ 0: '0', full: '100%', vw100: '100vw' } },
		maxWidth: { ...vars.contentWidth, ...{ 0: '0', full: '100%', vh100: '100vh' } },
		width: { ...vars.spacing, ...{ full: '100%', vw100: '100vw' } },
		height: { ...vars.spacing, ...{ full: '100%', vh100: '100vh' } },
		transition: {
			slow: vars.transition.slow,
			slowall: vars.transition.slowall,
			fast: vars.transition.fast,
			fastall: vars.transition.fastall,
		},
		userSelect: ['none', 'unset'],
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
		flexShrink: [0, 1],
		flexGrow: [0, 1],
		zIndex: [-1, 0, 1, 2],
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
		active: { selector: '&:active:not(:disabled)' },
		focusNotVisible: { selector: '&:focus:not(:visible)' },
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
