import React, { useState } from 'react'
import { useStore } from '@src/store'
import { RightArrowIcon } from 'ui/src/components/icons'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectGroup,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
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

export const AccountSelector: React.FC<IProps> = ({
	shortAddress,
	tokenAmount,
	tokenSymbol,
	onAccountChange,
}: IProps) => {
	const { accounts, addressBook } = useStore(state => ({
		addressBook: state.addressBook,
		accounts: [...state.publicAddresses, ...state.hwPublicAddresses].map((addr, index) => ({
			index,
			addr,
			shortAddress: getShortAddress(addr),
		})),
	}))
	const [selected, setSelected] = useState(accounts.find(_account => _account.shortAddress === shortAddress).addr)

	const handleValueChange = (account: string) => {
		const selectedAccount = accounts.find(_account => _account.shortAddress === account)
		onAccountChange(selectedAccount.index)
		setSelected(selectedAccount.addr)
	}

	return (
		<Select value={shortAddress} onValueChange={handleValueChange}>
			<SelectTrigger aria-label="Account selector" asChild>
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
					<SelectValue>
						<Text />
					</SelectValue>
					<Box css={{ p: '8px' }}>
						<CircleAvatar />
					</Box>
					<Box css={{ flex: '1' }}>
						<Text
							truncate
							css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '2px', maxWidth: '200px' }}
						>
							{addressBook[selected]?.name ? `${addressBook[selected].name} (${shortAddress})` : shortAddress}
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
			</SelectTrigger>
			<SelectContent css={{ maxWidth: '360px' }}>
				<SelectScrollUpButton>{'>'}</SelectScrollUpButton>
				<SelectViewport>
					<SelectGroup>
						{accounts.map(account => (
							<SelectItem key={account.index} value={account.shortAddress}>
								<SelectItemText>
									<Text size="2" bold truncate css={{ maxWidth: '292px' }}>
										{addressBook[account.addr]?.name
											? `${addressBook[account.addr].name} (${account.shortAddress})`
											: account.shortAddress}
									</Text>
								</SelectItemText>
								<SelectItemIndicator />
							</SelectItem>
						))}
					</SelectGroup>
				</SelectViewport>
				<SelectScrollDownButton>{'>'}</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}

AccountSelector.defaultProps = {
	tokenAmount: null,
	tokenSymbol: null,
}
