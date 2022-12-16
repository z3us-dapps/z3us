/* eslint-disable */
import React, { forwardRef, ReactNode } from 'react'
import cx from 'classnames'

interface IProps {
	children?: ReactNode
	type?: 'submit' | 'button'
	variant?: 'primary' | 'secondary' | 'ghost'
	size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl'
	onClick?: () => void
	className?: string
	disabled?: boolean
	href?: string
	target?: string
	isBlock?: boolean
}

export type Ref = HTMLButtonElement

export const buttonClasses = {
	base: 'inline-flex items-center cursor-pointer focus:outline-none transition ease-in-out duration-300',
	disabled: 'opacity-50 cursor-not-allowed',
	size: {
		sm: 'px-2 py-1 text-sm',
		base: 'px-5 py-3 text-base',
		lg: 'px-6 py-4 text-lg text-lg',
		// xl: 'px-8 py-3 text-lg',
		// '2xl': 'px-8 py-3 text-lg',
	},
	variant: {
		ghost: 'bg-opacity-25 hover:bg-opacity-25 hover:bg-violet-100 active:bg-opacity-25 active:bg-violet-100 focus:bg-opacity-25 focus:outline-none focus:ring focus:ring-violet-200 rounded',
		primary: 'font-medium bg-violet-700 hover:bg-violet-600 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-200 text-white shadow-md rounded-full',
		secondary:
			'font-medium bg-white hover:bg-violet-50 active:bg-violet-100 focus:outline-none focus:ring focus:ring-violet-200 text-purple-800 shadow-md rounded-full',
		danger: 'bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white',
	},
}

export const Button = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
	const {
		variant = 'primary',
		size = 'base',
		children,
		onClick,
		className = '',
		disabled = false,
		href,
		target,
		...rest
	} = props
	const classes = cx(
		buttonClasses.base,
		buttonClasses.size[size],
		buttonClasses.variant[variant],
		disabled && buttonClasses.disabled,
		className,
		// Register all radix states
		'group',
		'radix-state-open:bg-gray-50 dark:radix-state-open:bg-gray-900',
		'radix-state-on:bg-gray-50 dark:radix-state-on:bg-gray-900',
		'radix-state-instant-open:bg-gray-50 radix-state-delayed-open:bg-gray-50',
	)
	if (href) {
		return (
			<a href={href} target={target} onClick={onClick} className={classes} {...rest}>
				{children}
			</a>
		)
	}
	return (
		<button onClick={onClick} ref={ref} {...rest} className={classes}>
			{children}
		</button>
	)
})
