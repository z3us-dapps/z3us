import React, { useState } from 'react'
import { useStore } from '@src/store'
import { RightArrowIcon } from 'ui/src/components/icons'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
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
import { CircleAvatar } from '@src/components/circle-avatar'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import useMeasure from 'react-use-measure'
import { getShortAddress } from '@src/utils/string-utils'

interface IProps {
	shortAddress: string
	tokenAmount?: string
	tokenSymbol?: string
	onAccountChange: (account: number) => void
}

export const AccountSelector: React.FC<IProps> = ({ shortAddress, tokenAmount, tokenSymbol, onAccountChange }) => {
	const [measureRef, { width: triggerWidth }] = useMeasure()
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
		<Select value={shortAddress} onValueChange={handleValueChange}>
			<SelectTrigger aria-label="Account selector" asChild>
				<Button
					ref={measureRef}
					css={{
						display: 'flex',
						mt: '12px',
						align: 'center',
						justifyContent: 'flex-start',
						bg: '$bgPanel2',
						borderRadius: '8px',
						height: '64px',
						position: 'relative',
						width: '100%',
						ta: 'left',
						'&:hover': {
							bg: '$bgPanelHover',
						},
						span: {
							display: 'none',
						},
						'span:first-child': {
							display: 'flex',
							width: '100%',
							align: 'center',
							justifyContent: 'flex-start',
						},
					}}
				>
					<SelectValue>
						<Box css={{ p: '8px' }}>
							<CircleAvatar background={addressBookBackground} />
						</Box>
						<Flex align="center" css={{ flex: '1', minWidth: '0' }}>
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
						</Flex>
						<Flex align="center" css={{ pr: '$2', flexShrink: '0' }}>
							<RightArrowIcon />
						</Flex>
					</SelectValue>
				</Button>
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUpButton>
					<ChevronUpIcon />
				</SelectScrollUpButton>
				<SelectViewport>
					<SelectGroup>
						{accounts.map(account => (
							<SelectItem
								key={account.index}
								value={account.shortAddress}
								css={{
									'span:first-child': {
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										maxWidth: `${triggerWidth}px`,
									},
								}}
							>
								<SelectItemText>
									{account?.name ? `${account.name} (${account.shortAddress})` : account.shortAddress}
								</SelectItemText>
								<SelectItemIndicator />
							</SelectItem>
						))}
					</SelectGroup>
				</SelectViewport>
				<SelectScrollDownButton>
					<ChevronDownIcon />
				</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}

AccountSelector.defaultProps = {
	tokenAmount: null,
	tokenSymbol: null,
}
