/* eslint-disable react/no-array-index-key */
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React from 'react'

import {
	AccordionContent,
	AccordionHeader,
	AccordionItem,
	AccordionRoot,
	AccordionTrigger,
} from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, DropdownMenuVirtuoso } from 'ui/src/components/dropdown-menu'
import {
	Check2Icon,
	CheckCircleIcon,
	ChevronDown2Icon,
	CirclePlusIcon,
	TrashIcon,
	WriteNoteIcon,
} from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import type { TTransferSchema, TZodValidation } from './account-transfer-types'
import { getError } from './account-transfer-utils'
import * as styles from './account-transfer.css'
import { SearchableInput } from './searchable-input'
import { TransferMessage } from './transfer-message'
import { TransferTokenSelector } from './transfer-token-selector'

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

export const GroupTransfer: React.FC<IGroupTransferProps> = props => {
	const {
		balances,
		accounts,
		addressBook,
		transaction,
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

	const addressBookIncludeAccounts = { ...accounts, ...addressBook }

	const accountEntries = Object.values(accounts).map(entry => ({
		id: entry.address,
		title: entry.name,
	}))

	const allEntries = Object.values(addressBookIncludeAccounts).map(entry => ({
		id: entry.address,
		account: entry.address,
		alias: entry.name,
	}))

	return (
		<Box display="flex" flexDirection="column" gap="large">
			{transaction.sends.map((send, sendIndex: number) => (
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
												{accounts[fromAccount]?.name || getShortAddress(fromAccount)}
											</Text>
										</Box>
									</Button>
									<ToolTip side="top" theme="backgroundPrimary" message="Remove group transaction">
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
								</Box>
							</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent className={styles.transferAccordionContentWrapper}>
							<Box padding="large">
								{sendIndex === 0 && (
									<Box paddingBottom="medium">
										<Box display="flex" paddingBottom="medium" alignItems="center">
											<Box flexGrow={1} alignItems="center">
												<Text size="medium" color="strong">
													From
												</Text>
											</Box>
										</Box>
										<Box width="full">
											<DropdownMenuVirtuoso
												value={fromAccount}
												onValueChange={onUpdateFromAccount}
												data={accountEntries}
												// eslint-disable-next-line react/no-unstable-nested-components
												itemContentRenderer={(index, { id, title }) => (
													<DropdownMenuRadioItem value={id} key={index}>
														<Box display="flex" alignItems="center" gap="medium">
															<Box flexShrink={0}>
																<ResourceImageIcon address={fromAccount} />
															</Box>
															<Box flexGrow={1} minWidth={0}>
																<Text truncate>{title}</Text>
															</Box>
														</Box>
														<DropdownMenuItemIndicator>
															<Check2Icon />
														</DropdownMenuItemIndicator>
													</DropdownMenuRadioItem>
												)}
												trigger={
													<Button
														styleVariant={getError(validation, ['from']).error ? 'secondary-error' : 'secondary'}
														sizeVariant="xlarge"
														fullWidth
														leftIcon={<ResourceImageIcon address={fromAccount} />}
														rightIcon={<ChevronDown2Icon />}
													>
														<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
															<Text size="large" color="strong">
																{accounts[fromAccount]?.name || getShortAddress(fromAccount)}
															</Text>
														</Box>
													</Button>
												}
											/>
											<ValidationErrorMessage error={getError(validation, ['from'])} />
										</Box>
									</Box>
								)}
								<Box display="flex" paddingBottom="medium">
									<Box display="flex" alignItems="center" width="full">
										<Box display="flex" alignItems="center" flexGrow={1}>
											<Text size="medium" color="strong">
												To:
											</Text>
											{addressBookIncludeAccounts[send.to] && (
												<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
													<Text size="medium">({addressBookIncludeAccounts[send.to].name})</Text>
													<CheckCircleIcon />
												</Box>
											)}
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
										message={transaction.message}
										isEncrypted={transaction.isMessageEncrypted}
										styleVariant="primary"
										onUpdateMessage={onUpdateMessage}
										onUpdateIsMessageEncrypted={onUpdateIsMessageEncrypted}
									/>
								) : null}
								{send.tokens.map(({ token, amount }: any, tokenIndex: number) => (
									<TransferTokenSelector
										key={`group-${sendIndex}-${tokenIndex}`}
										balances={balances}
										token={token}
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
								<Box width="full" paddingTop="large">
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
								</Box>
							</Box>
						</AccordionContent>
					</AccordionItem>
				</AccordionRoot>
			))}
		</Box>
	)
}
