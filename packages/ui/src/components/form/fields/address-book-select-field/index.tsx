import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import React, { forwardRef } from 'react'

import { type IInputProps } from 'ui/src/components/input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {
	onChange?: (value: string | number) => void
}

export const AddressBookSelectField = forwardRef<HTMLInputElement, IProps>(
	({ onChange, validate, name, parentName, label, ...rest }, ref) => {
		const handleChange = (_value: string) => {
			onChange(_value)
		}

		const networkId = useNetworkId()
		const accounts = useWalletAccounts()
		const { addressBook } = useNoneSharedStore(state => ({
			addressBook: state.addressBook[networkId] || {},
		}))
		const knownAddresses = { ...accounts, ...addressBook }
		const allEntries = Object.values(knownAddresses).map(entry => ({
			id: entry.address,
			account: entry.address,
			alias: entry.name,
		}))

		return (
			<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
				{/* <Input {...rest} elementType="textarea" type="text" ref={ref} onChange={handleChange} /> */}
				<SearchableInput {...rest} ref={ref} onValueChange={handleChange} data={allEntries} />
			</FieldWrapper>
		)
	},
)
