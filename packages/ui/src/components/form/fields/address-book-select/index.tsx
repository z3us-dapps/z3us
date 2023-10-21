import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { CheckCircleIcon } from 'ui/src/components/icons'
import { type IInputProps } from 'ui/src/components/input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import * as styles from './styles.css'

interface IAdapterProps extends Omit<IInputProps, 'onChange'> {
	toolTipMessageKnownAddress?: string
	isKnownAddressVisible?: boolean
	onChange?: (value: string) => void
	hasError?: boolean
}

export const SelectAdapter = forwardRef<HTMLInputElement, IAdapterProps>((props, ref) => {
	const { onChange, value, toolTipMessageKnownAddress, isKnownAddressVisible = true, hasError = false, ...rest } = props

	const handleChange = (_value: string) => {
		onChange(_value)
	}

	const addressBook = useAddressBook()
	const allEntries = Object.values(addressBook).map(entry => ({
		id: entry.address,
		account: entry.address,
		alias: entry.name,
	}))

	const knownAddress = addressBook[value]?.name
	const toName = knownAddress || getShortAddress(`${value}`, 8)

	return (
		<>
			{isKnownAddressVisible && (
				<Box className={styles.knownAddressWrapper}>
					{toName && (
						<ToolTip message={value} side="top">
							<span>
								<Text size="xxsmall">({toName})</Text>
							</span>
						</ToolTip>
					)}
					{!!knownAddress && toolTipMessageKnownAddress && (
						<ToolTip message={toolTipMessageKnownAddress} side="top">
							<CheckCircleIcon />
						</ToolTip>
					)}
				</Box>
			)}
			<SearchableInput
				{...rest}
				value={`${value}`}
				ref={ref}
				onValueChange={handleChange}
				data={allEntries}
				styleVariant={hasError ? 'primary-error' : 'primary'}
			/>
		</>
	)
})

interface IProps extends Omit<IAdapterProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {}

export const AddressBookSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { validate, name, label, ...rest } = props

	return (
		<FieldWrapper name={name} label={label} validate={validate}>
			<SelectAdapter {...rest} ref={ref} />
		</FieldWrapper>
	)
})
