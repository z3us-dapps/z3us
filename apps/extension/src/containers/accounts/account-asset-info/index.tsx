/* eslint-disable  @typescript-eslint/no-unused-vars */
import { ResponsiveLine } from '@nivo/line'
import React from 'react'

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
	{
		id: 'france',
		color: 'hsl(190, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 147,
			},
			{
				x: 'helicopter',
				y: 4,
			},
			{
				x: 'boat',
				y: 89,
			},
			{
				x: 'train',
				y: 96,
			},
			{
				x: 'subway',
				y: 266,
			},
			{
				x: 'bus',
				y: 30,
			},
			{
				x: 'car',
				y: 108,
			},
			{
				x: 'moto',
				y: 31,
			},
			{
				x: 'bicycle',
				y: 160,
			},
			{
				x: 'horse',
				y: 13,
			},
			{
				x: 'skateboard',
				y: 39,
			},
			{
				x: 'others',
				y: 44,
			},
		],
	},
	{
		id: 'us',
		color: 'hsl(301, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 172,
			},
			{
				x: 'helicopter',
				y: 56,
			},
			{
				x: 'boat',
				y: 9,
			},
			{
				x: 'train',
				y: 112,
			},
			{
				x: 'subway',
				y: 27,
			},
			{
				x: 'bus',
				y: 176,
			},
			{
				x: 'car',
				y: 14,
			},
			{
				x: 'moto',
				y: 176,
			},
			{
				x: 'bicycle',
				y: 265,
			},
			{
				x: 'horse',
				y: 263,
			},
			{
				x: 'skateboard',
				y: 209,
			},
			{
				x: 'others',
				y: 152,
			},
		],
	},
	{
		id: 'germany',
		color: 'hsl(308, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 90,
			},
			{
				x: 'helicopter',
				y: 98,
			},
			{
				x: 'boat',
				y: 86,
			},
			{
				x: 'train',
				y: 76,
			},
			{
				x: 'subway',
				y: 168,
			},
			{
				x: 'bus',
				y: 191,
			},
			{
				x: 'car',
				y: 144,
			},
			{
				x: 'moto',
				y: 133,
			},
			{
				x: 'bicycle',
				y: 17,
			},
			{
				x: 'horse',
				y: 248,
			},
			{
				x: 'skateboard',
				y: 196,
			},
			{
				x: 'others',
				y: 243,
			},
		],
	},
	{
		id: 'norway',
		color: 'hsl(278, 70%, 50%)',
		data: [
			{
				x: 'plane',
				y: 171,
			},
			{
				x: 'helicopter',
				y: 247,
			},
			{
				x: 'boat',
				y: 55,
			},
			{
				x: 'train',
				y: 231,
			},
			{
				x: 'subway',
				y: 206,
			},
			{
				x: 'bus',
				y: 129,
			},
			{
				x: 'car',
				y: 20,
			},
			{
				x: 'moto',
				y: 169,
			},
			{
				x: 'bicycle',
				y: 257,
			},
			{
				x: 'horse',
				y: 234,
			},
			{
				x: 'skateboard',
				y: 184,
			},
			{
				x: 'others',
				y: 246,
			},
		],
	},
]

export const AccountAssetInfo: React.FC<IAccountAssetInfoProps> = props => {
	const { account, assetType, asset } = useAccountParams()

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
				<Box className={styles.tempBg}>
					<ResponsiveLine
						animate
						// curve="monotoneX"
						data={data}
						margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
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
						tooltip={geeb => (
							<Box
								padding="large"
								display="flex"
								flexDirection="column"
								borderRadius="large"
								background="backgroundSecondary"
							>
								<Text>Look, Im custom :)</Text>
								<Text>
									<Box component="span">dhfhdfh</Box>
								</Text>
							</Box>
						)}
						axisTop={null}
						axisRight={null}
						axisBottom={null}
						axisLeft={null}
						enableGridX={false}
						enableGridY={false}
						colors={{ scheme: 'nivo' }}
						pointColor={{ from: 'color', modifiers: [] }}
						pointBorderWidth={2}
						pointBorderColor={{ from: 'color', modifiers: [] }}
						pointLabelYOffset={-12}
						enableArea
						areaOpacity={0.25}
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
