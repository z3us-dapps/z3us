import React, { useRef, useState } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { CSS } from '../../theme'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from '../tool-tip'
import { Box } from '../atoms/box'
import { Flex } from '../atoms/flex'

export interface IProps {
	children: React.ReactElement
	tooltip: string
	feedback?: string
	showToolTipArrow?: boolean
	toolTipOffset?: number
	delay?: number
	sideOffset?: number
	bgColor?: string
	css?: CSS
}

const ButtonTipFeedback: React.FC<IProps> = ({
	children,
	feedback,
	tooltip,
	sideOffset,
	showToolTipArrow,
	toolTipOffset,
	delay,
	bgColor,
	css,
}) => {
	const timeoutEnterRef = useRef(null)
	const timeoutLeaveRef = useRef(null)
	const timeoutFeedbackRef = useRef(null)
	const [isOpen, setIsOpen] = useState(false)
	const [isShowFeedback, setIsShowFeedback] = useState(false)
	let clonedButton = null

	const handleShowFeedback = () => {
		setIsShowFeedback(true)
		setIsOpen(true)
	}

	React.Children.forEach(children, child => {
		clonedButton = React.cloneElement(child as React.ReactElement, {
			onMouseEnter: () => {
				clearTimeout(timeoutLeaveRef.current)
				timeoutEnterRef.current = setTimeout(() => {
					setIsOpen(true)
				}, delay)
			},
			onMouseLeave: () => {
				clearTimeout(timeoutEnterRef.current)
				timeoutLeaveRef.current = setTimeout(() => {
					setIsOpen(false)
				}, delay)
				timeoutFeedbackRef.current = setTimeout(() => {
					setIsShowFeedback(false)
				}, delay + 200)
			},
			onClick: () => {
				child.props?.onClick()
				clearTimeout(timeoutEnterRef.current)
				clearTimeout(timeoutLeaveRef.current)
				clearTimeout(timeoutFeedbackRef.current)
				handleShowFeedback()
			},
		})
	})

	return (
		<Tooltip open={isOpen}>
			<TooltipTrigger asChild>{clonedButton}</TooltipTrigger>
			<TooltipContent
				side="top"
				sideOffset={sideOffset}
				css={{ position: 'relative', ...(css as any), backgroundColor: bgColor }}
			>
				{showToolTipArrow ? <TooltipArrow offset={toolTipOffset} css={{ fill: bgColor }} /> : null}
				<Box css={{ fill: '$txtDefault', opacity: isShowFeedback ? '0' : '1', transition: '$default' }}>{tooltip}</Box>
				<Flex
					justify="center"
					align="center"
					gap="1"
					css={{
						position: 'absolute',
						top: '5px',
						left: '0',
						right: '0',
						textAlign: 'center',
						fill: '$txtDefault',
						opacity: isShowFeedback ? '1' : '0',
						transition: '$default',
					}}
				>
					<CheckIcon />
					{feedback}
				</Flex>
			</TooltipContent>
		</Tooltip>
	)
}

ButtonTipFeedback.defaultProps = {
	feedback: 'Copied',
	sideOffset: 3,
	showToolTipArrow: true,
	toolTipOffset: 0,
	delay: 700,
	css: undefined,
	bgColor: undefined,
}

export default ButtonTipFeedback
