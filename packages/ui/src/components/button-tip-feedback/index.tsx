import React, { useState, useRef } from 'react'
import { CSS } from '../../theme'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from '../tool-tip'
import { Box } from '../atoms/box'

export interface IProps {
	children: React.ReactElement
	feedback: string
	showToolTipArrow?: boolean
	delay?: number
	sideOffset?: number
	bgColor?: string
	css?: CSS
}

const defaultProps = {
	showToolTipArrow: true,
	delay: 1000,
	sideOffset: 5,
	bgColor: '$bgColor2',
	css: undefined,
}

const ButtonTipFeedback: React.FC<IProps> = ({
	children,
	feedback,
	sideOffset,
	showToolTipArrow,
	delay,
	bgColor,
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
			<TooltipContent side="top" sideOffset={sideOffset} css={{ ...(css as any), backgroundColor: bgColor }}>
				{showToolTipArrow ? <TooltipArrow css={{ fill: bgColor }} /> : null}
				<Box css={{ fill: '$txtDefault' }}>{feedback}</Box>
			</TooltipContent>
		</Tooltip>
	)
}

ButtonTipFeedback.defaultProps = defaultProps

export default ButtonTipFeedback
