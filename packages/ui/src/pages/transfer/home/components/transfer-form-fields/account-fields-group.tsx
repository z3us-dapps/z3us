import clsx from 'clsx'
import React, { forwardRef, useContext } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { AddressBookSelect } from 'ui/src/components/form/fields/address-book-select'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { CirclePlusIcon, TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import { ResourceFieldsTabs } from './resource-fields-tabs'
import * as styles from './styles.css'

export const ACCOUNT_KEY = 'account'
export const TOKENS = 'tokens'
export const NFTS = 'nfts'

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
				className={styles.transferActionFieldParentWrapper}
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
					<Box className={styles.addressBookSelectWrapper}>
						<AddressBookSelect
							placeholder={intl.formatMessage(messages.to_placeholder)}
							name="to"
							toolTipMessageKnownAddress={intl.formatMessage(messages.known_address)}
							exclude={from}
						/>
						<FieldsGroup
							name="resources"
							defaultKeys={1}
							className={styles.transferActionFieldWrapper}
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
							<ResourceFieldsTabs from={from} />
						</FieldsGroup>
					</Box>
				</Box>
			</FieldsGroup>
		</>
	)
})
