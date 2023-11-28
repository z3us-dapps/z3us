import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const ValidatorCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props
	const { address, amount, change, value: tokenValue } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data, isLoading } = useEntityDetails(value)

	const name = findMetadataValue('name', data?.metadata?.items)

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'large' }} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<ToolTip side="top" message={name}>
							<Box>
								<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
									{name}
								</Text>
							</Box>
						</ToolTip>
						{amount && (
							<Box>
								<Text capitalizeFirstLetter size="xsmall" truncate className={styles.assetNameCellBalanceWrapper}>
									{intl.formatNumber(Number.parseFloat(amount), {
										style: 'decimal',
										maximumFractionDigits: 18,
									})}
								</Text>
							</Box>
						)}
					</Box>
					<Box className={styles.assetNameCellPriceWrapper}>
						<Box className={styles.assetNameCellPriceTextWrapper}>
							<ResourceSnippet address={address} size="small" />
						</Box>
						<Box className={styles.assetNameCellPriceTextWrapper}>
							<Text capitalizeFirstLetter size="xsmall" color="strong" truncate weight="medium" align="right">
								{tokenValue &&
									intl.formatNumber(tokenValue, {
										style: 'currency',
										currency,
									})}
								&nbsp;-&nbsp;
							</Text>
							<RedGreenText
								change={change}
								capitalizeFirstLetter
								size="xsmall"
								color="strong"
								truncate
								weight="medium"
								align="right"
							>
								{change &&
									intl.formatNumber(change, {
										style: 'percent',
										maximumFractionDigits: 2,
									})}
							</RedGreenText>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
