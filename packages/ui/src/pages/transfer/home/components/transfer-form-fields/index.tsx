import clsx from 'clsx'
import React, { forwardRef, useContext, useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { NftSelect } from 'ui/src/components/form/fields/nft-select'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Tabs, TabsContent } from 'ui/src/components/tabs'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './styles.css'

export const MESSAGE_KEY = 'message'
export const MAX_MESSAGE_LENGTH = 200
export const FROM_KEY = 'from'
export const ACCOUNT_KEY = 'account'
export const TOKENS = 'tokens'
export const NFTS = 'nfts'

const messages = defineMessages({
	button_add_from: {
		id: 'nlmCx1',
		defaultMessage: 'Add another source',
	},
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

	button_submit: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
})

export const AccountFormFieldsGroup = forwardRef<HTMLInputElement>((_, ref: React.Ref<HTMLInputElement | null>) => {
	const intl = useIntl()
	const { name: parentName } = useContext(FieldContext)
	const from = useFieldValue(`${parentName ? `${parentName}.` : ''}${ACCOUNT_KEY}`) || ''

	return (
		<>
			<Box className={clsx(styles.transferFormGridBoxWrapper, styles.transferFormGridBoxWrapperBorder)}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="large" weight="strong">
						{intl.formatMessage(messages.from_title)}
					</Text>
					<Text size="xsmall">{intl.formatMessage(messages.from_subtitle)}</Text>
				</Box>
				<Box>
					<AccountSelect placeholder={intl.formatMessage(messages.from_placeholder)} ref={ref} name={ACCOUNT_KEY} />
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
						sizeVariant="large"
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
						<Text color="strong" size="large" weight="strong">
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
})

export const TransferFormFields: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const msg = useFieldValue(MESSAGE_KEY) || ''

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	return (
		<>
			<Box className={styles.transferFormGridBoxWrapper}>
				<Box className={styles.transferFormGridBoxWrapperLeft}>
					<Text color="strong" size="large" weight="strong">
						{intl.formatMessage(messages.message_title)}
					</Text>
					<Text size="xsmall">{intl.formatMessage(messages.message_subtitle)}</Text>
				</Box>
				<Box className={styles.transferFormMessageWrapper}>
					<Box className={styles.transferFormCountWrapper}>
						<Text size="xxsmall">{`${msg?.length || 0}/${MAX_MESSAGE_LENGTH}`}</Text>
					</Box>
					<TextAreaField
						name={MESSAGE_KEY}
						placeholder={intl.formatMessage(messages.message_placeholder)}
						sizeVariant="large"
						className={styles.transferFormMessageTextArea}
						maxLength={MAX_MESSAGE_LENGTH}
					/>
					{/* <Box className={styles.transferFormEncryptWrapper}>
						<Text size="xsmall">{intl.formatMessage(messages.message_encrypt_title)}</Text>
						<CheckboxField name="messageEncrypted" styleVariant="primary" sizeVariant="small" />
					</Box> */}
				</Box>
			</Box>
			<FieldsGroup
				name={FROM_KEY}
				defaultKeys={1}
				trashTrigger={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly className={styles.transferActionTrashButtonWrapper}>
						<TrashIcon />
					</Button>
				}
				addTrigger={
					<Box className={styles.transferActionAddSourceWrapper}>
						<Button
							styleVariant="secondary"
							sizeVariant="large"
							fullWidth
							leftIcon={
								<Box marginLeft="small">
									<UsersPlusIcon />
								</Box>
							}
						>
							{intl.formatMessage(messages.button_add_from)}
						</Button>
					</Box>
				}
			>
				<AccountFormFieldsGroup ref={inputRef} />
			</FieldsGroup>
			<SubmitButton>
				<Button sizeVariant="large" styleVariant="primary" fullWidth>
					{intl.formatMessage(messages.button_submit)}
				</Button>
			</SubmitButton>
		</>
	)
}

export default TransferFormFields
