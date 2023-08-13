/* eslint-disable react/no-array-index-key */
import { useEntityMetadata, useMetadataValue } from 'packages/ui/src/hooks/dapp/use-entity-metadata'
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React from 'react'
import { useDebounce } from 'use-debounce'

import {
	AccordionContent,
	AccordionHeader,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import type { IDropdownMenuVirtuosoRequiredProps } from 'ui/src/components/dropdown-menu'
import {
	CheckCircleIcon,
	ChevronDown2Icon,
	CirclePlusIcon,
	PictureInPictureIcon,
	TrashIcon,
	WriteNoteIcon,
} from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { AccountDropdown } from 'ui/src/containers/accounts/account-dropdown'

import type { TCombinedSendSchema, TTransferSchema, TZodValidation } from '../../types'
import { getError } from '../../utils/get-transfer-form-error'
import type { ISearchableInputProps } from '../searchable-input'
import { SearchableInput } from '../searchable-input'
import { TransferMessage } from '../transfer-message'
import { TransferNftSelector } from '../transfer-nft-selector'
import { TransferTokenSelector } from '../transfer-token-selector'
import * as styles from './styles.css'

interface IGroupTransferProps {
	balances: ResourceBalance[]
	accounts: { [key: string]: AddressBookEntry }
	addressBook: { [key: string]: AddressBookEntry }
	fromAccount: string
	transaction: TTransferSchema
	isMessageUiVisible: boolean
	validation: TZodValidation
	onAddToken: (sendIndex: number) => void
	onToggleMessageUi: () => void
	onUpdateFromAccount: (account: string) => void
	onUpdateToAccount: (key: number) => (value: string) => void
	onUpdateTokenValue: (sendIndex: number) => (tokenIndex: number) => (tokenValue: number) => void
	onUpdateToken: (sendIndex: number) => (tokenIndex: number) => (address: string, symbol: string, name: string) => void
	onRemoveGroupTransaction: (sendIndex: number) => void
	onUpdateMessage: (message: string) => void
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
}

interface IGroupItemProps extends Omit<Omit<Omit<IGroupTransferProps, 'accounts'>, 'addressBook'>, 'transaction'> {
	sendIndex: number
	send: TCombinedSendSchema
	message: string
	isMessageEncrypted: boolean
	allEntries: ISearchableInputProps['data']
	accountEntries: IDropdownMenuVirtuosoRequiredProps['data']
	knownAddresses: { [key: string]: AddressBookEntry }
}

export const GroupItem: React.FC<IGroupItemProps> = props => {
	const {
		knownAddresses,
		accountEntries,
		allEntries,
		message,
		isMessageEncrypted,
		send,
		sendIndex,
		balances,
		fromAccount,
		isMessageUiVisible,
		validation,
		onToggleMessageUi,
		onAddToken,
		onUpdateFromAccount,
		onUpdateToken,
		onUpdateTokenValue,
		onUpdateToAccount,
		onRemoveGroupTransaction,
		onUpdateMessage,
		onUpdateIsMessageEncrypted,
	} = props

	const [debouncedValue] = useDebounce<string>(send.to, 500)
	const { data } = useEntityMetadata(debouncedValue)

	const name = useMetadataValue('name', data)
	const toName = knownAddresses[send.to]?.name || name

	return (
		<AccordionRoot key={`accordion-${sendIndex}`} type="single" defaultValue={`send-${sendIndex}`} collapsible>
			<AccordionItem value={`send-${sendIndex}`} className={styles.transferAccordionItemWrapper}>
				<AccordionHeader>
					<AccordionTrigger asChild>
						<Box className={styles.transferAccordionTriggerWrapper}>
							<Button
								styleVariant="secondary"
								sizeVariant="xlarge"
								fullWidth
								leftIcon={<ResourceImageIcon address={fromAccount} />}
								rightIcon={<ChevronDown2Icon className={styles.transferAccordionChevron} />}
							>
								<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
									<Text size="large" color="strong">
										{knownAddresses[fromAccount]?.name || getShortAddress(fromAccount)}
									</Text>
								</Box>
							</Button>
							{sendIndex !== 0 ? (
								<ToolTip
									side="top"
									message={<Translation capitalizeFirstLetter text="transfer.sendTokens.removeGroup" />}
								>
									<Button
										className={styles.transferAccordionDeleteBtn}
										iconOnly
										styleVariant="ghost"
										sizeVariant="small"
										onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
											e.preventDefault()
											onRemoveGroupTransaction(sendIndex)
										}}
									>
										<TrashIcon />
									</Button>
								</ToolTip>
							) : null}
						</Box>
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent className={styles.transferAccordionContentWrapper}>
					<Box padding="large">
						{sendIndex === 0 && (
							<Box paddingBottom="medium">
								<Box display="flex" paddingBottom="small" flexGrow={1} alignItems="center">
									<Text size="medium" color="strong" weight="medium">
										From:
									</Text>
								</Box>
								<AccountDropdown
									account={fromAccount}
									knownAddresses={knownAddresses}
									onUpdateAccount={onUpdateFromAccount}
									accounts={accountEntries}
									styleVariant={getError(validation, ['from']).error ? 'tertiary-error' : 'tertiary'}
								/>
								<ValidationErrorMessage error={getError(validation, ['from'])} />
							</Box>
						)}
						<Box display="flex" paddingBottom="small">
							<Box display="flex" alignItems="center" width="full">
								<Box display="flex" alignItems="center" flexGrow={1}>
									<Text size="medium" color="strong" weight="medium">
										To:
									</Text>
									<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
										{toName && <Text size="medium">({toName})</Text>}
										{knownAddresses[send.to] && <CheckCircleIcon />}
									</Box>
								</Box>
								<Box display="flex" alignItems="center" gap="medium">
									{sendIndex === 0 ? (
										<Box
											component="button"
											type="button"
											className={plainButtonStyles.plainButtonHoverWrapper}
											onClick={onToggleMessageUi}
											display="flex"
											alignItems="center"
										>
											<Box component="span" display="flex" alignItems="center" marginRight="xxsmall">
												<WriteNoteIcon />
											</Box>
											<Text inheritColor component="span" size="medium" underline="always" truncate>
												{isMessageUiVisible ? 'Hide message' : 'Add message'}
											</Text>
										</Box>
									) : null}
								</Box>
							</Box>
						</Box>
						<Box width="full">
							<SearchableInput
								placeholder="Enter address"
								value={send.to}
								styleVariant={getError(validation, ['sends', sendIndex, 'to']).error ? 'primary-error' : 'primary'}
								onValueChange={(_value: string) => {
									onUpdateToAccount(sendIndex)(_value)
								}}
								data={allEntries}
							/>
							<ValidationErrorMessage error={getError(validation, ['sends', sendIndex, 'to'])} />
						</Box>
						{sendIndex === 0 ? (
							<TransferMessage
								isVisible={isMessageUiVisible}
								message={message}
								isEncrypted={isMessageEncrypted}
								styleVariant="primary"
								onUpdateMessage={onUpdateMessage}
								onUpdateIsMessageEncrypted={onUpdateIsMessageEncrypted}
							/>
						) : null}
						{/* // TODO: resolve any type */}
						{(send.tokens || []).map(({ amount, address }: any, tokenIndex: number) => (
							<TransferTokenSelector
								key={`group-${sendIndex}-${tokenIndex}`}
								balances={balances}
								tokenAddress={address}
								tokenValue={amount}
								sendIndex={sendIndex}
								tokenIndex={tokenIndex}
								validation={validation}
								onUpdateToken={(_value: string) => {
									const t = balances.find(b => b.address === _value)
									if (t) onUpdateToken(sendIndex)(tokenIndex)(t.address, t.symbol, t.name)
								}}
								onUpdateTokenValue={(_value: number) => {
									onUpdateTokenValue(sendIndex)(tokenIndex)(_value)
								}}
							/>
						))}
						{/* // TODO: resolve any type */}
						{(send.nfts || []).map(({ amount, address }: any, nftIndex: number) => (
							<TransferNftSelector
								key={`group-${sendIndex}-${nftIndex}`}
								balances={balances}
								tokenAddress={address}
								tokenValue={amount}
								sendIndex={sendIndex}
								nftIndex={nftIndex}
								validation={validation}
								onUpdateToken={(_value: string) => {
									// eslint-disable-next-line no-console
									console.log('🚀 ~ file: group-transfer.tsx:280 ~ _value:', _value)
									// const t = balances.find(b => b.address === _value)
									// if (t) onUpdateToken(sendIndex)(tokenIndex)(t.address, t.symbol, t.name)
								}}
								onUpdateTokenValue={(_value: number) => {
									// eslint-disable-next-line no-console
									console.log('🚀 ~ file: group-transfer.tsx:291 ~ _value:', _value)
									// onUpdateTokenValue(sendIndex)(tokenIndex)(_value)
								}}
							/>
						))}

						<Box width="full" paddingTop="large">
							{send.tokens ? (
								<Button
									styleVariant="tertiary"
									sizeVariant="xlarge"
									fullWidth
									onClick={() => {
										onAddToken(sendIndex)
									}}
									leftIcon={
										<Box marginLeft="small">
											<CirclePlusIcon />
										</Box>
									}
								>
									Add another token
								</Button>
							) : null}
							{send.nfts ? (
								<Button
									styleVariant="tertiary"
									sizeVariant="xlarge"
									fullWidth
									onClick={() => {
										// onAddToken(sendIndex)
									}}
									leftIcon={
										<Box marginLeft="small">
											<PictureInPictureIcon />
										</Box>
									}
								>
									Add another nft
								</Button>
							) : null}
						</Box>
					</Box>
				</AccordionContent>
			</AccordionItem>
		</AccordionRoot>
	)
}

export const GroupTransfer: React.FC<IGroupTransferProps> = ({ transaction, accounts, addressBook, ...props }) => {
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
