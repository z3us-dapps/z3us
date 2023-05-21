import React, { forwardRef } from 'react'
import clsx, { type ClassValue } from 'clsx'
import { Box } from '../box'
import * as styles from './pill.css'

interface IPillRequiredProps {
	children: React.ReactNode
}

interface IPillOptionalProps {
	className?: ClassValue
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'caution' | 'neutral'
}

interface IPillProps extends IPillRequiredProps, IPillOptionalProps {}

const defaultProps: IPillOptionalProps = {
	className: undefined,
	sizeVariant: 'medium',
	styleVariant: 'neutral',
}

export const Pill = forwardRef<HTMLButtonElement, IPillProps>((props, ref) => {
	const { children, className, sizeVariant, styleVariant, ...rest } = props

	return (
		<Box
			ref={ref}
			className={clsx(
				styles.pillRootWrapper,
				styles.pillRecipe({
					sizeVariant,
					styleVariant,
				}),
				className,
			)}
			{...rest}
		>
			<Box>{children}</Box>
		</Box>
	)
})

Pill.defaultProps = defaultProps
