// TODO: remove spreading by just explicity passing css props
/* eslint-disable react/jsx-props-no-spreading  */
import React from 'react'
// @TODO: remove polymorphic as it is depreceated
import type * as Polymorphic from '@radix-ui/react-polymorphic'
import { motion, MotionProps } from 'framer-motion'
import { Box } from './box'
import { CSS } from '../../theme'

const DEFAULT_TAG = 'div'

type MotionBoxProps = {
	children: React.ReactNode
} & typeof defaultMotionBoxProps

const defaultMotionBoxProps = {
	children: null,
}

type CSSProp = { css?: CSS }
type MotionBoxOwnProps = CSSProp & MotionProps
type MotionBoxComponent = Polymorphic.ForwardRefComponent<typeof DEFAULT_TAG, MotionBoxOwnProps>

const MotionBox = motion(
	React.forwardRef(({ children, ...rest }: MotionBoxProps, forwardedRef) => (
		<Box {...rest} ref={forwardedRef}>
			{children}
		</Box>
	)),
) as MotionBoxComponent

MotionBox.defaultProps = defaultMotionBoxProps

MotionBox.displayName = 'MotionBox'

export { MotionBox }
