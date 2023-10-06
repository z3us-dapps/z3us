import * as SwitchPrimitive from '@radix-ui/react-switch'
import clsx from 'clsx'
import React, { forwardRef } from 'react'

import * as styles from './switch.css'

interface ISwitchProps {
	id?: string
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
}

export interface IExtendedSwitchProps extends ISwitchProps, SwitchPrimitive.SwitchProps {}

export const Switch = forwardRef<HTMLButtonElement, IExtendedSwitchProps>((props, ref) => {
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
			<SwitchPrimitive.Thumb
				className={clsx(
					styles.switchThumbRecipe({
						sizeVariant,
						styleVariant,
					}),
					styles.switchThumbRoot,
				)}
			/>
		</SwitchPrimitive.Root>
	)
})
