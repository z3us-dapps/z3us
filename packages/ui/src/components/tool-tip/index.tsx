import type { Side } from '@radix-ui/popper'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import React from 'react'

import { Text } from '../typography'
import * as styles from './tool-tip.css'

export const TooltipProvider = TooltipPrimitive.Provider
export const ToolTipRoot = TooltipPrimitive.Root
export const ToolTipPortal = TooltipPrimitive.Portal
export const ToolTipTrigger = TooltipPrimitive.Trigger
export const ToolTipContent = TooltipPrimitive.Content
export const ToolTipArrow = TooltipPrimitive.Arrow

interface IToolTipProps {
	children: React.ReactNode
	message: React.ReactNode
	disabled?: boolean
	sideOffset?: number
	arrowOffset?: number
	side?: Side
	isArrowVisible?: boolean
}

export const ToolTip: React.FC<IToolTipProps> = ({
	children,
	message,
	disabled,
	side = 'top',
	sideOffset = 5,
	isArrowVisible = false,
	arrowOffset = 5,
}) => (
	<TooltipProvider>
		<ToolTipRoot>
			<ToolTipTrigger asChild>{children}</ToolTipTrigger>
			<ToolTipPortal>
				{!disabled ? (
					<ToolTipContent
						sideOffset={sideOffset}
						side={side}
						collisionPadding={10}
						className={clsx(styles.toolTipContent)}
					>
						{isArrowVisible ? <ToolTipArrow offset={arrowOffset} className={clsx(styles.toolTipArrow)} /> : null}
						<Text size="xxsmall" color="white">
							{message}
						</Text>
					</ToolTipContent>
				) : null}
			</ToolTipPortal>
		</ToolTipRoot>
	</TooltipProvider>
)
