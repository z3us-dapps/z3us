import { Side } from '@radix-ui/popper'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import React from 'react'

import { radixWithClassName } from '../system/radix-with-class-name'
import { Text } from '../typography'
import * as styles from './tool-tip.css'

export const TooltipProvider = TooltipPrimitive.Provider
export const ToolTipRoot = TooltipPrimitive.Root
export const ToolTipTrigger = TooltipPrimitive.Trigger
export const ToolTipContent = radixWithClassName(TooltipPrimitive.Content, clsx(styles.toolTipContent))
export const ToolTipArrow = radixWithClassName(TooltipPrimitive.Arrow, styles.toolTipArrow)

interface IToolTipRequiredProps {
	children: React.ReactNode
	message: string
}

interface IToolTipOptionalProps {
	disabled?: boolean
	sideOffset?: number
	arrowOffset?: number
	side?: Side
	isArrowVisible?: boolean
}

interface IToolTipProps extends IToolTipRequiredProps, IToolTipOptionalProps {}

const defaultProps: IToolTipOptionalProps = {
	disabled: false,
	sideOffset: 3,
	arrowOffset: 5,
	isArrowVisible: true,
	side: 'bottom',
}

export const ToolTip: React.FC<IToolTipProps> = ({
	children,
	message,
	disabled,
	side,
	sideOffset,
	isArrowVisible,
	arrowOffset,
}) => (
	<TooltipProvider>
		<ToolTipRoot>
			<ToolTipTrigger asChild>{children}</ToolTipTrigger>
			<ToolTipContent sideOffset={sideOffset} side={side}>
				{isArrowVisible ? <ToolTipArrow offset={arrowOffset} /> : null}
				{!disabled ? (
					<Text size="xsmall" color="strong">
						{message}
					</Text>
				) : null}
			</ToolTipContent>
		</ToolTipRoot>
	</TooltipProvider>
)

ToolTip.defaultProps = defaultProps
