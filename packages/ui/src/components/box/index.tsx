import clsx, { type ClassValue } from 'clsx'
import type { AllHTMLAttributes, ElementType } from 'react'
import { createElement, forwardRef } from 'react'

import { type Sprinkles, resetBase, sprinkles } from 'ui/src/theme/sprinkles.css'

export interface SprinklesFnBase {
	(...args: any): string
	properties: Set<string>
}

export function extractSprinklesFromProps<Fn extends SprinklesFnBase>(props: any, sprinklesFn: Fn) {
	let hasSprinkleProps = false
	const sprinklesProps: Record<string, unknown> = {}
	const otherProps: Record<string, unknown> = {}
	const customProps: Record<string, unknown> = {}

	// eslint-disable-next-line no-restricted-syntax
	for (const key in props) {
		if (key[0] === '_' && key[1] === '_') {
			const actualKey = key.substring(2)
			customProps[actualKey] = props[key]
		} else if (sprinklesFn.properties.has(key)) {
			hasSprinkleProps = true
			sprinklesProps[key] = props[key]
		} else {
			otherProps[key] = props[key]
		}
	}

	return { hasSprinkleProps, sprinklesProps, otherProps, customProps }
}

export interface BoxProps
	extends Omit<
			AllHTMLAttributes<HTMLElement>,
			'className' | 'content' | 'height' | 'translate' | 'color' | 'width' | 'cursor'
		>,
		Sprinkles {
	component?: ElementType
	className?: ClassValue
}

const defaultElement = 'div'

export const Box = forwardRef(
	(
		{ component = defaultElement, className, style, type, ...props }: BoxProps,
		// TODO: fix type
		ref: any,
	) => {
		const { sprinklesProps, customProps, otherProps } = extractSprinklesFromProps(props, sprinkles)
		const atomClasses = clsx(resetBase, sprinkles(sprinklesProps), className)

		if (component === 'button' && !type) {
			type = 'button'
		}

		return createElement(component, {
			ref,
			type,
			style: { ...style, ...customProps },
			...otherProps,
			className: atomClasses,
		})
	},
)

Box.defaultProps = {
	component: defaultElement,
	className: undefined,
}
