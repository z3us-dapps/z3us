import React, { useEffect, useRef } from 'react'
import BigNumber from 'bignumber.js'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useTimeout, useInterval } from 'usehooks-ts'
import { useDebounce } from 'use-debounce'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { usePools, usePoolTokens, useTransactionFee } from '@src/hooks/react-query/queries/swap'
import {
	calculateCheapestPoolFeesFromAmount,
	calculateCheapestPoolFeesFromReceive,
	calculatePoolFeesFromAmount,
	calculatePoolFeesFromReceive,
	getZ3USFees,
} from '@src/services/swap'
import { OCI_RRI, XRD_RRI } from '@src/config'
import { Pool } from '@src/types'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { UpdateIcon } from '@radix-ui/react-icons'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import Button from 'ui/src/components/button'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import { ToolTip, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { AccountSelector } from '@src/components/account-selector'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { formatBigNumber } from '@src/utils/formatters'
import { TokenSelector } from '@src/components/token-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import Input from 'ui/src/components/input'
import { PoolSelector } from './pool-selector'
import { FeeBox } from './fee-box'
import { SwapModal } from './swap-modal'

interface ImmerState {
	time: number
	pool: Pool | undefined
	fromRRI: string
	toRRI: string
	inputSide: 'from' | 'to'
	amount: string
	receive: string
	poolFee: string
	z3usFee: string
	z3usBurn: string
	minimum: boolean
	burn: boolean
	isLoading: boolean
	isMounted: boolean
	isFeeUiVisible: boolean
}

const refreshInterval = 5 * 1000 // 5 seconds
const debounceInterval = 500 // 0.5 sec

const defaultState: ImmerState = {
	time: Date.now(),
	pool: undefined,
	fromRRI: XRD_RRI,
	toRRI: OCI_RRI,
	inputSide: 'from',
	amount: '',
	receive: '',
	poolFee: '',
	z3usFee: '',
	z3usBurn: '',
	minimum: false,
	burn: false,
	isLoading: false,
	isMounted: false,
	isFeeUiVisible: false,
}

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

	const [state, setState] = useImmer<ImmerState>(defaultState)
	const [debouncedAmount] = useDebounce(state.amount, debounceInterval)
	const [debouncedReceive] = useDebounce(state.receive, debounceInterval)
	const possibleTokens = usePoolTokens()
	const pools = usePools(state.fromRRI, state.toRRI)
	const { data: balances } = useTokenBalances()
	const { data: fromToken } = useTokenInfo(state.fromRRI)
	const { data: toToken } = useTokenInfo(state.toRRI)

	const tokenSymbol = fromToken?.symbol.toUpperCase()
	const shortAddress = getShortAddress(accountAddress)
	const liquidBalances = balances?.account_balances?.liquid_balances || []

	const selectedToken = liquidBalances?.find(balance => balance.rri === state.fromRRI)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)

	const txFee = useTransactionFee(
		state.pool,
		fromToken,
		toToken,
		new BigNumber(state.amount || 0),
		new BigNumber(state.receive || 0),
		new BigNumber(state.z3usFee || 0),
		new BigNumber(state.z3usBurn || 0),
		state.minimum,
	)

	// @Note: the timeout is needed to focus the input, or else it will jank the route entry transition
	useTimeout(() => {
		if (!state.isMounted) {
			inputAmountRef.current.focus()
			setState(draft => {
				draft.isMounted = true
			})
		}
	}, 500)

	useInterval(() => {
		setState(draft => {
			draft.time = Date.now()
		})
	}, refreshInterval)

	useEffect(() => {
		if (state.isFeeUiVisible) return

		setState(draft => {
			draft.isFeeUiVisible = account && state.pool && txFee?.transaction && state.amount !== '0'
		})
	}, [account, state.pool, txFee, state.amount])

	const calculateSwap = async (value: BigNumber, valueType: 'from' | 'to', pool?: Pool, burn: boolean = false) => {
		setState(draft => {
			draft.isLoading = true
		})
		try {
			if (valueType === 'from') {
				const walletQuote = getZ3USFees(value, burn, liquidBalances)
				if (pool) {
					const poolQuote = await calculatePoolFeesFromAmount(
						pools,
						pool,
						walletQuote.amount,
						fromToken,
						toToken,
						liquidBalances,
					)
					setState(draft => {
						draft.time = Date.now()
						draft.receive = poolQuote.receive.toString()
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
						liquidBalances,
					)
					setState(draft => {
						draft.time = Date.now()
						draft.pool = cheapestPoolQuote.pool
						draft.receive = cheapestPoolQuote.receive.toString()
						draft.poolFee = cheapestPoolQuote.fee.toString()
						draft.z3usFee = walletQuote.fee.toString()
						draft.z3usBurn = walletQuote.burn.toString()
					})
				}
			} else if (pool) {
				const poolQuote = await calculatePoolFeesFromReceive(pools, pool, value, fromToken, toToken, liquidBalances)
				const walletQuote = getZ3USFees(poolQuote.amount, burn, liquidBalances)
				setState(draft => {
					draft.time = Date.now()
					draft.amount = poolQuote.amount.plus(walletQuote.fee).toString()
					draft.poolFee = poolQuote.fee.toString()
					draft.z3usFee = walletQuote.fee.toString()
					draft.z3usBurn = walletQuote.burn.toString()
				})
			} else {
				const cheapestPoolQuote = await calculateCheapestPoolFeesFromReceive(
					pools,
					value,
					fromToken,
					toToken,
					liquidBalances,
				)
				const walletQuote = getZ3USFees(cheapestPoolQuote.amount, burn, liquidBalances)
				setState(draft => {
					draft.time = Date.now()
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
		setState(draft => {
			draft.isLoading = false
		})
	}

	useEffect(() => {
		if (!state.isMounted) return
		if (state.isLoading) return
		if (Date.now() - state.time < refreshInterval) return

		if (state.inputSide === 'from' && state.amount) {
			calculateSwap(new BigNumber(state.amount || 0), state.inputSide, state.pool, state.burn)
		} else if (state.inputSide === 'to' && state.receive) {
			calculateSwap(new BigNumber(state.receive || 0), state.inputSide, state.pool, state.burn)
		}
	}, [state.time])

	useEffect(() => {
		if (!state.isMounted) return
		if (state.isLoading) return

		if (state.inputSide === 'from' && state.amount) {
			calculateSwap(new BigNumber(state.amount || 0), state.inputSide, state.pool, state.burn)
		} else if (state.inputSide === 'to' && state.receive) {
			calculateSwap(new BigNumber(state.receive || 0), state.inputSide, state.pool, state.burn)
		}
	}, [debouncedAmount, debouncedReceive, state.minimum, state.burn, state.pool, state.inputSide])

	const handlePoolChange = async (pool: Pool) => {
		setState(draft => {
			draft.pool = pool
		})
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
		setState(draft => {
			draft.amount = ''
			draft.receive = ''
		})
	}

	const handleFromTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.receive = ''
			draft.fromRRI = rri
			draft.pool = null
		})
	}

	const handleToTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.receive = ''
			draft.toRRI = rri
			draft.pool = null
		})
	}

	const handleSwitchTokens = async () => {
		setState(draft => {
			draft.amount = ''
			draft.receive = ''
			draft.toRRI = state.fromRRI
			draft.fromRRI = state.toRRI
			draft.pool = null
		})
	}

	const handleUseMax = async () => {
		setState(draft => {
			draft.amount = selectedTokenAmmount.toString()
			draft.inputSide = 'from'
		})
		inputAmountRef.current.focus()
	}

	const handleSetAmount = async (event: React.ChangeEvent<HTMLInputElement>) => {
		let { value } = event.currentTarget
		// strip minus sign `-`
		value = value.replace('-', '#!@?')
		let val = parseInt(value, 10)
		if (Number.isNaN(val)) {
			setState(draft => {
				draft.amount = ''
			})
		} else {
			val = val >= 0 ? val : 0
			setState(draft => {
				draft.amount = value
				draft.inputSide = 'from'
			})
		}
	}

	const handleSetReceive = async (event: React.ChangeEvent<HTMLInputElement>) => {
		let { value } = event.currentTarget
		// strip minus sign `-`
		value = value.replace('-', '#!@?')
		let val = parseInt(value, 10)
		if (Number.isNaN(val)) {
			setState(draft => {
				draft.receive = ''
			})
		} else {
			val = val >= 0 ? val : 0
			setState(draft => {
				draft.receive = value
				draft.inputSide = 'to'
			})
		}
	}

	const handleSetMinimum = async (checked: boolean) => {
		setState(draft => {
			draft.minimum = checked === true
		})
	}

	// const handleSetBurn = async (checked: boolean) => {
	// 	setState(draft => {
	// 		draft.burn = checked === true
	// 	})
	// }

	const resetImmerState = () => {
		setState(draft => {
			Object.entries(defaultState).forEach(([key, value]) => {
				draft[key] = value
			})
			draft.isMounted = true
		})
	}

	const handleCloseSwapModal = () => {
		resetImmerState()
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
			<ScrollArea>
				<Box css={{ pt: '20px', px: '23px', flex: '1', ...(state.isFeeUiVisible ? { pb: '20px' } : { pb: '0' }) }}>
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
										disabled={state.isLoading}
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
								min="0"
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
						<Flex align="center" css={{ mt: '10px', position: 'relative', justifyContent: 'space-between' }}>
							<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500' }}>You receive:</Text>
							<ToolTip message="Switch token swap">
								<Button
									size="1"
									color="tertiary"
									onClick={handleSwitchTokens}
									disabled={state.isLoading}
									css={{
										svg: {
											transition: '$default',
										},
										'&:hover': {
											svg: {
												transition: '$default',
												transform: 'rotate(180deg)',
											},
										},
									}}
								>
									<UpdateIcon />
								</Button>
							</ToolTip>

							<HoverCard>
								<HoverCardTrigger asChild>
									<Flex
										align="center"
										css={{
											transition: '$default',
											pe: 'auto',
											opacity: 1,
										}}
									>
										<Checkbox
											id="minimum"
											size="1"
											onCheckedChange={handleSetMinimum}
											checked={state.minimum}
											disabled={state.isLoading}
										>
											<CheckIcon />
										</Checkbox>
										<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="minimum">
											Minimum
										</Text>
									</Flex>
								</HoverCardTrigger>
								<HoverCardContent side="top" sideOffset={5} css={{ maxWidth: '260px' }}>
									<Flex css={{ flexDirection: 'column', gap: 10 }}>
										<Text>
											Minimum will return unfilled if the rate has moved adversely against you. Wallet and transaction
											fees still apply.
										</Text>
									</Flex>
								</HoverCardContent>
							</HoverCard>
						</Flex>
						<Box css={{ mt: '10px', pb: '10px', position: 'relative' }}>
							<Input
								type="number"
								size="2"
								min="0"
								value={state.receive}
								placeholder="Receive"
								onChange={handleSetReceive}
							/>
							<TokenSelector
								triggerType="input"
								token={toToken}
								tokens={Object.keys(possibleTokens[state.fromRRI] || {}).filter(rri => rri !== state.fromRRI)}
								onTokenChange={handleToTokenChange}
							/>
						</Box>
					</Box>

					{fromToken && toToken && <PoolSelector pool={state.pool} pools={pools} onPoolChange={handlePoolChange} />}

					{state.isFeeUiVisible && (
						<>
							<FeeBox
								fromToken={fromToken}
								txFee={txFee.fee}
								poolFee={new BigNumber(state.poolFee)}
								z3usFee={new BigNumber(state.z3usFee)}
								z3usBurn={state.burn ? new BigNumber(state.z3usBurn) : null}
							/>
							{/* <Box>
								<Flex align="center" css={{ mt: '7px', position: 'relative', height: '23px' }}>
									<Flex align="center">
										<Flex align="center" css={{ mt: '1px' }}>
											<HoverCard>
												<HoverCardTrigger asChild>
													<Flex align="center">
														<Checkbox id="burn" size="1" onCheckedChange={handleSetBurn} checked={state.burn} disabled={state.isLoading}>
															<CheckIcon />
														</Checkbox>
														<Text medium size="3" as="label" css={{ paddingLeft: '$2', pr: '$1' }} htmlFor="burn">
															Reduce fee with $Z3US
														</Text>
														<InfoCircledIcon />
													</Flex>
												</HoverCardTrigger>
												<HoverCardContent side="top" sideOffset={5} css={{ maxWidth: '260px' }}>
													<Flex css={{ flexDirection: 'column', gap: 10 }}>
														<Text>
															<Text bold>Reduce swap fee.</Text>
														</Text>
														<Text>
															Reduce the Z3US wallet swap fee 50%, by burning $Z3US tokens.
															<StyledLink
																underline
																href="https://z3us.com/tokenomics"
																target="_blank"
																css={{ ml: '$1', pointerEvents: 'auto' }}
															>
																Learn more
															</StyledLink>
															.
														</Text>
													</Flex>
												</HoverCardContent>
											</HoverCard>
										</Flex>
									</Flex>
								</Flex>
							</Box> */}
						</>
					)}

					<Box css={{ mt: '10px', position: 'relative' }}>
						<SwapModal
							pool={state.pool}
							transaction={txFee.transaction}
							fromToken={fromToken}
							toToken={toToken}
							balance={selectedTokenAmmount}
							amount={new BigNumber(state.amount || 0)}
							receive={new BigNumber(state.receive || 0)}
							txFee={txFee.fee}
							poolFee={new BigNumber(state.poolFee)}
							z3usFee={new BigNumber(state.z3usFee)}
							z3usBurn={state.burn ? new BigNumber(state.z3usBurn) : null}
							trigger={
								<Button
									size="6"
									color="primary"
									aria-label="swap"
									css={{ flex: '1' }}
									fullWidth
									loading={state.isLoading}
									disabled={!account || !state.pool || !txFee?.transaction}
								>
									Review swap
								</Button>
							}
							onCloseSwapModal={handleCloseSwapModal}
						/>
					</Box>
				</Box>
			</ScrollArea>
		</Box>
	)
}
