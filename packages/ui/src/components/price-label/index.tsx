/* eslint-disable react/jsx-props-no-spreading */
import type { PropsWithoutRef, RefAttributes} from 'react';
import React, { useImperativeHandle, useRef } from 'react'

import type { PropsWithCSS } from '../../types'
import { __DEV__ } from '../../utils/assertion'
import withDefaults from '../../utils/with-defaults'
import type { PriceLabelVariantsProps} from './price-label.styles';
import { StyledPriceLabel } from './price-label.styles'

export interface Props {
	as?: keyof JSX.IntrinsicElements
}

const defaultProps = {
	as: 'span' as keyof JSX.IntrinsicElements,
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type PriceLabelProps = React.PropsWithChildren<PropsWithCSS<Props & NativeAttrs & PriceLabelVariantsProps>>

const PriceLabel = React.forwardRef<HTMLDivElement, PriceLabelProps>(
	({ children, as, css, color, ...rest }, ref: React.Ref<HTMLDivElement | null>) => {
		const cardRef = useRef<HTMLDivElement>(null)
		useImperativeHandle(ref, () => cardRef.current)

		return (
			<StyledPriceLabel ref={cardRef} as={as} color={color} css={{ ...(css as any) }} {...rest}>
				{children}
			</StyledPriceLabel>
		)
	},
)

type PriceLabelComponent<T, P = {}> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

if (__DEV__) {
	PriceLabel.displayName = 'z3usUI - price label'
}

PriceLabel.toString = () => '.z3us price label'

export default withDefaults(PriceLabel, defaultProps) as PriceLabelComponent<HTMLDivElement, PriceLabelProps>
