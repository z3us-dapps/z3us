import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

const messages = defineMessages({
	lsu_title: {
		id: 'hS4bud',
		defaultMessage: 'LSU',
	},

	unknown_title: {
		id: 'EqfQEG',
		defaultMessage: `{hasName, select,
			true {{name}}
			other {Unknown}
		}`,
	},
})

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const LSUNameCell: React.FC<IProps> = props => {
	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const {
		value,
		row: { original },
	} = props
	const { symbol, name, amount, change, value: tokenValue } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]
	const a = amount
		? intl.formatNumber(amount, {
				style: 'decimal',
				maximumFractionDigits: 18,
		  })
		: ''

	const { data, isLoading } = useEntityDetails(original?.validator)

	const validatorName = findMetadataValue('name', data?.metadata?.items)

	return (
		<Box className={styles.lsuNameCellWrapper}>
			<Box className={clsx(styles.lsuNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={value} />
				<Box className={styles.lsuNameCellStatsWrapper}>
					<Box className={styles.lsuNameCellNameWrapper}>
						<Box className={styles.lsuNameMobileNameWrapper}>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
								{intl.formatMessage(messages.lsu_title)} -{' '}
								{intl.formatMessage(messages.unknown_title, { hasName: !!validatorName, validatorName })}
							</Text>
						</Box>
						<Box className={styles.lsuNameTabletNameWrapper}>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
								{symbol && `${symbol.toUpperCase()} - `}
								{name}
							</Text>
						</Box>
						{amount && (
							<Box>
								<Text
									capitalizeFirstLetter
									size="xsmall"
									truncate
									weight="strong"
									className={styles.lsuNameCellBalanceWrapper}
								>
									{a}
								</Text>
							</Box>
						)}
					</Box>
					<Box className={styles.lsuNameCellPriceWrapper}>
						<Box className={styles.lsuNameCellPriceTextWrapper}>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium" align="right">
								{tokenValue &&
									intl.formatNumber(tokenValue, {
										style: 'currency',
										currency,
									})}
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
