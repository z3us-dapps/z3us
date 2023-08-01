import type { Side } from '@radix-ui/popper'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import React from 'react'

import Translation from 'ui/src/components/translation'

import { Text } from '../typography'
import * as styles from './tool-tip.css'

export const TooltipProvider = TooltipPrimitive.Provider
export const ToolTipRoot = TooltipPrimitive.Root
export const ToolTipPortal = TooltipPrimitive.Portal
export const ToolTipTrigger = TooltipPrimitive.Trigger
export const ToolTipContent = TooltipPrimitive.Content
export const ToolTipArrow = TooltipPrimitive.Arrow

export type TTheme = 'backgroundSecondary' | 'backgroundPrimary'

interface IToolTipProps {
	children: React.ReactNode
	message: string | React.ReactNode
	disabled?: boolean
	sideOffset?: number
	arrowOffset?: number
	side?: Side
	isArrowVisible?: boolean
	isTranslated?: boolean
	theme?: TTheme
}

export const ToolTip: React.FC<IToolTipProps> = ({
	children,
	message,
	disabled,
	side = 'bottom',
	sideOffset = 5,
	isArrowVisible = false,
	arrowOffset = 5,
	isTranslated = true,
	theme = 'backgroundSecondary',
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
						<Text size="xxsmall" color="strong">
							{isTranslated
								? `${message}`.split(' ').map((m, i) => (
										// eslint-disable-next-line react/no-array-index-key
										<React.Fragment key={`${i}-${m}`}>
											{i > 0 ? ' ' : null}
											<Translation capitalizeFirstLetter={i === 0} text={m as string} />
										</React.Fragment>
								  ))
								: message}
						</Text>
					</ToolTipContent>
				) : null}
			</ToolTipPortal>
		</ToolTipRoot>
	</TooltipProvider>
)
