import clsx from 'clsx'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { TimeFromNow } from 'ui/src/components/time-from-now'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useCurrentStatus } from 'ui/src/hooks/dapp/use-network'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from '../styles.css'
import { getClaimEpoch } from '../validator-liquidity-cell'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

const epochDurationInMinutes = 5

const messages = defineMessages({
	claim_in: {
		id: 'P6NWR8',
		defaultMessage: 'Ready to claim',
	},
})

export const ValidatorNameCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { amount, address, ids } = original as ResourceBalance[ResourceBalanceType.NON_FUNGIBLE]

	const { data: status } = useCurrentStatus()
	const { data, isLoading } = useEntityDetails(value)
	const { data: nfts = [] } = useNonFungiblesData(address, ids || [])
	const name = findMetadataValue('name', data?.metadata?.items)

	const claimAt = useMemo(() => {
		if (!status) return undefined
		const at = getClaimEpoch(nfts || [])
		if (at === undefined) return undefined
		const claimInMilliseconds = (Number(at) - status.ledger_state.epoch) * epochDurationInMinutes * 60 * 1000
		return new Date(new Date().getTime() + claimInMilliseconds)
	}, [status, nfts])

	const intl = useIntl()

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.cellWrapper}>
			<Box className={clsx(styles.cellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'large' }} address={address} toolTipEnabled />
				<Box display="flex" flexDirection="column">
					<ToolTip side="top" message={name}>
						<Box>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
								{name}
							</Text>
						</Box>
					</ToolTip>
					<ToolTip side="top" message={amount}>
						<Box>
							<Text capitalizeFirstLetter size="xsmall" truncate>
								{intl.formatNumber(Number.parseFloat(amount), DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
					{claimAt !== undefined && (
						<ToolTip side="top" message={intl.formatMessage(messages.claim_in)}>
							<Box>
								<Text capitalizeFirstLetter size="xsmall" truncate>
									<TimeFromNow date={claimAt} />
								</Text>
							</Box>
						</ToolTip>
					)}
				</Box>
			</Box>
		</Box>
	)
}
