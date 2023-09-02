import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { CheckCircleIcon } from 'ui/src/components/icons'
import { type IInputProps } from 'ui/src/components/input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import * as styles from './styles.css'

interface IAdapterProps extends Omit<IInputProps, 'onChange'> {
	toolTipMessageKnownAddress?: string
	isKnownAddressVisible?: boolean
	onChange?: (value: string) => void
}

export const SelectAdapter = forwardRef<HTMLInputElement, IAdapterProps>(
	({ onChange, value, toolTipMessageKnownAddress, isKnownAddressVisible = true, ...rest }, ref) => {
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

		const toName = knownAddresses[value]?.name || getShortAddress(`${value}`)

		return (
			<>
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
				<SearchableInput {...rest} value={`${value}`} ref={ref} onValueChange={handleChange} data={allEntries} />
			</>
		)
	},
)

interface IProps extends Omit<IAdapterProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {}

export const AddressBookSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { validate, name, parentName, label, ...rest } = props

	return (
		<FieldWrapper name={name} parentName={parentName} label={label} validate={validate}>
			<SelectAdapter {...rest} ref={ref} />
		</FieldWrapper>
	)
})
