import React from 'react'
// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
// import { Side } from '@radix-ui/popper'
// import clsx from 'clsx'

// import * as styles from './tool-tip.css'

export const ToolTipRoot = TooltipPrimitive.Root
export const ToolTipTrigger = TooltipPrimitive.Trigger
export const ToolTipContent = TooltipPrimitive.Content

interface IToolTipRequiredProps {
	children: React.ReactNode
	message: string
}

interface IToolTipOptionalProps {
	// className?: number
	disabled?: boolean
	// onClick?: () => void
	// iconOnly?: boolean
}

interface IToolTipProps extends IToolTipRequiredProps, IToolTipOptionalProps {}

const defaultProps: IToolTipOptionalProps = {
	// className: undefined,
	disabled: false,
	// onClick: undefined,
	// iconOnly: false,
}

// isArrowVisible,
// sideOffset,
// arrowOffset,
// bgColor,
// side,
// css,

export const ToolTip: React.FC<IToolTipProps> = ({ children, message, disabled }) => (
	<ToolTipRoot>
		<ToolTipTrigger asChild>{children}</ToolTipTrigger>
		<ToolTipContent
		// sideOffset={sideOffset}
		// side={side}
		>
			{/* {isArrowVisible ? <TooltipArrow offset={arrowOffset} css={{ fill: bgColor }} /> : null} */}
			{!disabled ? message : null}
		</ToolTipContent>
	</ToolTipRoot>
)

ToolTip.defaultProps = defaultProps
