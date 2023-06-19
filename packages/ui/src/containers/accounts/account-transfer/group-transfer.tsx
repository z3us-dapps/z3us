/* eslint-disable react/no-array-index-key */
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
import { CheckCircleIcon, ChevronDown2Icon, CirclePlusIcon, TrashIcon, WriteNoteIcon } from 'ui/src/components/icons'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { TokenImageIcon } from 'ui/src/components/token-image-icon'
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
	addressBook: any // todo fix type
	tokens: any // todo fix type
	fromAccount: string
	transaction: TTransferSchema
	isMessageUiVisible: boolean
	validation: TZodValidation
	onAddToken: (sendIndex: number) => void
	onToggleMessageUi: () => void
	onUpdateToAccount: (key: number) => (value: string) => void
	onUpdateTokenValue: (sendIndex: number) => (tokenIndex: number) => (tokenValue: number) => void
	onUpdateToken: (sendIndex: number) => (tokenIndex: number) => (tokenValue: string) => void
	onRemoveGroupTransaction: (sendIndex: number) => void
	onUpdateMessage: (message: string) => void
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
}

export const GroupTransfer: React.FC<IGroupTransferProps> = props => {
	const {
		transaction,
		fromAccount,
		addressBook,
		tokens,
		isMessageUiVisible,
		validation,
		onToggleMessageUi,
		onAddToken,
		onUpdateToken,
		onUpdateTokenValue,
		onUpdateToAccount,
		onRemoveGroupTransaction,
		onUpdateMessage,
		onUpdateIsMessageEncrypted,
	} = props

	return (
		<Box display="flex" flexDirection="column" gap="large">
			{transaction.sends.map((send: any, sendIndex: number) => (
				<AccordionRoot key={`accordion-${sendIndex}`} type="single" defaultValue={`send-${sendIndex}`} collapsible>
					<AccordionItem value={`send-${sendIndex}`} className={styles.transferAccordionItemWrapper}>
						<AccordionHeader>
							<AccordionTrigger asChild>
								<Box className={styles.transferAccordionTriggerWrapper}>
									<Button
										styleVariant="secondary"
										sizeVariant="xlarge"
										fullWidth
										leftIcon={
											<TokenImageIcon
												imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
												imgAlt="btc token image"
												fallbackText="btc"
											/>
										}
										rightIcon={<ChevronDown2Icon className={styles.transferAccordionChevron} />}
									>
										<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
											<Text size="large" color="strong">
												{fromAccount}
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
								<Box display="flex" paddingBottom="medium">
									<Box display="flex" alignItems="center" width="full">
										<Box display="flex" alignItems="center" flexGrow={1}>
											<Text size="medium" color="strong">
												To:
											</Text>
											<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
												<Text size="medium">(known address2known address2)</Text>
												<CheckCircleIcon />
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
										data={addressBook}
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
										tokens={tokens}
										token={token}
										tokenValue={amount}
										sendIndex={sendIndex}
										tokenIndex={tokenIndex}
										validation={validation}
										onUpdateToken={(_value: string) => {
											onUpdateToken(sendIndex)(tokenIndex)(_value)
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
