/* eslint-disable  @typescript-eslint/no-unused-vars */
import { ResponsiveLine } from '@nivo/line'
import * as Portal from '@radix-ui/react-portal'
import { motion } from 'framer-motion'
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

const data = [
	{
		id: 'japan',
		color: 'hsl(8, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 162,
			},
			{
				x: 'helicopter',
				y: 54,
			},
			{
				x: 'boat',
				y: 0,
			},
			{
				x: 'train',
				y: 42,
			},
			{
				x: 'subway',
				y: 238,
			},
			{
				x: 'bus',
				y: 224,
			},
			{
				x: 'car',
				y: 101,
			},
			{
				x: 'moto',
				y: 45,
			},
			{
				x: 'bicycle',
				y: 266,
			},
			{
				x: 'horse',
				y: 66,
			},
			{
				x: 'skateboard',
				y: 158,
			},
			{
				x: 'others',
				y: 255,
			},
		],
	},
]

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
				<Box ref={chartRef} className={styles.chartBgWrapper}>
					<ResponsiveLine
						animate
						// curve="monotoneX"
						data={data}
						margin={{ top: 10, bottom: 10, right: 0, left: 0 }}
						xScale={{ type: 'point' }}
						yScale={{
							type: 'linear',
							min: 'auto',
							max: 'auto',
							stacked: true,
							reverse: false,
						}}
						yFormat=" >-.2f"
						// eslint-disable-next-line
						tooltip={({ point }) => {
							return (
								<Portal.Root>
									<motion.div
										animate={{
											x: (chartBounding?.left || 0) + point.x,
											y: (chartBounding?.top || 0) + point.y,
											opacity: 1,
											scale: 1,
										}}
										transition={{
											duration: 0.5,
											delay: 0.1,
										}}
										initial={{ opacity: 0, scale: 0.5 }}
									>
										<Box
											position="absolute"
											padding="medium"
											display="flex"
											flexDirection="column"
											borderRadius="medium"
											background="backgroundSecondary"
											boxShadow="shadowPanel"
											pointerEvents="none"
											style={{
												minWidth: '100px',
												whiteSpace: 'pre',
											}}
										>
											<Text size="xsmall">
												<Box component="span">x: {point.data.xFormatted}</Box>
											</Text>
											<Text size="xsmall">
												<Box component="span">y: {point.data.yFormatted}</Box>
											</Text>
										</Box>
									</motion.div>
								</Portal.Root>
							)
						}}
						axisTop={null}
						axisRight={null}
						axisBottom={null}
						axisLeft={null}
						enableGridX={false}
						enableGridY={false}
						colors={{ scheme: 'nivo' }}
						pointColor={{ from: 'color', modifiers: [] }}
						pointBorderWidth={0}
						pointBorderColor={{ from: 'color', modifiers: [] }}
						pointLabelYOffset={-12}
						enableArea
						areaOpacity={0}
						enableCrosshair={false}
						useMesh
						legends={[]}
					/>
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
