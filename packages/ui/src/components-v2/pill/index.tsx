import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import * as styles from './pill.css'

interface IPillProps {
	children: React.ReactNode
	className?: ClassValue
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'caution' | 'neutral'
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
