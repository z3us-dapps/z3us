import React, { useEffect, useRef } from 'react'

import { Box } from 'ui/src/components/box'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { Dropzone } from 'ui/src/components/form/fields/dropzone'
import { NftSelect } from 'ui/src/components/form/fields/nft-select'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

const accountKey = 'from'

export const DeployFormFields: React.FC = () => {
	const inputRef = useRef(null)
	const from = useFieldValue(accountKey) || ''

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	return (
		<Box>
			<Box paddingTop="large">
				<Box paddingBottom="small">
					<Text size="small">
						<Translation capitalizeFirstLetter text="transfer.deploy.accountTitle" />
					</Text>
				</Box>
				<AccountSelect name={accountKey} />
			</Box>
			<Box paddingTop="large">
				<Box paddingBottom="small">
					<Text size="small">
						<Translation capitalizeFirstLetter text="transfer.deploy.badgeTitle" />
					</Text>
				</Box>
				<NftSelect fromAccount={from} resourceKey="badge" />
			</Box>
			<Box paddingTop="large">
				<Dropzone
					name="files"
					options={{ maxFiles: 2 }}
					title={<Translation capitalizeFirstLetter text="transfer.raw.filesTitle" />}
				/>
			</Box>
		</Box>
	)
}

export default DeployFormFields
