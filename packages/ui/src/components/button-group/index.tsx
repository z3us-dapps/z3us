/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithoutRef, RefAttributes, useImperativeHandle, useRef } from 'react'
import withDefaults from '../../utils/with-defaults'
import { __DEV__ } from '../../utils/assertion'
import { PropsWithCSS } from '../../types'
import { StyledButtonGroup, ButtonGroupVariantsProps } from './button-group.styles'

export interface Props {
	as?: keyof JSX.IntrinsicElements
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type AlertCardProps = Props & NativeAttrs & ButtonGroupVariantsProps

const defaultProps: Partial<AlertCardProps> = {
	as: 'div' as keyof JSX.IntrinsicElements,
}

const ButtonGroup = React.forwardRef<HTMLDivElement, React.PropsWithChildren<PropsWithCSS<AlertCardProps>>>(
	({ children, as, css, color, ...rest }, ref: React.Ref<HTMLDivElement | null>) => {
		const cardRef = useRef<HTMLDivElement>(null)
		useImperativeHandle(ref, () => cardRef.current)

		return (
			<StyledButtonGroup ref={cardRef} as={as} css={{ ...(css as any) }} {...rest}>
				{children}
			</StyledButtonGroup>
		)
	},
)

type CardComponent<T, P = {}> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> & {
	Image: typeof Image
}

if (__DEV__) {
	ButtonGroup.displayName = 'z3usUI - button group'
}

ButtonGroup.toString = () => '.z3us button group'

export default withDefaults(ButtonGroup, defaultProps) as CardComponent<HTMLDivElement, AlertCardProps>
