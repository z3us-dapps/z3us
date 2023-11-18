import clsx from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './styles.css'

export type TType = 'button' | 'submit'
type TTSizeVariantOption = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

export type TSizeVariant =
	| TTSizeVariantOption
	| {
			mobile?: TTSizeVariantOption
			tablet?: TTSizeVariantOption
			desktop?: TTSizeVariantOption
	  }

export type TStyleVariant =
	| 'primary'
	| 'secondary'
	| 'secondary-error'
	| 'tertiary'
	| 'tertiary-error'
	| 'ghost'
	| 'inverse'
	| 'white-transparent'
	| 'destructive'
	| 'avatar'

interface IButtonRequiredProps {
	children: React.ReactNode
}

interface IButtonOptionalProps {
	className?: string
	linkFrameWorkComp?: any
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	onMouseOver?: React.MouseEventHandler<HTMLButtonElement>
	onMouseOut?: React.MouseEventHandler<HTMLButtonElement>
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
	active?: boolean
}

export interface IButtonProps extends IButtonRequiredProps, IButtonOptionalProps {}

const defaultProps: IButtonOptionalProps = {
	className: undefined,
	linkFrameWorkComp: undefined,
	onClick: undefined,
	onMouseOver: undefined,
	onMouseOut: undefined,
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
	active: false,
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
		active,
		...rest
	} = props

	const sizeVariantMobile = typeof sizeVariant === 'object' ? sizeVariant.mobile : sizeVariant
	const sizeVariantTablet = typeof sizeVariant === 'object' ? sizeVariant.tablet : undefined

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
					sizeVariant: sizeVariantMobile,
					sizeVariantTablet,
					styleVariant,
					iconOnly,
					disabled,
					rounded,
					fullWidth,
					active,
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
							sizeVariant: sizeVariantMobile,
							sizeVariantTablet,
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
							sizeVariant: sizeVariantMobile,
							sizeVariantTablet,
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
