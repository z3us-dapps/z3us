import { AnimatePresence } from 'framer-motion'
import React from 'react'

import type { CSS } from '../../theme'
import { __DEV__ } from '../../utils/assertion'
import { MotionBox } from '../atoms/motion-box'

export interface IProps {
	children: React.ReactNode
	showFeedback: boolean
	animateHeight?: number
	css?: CSS
}

const defaultProps = {
	animateHeight: 50,
	css: { display: 'flex', alignItems: 'center', overflow: 'clip' },
}

export const InputFeedback: React.FC<IProps> = ({ children, showFeedback, animateHeight, css, ...rest }) => (
	<AnimatePresence>
		{showFeedback && (
			<MotionBox
				initial={{ opacity: 0, height: '0px' }}
				animate={{ opacity: 1, height: `${animateHeight}px` }}
				exit={{ opacity: 1, height: '0px' }}
				css={{ ...(css as any) }}
				{...rest}
			>
				{children}
			</MotionBox>
		)}
	</AnimatePresence>
)

if (__DEV__) {
	InputFeedback.displayName = 'z3us ui - input feedback'
}

InputFeedback.toString = () => '.z3us-ui-input-feedback'
InputFeedback.defaultProps = defaultProps

export default InputFeedback
