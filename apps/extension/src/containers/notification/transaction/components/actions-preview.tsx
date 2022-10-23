/* eslint-disable react/no-array-index-key */
import React from 'react'
import BigNumber from 'bignumber.js'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { SlippageBox } from '@src/components/slippage-box'
import { ActivityType } from '@src/components/activity-type'
import { Action } from '@radixdlt/application'
import { useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { formatBigNumber } from '@src/utils/formatters'

interface ActionPreviewProps {
	activity: any
	fee?: string
}

const ActionPreview: React.FC<ActionPreviewProps> = ({ activity, fee: feeFromProps }) => {
	const { data: token } = useTokenInfo(activity?.amount?.token_identifier?.rri)
	const { accountAddress, publicAddresses, addressBook } = useNoneSharedStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		publicAddresses: Object.values(state.publicAddresses),
		addressBook: state.addressBook,
	}))

	const amount = activity?.amount?.value ? new BigNumber(activity.amount.value).shiftedBy(-18) : undefined
	const fee = feeFromProps ? new BigNumber(feeFromProps).shiftedBy(-18) : undefined

	const fromAccount = activity?.from_account?.address
	const fromEntry = addressBook[fromAccount] || publicAddresses.find(_account => _account.address === fromAccount)
	const toAccount = activity?.to_account?.address
	const toEntry = addressBook[toAccount] || publicAddresses.find(_account => _account.address === toAccount)

	return (
		<Box
			css={{
				borderTop: '1px solid $borderPanel2',
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
					<Text>
						{fromEntry?.name ? `${fromEntry?.name} (${getShortAddress(fromAccount)})` : getShortAddress(fromAccount)}
					</Text>
				</Flex>
			)}
			{toAccount && (
				<Flex css={{ position: 'relative', pb: '15px' }}>
					<Text css={{ flex: '1' }}>To account:</Text>
					<Text>{toEntry?.name ? `${toEntry?.name} (${getShortAddress(toAccount)})` : getShortAddress(toAccount)}</Text>
				</Flex>
			)}
			{amount && (
				<Flex css={{ position: 'relative', pb: '15px' }}>
					<Text css={{ flex: '1' }}>Amount:</Text>
					<Text>
						{formatBigNumber(amount)} {token?.symbol.toUpperCase()}
					</Text>
				</Flex>
			)}
			{fee && <SlippageBox token={token} fee={fee} amount={amount} css={{ borderColor: '$borderPanel2' }} />}
		</Box>
	)
}

ActionPreview.defaultProps = {
	fee: null,
}

interface IProps {
	actions?: Action[]
	fee?: string
}

const defaultProps = {
	actions: null,
	fee: null,
}

const ActionsPreview: React.FC<IProps> = ({ actions, fee }) => {
	if (!actions) {
		return null
	}

	return (
		<Box css={{ mt: '$2', maxHeight: '300px', overflowY: 'auto' }}>
			{actions.map((activity: any, i) => (
				<ActionPreview key={i} activity={activity} fee={fee} />
			))}
		</Box>
	)
}

ActionsPreview.defaultProps = defaultProps

export default ActionsPreview
