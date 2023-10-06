import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import type { ForwardedRef } from 'react'
import React, { forwardRef, useState } from 'react'

import { Box } from '../box'
import { type TThemeColorKey } from '../system/theme.css'
import * as styles from './styles.css'

export type TSizeVariant = 'small' | 'medium'
export type TStyleVariant = 'primary' | 'primary-error' | 'secondary' | 'secondary-error' | 'tertiary'

export const CheckboxRoot = CheckboxPrimitive.Root
export const CheckboxIndicator = CheckboxPrimitive.Indicator

export interface ICheckboxProps {
	checked?: boolean
	className?: ClassValue
	disabled?: boolean
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
	tickColor?: TThemeColorKey
	onCheckedChange?: (checked: boolean) => void
}

export const Checkbox = forwardRef<HTMLElement, ICheckboxProps>((props, ref: ForwardedRef<any>) => {
	const {
		checked = false,
		className,
		sizeVariant = 'small',
		styleVariant = 'secondary',
		disabled,
		tickColor = 'colorNeutral',
		onCheckedChange,
		...rest
	} = props
	const [animate, setAnimate] = useState<boolean>(checked)

	const handleCheckChanged = (_checked: boolean) => {
		setAnimate(_checked)
		onCheckedChange(_checked)
	}

	return (
		<CheckboxRoot
			ref={ref}
			checked={animate}
			onCheckedChange={handleCheckChanged}
			className={clsx(
				styles.checkboxWrapper({
					sizeVariant,
					styleVariant,
					disabled,
				}),
			)}
			{...rest}
		>
			<Box color={tickColor} width="full" height="full">
				<AnimatePresence initial={false}>
					{animate && (
						<svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="CheckIcon">
							<motion.path
								initial={{ pathLength: 0 }}
								animate={{ pathLength: 1 }}
								exit={{ pathLength: 0 }}
								transition={{
									type: 'tween',
									duration: 0.2,
									ease: animate ? 'easeOut' : 'easeIn',
								}}
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M7.75 12.75L10 15.25L16.25 8.75"
							/>
						</svg>
					)}
				</AnimatePresence>
			</Box>
		</CheckboxRoot>
	)
})
