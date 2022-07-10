import { ElementType } from 'react'

export const tuple = <T extends string[]>(...args: T) => args

const normalSizes = tuple('1', '2', '3', '4', '5', '6')

export const normalColors = tuple('default', 'primary', 'secondary', 'tertiary', 'inverse', 'ghost', 'red', 'input')

export const normalLoaders = tuple('default', 'points', 'points-opacity', 'gradient', 'spinner')

export const normalWeights = tuple('light', 'normal', 'bold', 'extrabold', 'black')

export const textWeights = tuple(
	/* Keyword values */
	'normal',
	'bold',
	/* Keyword values relative to the parent */
	'lighter',
	'bolder',
	/* Global values */
	'inherit',
	'initial',
	'revert',
	'unset',
)

export const textTransforms = tuple(
	/* Keyword values */
	'none',
	'capitalize',
	'uppercase',
	'lowercase',
	'full-width',
	'full-size-kana',
	/* Global values */
	'inherit',
	'initial',
	'revert',
	'unset',
)

const copyTypes = tuple('default', 'slient', 'prevent')

const triggerTypes = tuple('hover', 'click')

const placement = tuple(
	'top',
	'topStart',
	'topEnd',
	'left',
	'leftStart',
	'leftEnd',
	'bottom',
	'bottomStart',
	'bottomEnd',
	'right',
	'rightStart',
	'rightEnd',
)

const position = tuple(
	'static',
	'relative',
	'absolute',
	'fixed',
	'sticky',
	/* Global values */
	'inherit',
	'initial',
	'revert',
	'unset',
)

const objectFit = tuple(
	'contain',
	'cover',
	'fill',
	'none',
	'scale-down',
	/* Global values */
	'inherit',
	'initial',
	'revert',
	'unset',
)

const dividerAlign = tuple('start', 'center', 'end', 'left', 'right')

const justify = tuple('flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly')

const alignItems = tuple('flex-start', 'flex-end', 'center', 'stretch', 'baseline')

const alignContent = tuple('stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around')

const direction = tuple('row', 'row-reverse', 'column', 'column-reverse')

const wrap = tuple('nowrap', 'wrap', 'wrap-reverse')

const display = tuple('flex', 'block', 'grid', 'inline', 'inline-block', 'inline-flex', 'inline-grid')

const contentPosition = tuple('left', 'right')

export const excludedInputPropsForTextarea = tuple(
	'clearable',
	'as',
	'rounded',
	'labelLeft',
	'labelRight',
	'contentLeft',
	'contentRight',
	'contentClickable',
	'contentLeftStyling',
	'contentRightStyling',
	'onContentClick',
	'onClearClick',
	'css',
)

export type Display = typeof display[number]

export type Justify = typeof justify[number]

export type AlignItems = typeof alignItems[number]

export type AlignContent = typeof alignContent[number]

export type Direction = typeof direction[number]

export type Wrap = typeof wrap[number]

export type NormalSizes = typeof normalSizes[number]

export type NormalWeights = typeof normalWeights[number]

export type TextWeights = typeof textWeights[number] | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export type TextTransforms = typeof textTransforms[number]

export type NormalColors = typeof normalColors[number]

export type CopyTypes = typeof copyTypes[number]

export type ObjectFit = typeof objectFit[number]

export type TriggerTypes = typeof triggerTypes[number]

export type Placement = typeof placement[number]

export type Position = typeof position[number]

export type DividerAlign = typeof dividerAlign[number]

export type ContentPosition = typeof contentPosition[number]

export type BreakpointsValue = number | boolean

export type ExcludedInputProps = typeof excludedInputPropsForTextarea[number]

export interface AsProp<As extends ElementType = ElementType> {
	as?: As
}
