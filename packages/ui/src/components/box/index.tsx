import clsx, { type ClassValue } from 'clsx'
import type { AllHTMLAttributes, ElementType } from 'react'
import { createElement, forwardRef } from 'react'

import { type Sprinkles, resetBase, sprinkles } from 'ui/src/theme/sprinkles.css'

export interface BoxProps
	extends Omit<
			AllHTMLAttributes<HTMLElement>,
			'className' | 'content' | 'height' | 'translate' | 'color' | 'width' | 'cursor'
		>,
		Sprinkles {
	component?: ElementType
	className?: ClassValue
}

export const Box = forwardRef(
	(
		{
			component = 'div',
			className,
			padding,
			paddingX,
			paddingY,
			paddingTop,
			paddingBottom,
			paddingLeft,
			paddingRight,
			margin,
			marginX,
			marginY,
			marginTop,
			marginBottom,
			marginLeft,
			marginRight,
			display,
			alignItems,
			justifyContent,
			flexDirection,
			background,
			boxShadow,
			color,
			flexWrap,
			flexGrow,
			flexShrink,
			borderRadius,
			borderBottom,
			borderTop,
			borderLeft,
			borderRight,
			borderStyle,
			borderColor,
			position,
			gap,
			top,
			bottom,
			left,
			right,
			inset,
			width,
			height,
			zIndex,
			opacity,
			pointerEvents,
			cursor,
			textAlign,
			maxWidth,
			minWidth,
			transition,
			overflow,
			type,
			...restProps
		}: BoxProps,
		// TODO: fix type
		ref: any,
	) => {
		const atomClasses = clsx(
			resetBase,
			sprinkles({
				padding,
				paddingX,
				paddingY,
				paddingTop,
				paddingBottom,
				paddingLeft,
				paddingRight,
				margin,
				marginX,
				marginY,
				marginTop,
				marginBottom,
				marginLeft,
				marginRight,
				display,
				alignItems,
				justifyContent,
				flexDirection,
				background,
				boxShadow,
				color,
				flexWrap,
				flexGrow,
				flexShrink,
				borderRadius,
				borderBottom,
				borderTop,
				borderLeft,
				borderRight,
				borderStyle,
				borderColor,
				position,
				gap,
				top,
				bottom,
				left,
				right,
				inset,
				width,
				height,
				zIndex,
				opacity,
				pointerEvents,
				cursor,
				textAlign,
				maxWidth,
				minWidth,
				transition,
				overflow,
			}),
			className,
		)

		if (component === 'button' && !type) {
			type = 'button'
		}

		return createElement(component, { className: atomClasses, ref, type, ...restProps })
	},
)

Box.defaultProps = {
	component: 'div',
	className: undefined,
}
