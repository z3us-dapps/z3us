/* eslint-disable react/jsx-props-no-spreading, array-callback-return */
import React, { useState, useEffect } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { ScrollArea } from '@src/components/scroll-area'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import { getShortAddress } from '@src/utils/string-utils'
import { Tabs, TabsList, TabsContent, TabsTrigger } from 'ui/src/components/tabs'
import { AccountSelector } from '@src/components/account-selector'
import {
	useStakedPositions,
	useTotalDelegatedStake,
	useUnstakePositions,
} from '@src/services/react-query/queries/radix'
import BigNumber from 'bignumber.js'
import { StakeItem } from './stake-item'
import { ValidatorList } from './validator-list'
import { EXPLORER_URL } from '../../../config'

const TAB_HEIGHT = '246px'

export const Staking: React.FC = () => {
	const { hw, seed } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
	}))
	const { accountAddress, selectAccount } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		selectAccount: state.selectAccountAction,
	}))
	const [positions, setPositions] = useState({})
	const { data: stakedPositions } = useStakedPositions()
	const { data: unstakePositions } = useUnstakePositions()
	const { data: totalStakesValue } = useTotalDelegatedStake()

	const totalStakes = new BigNumber(totalStakesValue)
	const shortAddress = getShortAddress(accountAddress)

	useEffect(() => {
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

		setPositions(newPositions)
	}, [stakedPositions, unstakePositions])

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
	}

	return (
		<Box
			css={{
				position: 'absolute',
				bottom: '55px',
				left: '0',
				right: '0',
				height: '497px',
			}}
		>
			<Box>
				<Box css={{ py: '20px', px: '23px' }}>
					<Box>
						<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Staking</Text>
						<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>
							Stake XRD with a{' '}
							<StyledLink underline href={`${EXPLORER_URL}/validators`} target="_blank">
								Radix validator
							</StyledLink>
							.
						</Text>
					</Box>

					<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />

					<Box css={{ pt: '$4', pb: '$4' }}>
						<Tabs defaultValue="tab1">
							<TabsList aria-label="Manage your account">
								<TabsTrigger value="tab1">Stakes</TabsTrigger>
								<TabsTrigger value="tab2">Validators</TabsTrigger>
							</TabsList>
							<TabsContent value="tab1">
								<Box css={{ height: TAB_HEIGHT, position: 'relative' }}>
									<ScrollArea>
										{Object.keys(positions).length > 0 ? (
											Object.keys(positions)
												.filter(
													addr =>
														positions[addr].stakes || positions[addr].pendingStakes || positions[addr].pendingUnstakes,
												)
												.map((addr, idx) => (
													<StakeItem
														key={addr}
														border={idx !== 0}
														valdiatorAddress={addr}
														total={totalStakes}
														{...positions[addr]}
													/>
												))
										) : (
											<Flex justify="center" css={{ p: '$4', height: '100%', textAlign: 'center' }}>
												<Box>
													<Text bold size="6" css={{ mt: '62px' }}>
														No stakes.
													</Text>
													<Text size="3" css={{ mt: '$1', maxWidth: '260px', display: 'block', lineHeight: '21px' }}>
														Eary XRD by staking your tokens to a community validator.{'  '}
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
										)}
									</ScrollArea>
								</Box>
							</TabsContent>
							<TabsContent value="tab2">
								<Box css={{ height: TAB_HEIGHT, position: 'relative' }}>
									<ValidatorList totalStakes={totalStakes} />
								</Box>
							</TabsContent>
						</Tabs>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
