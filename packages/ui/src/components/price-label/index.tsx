/* eslint-disable react/jsx-props-no-spreading */
import React, { useImperativeHandle, useRef } from 'react'
import { CSS } from '../../theme'
import { __DEV__ } from '../../utils/assertion'
import { StyledPriceLabel, PriceLabelVariantsProps } from './price-label.styles'

export interface Props {
	as?: keyof JSX.IntrinsicElements
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type PriceLabelProps = Props & NativeAttrs & PriceLabelVariantsProps & { css?: CSS }

const PriceLabel = React.forwardRef<HTMLDivElement, React.PropsWithChildren<PriceLabelProps>>(
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

if (__DEV__) {
	PriceLabel.displayName = 'z3usUI - price label'
}

PriceLabel.toString = () => '.z3us price label'

PriceLabel.defaultProps = {
	as: 'span',
	css: undefined,
}

export default PriceLabel
