import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

export const boxVariants = {
	display: {
		flex: 'z3-u-flex',
		'inline-flex': 'z3-u-inline-flex',
	},
	justifySelf: {
		auto: 'z3-u-justify-self-auto',
	},
	alignSelf: {
		auto: 'z3-u-align-self-auto',
	},
}

export const boxVariantPropsKeys = Object.keys(boxVariants) as Array<keyof typeof boxVariants>

export const box = cva('', {
	variants: boxVariants,
})

type BoxProps = React.ComponentProps<'div'> & VariantProps<typeof box>

export const Box = React.forwardRef<React.ElementRef<'div'>, BoxProps>(({ className, ...rest }, forwardedRef) => {
	const test = 1

	return (
		<div
			ref={forwardedRef}
			className={box({
				class: className,
			})}
			{...rest}
		/>
	)
})

Box.displayName = 'Box'
