import React from 'react'
import { useStore } from '@src/store'
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

export const AddressBookSelector: React.FC<IProps> = ({ selectedAddress, onSelectAddressBookAddress }: IProps) => {
	const { addressBook } = useStore(state => ({
		addressBook: state.addressBook,
	}))

	const selectedName = selectedAddress
		? addressBook?.[selectedAddress]?.name || getShortAddress(selectedAddress)
		: 'Select'
	const entries = Object.entries(addressBook)
	const hasAddressBook = entries.length > 0

	const handleValueChange = (address: string) => {
		onSelectAddressBookAddress(address)
	}

	return hasAddressBook ? (
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
					{entries.map(([address, { name }]) => (
						<DropdownMenuRadioItem key={address} value={address}>
							<DropdownMenuEllipsis>
								<DropdownMenuItemIndicator />
								{name || getShortAddress(address)}
							</DropdownMenuEllipsis>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	) : null
}
