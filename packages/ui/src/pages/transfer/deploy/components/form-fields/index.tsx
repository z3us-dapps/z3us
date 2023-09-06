import { NftCollectionSelect } from 'packages/ui/src/components/form/fields/nft-collection-select'
import { useFieldValue } from 'packages/ui/src/components/form/use-field-value'
import React, { useEffect, useRef } from 'react'

import { Box } from 'ui/src/components/box'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { Dropzone } from 'ui/src/components/form/fields/dropzone'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

export const DeployFormFields: React.FC = () => {
	const inputRef = useRef(null)
	const from = useFieldValue('from') || ''

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
				<AccountSelect name="from" />
			</Box>
			<Box paddingTop="large">
				<Box paddingBottom="small">
					<Text size="small">
						<Translation capitalizeFirstLetter text="transfer.deploy.badgeTitle" />
					</Text>
				</Box>
				<NftCollectionSelect name="badge" fromAccount={from} />
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
