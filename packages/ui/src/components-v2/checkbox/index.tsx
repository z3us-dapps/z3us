import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Check2Icon } from '../../components/icons'
import * as styles from './checkbox.css'

export type TSizeVariant = 'small' | 'medium'
export type TStyleVariant = 'primary' | 'secondary' | 'tertiary'

export const CheckboxRoot = CheckboxPrimitive.Root
export const CheckboxIndicator = CheckboxPrimitive.Indicator

interface ICheckboxRequiredProps {}

interface ICheckboxOptionalProps {
	className?: ClassValue
	disabled?: boolean
	sizeVariant?: TSizeVariant
	styleVariant?: TStyleVariant
}

interface ICheckboxProps extends ICheckboxRequiredProps, ICheckboxOptionalProps {}

const defaultProps: ICheckboxOptionalProps = {
	className: undefined,
	disabled: false,
	sizeVariant: 'medium',
	styleVariant: 'primary',
}

export const Checkbox: React.FC<ICheckboxProps> = ({ className, sizeVariant, styleVariant, disabled, ...rest }) => (
	<CheckboxRoot className={clsx(styles.checkboxWrapper())} {...rest}>
		<CheckboxIndicator className={styles.checkboxIndicator}>
			<Check2Icon />
		</CheckboxIndicator>
	</CheckboxRoot>
)

Checkbox.defaultProps = defaultProps
