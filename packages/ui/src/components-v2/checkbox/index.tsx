import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Check2Icon } from '../../components/icons'
import * as styles from './checkbox.css'

export const CheckboxRoot = CheckboxPrimitive.Root
export const CheckboxIndicator = CheckboxPrimitive.Indicator

interface ICheckboxRequiredProps {}

interface ICheckboxOptionalProps {
	className?: ClassValue
}

interface ICheckboxProps extends ICheckboxRequiredProps, ICheckboxOptionalProps {}

const defaultProps: ICheckboxOptionalProps = {
	className: undefined,
}

export const Checkbox: React.FC<ICheckboxProps> = ({ className, ...rest }) => (
	<CheckboxRoot className={clsx(styles.checkboxWrapper, className)} {...rest}>
		<CheckboxIndicator className={styles.checkboxIndicator}>
			<Check2Icon />
		</CheckboxIndicator>
	</CheckboxRoot>
)

Checkbox.defaultProps = defaultProps
