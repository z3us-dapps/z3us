import { InformationIcon } from 'packages/ui/src/components/icons'
import { ToolTip } from 'packages/ui/src/components/tool-tip'
import { ValidationErrorMessage } from 'packages/ui/src/components/validation-error-message'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

const messages = defineMessages({
	origin_warning: {
		id: 'HrF57B',
		defaultMessage:
			'Please be extra careful, origin ({origin}) of dApp you are interacting with is not included within claimed websites.',
	},
})

interface IProps {
	dAppDefinitionAddress: string
	origin?: string
}

export const DappDetails: React.FC<IProps> = ({ dAppDefinitionAddress, origin }) => {
	const intl = useIntl()

	const { data = [] } = useEntityMetadata(dAppDefinitionAddress)
	const name = findMetadataValue('name', data)
	const claimedWebsites = findMetadataValue('claimed_websites', data)
	const infoUrl = findMetadataValue('info_url', data)
	const description = findMetadataValue('description', data)

	return (
		<Box display="flex" flexDirection="column" gap="xsmall" alignItems="center" justifyContent="center">
			<ToolTip message={origin}>
				<Box display="flex" flexDirection="column" gap="xsmall" alignItems="center" justifyContent="center">
					<ResourceImageIcon size="xxlarge" address={dAppDefinitionAddress} />

					<Box display="flex" flexDirection="row" gap="xsmall" alignItems="center" justifyContent="center">
						<Text color="strong" size="xlarge" weight="strong">
							{name || origin || getShortAddress(dAppDefinitionAddress)}
						</Text>

						<Button sizeVariant="small" styleVariant="ghost" iconOnly to={infoUrl} target="_blank">
							<InformationIcon />
						</Button>
					</Box>
				</Box>
			</ToolTip>

			<Text>{description}</Text>

			<ValidationErrorMessage
				message={
					claimedWebsites === origin || claimedWebsites.includes(`${origin}, `)
						? ''
						: intl.formatMessage(messages.origin_warning, { origin })
				}
			/>
		</Box>
	)
}
