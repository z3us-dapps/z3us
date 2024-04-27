import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import { vars } from './theme.css'

export const darkMode = 'dark'

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

/**
 * Maps several keys to the same value
 */
function mapTo<Key extends string, Value>(keys: readonly Key[], value: Value) {
	return Object.fromEntries(keys.map(key => [key, value])) as Record<Key, Value>
}

/**
 * Maps several keys to the same value
 */
function mapAndTransformTo<Key extends string, Value>(keys: readonly Key[], cb: (key: Key) => Value) {
	return Object.fromEntries(keys.map(key => [key, cb(key)])) as Record<Key, Value>
}

const borderRadiusProperties = [
	'borderRadius',
	'borderTopLeftRadius',
	'borderTopRightRadius',
	'borderBottomLeftRadius',
	'borderBottomRightRadius',
] as const

const decorationStyles = defineProperties({
	properties: {
		flexShrink: [0, 1],
		flexGrow: [0, 1],
		zIndex: [-1, 0, 1, 2],
		...mapTo(borderRadiusProperties, vars.border.radius),
		borderWidth: vars.border.width,
		borderCollapse: ['collapse'],
		cursor: ['auto', 'pointer', 'default', 'none'],
		textDecoration: ['none', 'underline', 'overline', 'line-through'],
		opacity: [0, 0.25, 0.5, 0.75, 1],
		textShadow: ['none', '1px 1px 1px rgba(0,0,0,0.5)', '2px 2px 2px rgba(0,0,0,0.5)'],
		filter: ['none', 'grayscale(100%)', 'brightness(50%)', 'contrast(200%)', 'blur(5px)'],
		textFillColor: ['auto', 'currentColor', 'red', 'green', 'blue'],
		backdropFilter: ['none', 'blur(5px)', 'brightness(50%)', 'contrast(200%)'],
		placeContent: ['normal', 'start', 'end', 'center', 'space-between', 'space-around'],
		...mapTo(['placeItems', 'placeSelf'], ['auto', 'start', 'end', 'center', 'stretch']),
		transition: vars.transition,
		animation: vars.animation,
	},
})

const colorProperties = [
	'color',
	'borderColor',
	'backgroundColor',
	'background',
	'boxShadow',
	'fill',
	'stroke',
	'outlineColor',
] as const

const colorStyles = defineProperties({
	conditions: {
		lightMode: {},
		// darkMode: { '@media': '(prefers-color-scheme: dark)' },
		darkMode: { selector: `.${darkMode} &` },
		hover: { selector: '&:hover' },
		focus: { selector: '&:focus' },
		active: { selector: '&:active:not(:disabled)' },
		focusNotVisible: { selector: '&:focus:not(:visible)' },
		focusVisible: { selector: '&:focus-visible' },
	},
	defaultCondition: 'lightMode',
	properties: {
		...mapTo(colorProperties, {
			...vars.color,
			none: 'none',
			currentColor: 'currentColor',
			transparent: 'transparent',
		}),
	},
})

const spaceProperties = [
	'left',
	'top',
	'right',
	'bottom',
	'paddingTop',
	'paddingBottom',
	'paddingLeft',
	'paddingRight',
	'marginTop',
	'marginBottom',
	'marginLeft',
	'marginRight',
	'gap',
	'rowGap',
	'columnGap',
	'height',
	'minHeight',
	'maxHeight',
	'width',
] as const

const sizeProperties = ['minWidth', 'maxWidth'] as const

const borderProperties = ['borderLeft', 'borderRight', 'borderTop', 'borderBottom'] as const

const borderStyleProperties = ['borderTopStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderRightStyle'] as const

