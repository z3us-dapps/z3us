import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { CheckboxField } from 'ui/src/components/form/fields/checkbox-field'
import { NftSelect } from 'ui/src/components/form/fields/nft-select'
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
		id: 'k9/iMB',
		defaultMessage: 'Add another recipient',
	},
	button_add_token: {
		id: 'ad0STz',
		defaultMessage: 'Add another asset',
	},
	known_address: {
		id: '1LCRft',
		defaultMessage: 'Known address',
	},
	title: {
		id: 'DtYelJ',
		defaultMessage: 'Transfer',
	},
	from_title: {
		id: 'F4xg6X',
		defaultMessage: 'From account',
	},
	from_subtitle: {
		id: 'V0NiPI',
		defaultMessage: 'Select account you wish to send assets from',
	},
	to_title: {
		id: 'gCOFay',
		defaultMessage: 'To account',
	},
	to_subtitle: {
		id: 'ZXlamw',
		defaultMessage: 'Select recipient to send assets to',
	},
	message_title: {
		id: 'T7Ry38',
		defaultMessage: 'Message',
	},
	message_subtitle: {
		id: 'QBcOMr',
		defaultMessage: 'Send an optional message with the transaction',
	},
	message_placeholder: {
		id: 'd4jAEU',
		defaultMessage: 'Enter transaction message',
	},
	message_encrypt_title: {
		id: 'luAead',
		defaultMessage: 'Encrypt message',
	},
	tab_tokens: {
		id: 'P6EE/a',
		defaultMessage: 'Tokens',
	},
	tab_nfts: {
		id: 'nqRscq',
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
					<AccountSelect placeholder="Select account" ref={inputRef} name={accountKey} />
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
										<TokenAmountSelect fromAccount={from} />
									</TabsContent>
									<TabsContent value={NFTS} className={styles.transferActionTabsContentWrapper}>
										<NftSelect fromAccount={from} />
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
