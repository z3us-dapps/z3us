import { AllHTMLAttributes, createElement, ElementType, forwardRef } from 'react'
import clsx from 'clsx'
// import * as resetStyles from '@src/components-v2/system/reset.css'
import * as resetStyles from '../system/reset.css'
import { sprinkles, Sprinkles } from '../system/sprinkles.css'

export interface BoxProps
	extends Omit<
			AllHTMLAttributes<HTMLElement>,
			'className' | 'content' | 'height' | 'translate' | 'color' | 'width' | 'cursor'
		>,
		Sprinkles {
	component?: ElementType
	className?: Parameters<typeof clsx>[0]
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
			...restProps
		}: BoxProps,
		ref: any,
	) => {
		const atomClasses = clsx(
			resetStyles.base,
			resetStyles.element[component as keyof typeof resetStyles.element],
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

		return createElement(component, { className: atomClasses, ...restProps })
	},
)

Box.defaultProps = {
	component: 'div',
	className: undefined,
}
