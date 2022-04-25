import React, { useState, useRef } from 'react'
import { CSS } from '../../theme'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from '../tool-tip'

export interface IProps {
	children: React.ReactElement
	feedback: string
	showToolTipArrow?: boolean
	delay?: number
	sideOffset?: number
	css?: CSS
}

const defaultProps = {
	showToolTipArrow: true,
	delay: 1000,
	sideOffset: 5,
	css: undefined,
}

const ButtonTipFeedback: React.FC<IProps> = ({
	children,
	feedback,
	sideOffset,
	showToolTipArrow,
	delay,
	css,
}: IProps) => {
	const timeoutRef = useRef(null)
	const [feedbackVisible, setFeedbackVisible] = useState(false)
	let clonedButton = null

	const handleShowFeedback = () => {
		setFeedbackVisible(true)
		timeoutRef.current = setTimeout(() => {
			setFeedbackVisible(false)
		}, delay)
	}

	React.Children.forEach(children, child => {
		clonedButton = React.cloneElement(child as React.ReactElement, {
			onClick: () => {
				child.props?.onClick()
				clearTimeout(timeoutRef.current)
				handleShowFeedback()
			},
		})
	})

	return (
		<Tooltip open={feedbackVisible}>
			<TooltipTrigger asChild>{clonedButton}</TooltipTrigger>
			<TooltipContent side="top" sideOffset={sideOffset} css={{ ...(css as any) }}>
				{showToolTipArrow ? <TooltipArrow /> : null}
				{feedback}
			</TooltipContent>
		</Tooltip>
	)
}

ButtonTipFeedback.defaultProps = defaultProps

export default ButtonTipFeedback
