import React, { useRef } from 'react'
import BigNumber from 'bignumber.js'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { useCaviarPools, usePools, usePoolTokens, useTransactionFee } from '@src/hooks/react-query/queries/swap'
import {
	calculateCheapestPoolFeesFromAmount,
	calculateCheapestPoolFeesFromRecieve,
	calculatePoolFeesFromAmount,
	calculatePoolFeesFromRecieve,
	getZ3USFees,
} from '@src/services/swap'
import { FLOOP_RRI, Z3US_RRI } from '@src/config'
import { Pool } from '@src/types'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { AccountSelector } from '@src/components/account-selector'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { formatBigNumber } from '@src/utils/formatters'
import { TokenSelector } from '@src/components/token-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { PoolSelector } from './pool-selector'
import { FeeBox } from './fee-box'
import { SwapModal } from './swap-modal'

export const Swap: React.FC = () => {
	const inputAmountRef = useRef(null)
	const { hw, seed, addToast } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		addToast: state.addToastAction,
	}))
	const { account, accountAddress, selectAccount } = useStore(state => ({
		selectAccount: state.selectAccountAction,
		account: state.account,
		accountAddress: state.getCurrentAddressAction(),
	}))

	const [state, setState] = useImmer({
		pool: null,
		fromRRI: '',
		toRRI: '',
		amount: '',
		recieve: '',
		poolFee: '',
		z3usFee: '',
		z3usBurn: '',
		minimum: false,
		burn: false,
		isLoading: false,
	})

	const possibleTokens = usePoolTokens()
	const pools = usePools(state.fromRRI, state.toRRI)
	const { data: caviarPools } = useCaviarPools()
	const { data: balances } = useTokenBalances()
	const { data: fromToken } = useTokenInfo(state.fromRRI)
	const { data: toToken } = useTokenInfo(state.toRRI)

	const liquidBalances = balances?.account_balances?.liquid_balances || []

	const selectedToken = liquidBalances?.find(balance => balance.rri === state.fromRRI)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)

	const z3usToken = liquidBalances?.find(balance => balance.rri === Z3US_RRI)
	const z3usBalance = z3usToken ? new BigNumber(z3usToken.amount).shiftedBy(-18) : new BigNumber(0)

	const floopToken = liquidBalances?.find(balance => balance.rri === FLOOP_RRI)
	const floopBalance = floopToken ? new BigNumber(floopToken.amount).shiftedBy(-18) : new BigNumber(0)

	const shortAddress = getShortAddress(accountAddress)
	const tokenSymbol = fromToken?.symbol.toUpperCase()

	const txFee = useTransactionFee(
		state.pool,
		fromToken,
		toToken,
		new BigNumber(state.amount || 0),
		new BigNumber(state.recieve || 0),
		new BigNumber(state.z3usFee || 0),
		new BigNumber(state.z3usBurn || 0),
		state.minimum,
	)

	const calculateSwap = async (value: BigNumber, valueType: 'from' | 'to') => {
		try {
			if (valueType === 'from') {
				const walletQuote = getZ3USFees(value, state.burn, z3usBalance)
				if (state.pool) {
					const poolQuote = await calculatePoolFeesFromAmount(
						state.pool,
						walletQuote.amount,
						fromToken,
						toToken,
						caviarPools,
						floopBalance,
					)
					setState(draft => {
						draft.recieve = poolQuote.recieve.toString()
						draft.poolFee = poolQuote.fee.toString()
						draft.z3usFee = walletQuote.fee.toString()
						draft.z3usBurn = walletQuote.burn.toString()
					})
				} else {
					const cheapestPoolQuote = await calculateCheapestPoolFeesFromAmount(
						pools,
						walletQuote.amount,
						fromToken,
						toToken,
						caviarPools,
						floopBalance,
					)
					setState(draft => {
						draft.pool = cheapestPoolQuote.pool
						draft.recieve = cheapestPoolQuote.recieve.toString()
						draft.poolFee = cheapestPoolQuote.fee.toString()
						draft.z3usFee = walletQuote.fee.toString()
						draft.z3usBurn = walletQuote.burn.toString()
					})
				}
			} else if (state.pool) {
				const poolQuote = await calculatePoolFeesFromRecieve(
					state.pool,
					value,
					fromToken,
					toToken,
					caviarPools,
					floopBalance,
				)
				const walletQuote = getZ3USFees(poolQuote.amount, state.burn, z3usBalance)
				setState(draft => {
					draft.amount = poolQuote.amount.plus(walletQuote.fee).toString()
					draft.poolFee = poolQuote.fee.toString()
					draft.z3usFee = walletQuote.fee.toString()
					draft.z3usBurn = walletQuote.burn.toString()
				})
			} else {
				const cheapestPoolQuote = await calculateCheapestPoolFeesFromRecieve(
					pools,
					value,
					fromToken,
					toToken,
					caviarPools,
					floopBalance,
				)
				const walletQuote = getZ3USFees(cheapestPoolQuote.amount, state.burn, z3usBalance)
				setState(draft => {
					draft.pool = cheapestPoolQuote.pool
					draft.amount = cheapestPoolQuote.amount.plus(walletQuote.fee).toString()
					draft.poolFee = cheapestPoolQuote.fee.toString()
					draft.z3usFee = walletQuote.fee.toString()
					draft.z3usBurn = walletQuote.burn.toString()
				})
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			addToast({
				type: 'error',
				title: 'Failed to calculate swap fees',
				subTitle: (error?.message || error).toString().trim(),
				duration: 5000,
			})
		}
	}

	const handlePoolChange = async (pool: Pool) => {
		setState(draft => {
			draft.pool = pool
		})

		if (state.amount) {
			await calculateSwap(new BigNumber(state.amount || 0), 'from')
		} else {
			await calculateSwap(new BigNumber(state.recieve || 0), 'to')
		}
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
		setState(draft => {
			draft.amount = ''
			draft.recieve = ''
		})
	}

	const handleFromTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.recieve = ''
			draft.fromRRI = rri
			draft.pool = null
		})
	}

	const handleToTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.recieve = ''
			draft.toRRI = rri
			draft.pool = null
		})
	}

	const handleUseMax = async () => {
		setState(draft => {
			draft.amount = selectedTokenAmmount.toString()
		})
		inputAmountRef.current.focus()
		await calculateSwap(selectedTokenAmmount, 'from')
	}

	const handleSetAmount = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.amount = event.currentTarget.value
			draft.recieve = ''
		})
		await calculateSwap(new BigNumber(event.currentTarget.value), 'from')
	}

	const handleSetRecieve = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.recieve = event.currentTarget.value
			draft.amount = ''
		})
		await calculateSwap(new BigNumber(event.currentTarget.value), 'to')
	}

	const handleSetMinimum = async checked => {
		setState(draft => {
			draft.minimum = checked === true
		})

		if (state.amount) {
			await calculateSwap(new BigNumber(state.amount || 0), 'from')
		} else {
			await calculateSwap(new BigNumber(state.recieve || 0), 'to')
		}
	}

	const handleSetBurn = async checked => {
		setState(draft => {
			draft.burn = checked === true
		})

		if (state.amount) {
			await calculateSwap(new BigNumber(state.amount || 0), 'from')
		} else {
			await calculateSwap(new BigNumber(state.recieve || 0), 'to')
		}
	}

	return (
		<Flex
			direction="column"
			css={{
				bg: '$bgPanel',
				height: '497px',
				position: 'absolute',
				zIndex: '1',
				left: '0',
				right: '0',
				bottom: '55px',
				overflowY: 'auto',
			}}
		>
			<Box css={{ py: '20px', px: '23px', flex: '1' }}>
				<Box>
					<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Swap</Text>
					<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>From:</Text>
				</Box>
				<AccountSelector
					shortAddress={shortAddress}
					tokenAmount={formatBigNumber(selectedTokenAmmount)}
					tokenSymbol={tokenSymbol}
					onAccountChange={handleAccountChange}
				/>

				<HardwareWalletReconnect />

				<Box>
					<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size="1"
									color="tertiary"
									css={{
										position: 'absolute',
										top: '-4px',
										right: '0',
										textTransform: 'uppercase',
									}}
									onClick={handleUseMax}
								>
									MAX
								</Button>
							</TooltipTrigger>
							<TooltipContent sideOffset={3}>
								<TooltipArrow offset={15} />
								Select maximum {tokenSymbol}
							</TooltipContent>
						</Tooltip>
						<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', flex: '1' }}>You pay:</Text>
					</Flex>
					<Box css={{ mt: '13px', position: 'relative' }}>
						<Input
							ref={inputAmountRef}
							type="number"
							size="2"
							value={state.amount}
							placeholder="Enter amount"
							onChange={handleSetAmount}
						/>
						<TokenSelector
							triggerType="input"
							token={fromToken}
							tokens={Object.keys(possibleTokens || {}).filter(rri => rri !== state.toRRI)}
							onTokenChange={handleFromTokenChange}
						/>
					</Box>
				</Box>

				<Box>
					<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Flex
									align="center"
									justify="end"
									css={{
										position: 'absolute',
										top: '-2px',
										right: '0',
										width: '105px',
										transition: '$default',
										pe: 'auto',
										opacity: 1,
									}}
								>
									<Checkbox id="minimum" size="1" onCheckedChange={handleSetMinimum} checked={state.minimum}>
										<CheckIcon />
									</Checkbox>
									<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="minimum">
										Minimum
									</Text>
								</Flex>
							</TooltipTrigger>
							<TooltipContent sideOffset={3}>
								<TooltipArrow offset={15} />
								Minimum will return unfilled if the rate has moved adversely against you. Wallet and transaction fees
								still apply.
							</TooltipContent>
						</Tooltip>
						<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', flex: '1' }}>You recieve:</Text>
					</Flex>
					<Box css={{ mt: '13px', position: 'relative' }}>
						<Input type="number" size="2" value={state.recieve} placeholder="Recieve" onChange={handleSetRecieve} />
						<TokenSelector
							triggerType="input"
							token={toToken}
							tokens={Object.keys(possibleTokens[state.fromRRI] || {}).filter(rri => rri !== state.fromRRI)}
							onTokenChange={handleToTokenChange}
						/>
					</Box>
				</Box>

				{fromToken && toToken && <PoolSelector pool={state.pool} pools={pools} onPoolChange={handlePoolChange} />}

				<FeeBox
					fromToken={fromToken}
					txFee={txFee.fee}
					poolFee={new BigNumber(state.poolFee || 0)}
					z3usFee={new BigNumber(state.z3usFee || 0)}
					z3usBurn={state.burn ? new BigNumber(state.z3usBurn || 0) : null}
				/>

				<Box>
					<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
						<Flex>
							<Text medium css={{ fontSize: '14px', lineHeight: '17px', pr: '2px' }}>
								Reduce wallet fee:
							</Text>
						</Flex>
						<Flex align="center" justify="end">
							<Checkbox id="burn" size="1" onCheckedChange={handleSetBurn} checked={state.burn}>
								<CheckIcon />
							</Checkbox>
							<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="burn">
								Burn Z3US tokens
							</Text>
						</Flex>
					</Flex>
				</Box>

				<Box css={{ mt: '13px', position: 'relative' }}>
					<SwapModal
						transaction={txFee.transaction}
						fromToken={fromToken}
						toToken={toToken}
						balance={selectedTokenAmmount}
						amount={new BigNumber(state.amount || 0)}
						receive={new BigNumber(state.recieve || 0)}
						txFee={txFee.fee}
						poolFee={new BigNumber(state.poolFee || 0)}
						z3usFee={new BigNumber(state.z3usFee || 0)}
						z3usBurn={state.burn ? new BigNumber(state.z3usBurn || 0) : null}
						trigger={
							<Button
								size="6"
								color="primary"
								aria-label="swap"
								css={{ flex: '1' }}
								fullWidth
								loading={state.isLoading}
								disabled={!account || !txFee?.transaction}
							>
								Review swap
							</Button>
						}
					/>
				</Box>
			</Box>
		</Flex>
	)
}
