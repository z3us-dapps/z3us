import * as SwitchPrimitive from '@radix-ui/react-switch'
import React, { forwardRef } from 'react'
import clsx, { type ClassValue } from 'clsx'
import * as styles from './switch.css'

interface ISwitchProps {
	className?: ClassValue
	id?: string
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'caution' | 'neutral'
}

export const Switch = forwardRef<HTMLButtonElement, ISwitchProps>((props, ref) => {
	const { className, sizeVariant, styleVariant, id, ...rest } = props

	return (
		<SwitchPrimitive.Root
			className={clsx(
				styles.switchRootWrapper,
				styles.switchRecipe({
					sizeVariant,
					styleVariant,
				}),
				className,
			)}
			id={id}
			ref={ref}
			{...rest}
		>
			<SwitchPrimitive.Thumb className={styles.switchThumb} />
		</SwitchPrimitive.Root>
	)
})
