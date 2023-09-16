import clsx from 'clsx'
import { NftSelect } from 'packages/ui/src/components/form/fields/nft-select'
import React, { useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { CheckboxField } from 'ui/src/components/form/fields/checkbox-field'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './styles.css'

const accountKey = 'from'

const TOKENS = 'tokens'
const NFTS = 'nfts'

const messages = defineMessages({
	button_add_account: {
		id: 'transfer.form.button.add_account',
		defaultMessage: 'Add another recipient',
	},
	button_add_token: {
		id: 'transfer.form.button.add_token',
		defaultMessage: 'Add another item',
	},
	known_address: {
		id: 'transfer.known_address',
		defaultMessage: 'Known address',
	},
	title: {
		id: 'transfer.form.title',
		defaultMessage: 'Transfer',
	},
	from_title: {
		id: 'transfer.form.field.from.title',
		defaultMessage: 'From account',
	},
	from_subtitle: {
		id: 'transfer.form.field.from.subtitle',
		defaultMessage: 'Select account you wish to send items from',
	},
	to_title: {
		id: 'transfer.form.field.to.title',
		defaultMessage: 'To account',
	},
	to_subtitle: {
		id: 'transfer.form.field.to.subtitle',
		defaultMessage: 'Select recipient to send items to',
	},
	message_title: {
		id: 'transfer.form.field.message.title',
		defaultMessage: 'Message',
	},
	message_subtitle: {
		id: 'transfer.form.field.message.subtitle',
		defaultMessage: 'Send an optional message with the transaction',
	},
	message_placeholder: {
		id: 'transfer.form.field.message.placeholder',
		defaultMessage: 'Enter transaction message',
	},
	message_encrypt_title: {
		id: 'transfer.form.field.message.encrypt_title',
		defaultMessage: 'Encrypt message',
	},
	tab_tokens: {
		id: 'transfer.form.tab.tokens',
		defaultMessage: 'Tokens',
	},
	tab_nfts: {
		id: 'transfer.form.tab.nfts',
		defaultMessage: 'NFTs',
	},
})

export const TransferFormFields: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const from = useFieldValue(accountKey) || ''

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	return (
		<>
			<Box className={styles.transferFormGridBoxWrapper}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						{intl.formatMessage(messages.from_title)}
					</Text>
					<Text size="xsmall">{intl.formatMessage(messages.from_subtitle)}</Text>
				</Box>
				<Box>
					<AccountSelect ref={inputRef} name={accountKey} />
				</Box>
			</Box>
			<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						{intl.formatMessage(messages.message_title)}
					</Text>
					<Text size="xsmall">{intl.formatMessage(messages.message_subtitle)}</Text>
				</Box>
				<Box>
					<TextAreaField
						name="message"
						placeholder={intl.formatMessage(messages.message_placeholder)}
						sizeVariant="medium"
						className={styles.transferFormMessageTextArea}
					/>
					<Box className={styles.transferFormEncryptWrapper}>
						<Text size="xsmall">{intl.formatMessage(messages.message_encrypt_title)}</Text>
						<CheckboxField name="messageEncrypted" styleVariant="primary" sizeVariant="small" />
					</Box>
				</Box>
			</Box>
			<FieldsGroup
				name="actions"
				defaultKeys={1}
				trashTrigger={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly className={styles.transferActionTrashButtonWrapper}>
						<TrashIcon />
					</Button>
				}
				addTrigger={
					<Button
						styleVariant="secondary"
						sizeVariant="xlarge"
						fullWidth
						leftIcon={
							<Box marginLeft="small">
								<UsersPlusIcon />
							</Box>
						}
						className={styles.transferActionAddButtonWrapper}
					>
						{intl.formatMessage(messages.button_add_account)}
					</Button>
				}
			>
				<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
					<Box className={styles.transferFormGridBoxWrapperLeft}>
						<Text color="strong" size="xlarge" weight="strong">
							{intl.formatMessage(messages.to_title)}
						</Text>
						<Text size="xsmall">{intl.formatMessage(messages.to_subtitle)}</Text>
					</Box>
					<Box>
						<AddressBookSelect name="to" toolTipMessageKnownAddress={intl.formatMessage(messages.known_address)} />
						<FieldsGroup
							name="resources"
							defaultKeys={1}
							addTrigger={
								<Button
									styleVariant="secondary"
									sizeVariant="large"
									fullWidth
									leftIcon={
										<Box marginLeft="small">
											<CirclePlusIcon />
										</Box>
									}
									className={styles.transferActionTokensNftsAddButton}
								>
									{intl.formatMessage(messages.button_add_token)}
								</Button>
							}
							trashTrigger={
								<Button
									styleVariant="ghost"
									sizeVariant="small"
									iconOnly
									className={styles.transferActionTrashTokensNftsButton}
								>
									<TrashIcon />
								</Button>
							}
						>
							<Box className={styles.transferActionToAssetWrapper}>
								<Tabs
									list={[
										{ label: capitalizeFirstLetter(intl.formatMessage(messages.tab_tokens)), value: TOKENS },
										{ label: capitalizeFirstLetter(intl.formatMessage(messages.tab_nfts)), value: NFTS },
									]}
									defaultValue={TOKENS}
									className={styles.transferActionTabsWrapper}
								>
									<TabsContent value={TOKENS} className={styles.transferActionTabsContentWrapper}>
										<Box className={styles.transferActionToAssetWrapper}>
											<TokenAmountSelect fromAccount={from} />
										</Box>
									</TabsContent>
									<TabsContent value={NFTS} className={styles.transferActionTabsContentWrapper}>
										<Box className={styles.transferActionToAssetWrapper}>
											<NftSelect fromAccount={from} />
										</Box>
									</TabsContent>
								</Tabs>
							</Box>
						</FieldsGroup>
					</Box>
				</Box>
			</FieldsGroup>
		</>
	)
}

export default TransferFormFields
