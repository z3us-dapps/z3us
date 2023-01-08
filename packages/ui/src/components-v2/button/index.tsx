/* eslint-disable */
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import './button.css'

const cvaButton = cva('z3-c-button', {
	variants: {
		intent: {
			primary: ['z3-c-button--primary'],
			secondary: ['z3-c-button--secondary'],
			ghost: ['z3-c-button--ghost'],
		},
		size: {
			small: ['z3-c-button--small'],
			medium: ['z3-c-button--medium'],
			large: ['z3-c-button--large'],
		},
	},
	compoundVariants: [{ intent: 'primary', size: 'medium', className: 'uppercase' }],
	defaultVariants: {
		intent: 'primary',
		size: 'small',
	},
})

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof cvaButton> {}

export const Button: React.FC<ButtonProps> = ({ className, intent, size, ...props }) => (
	<button className={cvaButton({ intent, size, className })} {...props} />
)
