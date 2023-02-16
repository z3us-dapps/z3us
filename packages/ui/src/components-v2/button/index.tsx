import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { Box } from '../box'

import * as styles from './button.css'

interface IButtonRequiredProps {
	children: React.ReactNode
}

interface IButtonOptionalProps {
	className?: number
	linkFrameWorkComp?: any
	onClick?: () => void
	disabled?: boolean
	iconOnly?: boolean
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'inverse'
	href?: string
	rounded?: boolean
}

export interface IButtonProps extends IButtonRequiredProps, IButtonOptionalProps {}

const defaultProps: IButtonOptionalProps = {
	className: undefined,
	linkFrameWorkComp: undefined,
	onClick: undefined,
	iconOnly: false,
	rounded: false,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
	href: undefined,
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref: React.Ref<HTMLButtonElement | null>) => {
	const {
		children,
		disabled,
		iconOnly,
		rounded,
		onClick,
		className,
		sizeVariant,
		styleVariant,
		linkFrameWorkComp,
		href,
		...rest
	} = props

	const ButtonComponent = linkFrameWorkComp || Box

	return (
		<ButtonComponent
			component={href ? 'a' : 'button'}
			type="button"
			ref={ref}
			className={clsx(
				className,
				styles.buttonReset,
				styles.baseSprinkles,
				styles.button({
					sizeVariant,
					styleVariant,
					iconOnly,
					disabled,
					rounded,
				}),
			)}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{children}
		</ButtonComponent>
	)
})

Button.defaultProps = defaultProps
