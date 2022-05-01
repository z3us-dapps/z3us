/* eslint-disable */
import React from 'react'
import { useStore } from '@src/store'
import BigNumber from 'bignumber.js'
import { Action, Transaction } from '@src/services/types'
import { useTokenInfo } from '@src/services/react-query/queries/radix'
import { formatBigNumber } from '@src/utils/formatters'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { CircleAvatar } from '@src/components/circle-avatar'
import Button from 'ui/src/components/button'
import { CSS } from 'ui/src/theme'
import { ActivityLinks } from './activity-links'
import { ActivityType } from '../activity-type'

interface IProps {
	tx: Transaction
	activity: Action
	css?: CSS
	isIsoStyled?: boolean
	paddingBottom?: string
}

const defaultProps = {
	css: {},
	isIsoStyled: false,
}

export const ActivityItem = React.forwardRef<HTMLDivElement, IProps>(({ tx, activity, css, isIsoStyled }, ref) => {
	const { accountAddress } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
	}))
	const { data: token } = useTokenInfo(activity?.rri)
	const tokenImage = token?.image || token?.iconURL

	return (
		<div ref={ref} style={{ paddingBottom: isIsoStyled ? '12px' : '0' }}>
			<Button
				css={{
					...(css as any),
				}}
			>
				<Box css={{ mr: '13px', pl: '$2' }}>
					<Box css={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
						<Box as="img" src={tokenImage} css={{ width: '36px', height: '36px' }} />
					</Box>
				</Box>
				<Flex direction="column" css={{ flex: '1' }}>
					<Flex align="center">
						<Flex css={{ flex: '1' }}>
							<Box css={{ maxWidth: '145px' }}>
								<Text
									truncate
									bold
									size="3"
									css={{
										...(isIsoStyled
											? {
													fontSize: '14px',
													lineHeight: '16px',
											  }
											: {
													fontSize: '16px',
													lineHeight: '22px',
											  }),
										display: 'flex',
									}}
								>
									<Box css={{ pr: '$1' }}>{formatBigNumber(new BigNumber(activity.amount).shiftedBy(-18))}</Box>
									<Box>{token?.symbol?.toLocaleUpperCase()}</Box>
								</Text>
								{/*<Flex align="center">
									<ActivityLinks activity={activity} tx={tx} accountAddress={accountAddress} />
								</Flex>*/}
							</Box>
						</Flex>
						<Flex align="center" css={{ pl: '$1' }}>
							<ActivityType activity={activity} accountAddress={accountAddress} />
						</Flex>
					</Flex>
				</Flex>
			</Button>
		</div>
	)
})

ActivityItem.defaultProps = defaultProps
