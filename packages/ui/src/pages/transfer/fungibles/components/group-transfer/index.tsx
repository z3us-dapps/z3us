/* eslint-disable react/no-array-index-key */
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import React from 'react'

import { Box } from 'ui/src/components/box'

import type { TTransferSchema, TZodValidation } from '../../types'
import { GroupItem } from './group-item'

export interface IProps {
	balances: ResourceBalance[]
	accounts: { [key: string]: AddressBookEntry }
	addressBook: { [key: string]: AddressBookEntry }
	fromAccount: string
	transaction: TTransferSchema
	isMessageUiVisible: boolean
	validation: TZodValidation
	onAddToken: (sendIndex: number) => void
	onUpdateToken: (sendIndex: number) => (tokenIndex: number) => (address: string, symbol: string, name: string) => void
	onUpdateTokenValue: (sendIndex: number) => (tokenIndex: number) => (tokenValue: number) => void
	onToggleMessageUi: () => void
	onUpdateFromAccount: (account: string) => void
	onUpdateToAccount: (key: number) => (value: string) => void
	onUpdateMessage: (message: string) => void
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
	onRemoveGroup: (sendIndex: number) => void
}

export const GroupTransfer: React.FC<IProps> = ({ transaction, accounts, addressBook, ...props }) => {
	const knownAddresses = { ...accounts, ...addressBook }

	const accountEntries = Object.values(accounts).map(entry => ({
		id: entry.address,
		title: entry.name,
	}))

	const allEntries = Object.values(knownAddresses).map(entry => ({
		id: entry.address,
		account: entry.address,
		alias: entry.name,
	}))

	return (
		<Box display="flex" flexDirection="column" gap="large">
			{transaction.sends.map((send, sendIndex: number) => (
				<GroupItem
					key={sendIndex}
					message={transaction.message}
					isMessageEncrypted={transaction.isMessageEncrypted}
					send={send}
					sendIndex={sendIndex}
					accountEntries={accountEntries}
					knownAddresses={knownAddresses}
					allEntries={allEntries}
					{...props}
				/>
			))}
		</Box>
	)
}
