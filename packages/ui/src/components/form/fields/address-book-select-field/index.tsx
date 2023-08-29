import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import React, { forwardRef } from 'react'
import { send } from 'vite'

import { Box } from 'ui/src/components/box'
import { type IInputProps } from 'ui/src/components/input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { CheckCircleIcon } from '../../../icons'
import { ToolTip } from '../../../tool-tip'
import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import * as styles from './styles.css'

interface IProps extends Omit<IInputProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {
	onChange?: (value: string | number) => void
	toolTipMessageKnownAddress?: string
	isKnownAddressVisible?: boolean
}

export const AddressBookSelectField = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const {
		onChange,
		validate,
		name,
		parentName,
		label,
		toolTipMessageKnownAddress,
		isKnownAddressVisible = true,
		...rest
	} = props
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

	const toName = 'Degen acc'

	return (
		<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
			{isKnownAddressVisible && (
				<Box className={styles.knownAddressWrapper}>
					{toName && <Text size="xxsmall">({toName})</Text>}
					{true && toolTipMessageKnownAddress && (
						<ToolTip message={toolTipMessageKnownAddress} side="top">
							<CheckCircleIcon />
						</ToolTip>
					)}
				</Box>
			)}
			<SearchableInput {...rest} ref={ref} onValueChange={handleChange} data={allEntries} />
		</FieldWrapper>
	)
})
