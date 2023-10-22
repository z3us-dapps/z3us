import clsx from 'clsx'
import React, { useContext, useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FormContext } from 'ui/src/components/form/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { NftSelect } from 'ui/src/components/form/fields/nft-select'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './styles.css'

const ACCOUNT_KEY = 'from'
const TOKENS = 'tokens'
const NFTS = 'nfts'

const messages = defineMessages({
	button_add_account: {
		id: 'k9/iMB',
		defaultMessage: 'Add another recipient',
	},
	button_add_token: {
		id: 'dYGqTI',
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
		id: 'yeLIPx',
		defaultMessage: 'Select account you wish to send assets from',
	},
	from_placeholder: {
		defaultMessage: 'Select account',
		id: '0+6+jP',
	},
	to_placeholder: {
		defaultMessage: 'Select account',
		id: '0+6+jP',
	},
	to_title: {
		id: 'gCOFay',
		defaultMessage: 'To account',
	},
	to_subtitle: {
		id: 'y0Ofed',
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
	const from = useFieldValue(ACCOUNT_KEY) || ''
	const location = useLocation()

	const { onFieldChange } = useContext(FormContext)
	const searchParams = new URLSearchParams(location.search)
	const accountIdQuery = searchParams.get('accountId')

	useEffect(() => {
		inputRef?.current?.focus()

		if (accountIdQuery) {
			onFieldChange(ACCOUNT_KEY, accountIdQuery)
		}
	}, [accountIdQuery])

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
					<AccountSelect
						placeholder={intl.formatMessage(messages.from_placeholder)}
						ref={inputRef}
						name={ACCOUNT_KEY}
					/>
				</Box>
			</Box>
			<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="xlarge" weight="strong">
						{intl.formatMessage(messages.message_title)}
					</Text>
					<Text size="xsmall">{intl.formatMessage(messages.message_subtitle)}</Text>
				</Box>
				<Box className={styles.transferFormMessageWrapper}>
					<Box className={styles.transferFormCountWrapper}>
						<Text size="xxsmall">2/200</Text>
					</Box>
					<TextAreaField
						name="message"
						placeholder={intl.formatMessage(messages.message_placeholder)}
						sizeVariant="medium"
						className={styles.transferFormMessageTextArea}
					/>
					{/* <Box className={styles.transferFormEncryptWrapper}>
						<Text size="xsmall">{intl.formatMessage(messages.message_encrypt_title)}</Text>
						<CheckboxField name="messageEncrypted" styleVariant="primary" sizeVariant="small" />
					</Box> */}
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
						<AddressBookSelect
							placeholder={intl.formatMessage(messages.to_placeholder)}
							name="to"
							toolTipMessageKnownAddress={intl.formatMessage(messages.known_address)}
						/>
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
