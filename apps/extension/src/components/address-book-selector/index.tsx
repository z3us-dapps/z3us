import React from 'react'
import { useSharedStore, useStore } from '@src/store'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
	DropdownMenuEllipsis,
} from 'ui/src/components/drop-down-menu'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { Text } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'

interface IProps {
	selectedAddress: string
	onSelectAddressBookAddress: (address: string) => void
}

export const AddressBookSelector: React.FC<IProps> = ({ selectedAddress, onSelectAddressBookAddress }) => {
	const { addressBook } = useSharedStore(state => ({
		addressBook: state.addressBook,
	}))

	const { publicAddresses } = useStore(state => {
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
	}

	return (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<Button size="1" color="tertiary">
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
						</Button>
					</DropdownMenuTrigger>
				</TooltipTrigger>
				<TooltipContent sideOffset={3}>
					<TooltipArrow />
					Select from address book
				</TooltipContent>
			</Tooltip>
			<DropdownMenuContent
				align="end"
				side="bottom"
				sideOffset={12}
				alignOffset={-2}
				css={{ minWidth: '120px', maxWidth: '200px' }}
				onCloseAutoFocus={e => {
					e.preventDefault()
				}}
			>
				<DropdownMenuRadioGroup value={selectedAddress} onValueChange={handleValueChange}>
					{publicAddresses.map(({ address, name }) => (
						<DropdownMenuRadioItem key={address} value={address}>
							<DropdownMenuEllipsis>
								<DropdownMenuItemIndicator />
								{name ? `${name} (${getShortAddress(address)})` : getShortAddress(address)}
							</DropdownMenuEllipsis>
						</DropdownMenuRadioItem>
					))}
					{entries.map(([address, { name }]) => (
						<DropdownMenuRadioItem key={address} value={address}>
							<DropdownMenuEllipsis>
								<DropdownMenuItemIndicator />
								{name ? `${name} (${getShortAddress(address)})` : getShortAddress(address)}
							</DropdownMenuEllipsis>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
