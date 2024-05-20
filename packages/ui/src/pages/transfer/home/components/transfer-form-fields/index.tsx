import React, { useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { TextAreaField } from 'ui/src/components/form/fields/text-area-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { TrashIcon, UsersPlusIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import { AccountFormFieldsGroup } from './account-fields-group'
import * as styles from './styles.css'

export const MESSAGE_KEY = 'message'
export const MAX_MESSAGE_LENGTH = 200
export const FROM_KEY = 'from'

const messages = defineMessages({
	button_add_from: {
		id: 'nlmCx1',
		defaultMessage: 'Add another source',
	},
	title: {
		id: 'DtYelJ',
		defaultMessage: 'Transfer',
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
	button_submit: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
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
					<Box maxWidth="xxsmall">
						<Text size="xsmall">{intl.formatMessage(messages.message_subtitle)}</Text>
					</Box>
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
