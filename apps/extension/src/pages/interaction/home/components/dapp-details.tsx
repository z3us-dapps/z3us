import { CheckCircleIcon } from 'packages/ui/src/components/icons'
import { ToolTip } from 'packages/ui/src/components/tool-tip'
import { ValidationErrorMessage } from 'packages/ui/src/components/validation-error-message'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link, Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

import matches from '@src/browser/manifest/content_matches.json'

const messages = defineMessages({
	origin_warning: {
		id: 'HrF57B',
		defaultMessage:
			'Please be extra careful, origin ({origin}) of dApp you are interacting with is not included within claimed websites.',
	},
	verified_dapp: {
		id: 'q92DfT',
		defaultMessage: 'Verified dApp',
	},
})

interface IProps {
	dAppDefinitionAddress: string
	origin?: string
}

const popupURL = new URL(browser.runtime.getURL(''))

export const DappDetails: React.FC<IProps> = ({ dAppDefinitionAddress, origin }) => {
	const intl = useIntl()

	const { data = [] } = useEntityMetadata(dAppDefinitionAddress)
	const name = findMetadataValue('name', data)
	const claimedWebsites = findMetadataValue('claimed_websites', data)
	const infoUrl = findMetadataValue('info_url', data)
	const description = findMetadataValue('description', data)

	const isVerified = useMemo(
		() =>
			origin === popupURL.origin ||
			!!matches.find(match => match.replace('*://*.', '').replace('/*', '').endsWith(new URL(origin).hostname)),
		[origin],
	)

	return (
		<Box display="flex" flexDirection="column" gap="xsmall" alignItems="center" justifyContent="center">
			<Link color="strong" size="xlarge" weight="strong" href={infoUrl} underline="never" target="_blank">
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
					<ResourceImageIcon size="xxlarge" address={dAppDefinitionAddress} />
					<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
						{name || getShortAddress(dAppDefinitionAddress)}
						{isVerified && (
							<ToolTip message={intl.formatMessage(messages.verified_dapp)} side="top">
								<CheckCircleIcon color="green" />
							</ToolTip>
						)}
					</Box>
				</Box>
			</Link>

			<Link href={origin} size="small" target="_blank">
				{origin}
			</Link>

			<Text align="center">{description}</Text>

			<ValidationErrorMessage
				align="center"
				message={
					origin === popupURL.origin || origin === claimedWebsites || claimedWebsites.includes(`${origin}, `)
						? ''
						: intl.formatMessage(messages.origin_warning, { origin })
				}
			/>
		</Box>
	)
}
