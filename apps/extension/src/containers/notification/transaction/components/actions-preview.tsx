/* eslint-disable react/no-array-index-key */
import React from 'react'
import BigNumber from 'bignumber.js'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'
import { useSharedStore, useStore } from '@src/store'
import { SlippageBox } from '@src/components/slippage-box'
import { ActivityType } from '@src/components/activity-type'
import { Action } from '@radixdlt/application'

interface IProps {
	actions?: Action[]
	fee?: string
}

const defaultProps = {
	actions: null,
	fee: null,
}

const ActionsPreview: React.FC<IProps> = ({ actions, fee }) => {
	const { addressBook } = useSharedStore(state => ({
		addressBook: state.addressBook,
	}))

	const { accountAddress, publicAddresses } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		publicAddresses: Object.values(state.publicAddresses),
	}))

	const entry = publicAddresses.find(_account => _account.address === accountAddress)
	const shortAddress = getShortAddress(entry?.address)

	if (!actions) {
		return null
	}

	return (
		<Box>
			{actions.map((activity: any, i) => {
				const toAccount = activity?.to_account?.address
				const fromAccount = activity?.from_account?.address
				const toEntry = addressBook[toAccount] || publicAddresses.find(_account => _account.address === toAccount)

				return (
					<Box
						key={i}
						css={{
							borderTop: '1px solid $borderPanel',
							mt: '$5',
							py: '$5',
						}}
					>
						<Flex css={{ position: 'relative', pb: '$3' }}>
							<Text css={{ flex: '1' }}>Transaction type:</Text>
							<Box css={{ position: 'relative', mt: '-3px' }}>
								<ActivityType activity={activity} accountAddress={accountAddress} />
							</Box>
						</Flex>
						{fromAccount && (
							<Flex css={{ position: 'relative', pb: '15px' }}>
								<Text css={{ flex: '1' }}>From account:</Text>
								<Text>{entry?.name ? `${entry.name} (${shortAddress})` : shortAddress}</Text>
							</Flex>
						)}
						{toAccount && (
							<Flex css={{ position: 'relative', pb: '15px' }}>
								<Text css={{ flex: '1' }}>To account:</Text>
								<Text>
									{toEntry?.name ? `${toEntry?.name} (${getShortAddress(toAccount)})` : getShortAddress(toAccount)}
								</Text>
							</Flex>
						)}
						{fee && (
							<Flex css={{ position: 'relative', pb: '15px' }}>
								<SlippageBox css={{ border: 'none' }} fee={new BigNumber(fee).shiftedBy(-18)} />
							</Flex>
						)}
					</Box>
				)
			})}
		</Box>
	)
}

ActionsPreview.defaultProps = defaultProps

export default ActionsPreview
