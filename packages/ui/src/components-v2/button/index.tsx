import React, { forwardRef, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

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
// type?: 'submit' | 'reset' | 'button';
}

export interface ButtonProps extends IProps, React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof cvaButton> {}

const defaultProps = {
children: undefined,
href: undefined,
// type: 'button',
}


export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref: React.Ref<HTMLButtonElement | null>) => {

const { children,  className, intent, size, icon, href,   onClick, ...rest } = props

const cvaClasses = cvaButton({ intent, size, icon, className })

	if (href) {
		return (
			<a href={href} className={cvaClasses}>
				{children}
			</a>
		)
	}
	return (
		<button type="button" ref={ref} className={cvaClasses} {...rest}>
			{children}
		</button>
	)
})

Button.defaultProps = defaultProps
