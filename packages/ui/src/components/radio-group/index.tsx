import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import type { ForwardedRef } from 'react'
import React, { forwardRef } from 'react'

import { Box } from '../box'
import * as styles from './styles.css'

export type TSizeVariant = 'small' | 'medium'
export type TStyleVariant = 'primary' | 'primary-error' | 'secondary' | 'secondary-error' | 'tertiary'

export const RadioGroup = RadioGroupPrimitive.Root
export const RadioGroupItem = RadioGroupPrimitive.Item
export const RadioGroupIndicator = RadioGroupPrimitive.Indicator

export interface IRadioProps {
	id: string
	value: string
	children: string | React.ReactElement
}

export const Radio = forwardRef<HTMLElement, IRadioProps>((props, ref: ForwardedRef<any>) => {
	const { id, value, children } = props

	return (
		<Box className={styles.radioGroupWrapper}>
			<RadioGroupItem ref={ref} id={id} value={value} className={styles.radioGroupItemWrapper}>
				<RadioGroupIndicator className={styles.radioGroupIndicationWrapper} />
			</RadioGroupItem>
			<Box component="label" htmlFor={id}>
				{children}
			</Box>
		</Box>
	)
})
