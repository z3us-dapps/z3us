import React from 'react'
import { useStore } from '@src/store'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components/drop-down-menu'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'

interface IProps {
	selectedAddress: string
	onSelectAddressBookAddress: (address: string) => void
}

export const AddressBookSelector: React.FC<IProps> = ({ selectedAddress, onSelectAddressBookAddress }: IProps) => {
	const { addressBook } = useStore(state => ({
		addressBook: state.addressBook,
	}))

	const selectedName = addressBook?.[selectedAddress]?.name ? addressBook?.[selectedAddress].name : 'Select'
	const entries = Object.entries(addressBook).filter(([, { name }]) => !!name)
	const hasAddressBook = entries.length > 0

	const handleValueChange = (address: string) => {
		onSelectAddressBookAddress(address)
	}

	return hasAddressBook ? (
		<DropdownMenu>
			<Tooltip>
				<TooltipTrigger asChild>
					<DropdownMenuTrigger asChild>
						<Button
							size="1"
							color="tertiary"
							css={{
								textTransform: 'uppercase',
							}}
						>
							{selectedName}
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
				css={{ minWidth: '120px' }}
				onCloseAutoFocus={e => {
					e.preventDefault()
				}}
			>
				<DropdownMenuRadioGroup value={selectedAddress} onValueChange={handleValueChange}>
					{entries.map(([address, { name }]) => (
						<DropdownMenuRadioItem key={address} value={address}>
							<DropdownMenuItemIndicator />
							{name}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	) : null
}
