import React from 'react'
import { useStore } from '@src/store'
import BigNumber from 'bignumber.js'
import { Action, Transaction } from '@src/services/types'
import { useTokenInfo } from '@src/services/react-query/queries/radix'
import { formatBigNumber } from '@src/utils/formatters'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { CircleAvatar } from '@src/components/circle-avatar'
import { CSS } from 'ui/src/theme'
import { ActivityLinks } from './activity-links'
import { ActivityType } from '../activity-type'

interface IProps {
	tx: Transaction
	activity: Action
	css?: CSS
	showAvatarShadow?: boolean
}

const defaultProps = {
	css: {
		height: '76px',
		alignItems: 'center',
		width: '100%',
		border: '1px solid $borderPanel',
		bg: '$bgPanel2',
		mb: '12px',
		br: '$3',
		px: '$2',
	},
	showAvatarShadow: true,
}

export const ActivityItem = React.forwardRef<HTMLDivElement, IProps>(({ tx, activity, css, showAvatarShadow }, ref) => {
	const { accountAddress } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
	}))
	const { data: token } = useTokenInfo(activity?.rri)
	const tokenImage = token?.image || token?.iconURL

	return (
		<div ref={ref} style={{ paddingBottom: '12px' }}>
			<Flex
				css={{
					...(css as any),
				}}
			>
				<CircleAvatar shadow={showAvatarShadow} borderWidth={0} image={tokenImage} width={36} height={36} />
				<Flex direction="column" css={{ pl: '$3', flex: '1' }}>
					<Flex align="center">
						<Flex css={{ flex: '1' }}>
							<Box css={{ maxWidth: '145px' }}>
								<Text truncate medium size="4" css={{ mt: '5px' }}>
									{token?.symbol?.toLocaleUpperCase()}{' '}
									<Box as="span">{formatBigNumber(new BigNumber(activity.amount).shiftedBy(-18))}&nbsp;</Box>
								</Text>
								<Flex align="center">
									<ActivityLinks activity={activity} tx={tx} accountAddress={accountAddress} />
								</Flex>
							</Box>
						</Flex>
						<Flex align="center" css={{ pl: '$1' }}>
							<ActivityType activity={activity} accountAddress={accountAddress} />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</div>
	)
})

ActivityItem.defaultProps = defaultProps
