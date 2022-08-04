import React, { useState } from 'react'
import { useStore } from '@src/store'
import { RightArrowIcon } from 'ui/src/components/icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components/drop-down-menu'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { getShortAddress } from '@src/utils/string-utils'

interface IProps {
	shortAddress: string
	tokenAmount?: string
	tokenSymbol?: string
	onAccountChange: (account: number) => void
}

export const AccountSelector: React.FC<IProps> = ({ shortAddress, tokenAmount, tokenSymbol, onAccountChange }) => {
	const { accounts } = useStore(state => ({
		accounts: Object.values(state.publicAddresses).map((entry, index) => ({
			...entry,
			index,
			shortAddress: getShortAddress(entry.address),
		})),
	}))
	const [selected, setSelected] = useState<string>(
		accounts.find(_account => _account.shortAddress === shortAddress)?.address,
	)
	const entry = accounts.find(_account => _account.address === selected)
	const addressBookName = entry?.name
	const addressBookBackground = entry?.background

	const handleValueChange = (account: string) => {
		const selectedAccount = accounts.find(_account => _account.shortAddress === account)
		onAccountChange(selectedAccount.index)
		setSelected(selectedAccount.address)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					css={{
						display: 'flex',
						align: 'center',
						justifyContent: 'flex-start',
						mt: '12px',
						bg: '$bgPanel2',
						borderRadius: '8px',
						height: '64px',
						position: 'relative',
						width: '100%',
						ta: 'left',
						'&:hover': {
							bg: '$bgPanelHover',
						},
					}}
				>
					<Box css={{ p: '8px' }}>
						<CircleAvatar background={addressBookBackground} />
					</Box>
					<Box css={{ flex: '1', minWidth: '0' }}>
						<Text
							truncate
							css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '2px', maxWidth: '210px' }}
						>
							{addressBookName ? `${addressBookName} (${shortAddress})` : shortAddress}
						</Text>
						{tokenSymbol && tokenAmount && (
							<Text color="muted" css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '3px' }}>
								Total: {tokenAmount} {tokenSymbol}
							</Text>
						)}
					</Box>
					<Box css={{ pr: '$1' }}>
						<RightArrowIcon />
					</Box>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				avoidCollisions={false}
				align="start"
				side="bottom"
				sideOffset={10}
				css={{ minWidth: '150px', maxWidth: '314px', width: '100%' }}
			>
				<DropdownMenuRadioGroup value={shortAddress} onValueChange={handleValueChange}>
					{accounts.map(account => (
						<DropdownMenuRadioItem key={account.index} value={account.shortAddress}>
							<DropdownMenuItemIndicator />
							<Text size="2" bold truncate css={{ maxWidth: '274px', pr: '$2' }}>
								{account?.name ? `${account.name} (${account.shortAddress})` : account.shortAddress}
							</Text>
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

AccountSelector.defaultProps = {
	tokenAmount: null,
	tokenSymbol: null,
}
