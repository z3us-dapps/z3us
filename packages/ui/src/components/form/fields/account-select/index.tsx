import React, { forwardRef } from 'react'

import { AccountCardIcon } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { Button, type TSizeVariant, type TStyleVariant } from 'ui/src/components/button'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, DropdownMenuVirtuoso } from 'ui/src/components/dropdown-menu'
import { Check2Icon, ChevronDown2Icon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import * as styles from './styles.css'

interface IAdapterProps {
	placeholder?: string
	value?: string
	onChange?: (value: string) => void
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
}

export const SelectAdapter = forwardRef<HTMLElement, IAdapterProps>((props, ref) => {
	const { value, onChange, styleVariant = 'tertiary', sizeVariant = 'xlarge', placeholder, ...rest } = props

	const accounts = useWalletAccounts()
	const addressBook = useAddressBook()
	const addressBookEntry = addressBook[value]
	const accountReadableName = addressBookEntry?.name || getShortAddress(value)

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
			// eslint-disable-next-line react/no-unstable-nested-components
			itemContentRenderer={(index, { id, title, ...rest }) => (
				<DropdownMenuRadioItem value={id} key={index}>
					<Box display="flex" alignItems="center" gap="medium">
						<Box flexShrink={0}>
							<AccountCardIcon address={id} />
						</Box>
						<Box flexGrow={1} minWidth={0}>
							<Text truncate size="small">
								{title} - {getShortAddress(id)}
							</Text>
						</Box>
					</Box>
					<DropdownMenuItemIndicator>
						<Check2Icon />
					</DropdownMenuItemIndicator>
				</DropdownMenuRadioItem>
			)}
			trigger={
				<Button
					styleVariant={styleVariant}
					sizeVariant={sizeVariant}
					fullWidth
					leftIcon={!!accountReadableName && <AccountCardIcon address={value} />}
					rightIcon={<ChevronDown2Icon />}
				>
					<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
						<Text size="large" color={!!accountReadableName ? 'strong' : 'neutral'}>
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
