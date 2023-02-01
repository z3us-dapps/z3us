import React, { forwardRef } from 'react'
import clsx from 'clsx'

import * as styles from './button.css'

interface IButtonRequiredProps {
	children: React.ReactNode
}

interface IButtonOptionalProps {
	className?: number
	onClick?: () => void
	disabled?: boolean
	iconOnly?: boolean
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary' | 'ghost'
}

interface IButtonProps extends IButtonRequiredProps, IButtonOptionalProps {}

const defaultProps: IButtonOptionalProps = {
	className: undefined,
	onClick: undefined,
	iconOnly: false,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref: React.Ref<HTMLButtonElement | null>) => {
	const { children, disabled, iconOnly, onClick, className, sizeVariant, styleVariant, ...rest } = props

	return (
		<button
			ref={ref}
			type="button"
			className={clsx(
				className,
				styles.buttonReset,
				styles.baseSprinkles,
				styles.button({
					sizeVariant,
					styleVariant,
					iconOnly,
				}),
			)}
			disabled={disabled}
			onClick={onClick}
			{...rest}
		>
			{children}
		</button>
	)
})

Button.defaultProps = defaultProps
