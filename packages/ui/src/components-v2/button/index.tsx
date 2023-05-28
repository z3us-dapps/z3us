import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import * as styles from './button.css'

export type TType = 'button' | 'submit'
export type TSizeVariant = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
export type TStyleVariant =
	| 'primary'
	| 'secondary'
	| 'secondary-error'
	| 'tertiary'
	| 'ghost'
	| 'inverse'
	| 'white-transparent'

interface IButtonRequiredProps {
	children: React.ReactNode
}

interface IButtonOptionalProps {
	className?: string
	linkFrameWorkComp?: any
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	iconOnly?: boolean
	rightIcon?: React.ReactNode
	leftIcon?: React.ReactNode
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
	type?: TType
	href?: string
	rounded?: boolean
	fullWidth?: boolean
	loading?: boolean
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
	fullWidth: false,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
	type: 'button',
	href: undefined,
	loading: false,
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref: React.Ref<HTMLButtonElement | null>) => {
	const {
		children,
		disabled,
		iconOnly,
		rightIcon,
		leftIcon,
		rounded,
		fullWidth,
		onClick,
		className,
		sizeVariant,
		styleVariant,
		type,
		linkFrameWorkComp,
		href,
		loading,
		...rest
	} = props

	const ButtonComponent = linkFrameWorkComp || Box

	const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled) return

		if (onClick) {
			onClick(e)
		}
	}

	return (
		<ButtonComponent
			component={href ? 'a' : 'button'}
			href={href}
			type={type}
			ref={ref}
			className={clsx(
				className,
				styles.baseSprinkles,
				styles.button({
					sizeVariant,
					styleVariant,
					iconOnly,
					disabled,
					rounded,
					fullWidth,
				}),
			)}
			disabled={disabled}
			onClick={clickHandler}
			{...rest}
		>
			{leftIcon ? (
				<Box
					className={clsx(
						styles.buttonIconLeft({
							sizeVariant,
							styleVariant,
							iconOnly,
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
						styles.buttonIconRight({
							sizeVariant,
							styleVariant,
							iconOnly,
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
