import type { AddressBookEntry } from 'packages/ui/src/store/types'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, DropdownMenuVirtuoso } from 'ui/src/components/dropdown-menu'
import { Check2Icon, CheckCircleIcon, ChevronDown2Icon, WriteNoteIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { type TTransferSchema, type TZodValidation } from './account-transfer-types'
import { getError } from './account-transfer-utils'
import { SearchableInput } from './searchable-input'
import { TransferMessage } from './transfer-message'
import { TransferTokenSelector } from './transfer-token-selector'

const SEND_INDEX = 0
const TOKEN_INDEX = 0

interface ISingleTransferRequiredProps {
	balances: ResourceBalance[]
	accounts: { [key: string]: AddressBookEntry }
	addressBook: { [key: string]: AddressBookEntry }
	transaction: TTransferSchema
	isMessageUiVisible: boolean
	fromAccount: string
	validation: TZodValidation
	onToggleMessageUi: () => void
	onUpdateFromAccount: (account: string) => void
	onUpdateToAccount: (key: number) => (value: string) => void
	onUpdateTokenValue: (sendIndex: number) => (tokenIndex: number) => (tokenValue: number) => void
	onUpdateToken: (sendIndex: number) => (tokenIndex: number) => (address: string, symbol: string, name: string) => void
	onUpdateMessage: (message: string) => void
	onUpdateIsMessageEncrypted: (isEncrypted: boolean) => void
}

interface ISingleTransferOptionalProps {}

interface ISingleTransferProps extends ISingleTransferRequiredProps, ISingleTransferOptionalProps {}

const defaultProps: ISingleTransferOptionalProps = {}

export const SingleTransfer: React.FC<ISingleTransferProps> = props => {
	const {
		balances,
		accounts,
		addressBook,
		transaction,
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

	const accountData = Object.values(accounts).map(entry => ({
		id: entry.address,
		title: entry.name,
	}))
	const entries = Object.values({ ...accounts, ...addressBook }).map(entry => ({
		id: entry.address,
		account: entry.address,
		alias: entry.name,
	}))

	const handleUpdateToAccount = (value: string) => {
		onUpdateToAccount(SEND_INDEX)(value)
	}

	const handleTokenUpdate = (value: string) => {
		const t = balances.find(b => b.address === value)
		if (t) onUpdateToken(SEND_INDEX)(TOKEN_INDEX)(t.address, t.symbol, t.name)
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
					data={accountData}
					// eslint-disable-next-line react/no-unstable-nested-components
					itemContentRenderer={(index, { id, title }) => (
						<DropdownMenuRadioItem value={id} key={index}>
							<Box display="flex" alignItems="center" gap="medium">
								<Box flexShrink={0}>
									<ResourceImageIcon address={id} />
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
							styleVariant={getError(validation, ['from']).error ? 'secondary-error' : 'secondary'}
							sizeVariant="xlarge"
							fullWidth
							leftIcon={<ResourceImageIcon address={fromAccount} />}
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
				<ValidationErrorMessage error={getError(validation, ['from'])} />
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
					styleVariant={getError(validation, ['sends', SEND_INDEX, 'to']).error ? 'secondary-error' : 'secondary'}
					onValueChange={handleUpdateToAccount}
					data={entries}
				/>
				<ValidationErrorMessage error={getError(validation, ['sends', SEND_INDEX, 'to'])} />
			</Box>
			<TransferMessage
				isVisible={isMessageUiVisible}
				message={transaction.message}
				isEncrypted={transaction.isMessageEncrypted}
				isError={getError(validation, ['message']).error}
				onUpdateMessage={onUpdateMessage}
				onUpdateIsMessageEncrypted={onUpdateIsMessageEncrypted}
			/>
			<ValidationErrorMessage error={getError(validation, ['message'])} />
			<TransferTokenSelector
				styleVariant="secondary"
				balances={balances}
				token={sendToken.address}
				tokenValue={sendToken.amount}
				onUpdateToken={handleTokenUpdate}
				onUpdateTokenValue={handleTokenValueUpdate}
				sendIndex={SEND_INDEX}
				tokenIndex={TOKEN_INDEX}
				validation={validation}
			/>
		</Box>
	)
}

SingleTransfer.defaultProps = defaultProps
