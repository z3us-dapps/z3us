import React, { forwardRef } from 'react'

import CapsLockIndicator from 'ui/src/components/caps-lock-indicator'
import { type IInputProps } from 'ui/src/components/input'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import { TextInputAdapter } from '../text-field'

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'type' | 'label' | 'name'>, WrapperProps {}

export const PasswordField = forwardRef<HTMLInputElement, IProps>(({ validate, name, label, hidden, ...rest }, ref) => (
	<FieldWrapper name={name} label={label} validate={validate} hidden={hidden}>
		<TextInputAdapter rightIcon={<CapsLockIndicator />} {...rest} isPassword hidden ref={ref} />
	</FieldWrapper>
))

export default PasswordField
