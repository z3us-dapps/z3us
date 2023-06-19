// @ts-nocheck
// TODO: fix ts
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

import { Box } from '../box'
import { type TThemeColorKey } from '../system/theme.css'
import * as styles from './checkbox.css'

export type TSizeVariant = 'small' | 'medium'
export type TStyleVariant = 'primary' | 'primary-error' | 'secondary' | 'secondary-error' | 'tertiary'

export const CheckboxRoot = CheckboxPrimitive.Root
export const CheckboxIndicator = CheckboxPrimitive.Indicator

interface ICheckboxRequiredProps {}

interface ICheckboxOptionalProps {
	checked?: boolean
	className?: ClassValue
	disabled?: boolean
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
	tickColor?: TThemeColorKey
	onCheckedChange?: (checked: boolean) => void
}

interface ICheckboxProps extends ICheckboxRequiredProps, ICheckboxOptionalProps {}

const defaultProps: ICheckboxOptionalProps = {
	checked: false,
	className: undefined,
	disabled: false,
	sizeVariant: 'small',
	styleVariant: 'secondary',
	tickColor: 'colorNeutral',
	onCheckedChange: undefined,
}

export const Checkbox: React.FC<ICheckboxProps> = ({
	checked,
	className,
	sizeVariant,
	styleVariant,
	disabled,
	tickColor,
	onCheckedChange,
	...rest
}) => {
	const [animate, setAnimate] = useState<boolean>(checked)

	const handleCheckChanged = (_checked: boolean) => {
		setAnimate(_checked)
		onCheckedChange(_checked)
	}

	return (
		<CheckboxRoot
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
			<AnimatePresence initial={false}>
				{animate && (
					<Box color={tickColor} width="full" height="full">
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
					</Box>
				)}
			</AnimatePresence>
		</CheckboxRoot>
	)
}

Checkbox.defaultProps = defaultProps
