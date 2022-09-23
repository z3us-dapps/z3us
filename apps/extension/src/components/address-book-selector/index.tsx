import React, { useState } from 'react'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import {
	Select,
	SelectGroup,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import { Text } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'

interface IProps {
	selectedAddress: string
	onSelectAddressBookAddress: (address: string) => void
}

export const AddressBookSelector: React.FC<IProps> = ({ selectedAddress, onSelectAddressBookAddress }) => {
	const [open, setOpen] = useState<boolean>(false)
	const { addressBook } = useSharedStore(state => ({
		addressBook: state.addressBook,
	}))

	const { publicAddresses } = useAccountStore(state => {
		const accountAddress = state.getCurrentAddressAction()
		return {
			publicAddresses: Object.values(state.publicAddresses).filter(({ address }) => address !== accountAddress),
		}
	})

	let selectedName = 'Select'
	if (selectedAddress) {
		selectedName =
			addressBook?.[selectedAddress]?.name ||
			publicAddresses.find(_account => _account.address === selectedAddress)?.name ||
			getShortAddress(selectedAddress)
	}

	const entries = Object.entries(addressBook)

	const handleValueChange = (address: string) => {
		onSelectAddressBookAddress(address)
		setOpen(false)
	}

	if (publicAddresses.length === 0 && entries.length === 0) return null

	return (
		<Select open={open} value={selectedAddress} onValueChange={handleValueChange}>
			<SelectTrigger aria-label="Address selector" asChild onClick={() => setOpen(true)}>
				<Button size="1" color="tertiary">
					<SelectValue>
						<Text
							truncate
							bold
							size="1"
							css={{
								textTransform: 'uppercase',
								maxWidth: '200px',
							}}
						>
							{selectedName}
						</Text>
					</SelectValue>
				</Button>
			</SelectTrigger>
			<SelectContent onPointerDownOutside={() => setOpen(false)}>
				<SelectScrollUpButton>
					<ChevronUpIcon />
				</SelectScrollUpButton>
				<SelectViewport>
					<SelectGroup>
						<>
							{publicAddresses.map(({ address, name }) => (
								<SelectItem
									key={address}
									value={address}
									css={{
										'span:first-child': {
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											width: '120px',
										},
									}}
								>
									<SelectItemText>
										{name ? `${name} (${getShortAddress(address)})` : getShortAddress(address)}
									</SelectItemText>
									<SelectItemIndicator />
								</SelectItem>
							))}
						</>
						<>
							{entries.map(([address, { name }]) => (
								<SelectItem
									key={address}
									value={address}
									css={{
										'span:first-child': {
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											width: '120px',
										},
									}}
								>
									<SelectItemText>
										{name ? `${name} (${getShortAddress(address)})` : getShortAddress(address)}
									</SelectItemText>
									<SelectItemIndicator />
								</SelectItem>
							))}
						</>
					</SelectGroup>
				</SelectViewport>
				<SelectScrollDownButton>
					<ChevronDownIcon />
				</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}
