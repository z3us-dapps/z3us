/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { CardButtons } from '@src/components/card-buttons'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import { useAccountParams } from '@src/hooks/use-account-params'

import * as styles from './account-asset-info.css'

interface IAccountAssetInfoRequiredProps {}

interface IAccountAssetInfoOptionalProps {}

interface IAccountAssetInfoProps extends IAccountAssetInfoRequiredProps, IAccountAssetInfoOptionalProps {}

const defaultProps: IAccountAssetInfoOptionalProps = {}

export const AccountAssetInfo: React.FC<IAccountAssetInfoProps> = () => {
	const chartRef = useRef(null)
	const { account, assetType, asset } = useAccountParams()
	const chartBounding = chartRef?.current?.getBoundingClientRect()

	if (!asset) {
		return null
	}

	return (
		<Box flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box className={styles.assetCloseBtnWrapper}>
					<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.back" />}>
						<Button iconOnly styleVariant="ghost" sizeVariant="small" to={`/accounts/${account}/${assetType}`}>
							<Close2Icon />
						</Button>
					</ToolTip>
				</Box>
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<Box paddingBottom="small">
						<TransactionIcon transactionIconSize="large" />
					</Box>
					<Text size="large" color="strong">
						Bitcoin
					</Text>
					<Text size="xxxlarge" weight="medium" color="strong">
						$12,424
					</Text>
					<Text size="xlarge">+4,345 (13.3%)</Text>
				</Box>
				<Box display="flex" paddingTop="large" gap="large" position="relative" paddingBottom="large">
					<CardButtons />
				</Box>
				<Box className={styles.chartBgWrapper}>
					chart line
				</Box>
				<Box className={styles.assetChartBtnsWrapper}>
					{[
						{ id: '1W', title: '1W' },
						{ id: '1M', title: '1M' },
						{ id: '3M', title: '3M' },
						{ id: '6M', title: '6M' },
						{ id: '1Y', title: '1Y' },
						{ id: 'all', title: 'All' },
					].map(({ id, title }) => (
						<Button
							key={id}
							rounded
							styleVariant={id === 'all' ? 'secondary' : 'tertiary'}
							sizeVariant="small"
							onClick={() => {}}
						>
							{title}
						</Button>
					))}
				</Box>
			</Box>
		</Box>
	)
}

AccountAssetInfo.defaultProps = defaultProps
