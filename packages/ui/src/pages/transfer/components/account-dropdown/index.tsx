import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button, type TSizeVariant, type TStyleVariant } from 'ui/src/components/button'
import {
	DropdownMenuItemIndicator,
	DropdownMenuRadioItem,
	DropdownMenuVirtuoso,
	type IDropdownMenuVirtuosoProps,
} from 'ui/src/components/dropdown-menu'
import { Check2Icon, ChevronDown2Icon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import type { AddressBookEntry } from 'ui/src/store/types'
import { getShortAddress } from 'ui/src/utils/string'

interface IAccountDropdownProps {
	account: string
	accounts: IDropdownMenuVirtuosoProps['data']
	knownAddresses?: { [key: string]: AddressBookEntry }
	onUpdateAccount: IDropdownMenuVirtuosoProps['onValueChange']
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
}

const emptyKnownAddresses = {}

export const AccountDropdown: React.FC<IAccountDropdownProps> = props => {
	const {
		account,
		knownAddresses = emptyKnownAddresses,
		accounts,
		onUpdateAccount,
		styleVariant = 'tertiary',
		sizeVariant = 'xlarge',
	} = props

	const accountReadableName = knownAddresses[account]?.name || getShortAddress(account)

	return (
		<DropdownMenuVirtuoso
			value={account}
			onValueChange={onUpdateAccount}
			data={accounts}
			// eslint-disable-next-line react/no-unstable-nested-components
			itemContentRenderer={(index, { id, title }) => (
				<DropdownMenuRadioItem value={id} key={index}>
					<Box display="flex" alignItems="center" gap="medium">
						<Box flexShrink={0}>
							<ResourceImageIcon address={id} />
						</Box>
						<Box flexGrow={1} minWidth={0}>
							<Text truncate size="small">
								{title}
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
					leftIcon={<ResourceImageIcon address={account} />}
					rightIcon={<ChevronDown2Icon />}
				>
					<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
						<Text size="large" color="strong">
							{accountReadableName}
						</Text>
					</Box>
				</Button>
			}
		/>
	)
}
