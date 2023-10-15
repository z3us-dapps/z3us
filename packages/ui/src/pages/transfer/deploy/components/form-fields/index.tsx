import React, { useEffect, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { Dropzone } from 'ui/src/components/form/fields/dropzone'
import { NftSelect } from 'ui/src/components/form/fields/nft-select'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { Text } from 'ui/src/components/typography'

const messages = defineMessages({
	from: {
		defaultMessage: 'From',
	},
	badge: {
		defaultMessage: 'Owner badge',
	},
	files: {
		defaultMessage: 'Files',
	},
})

const accountKey = 'from'

export const DeployFormFields: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const from = useFieldValue(accountKey) || ''

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	return (
		<Box>
			<Box paddingTop="large">
				<Box paddingBottom="small">
					<Text size="small">{intl.formatMessage(messages.from)}</Text>
				</Box>
				<AccountSelect name={accountKey} />
			</Box>
			<Box paddingTop="large">
				<Box paddingBottom="small">
					<Text size="small">{intl.formatMessage(messages.badge)}</Text>
				</Box>
				<NftSelect fromAccount={from} resourceKey="badge" />
			</Box>
			<Box paddingTop="large">
				<Dropzone name="files" options={{ maxFiles: 2 }} title={intl.formatMessage(messages.files)} />
			</Box>
		</Box>
	)
}

export default DeployFormFields
