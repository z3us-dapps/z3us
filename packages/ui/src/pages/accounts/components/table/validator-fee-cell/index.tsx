/* eslint-disable no-nested-ternary */
import clsx from 'clsx'
import { PERCENTAGE_STYLES } from 'ui/src/constants/number'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'

import * as styles from '../asset-change-cell/styles.css'

interface IProps {
	value?: string
}

export const ValidatorFeeCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const { value } = props

	const { data, isLoading } = useEntityDetails(value)

	const factor = useMemo(() => (data ? Number.parseFloat((data.details as any).state.validator_fee_factor) : 0), [data])

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<ToolTip message={factor}>
				<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
					<Text size="large" color={factor > 0.015 ? 'red' : factor > 0 ? 'neutral' : 'green'} truncate>
						{intl.formatNumber(factor, PERCENTAGE_STYLES)}
					</Text>
				</Box>
			</ToolTip>
		</Box>
	)
}
