import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { CheckCircleIcon } from 'ui/src/components/icons'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Link, Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
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

	const { data = [], isLoading } = useEntityMetadata(dAppDefinitionAddress)
	const name = findMetadataValue('name', data)
	const infoUrl = findMetadataValue('info_url', data)
	const description = findMetadataValue('description', data)

	const isVerified = useMemo(
		() =>
			origin === popupURL.origin ||
			!!matches.find(match => match.replace('*://*.', '').replace('/*', '').endsWith(new URL(origin).hostname)),
		[origin],
	)

	const isMalicious = useMemo(() => {
		const claimedWebsites = findMetadataValue('claimed_websites', data)
		return (
			!isLoading && origin !== popupURL.origin && origin !== claimedWebsites && !claimedWebsites.includes(`${origin}, `)
		)
	}, [data, isLoading, origin])

	return (
		<Box display="flex" flexDirection="column" gap="xsmall" alignItems="center" justifyContent="center">
			<Link color="strong" size="xlarge" weight="strong" href={infoUrl} underline="never" target="_blank">
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
					<ResourceImageIcon size="xxlarge" address={dAppDefinitionAddress} />
					<Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
						{name || getShortAddress(dAppDefinitionAddress)}
						{isVerified === true && (
							<ToolTip message={intl.formatMessage(messages.verified_dapp)} side="top">
								<CheckCircleIcon color="green" />
							</ToolTip>
						)}
					</Box>
				</Box>
			</Link>

			<Box paddingX="large" display="flex" flexDirection="column" gap="xsmall" maxWidth="full">
				<ToolTip message={origin} side="top">
					<Box>
						<Text align="center" truncate>
							<Link href={origin} size="small" target="_blank">
								{origin}
							</Link>
						</Text>
					</Box>
				</ToolTip>
				<Text align="center" size="small">
					{description}
				</Text>
			</Box>

			<ValidationErrorMessage
				align="center"
				message={isMalicious === false ? '' : intl.formatMessage(messages.origin_warning, { origin })}
			/>
		</Box>
	)
}
