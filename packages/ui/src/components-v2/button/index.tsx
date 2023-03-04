import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { Box } from '../box'

import * as styles from './button.css'

type TSizeVariant = 'small' | 'medium' | 'large' | 'xlarge'
type TStyleVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'inverse'

interface IButtonRequiredProps {
	children: React.ReactNode
}

interface IButtonOptionalProps {
	className?: string
	linkFrameWorkComp?: any
	onClick?: () => void
	disabled?: boolean
	iconOnly?: boolean
	rightIcon?: React.ReactNode
	leftIcon?: React.ReactNode
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
	href?: string
	rounded?: boolean
}

export interface IButtonProps extends IButtonRequiredProps, IButtonOptionalProps {}

const defaultProps: IButtonOptionalProps = {
	className: undefined,
	linkFrameWorkComp: undefined,
	onClick: undefined,
	iconOnly: false,
	rightIcon: undefined,
	leftIcon: undefined,
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
		rightIcon,
		leftIcon,
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
			href={href}
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
			{leftIcon ? (
				<Box
					className={clsx(
						className,
						styles.buttonIconLeft({
							sizeVariant,
							styleVariant,
						}),
					)}
				>
					{leftIcon}
				</Box>
			) : null}
			{children}
			{rightIcon ? (
				<Box
					className={clsx(
						className,
						styles.buttonIconRight({
							sizeVariant,
							styleVariant,
						}),
					)}
				>
					{rightIcon}
				</Box>
			) : null}
		</ButtonComponent>
	)
})

Button.defaultProps = defaultProps
