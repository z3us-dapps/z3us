import React, { forwardRef, useCallback } from 'react'
import { FormattedNumber } from 'react-intl'

import { AccountCardIcon } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { Button, type TSizeVariant, type TStyleVariant } from 'ui/src/components/button'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, DropdownMenuVirtuoso } from 'ui/src/components/dropdown-menu'
import { Check2Icon, ChevronDown2Icon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useAddressBookWithAccounts } from 'ui/src/hooks/use-address-book'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'

interface ISelectItemProps {
	id: string
	title: string
}

const SelectItem: React.FC<ISelectItemProps> = ({ id, title }) => {
	const { data: balanceData } = useBalances(id)
	const { fungibleBalances = [] } = balanceData || {}

	const { data: knownAddresses } = useKnownAddresses()
	const balance = fungibleBalances?.find(b => b.address === knownAddresses.resourceAddresses.xrd)?.amount || ''

	return (
		<DropdownMenuRadioItem value={id}>
			<Box display="flex" alignItems="center" gap="medium">
				<Box flexShrink={0}>
					<AccountCardIcon address={id} />
				</Box>
				<Box flexGrow={1} minWidth={0}>
					<Text truncate size="small">
						{title} - {getShortAddress(id)}
					</Text>
					<FormattedNumber value={Number.parseFloat(balance) || 0} maximumFractionDigits={18} /> XRD
				</Box>
			</Box>
			<DropdownMenuItemIndicator>
				<Check2Icon />
			</DropdownMenuItemIndicator>
		</DropdownMenuRadioItem>
	)
}

interface IAdapterProps {
	placeholder?: string
	value?: string
	onChange?: (value: string) => void
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
	hasError?: boolean
}

export const SelectAdapter = forwardRef<HTMLElement, IAdapterProps>((props, ref) => {
	const {
		value,
		onChange,
		styleVariant = 'tertiary',
		sizeVariant = 'xlarge',
		placeholder,
		hasError = false,
		...rest
	} = props

	const accounts = useWalletAccounts()
	const addressBook = useAddressBookWithAccounts()
	const addressBookEntry = addressBook[value]
	const accountReadableName = addressBookEntry?.name || getShortAddress(value)

	const renderItem = useCallback((_, { id, title }) => <SelectItem key={id} id={id} title={title} />, [])

	return (
		<DropdownMenuVirtuoso
			{...rest}
			ref={ref}
			value={value}
			onValueChange={onChange}
			data={Object.values(accounts).map(_account => ({
				id: _account.address,
				title: _account.name,
				cardColor: _account.cardColor,
				cardImage: _account.cardImage,
			}))}
			itemContentRenderer={renderItem}
			trigger={
				<Button
					styleVariant={hasError ? 'tertiary-error' : styleVariant}
					sizeVariant={sizeVariant}
					fullWidth
					leftIcon={!!accountReadableName && <AccountCardIcon address={value} />}
					rightIcon={<ChevronDown2Icon />}
				>
					<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
						<Text size="large" color={accountReadableName ? 'strong' : 'neutral'} truncate>
							{accountReadableName || placeholder}
						</Text>
					</Box>
				</Button>
			}
		/>
	)
})

interface IProps extends Omit<IAdapterProps, 'onChange'>, WrapperProps {}

export const AccountSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { validate, name, label, ...rest } = props

	return (
		<FieldWrapper name={name} label={label} validate={validate}>
			<SelectAdapter {...rest} ref={ref} />
		</FieldWrapper>
	)
})
