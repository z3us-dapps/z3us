/* eslint-disable  @typescript-eslint/no-unused-vars */
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import {
	DropdownMenuItemIndicator,
	DropdownMenuRadioItem,
	DropdownMenuVirtuoso,
} from 'ui/src/components-v2/dropdown-menu'
import { Text } from 'ui/src/components-v2/typography'
import { Check2Icon, CheckCircleIcon, ChevronDown2Icon, WriteNoteIcon } from 'ui/src/components/icons'

import * as plainButtonStyles from '@src/components/styles/plain-button-styles.css'
import { TokenImageIcon } from '@src/components/token-image-icon'

import { type ITransaction, type TZodValidation, type TZodValidationError } from './account-transfer-types'
import { getZodError, getZodErrorMessage } from './account-transfer-utils'
import { SearchableInput } from './searchable-input'
import { TransferMessage } from './transfer-message'
import { TransferTokenSelector } from './transfer-token-selector'
import { ValidationErrorMessage } from './validation-error-message'

const SEND_INDEX = 0
const TOKEN_INDEX = 0

interface ISingleTransferRequiredProps {
	accounts: any // TODO
	addressBook: any // TODO
	tokens: any // TODO
	transaction: ITransaction
	isMessageUiVisible: boolean
	fromAccount: string
	validation: TZodValidation
	onToggleMessageUi: () => void
	onUpdateFromAccount: (account: string) => void
	onUpdateToAccount: (key: number) => (value: string) => void
	onUpdateTokenValue: (sendIndex: number) => (tokenIndex: number) => (tokenValue: number) => void
	onUpdateToken: (sendIndex: number) => (tokenIndex: number) => (tokenValue: string) => void
	onUpdateMessage: (message: string) => void
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
}

interface ISingleTransferOptionalProps {}

interface ISingleTransferProps extends ISingleTransferRequiredProps, ISingleTransferOptionalProps {}

const defaultProps: ISingleTransferOptionalProps = {}

export const SingleTransfer: React.FC<ISingleTransferProps> = props => {
	const {
		transaction,
		accounts,
		addressBook,
		tokens,
		fromAccount,
		isMessageUiVisible,
		validation,
		onUpdateFromAccount,
		onUpdateToAccount,
		onUpdateTokenValue,
		onUpdateToken,
		onToggleMessageUi,
		onUpdateMessage,
		onUpdateIsMessageEncrypted,
	} = props

	const send = transaction.sends[SEND_INDEX]
	const sendToken = send.tokens[TOKEN_INDEX]

	const handleUpdateToAccount = (value: string) => {
		onUpdateToAccount(SEND_INDEX)(value)
	}

	const handleTokenUpdate = (value: string) => {
		onUpdateToken(SEND_INDEX)(TOKEN_INDEX)(value)
	}

	const handleTokenValueUpdate = (value: number) => {
		onUpdateTokenValue(SEND_INDEX)(TOKEN_INDEX)(value)
	}

	return (
		<Box>
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
					data={accounts}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContentRenderer={(index, { id, title }) => (
						<DropdownMenuRadioItem value={id} key={index}>
							<Box display="flex" alignItems="center" gap="medium">
								<Box flexShrink={0}>
									<TokenImageIcon
										imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
										imgAlt="btc token image"
										fallbackText="btc"
									/>
								</Box>
								<Box flexGrow={1} minWidth={0}>
									<Text truncate>
										{title}
										Quisque felis sapien, sed purus sed tristique eros felis ante porttitor et, semper metus nisl ut
										pellentesque euismod. Purus bibendum posuere donec eget, ac imperdiet rhoncus nunc nisi
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
							styleVariant={getZodError(validation, ['from']) ? 'secondary-error' : 'secondary'}
							sizeVariant="xlarge"
							fullWidth
							leftIcon={
								<TokenImageIcon
									imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
									imgAlt="btc token image"
									fallbackText="btc"
								/>
							}
							rightIcon={<ChevronDown2Icon />}
						>
							<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
								<Text size="large" color="strong">
									{fromAccount}
								</Text>
							</Box>
						</Button>
					}
				/>
				<ValidationErrorMessage validation={validation} path={['from']} />
			</Box>
			<Box display="flex" paddingBottom="medium" paddingTop="large">
				<Box display="flex" alignItems="center" width="full">
					<Box display="flex" alignItems="center" flexGrow={1}>
						<Text size="medium" color="strong">
							To:
						</Text>
						<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
							<Text size="medium">(known address)</Text>
							<CheckCircleIcon />
						</Box>
					</Box>
					<Box display="flex" alignItems="center" gap="medium">
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
					</Box>
				</Box>
			</Box>
			<Box width="full">
				<SearchableInput
					value={send.to}
					placeholder="Enter address"
					// placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
					// styleVariant="secondary"
					styleVariant={getZodError(validation, ['sends', 0, 'to']) ? 'secondary-error' : 'secondary'}
					onValueChange={handleUpdateToAccount}
					data={addressBook}
				/>
				<ValidationErrorMessage validation={validation} path={['sends', 0, 'to']} />
			</Box>
			<TransferMessage
				isVisible={isMessageUiVisible}
				message={transaction.message}
				isEncrypted={transaction.isMessageEncrypted}
				isError={getZodError(validation, ['message'])}
				onUpdateMessage={onUpdateMessage}
				onUpdateIsMessageEncrypted={onUpdateIsMessageEncrypted}
			/>
			<ValidationErrorMessage validation={validation} path={['message']} />
			<TransferTokenSelector
				styleVariant="secondary"
				tokens={tokens}
				token={sendToken.token}
				tokenValue={sendToken.amount}
				onTokenUpdate={handleTokenUpdate}
				onTokenValueUpdate={handleTokenValueUpdate}
			/>
			<ValidationErrorMessage validation={validation} path={['sends', SEND_INDEX, 'tokens', TOKEN_INDEX, 'token']} />
			<ValidationErrorMessage validation={validation} path={['sends', SEND_INDEX, 'tokens', TOKEN_INDEX, 'amount']} />
		</Box>
	)
}

SingleTransfer.defaultProps = defaultProps
