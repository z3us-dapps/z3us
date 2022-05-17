/* eslint-disable react/jsx-props-no-spreading */
import React, { useImperativeHandle, useRef } from 'react'
import { CSS } from '../../theme'
import { __DEV__ } from '../../utils/assertion'
import { StyledLoaderBars, LoaderBarsVariantsProps } from './loader-bars.styles'
import { Box } from '../atoms/box'

export interface Props {
	as?: keyof JSX.IntrinsicElements
	size?: string
	css?: CSS
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>

export type PriceLabelProps = Props & NativeAttrs & LoaderBarsVariantsProps & { css?: CSS }

const LoaderBars = React.forwardRef<HTMLDivElement, React.PropsWithChildren<PriceLabelProps>>(
	({ children, as, size, css, color, ...rest }, ref: React.Ref<HTMLDivElement | null>) => {
		const loaderBarRef = useRef<HTMLDivElement>(null)
		useImperativeHandle(ref, () => loaderBarRef.current)

		return (
			<StyledLoaderBars ref={loaderBarRef} as={as} size={size} color={color} css={{ ...(css as any) }} {...rest}>
				<Box as="div">
					<Box as="span" />
					<Box as="span" />
					<Box as="span" />
					<Box as="span" />
				</Box>
			</StyledLoaderBars>
		)
	},
)

if (__DEV__) {
	LoaderBars.displayName = 'z3usUI - loader bars'
}

LoaderBars.toString = () => '.z3us loader bars'

LoaderBars.defaultProps = {
	as: 'span',
	size: '2',
	css: undefined,
}

export default LoaderBars
