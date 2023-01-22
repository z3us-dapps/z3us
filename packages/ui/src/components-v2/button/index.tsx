import React, { forwardRef, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import './button.css'

const cvaButton = cva('z3-c-button', {
	variants: {
		intent: {
			primary: ['z3-c-button--primary'],
			secondary: ['z3-c-button--secondary'],
			tertiary: ['z3-c-button--tertiary'],
			ghost: ['z3-c-button--ghost'],
		},
		size: {
			small: ['z3-c-button--small'],
			large: ['z3-c-button--large'],
		},
		icon: {
			true: ['z3-c-button--icon-only'],
			false: [''],
		},
	},
	compoundVariants: [{ intent: 'primary', className: 'uppercase-' }],
	defaultVariants: {
		intent: 'primary',
		size: 'small',
	},
})

interface IProps {
	children?: ReactNode
	href?: string | undefined
	onClick?: any
	// type?: 'submit' | 'reset' | 'button';
}

export interface ButtonProps extends IProps, React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof cvaButton> {}

const defaultProps = {
	children: undefined,
	href: undefined,
	onClick: undefined,
	// type: 'button',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref: React.Ref<HTMLButtonElement | null>) => {
	const { children, className, intent, size, icon, href, onClick, ...rest } = props

	const cvaClasses = cvaButton({ intent, size, icon, className })

	const handleOnClick = () => {
		// TODO: pass event
		if (onClick) {
			onClick()
		}
	}

	if (href) {
		return (
			<a href={href} className={cvaClasses} onClick={handleOnClick}>
				{children}
			</a>
		)
	}
	return (
		<button type="button" ref={ref} className={cvaClasses} onClick={handleOnClick} {...rest}>
			{children}
		</button>
	)
})

Button.defaultProps = defaultProps
