import { Side } from '@radix-ui/popper'
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

export type TTheme = 'backgroundSecondary' | 'backgroundPrimary'

interface IToolTipRequiredProps {
	children: React.ReactNode
	message: string | React.ReactNode
}

interface IToolTipOptionalProps {
	disabled?: boolean
	sideOffset?: number
	arrowOffset?: number
	side?: Side
	isArrowVisible?: boolean
	theme?: TTheme
}

interface IToolTipProps extends IToolTipRequiredProps, IToolTipOptionalProps {}

const defaultProps: IToolTipOptionalProps = {
	disabled: false,
	sideOffset: 3,
	arrowOffset: 5,
	isArrowVisible: true,
	side: 'bottom',
	theme: 'backgroundSecondary',
}

export const ToolTip: React.FC<IToolTipProps> = ({
	children,
	message,
	disabled,
	side,
	sideOffset,
	isArrowVisible,
	arrowOffset,
	theme,
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
						className={clsx(
							styles.toolTipContent,
							theme === 'backgroundSecondary' ? styles.toolTipContentBgSecondary : styles.toolTipContentBgPrimary,
						)}
					>
						{isArrowVisible ? (
							<ToolTipArrow
								offset={arrowOffset}
								className={clsx(
									styles.toolTipArrow,
									theme === 'backgroundSecondary' ? styles.toolTipArrowFillSecondary : styles.toolTipArrowFillPrimary,
								)}
							/>
						) : null}
						<Text size="xsmall" color="strong">
							{message}
						</Text>
					</ToolTipContent>
				) : null}
			</ToolTipPortal>
		</ToolTipRoot>
	</TooltipProvider>
)

ToolTip.defaultProps = defaultProps
