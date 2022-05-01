/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithoutRef, RefAttributes, useImperativeHandle, useRef } from 'react'
import { CSS } from '../../theme'
import withDefaults from '../../utils/with-defaults'
import { __DEV__ } from '../../utils/assertion'
import { StyledButtonGroup, ButtonGroupVariantsProps } from './button-group.styles'

export interface Props {
	as?: keyof JSX.IntrinsicElements
}

const defaultProps = {
	as: 'div',
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type AlertCardProps = Props & NativeAttrs & ButtonGroupVariantsProps & { css?: CSS }

const ButtonGroup = React.forwardRef<HTMLDivElement, React.PropsWithChildren<AlertCardProps>>(
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
