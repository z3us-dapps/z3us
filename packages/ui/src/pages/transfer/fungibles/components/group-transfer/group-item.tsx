/* eslint-disable react/no-array-index-key */
import { t } from 'i18next'
import { useEntityMetadata, useMetadataValue } from 'packages/ui/src/hooks/dapp/use-entity-metadata'
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import React from 'react'
import { useDebounce } from 'use-debounce'

import { AccordionContent, AccordionItem, AccordionRoot } from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import type { IDropdownMenuVirtuosoRequiredProps } from 'ui/src/components/dropdown-menu'
import { CheckCircleIcon, CirclePlusIcon } from 'ui/src/components/icons'
import { getResourceIdByName } from 'ui/src/components/resource-image-icon/resource-image-map'
import type { ISearchableInputProps } from 'ui/src/components/searchable-input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { FromAccountDropdown } from '../../../components/group-transfer/from-account-dropdown'
import { GroupHeader } from '../../../components/group-transfer/header'
import * as styles from '../../../components/group-transfer/styles.css'
import { ToggleMessageButton } from '../../../components/group-transfer/toggle-message-button'
import { TransferMessage } from '../../../components/transfer-message'
import { getError } from '../../../utils/get-transfer-form-error'
import type { IToken, TSendSchema } from '../../types'
import { TokenSelector } from '../token-selector'
import type { IProps as IGroupTransferProps } from './index'

interface IGroupItemProps extends Omit<Omit<Omit<IGroupTransferProps, 'accounts'>, 'addressBook'>, 'transaction'> {
	sendIndex: number
	send: TSendSchema
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
		onRemoveGroup,
		onUpdateMessage,
		onUpdateIsMessageEncrypted,
	} = props

	const handleToAccountUpdate = (_value: string) => {
		onUpdateToAccount(sendIndex)(_value)
	}

	const handleTokenUpdate = (tokenIndex: number) => (_value: string) => {
		const t = balances.find(b => b.address === _value)
		if (t) onUpdateToken(sendIndex)(tokenIndex)(t.address, t.symbol, t.name)
	}

	const handleTokenValueUpdate = (tokenIndex: number) => (_value: number) => {
		onUpdateTokenValue(sendIndex)(tokenIndex)(_value)
	}

	const handleAddToken = () => {
		onAddToken(sendIndex)
	}

	const [debouncedValue] = useDebounce<string>(send.to, 500)
	const { data } = useEntityMetadata(debouncedValue)

	const name = useMetadataValue('name', data)
	const toName = knownAddresses[send.to]?.name || name

	return (
		<AccordionRoot key={`accordion-${sendIndex}`} type="single" defaultValue={`send-${sendIndex}`} collapsible>
			<AccordionItem value={`send-${sendIndex}`} className={styles.transferAccordionItemWrapper}>
				<GroupHeader
					sendIndex={sendIndex}
					fromAccount={fromAccount}
					knownAddresses={knownAddresses}
					onRemoveGroup={onRemoveGroup}
				/>
				<AccordionContent className={styles.transferAccordionContentWrapper}>
					<Box padding="large">
						{sendIndex === 0 && (
							<FromAccountDropdown
								validation={validation}
								accountEntries={accountEntries}
								fromAccount={fromAccount}
								knownAddresses={knownAddresses}
								onUpdate={onUpdateFromAccount}
							/>
						)}
						<Box display="flex" paddingBottom="small">
							<Box display="flex" alignItems="center" width="full">
								<Box display="flex" alignItems="center" flexGrow={1}>
									<Text size="medium" color="strong" weight="medium">
										<Translation capitalizeFirstLetter text="transfer.group.to" />:
									</Text>
									<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
										{toName && <Text size="medium">({toName})</Text>}
										{knownAddresses[send.to] && (
											<ToolTip message="transfer.group.knownAddress" side="top">
												<CheckCircleIcon />
											</ToolTip>
										)}
									</Box>
								</Box>
								<Box display="flex" alignItems="center" gap="medium">
									{sendIndex === 0 ? (
										<ToggleMessageButton onClick={onToggleMessageUi} isVisible={isMessageUiVisible} />
									) : null}
								</Box>
							</Box>
						</Box>
						<Box width="full">
							<SearchableInput
								placeholder={capitalizeFirstLetter(t('transfer.group.enterAddressPlaceholder'))}
								value={send.to}
								styleVariant={getError(validation, ['sends', sendIndex, 'to']).error ? 'primary-error' : 'primary'}
								onValueChange={handleToAccountUpdate}
								data={allEntries}
							/>
							<ValidationErrorMessage error={getError(validation, ['sends', sendIndex, 'to'])} />
						</Box>
						{sendIndex === 0 ? (
							<TransferMessage
								isVisible={isMessageUiVisible}
								message={message}
								isEncrypted={isMessageEncrypted}
								onUpdateMessage={onUpdateMessage}
								onUpdateIsMessageEncrypted={onUpdateIsMessageEncrypted}
							/>
						) : null}
						{send.tokens.map(({ amount, address }: IToken, tokenIndex: number) => (
							<TokenSelector
								key={`group-${sendIndex}-${tokenIndex}`}
								fromAccount={fromAccount}
								balances={balances}
								tokenAddress={address || getResourceIdByName('radix')}
								tokenValue={amount}
								sendIndex={sendIndex}
								tokenIndex={tokenIndex}
								validation={validation}
								onUpdateToken={handleTokenUpdate(tokenIndex)}
								onUpdateTokenValue={handleTokenValueUpdate(tokenIndex)}
							/>
						))}
						<Box width="full" paddingTop="large">
							<Button
								styleVariant="tertiary"
								sizeVariant="xlarge"
								fullWidth
								onClick={handleAddToken}
								leftIcon={
									<Box marginLeft="small">
										<CirclePlusIcon />
									</Box>
								}
							>
								<Translation capitalizeFirstLetter text="transfer.group.addAnotherToken" />
							</Button>
						</Box>
					</Box>
				</AccordionContent>
			</AccordionItem>
		</AccordionRoot>
	)
}