const layoutStyles = defineProperties({
	conditions: {
		mobile: {},
		tablet: { '@media': 'screen and (min-width: 768px)' },
		desktop: { '@media': 'screen and (min-width: 1024px)' },
	},
	defaultCondition: 'mobile',
	responsiveArray: ['mobile', 'tablet', 'desktop'],
	properties: {
		position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
		display: [
			'none',
			'block',
			'inline',
			'contents',
			'inline-block',
			'flex',
			'inline-flex',
			'grid',
			'inline-grid',
			'table-cell',
		],
		visibility: ['hidden', 'visible'],
		flex: ['none', 'auto', '1', 'initial', 'inherit'],
		flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
		flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
		flexFlow: ['row wrap', 'column wrap'],
		justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline', 'self-start'],
		alignContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
		textAlign: ['left', 'center', 'right'],
		boxSizing: ['border-box'],
		scrollbarGutter: ['stable'],
		aspectRatio: ['1'],
		...mapTo(spaceProperties, vars.spacing),
		...mapTo(sizeProperties, { ...vars.spacing, ...vars.size }),
		...mapAndTransformTo(['overflow', 'overflowX', 'overflowY'], key => ({
			auto: 'auto',
			clip: 'clip',
			visible: 'visible',
			hidden: 'hidden',
			overlay: {
				[key]: ['auto', 'overlay'], // in Firefox and IE `overlay` will be ignored and `auto` will be applied
			},
			scroll: {
				[key]: 'scroll',
				msOverflowStyle: 'none' /* IE and Edge */,
				scrollbarWidth: 'none' /* Firefox */,
				'::-webkit-scrollbar': {
					display: 'none',
				},
			},
		})),
		pointerEvents: ['none', 'auto'],
		userSelect: ['auto', 'none', 'unset'],
		fontSize: ['12px', '14px', '16px', '18px', '20px', '22px', '24px'],
		lineHeight: ['1', '1.25', '1.5', '1.75', '2'],
		letterSpacing: ['normal', '0.5px', '1px', '1.5px', '2px'],
		...mapTo(
			['gridTemplateColumns', 'gridTemplateRows'],
			['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(auto-fill, minmax(100px, 1fr))'],
		),
		...mapTo(['gridColumnGap', 'gridRowGap', 'gridGap'], ['0', '5px', '10px', '15px']),
		gridAutoColumns: ['auto', 'minmax(100px, 1fr)', 'minmax(200px, 2fr)'],
		gridAutoRows: ['auto', 'minmax(100px, 1fr)', 'minmax(200px, 2fr)'],
		gridAutoFlow: ['row', 'column', 'row dense', 'column dense'],
		gridRow: ['auto', '1 / span 2', '2 / span 3'],
		gridColumn: ['auto', '1 / span 2', '2 / span 3'],
		gridArea: ['auto', 'header', 'footer', 'sidebar'],
		fontWeight: ['normal', 'bold', 'bolder', 'lighter', '400', '700'],
		fontStyle: ['normal', 'italic', 'oblique'],
		textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
		transform: ['none', 'translateX(10px)', 'translateY(10px)', 'scale(1.2)', 'rotate(45deg)'],
		transformOrigin: [
			'center',
			'top left',
			'top center',
			'top right',
			'center left',
			'center right',
			'bottom left',
			'bottom center',
			'bottom right',
		],
		...mapTo(borderProperties, [0, 1]),
		...mapTo(borderStyleProperties, ['none', 'solid', 'dashed', 'dotted', 'double']),
	},
	shorthands: {
		...mapTo(['p', 'padding'], ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']),
		pl: ['paddingLeft'],
		pr: ['paddingRight'],
		pt: ['paddingTop'],
		pb: ['paddingBottom'],
		...mapTo(['px', 'paddingX'], ['paddingLeft', 'paddingRight']),
		...mapTo(['py', 'paddingY'], ['paddingTop', 'paddingBottom']),
		...mapTo(['m', 'margin'], ['marginTop', 'marginBottom', 'marginRight', 'marginLeft']),
		ml: ['marginLeft'],
		mr: ['marginRight'],
		mt: ['marginTop'],
		mb: ['marginBottom'],
		...mapTo(['mx', 'marginX'], ['marginLeft', 'marginRight']),
		...mapTo(['my', 'marginY'], ['marginTop', 'marginBottom']),
		...mapTo(['b', 'border'], ['borderTop', 'borderBottom', 'borderLeft', 'borderRight']),
		bb: ['borderBottom'],
		bt: ['borderTop'],
		bl: ['borderLeft'],
		br: ['borderRight'],
		...mapTo(['bx', 'borderX'], ['borderLeft', 'borderRight']),
		...mapTo(['by', 'borderY'], ['borderTop', 'borderBottom']),
		borderStyle: ['borderTopStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderRightStyle'],
		inset: ['top', 'bottom', 'left', 'right'],
		o: ['overflow'],
		ox: ['overflowX'],
		oy: ['overflowY'],
	},
})

export const sprinkles = createSprinkles(layoutStyles, decorationStyles, colorStyles)

export type Sprinkles = Parameters<typeof sprinkles>[0]
