/* eslint-disable no-nested-ternary */
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from '../styles.css'

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const ValidatorFeeCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const { validator } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE] & {
		ids?: string[]
	}

	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(validator)

	const factor = useMemo(() => (data ? Number.parseFloat((data.details as any).state.validator_fee_factor) : 0), [data])

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.cellWrapper}>
			<ToolTip message={factor}>
				<Box className={clsx(styles.cellContentWrapper, 'td-cell')}>
					<Text size="small" color={factor > 0.015 ? 'red' : factor > 0 ? 'neutral' : 'green'} truncate>
						{intl.formatNumber(factor, PERCENTAGE_STYLES)}
					</Text>
				</Box>
			</ToolTip>
		</Box>
	)
}
