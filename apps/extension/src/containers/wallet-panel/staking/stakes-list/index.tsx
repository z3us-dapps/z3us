/* eslint-disable react/jsx-props-no-spreading, array-callback-return */
import React, { useEffect } from 'react'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import { useStakedPositions, useUnstakePositions } from '@src/hooks/react-query/queries/radix'
import { useImmer } from 'use-immer'
import { SearchBox } from '@src/components/search-box'
import { ScrollArea } from 'ui/src/components/scroll-area'
import BigNumber from 'bignumber.js'
import { StakeItem } from '../stake-item'

const SCROLL_HEIGHT = 193

type ValidatorStake = {
	amount: string
	validator: string
}

type StakePositionData = {
	stakes?: Array<ValidatorStake>
	unstakes?: Array<ValidatorStake>
	pendingStakes?: Array<ValidatorStake>
	pendingUnstakes?: Array<ValidatorStake>
}

interface IProps {
	totalStakes: BigNumber
}

type StakePositions = {
	[rri: string]: {
		stakes?: BigNumber
		unstakes?: BigNumber
		pendingStakes?: BigNumber
		pendingUnstakes?: BigNumber
	}
}

interface ImmerProps {
	search: string
	filteredList: StakePositions
}

const generateList = (stakedPositions?: StakePositionData, unstakePositions?: StakePositionData) => {
	const newPositions = {}
	;(stakedPositions?.pendingStakes || []).map(({ validator, amount }) => {
		newPositions[validator.toString()] = {
			...newPositions[validator.toString()],
			pendingStakes: new BigNumber(amount).shiftedBy(-18),
		}
	})
	;(stakedPositions?.stakes || []).map(({ validator, amount }) => {
		newPositions[validator.toString()] = {
			...newPositions[validator.toString()],
			stakes: new BigNumber(amount).shiftedBy(-18),
		}
	})
	;(unstakePositions?.unstakes || []).map(({ validator, amount }) => {
		newPositions[validator.toString()] = {
			...newPositions[validator.toString()],
			unstakes: new BigNumber(amount).shiftedBy(-18),
		}
	})
	;(unstakePositions?.pendingUnstakes || []).map(({ validator, amount }) => {
		newPositions[validator.toString()] = {
			...newPositions[validator.toString()],
			pendingUnstakes: new BigNumber(amount).shiftedBy(-18),
		}
	})

	return newPositions
}

export const StakesList: React.FC<IProps> = ({ totalStakes }) => {
	const [state, setState] = useImmer<ImmerProps>({
		search: '',
		filteredList: {},
	})
	const { data: stakedPositions } = useStakedPositions()
	const { data: unstakePositions } = useUnstakePositions()
	const stakePositionLength = Object.keys(state.filteredList)?.length
	const hasStakePositions = stakePositionLength > 0

	const handleSearchPositionList = (search: string) => {
		setState(draft => {
			draft.search = search
		})
	}

	useEffect(() => {
		setState(draft => {
			draft.filteredList = generateList(stakedPositions, unstakePositions)
		})
	}, [stakedPositions, unstakePositions])

	return hasStakePositions ? (
		<Box>
			<Box css={{ p: '$2', borderBottom: '1px solid', borderColor: '$borderPanel' }}>
				<SearchBox
					showCancelOnlyWithValueButton
					onSearch={handleSearchPositionList}
					placeholder="Search stake positions"
					debounce={400}
				/>
			</Box>
			<Box
				css={{
					position: 'relative',
					height: `${SCROLL_HEIGHT}px`,
					overflow: 'hidden',
					borderRadius: ' 0px 0px 5px 5px',
				}}
			>
				<ScrollArea>
					{Object.keys(state.filteredList)
						.filter(
							addr =>
								state.filteredList[addr].stakes ||
								state.filteredList[addr].pendingStakes ||
								state.filteredList[addr].pendingUnstakes,
						)
						.map((addr, idx) => (
							<StakeItem
								key={addr}
								border={idx !== 0}
								valdiatorAddress={addr}
								total={totalStakes}
								search={state.search.toLowerCase()}
								{...state.filteredList[addr]}
							/>
						))}
				</ScrollArea>
			</Box>
		</Box>
	) : (
		<Flex align="center" justify="center" css={{ height: `${SCROLL_HEIGHT}px` }}>
			<Flex justify="center" css={{ p: '$4', height: '100%', textAlign: 'center' }}>
				<Box>
					<Text bold size="6" css={{ mt: '62px' }}>
						No stakes.
					</Text>
					<Text size="3" css={{ mt: '$1', maxWidth: '260px', display: 'block', lineHeight: '21px' }}>
						Earn XRD by staking your tokens to a community validator.{'  '}
						<StyledLink
							as="a"
							href="https://learn.radixdlt.com/article/how-to-stake-and-unstake-xrd-in-the-desktop-wallet"
							target="_blank"
							bubble
						>
							Learn more
						</StyledLink>
						.
					</Text>
				</Box>
			</Flex>
		</Flex>
	)
}
