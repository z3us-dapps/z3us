/* eslint-disable react/no-array-index-key */
import { useEntityMetadata, useMetadataValue } from 'packages/ui/src/hooks/dapp/use-entity-metadata'
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import React from 'react'
import { useDebounce } from 'use-debounce'

import { AccordionContent, AccordionItem, AccordionRoot } from 'ui/src/components/accordion'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import type { IDropdownMenuVirtuosoRequiredProps } from 'ui/src/components/dropdown-menu'
import { CheckCircleIcon, CirclePlusIcon } from 'ui/src/components/icons'
import type { ISearchableInputProps } from 'ui/src/components/searchable-input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'

import { FromAccountDropdown } from '../../../components/group-transfer/from-account-dropdown'
import { GroupHeader } from '../../../components/group-transfer/header'
import * as styles from '../../../components/group-transfer/styles.css'
import { ToggleMessageButton } from '../../../components/group-transfer/toggle-message-button'
import { TransferMessage } from '../../../components/transfer-message'
import { getError } from '../../../utils/get-transfer-form-error'
import type { INft, TSendSchema } from '../../types'
import { NftSelector } from '../nft-selector'
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
		onAddNft,
		onUpdateFromAccount,
		onUpdateNft,
		onUpdateNftValue,
		onUpdateToAccount,
		onRemoveGroup,
		onUpdateMessage,
		onUpdateIsMessageEncrypted,
	} = props

	const handleToAccountUpdate = (_value: string) => {
		onUpdateToAccount(sendIndex)(_value)
	}

	const handleNftUpdate = (nftIndex: number) => (_value: string) => {
		const t = balances.find(b => b.address === _value)
		if (t) onUpdateNft(sendIndex)(nftIndex)(t.address, t.symbol, t.name)
	}

	const handleNftValueUpdate = (nftIndex: number) => (_value: number) => {
		onUpdateNftValue(sendIndex)(nftIndex)(_value)
	}

	const handleAddNft = () => {
		onAddNft(sendIndex)
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
										{knownAddresses[send.to] && <CheckCircleIcon />}
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
								placeholder="Enter address"
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
						{(send.nfts || []).map(({ address }: INft, nftIndex: number) => (
							<NftSelector
								key={`group-${sendIndex}-${nftIndex}`}
								balances={balances}
								tokenAddress={address}
								tokenValue={0}
								sendIndex={sendIndex}
								nftIndex={nftIndex}
								validation={validation}
								onUpdateToken={handleNftUpdate(nftIndex)}
								onUpdateTokenValue={handleNftValueUpdate(nftIndex)}
							/>
						))}
						<Box width="full" paddingTop="large">
							<Button
								styleVariant="tertiary"
								sizeVariant="xlarge"
								fullWidth
								onClick={handleAddNft}
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
