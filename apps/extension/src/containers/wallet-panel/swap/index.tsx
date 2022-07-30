import React, { useEffect, useRef } from 'react'
import BigNumber from 'bignumber.js'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useTimeout } from 'usehooks-ts'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { useCaviarPools, usePools, usePoolTokens, useTransactionFee } from '@src/hooks/react-query/queries/swap'
import {
	calculateCheapestPoolFeesFromAmount,
	calculateCheapestPoolFeesFromReceive,
	calculatePoolFeesFromAmount,
	calculatePoolFeesFromReceive,
	getZ3USFees,
} from '@src/services/swap'
import { FLOOP_RRI, OCI_RRI, Z3US_RRI, XRD_RRI } from '@src/config'
import { Pool } from '@src/types'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { InfoCircledIcon, UpdateIcon } from '@radix-ui/react-icons'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import Button from 'ui/src/components/button'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import { ToolTip, Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { AccountSelector } from '@src/components/account-selector'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { formatBigNumber } from '@src/utils/formatters'
import { TokenSelector } from '@src/components/token-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { PoolSelector } from './pool-selector'
import { FeeBox } from './fee-box'
import { SwapModal } from './swap-modal'
import { InputDebounced } from './input-debounced'

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
	const [state, setState] = useImmer<ImmerState>({
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
	})
	const possibleTokens = usePoolTokens()
	const pools = usePools(state.fromRRI, state.toRRI)
	const { data: caviarPools } = useCaviarPools()
	const { data: balances } = useTokenBalances()
	const { data: fromToken } = useTokenInfo(state.fromRRI)
	const { data: toToken } = useTokenInfo(state.toRRI)

	const tokenSymbol = fromToken?.symbol.toUpperCase()
	const shortAddress = getShortAddress(accountAddress)
	const liquidBalances = balances?.account_balances?.liquid_balances || []

	const selectedToken = liquidBalances?.find(balance => balance.rri === state.fromRRI)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)

	const z3usToken = liquidBalances?.find(balance => balance.rri === Z3US_RRI)
	const z3usBalance = z3usToken ? new BigNumber(z3usToken.amount).shiftedBy(-18) : new BigNumber(0)

	const floopToken = liquidBalances?.find(balance => balance.rri === FLOOP_RRI)
	const floopBalance = floopToken ? new BigNumber(floopToken.amount).shiftedBy(-18) : new BigNumber(0)

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

	useTimeout(() => {
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

	const calculateSwap = async (value: BigNumber, valueType: 'from' | 'to') => {
		setState(draft => {
			draft.isLoading = true
		})
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
						caviarPools,
						floopBalance,
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
			} else if (state.pool) {
				const poolQuote = await calculatePoolFeesFromReceive(
					state.pool,
					value,
					fromToken,
					toToken,
					caviarPools,
					floopBalance,
				)
				const walletQuote = getZ3USFees(poolQuote.amount, state.burn, z3usBalance)
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
					caviarPools,
					floopBalance,
				)
				const walletQuote = getZ3USFees(cheapestPoolQuote.amount, state.burn, z3usBalance)
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
		if (Date.now() - state.time < refreshInterval) return

		if (state.inputSide === 'from' && state.amount) {
			calculateSwap(new BigNumber(state.amount || 0), state.inputSide)
		} else if (state.inputSide === 'to' && state.receive) {
			calculateSwap(new BigNumber(state.receive || 0), state.inputSide)
		}
	}, [state.time])

	const handlePoolChange = async (pool: Pool) => {
		setState(draft => {
			draft.pool = pool
		})

		if (state.inputSide === 'from' && state.amount) {
			await calculateSwap(new BigNumber(state.amount || 0), state.inputSide)
		} else if (state.inputSide === 'to' && state.receive) {
			await calculateSwap(new BigNumber(state.receive || 0), state.inputSide)
		}
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
		})
	}

	const handleUseMax = async () => {
		setState(draft => {
			draft.amount = selectedTokenAmmount.toString()
			draft.inputSide = 'from'
		})
		inputAmountRef.current.focus()
		await calculateSwap(selectedTokenAmmount, 'from')
	}

	const handleSetAmount = async (value: string) => {
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
			await calculateSwap(new BigNumber(val), 'from')
		}
	}

	const handleSetReceive = async (value: string) => {
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
			await calculateSwap(new BigNumber(val), 'to')
		}
	}

	const handleSetMinimum = async (checked: boolean) => {
		setState(draft => {
			draft.minimum = checked === true
		})

		if (state.inputSide === 'from' && state.amount) {
			await calculateSwap(new BigNumber(state.amount || 0), state.inputSide)
		} else if (state.inputSide === 'to' && state.receive) {
			await calculateSwap(new BigNumber(state.receive || 0), state.inputSide)
		}
	}

	const handleSetBurn = async (checked: boolean) => {
		setState(draft => {
			draft.burn = checked === true
		})

		if (state.inputSide === 'from' && state.amount) {
			await calculateSwap(new BigNumber(state.amount || 0), state.inputSide)
		} else if (state.inputSide === 'to' && state.receive) {
			await calculateSwap(new BigNumber(state.receive || 0), state.inputSide)
		}
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
							<InputDebounced
								ref={inputAmountRef}
								type="number"
								size="2"
								min="0"
								value={state.amount}
								placeholder="Enter amount"
								debounce={500}
								onDebounceChange={handleSetAmount}
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
							<Tooltip>
								<TooltipTrigger asChild>
									<Flex
										align="center"
										css={{
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
								<TooltipContent side="top" sideOffset={3} css={{ maxWidth: '220px' }}>
									<TooltipArrow offset={15} />
									Minimum will return unfilled if the rate has moved adversely against you. Wallet and transaction fees
									still apply.
								</TooltipContent>
							</Tooltip>
						</Flex>
						<Box css={{ mt: '10px', pb: '10px', position: 'relative' }}>
							<InputDebounced
								type="number"
								size="2"
								min="0"
								value={state.receive}
								placeholder="Receive"
								debounce={500}
								onDebounceChange={handleSetReceive}
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
							<Box>
								<Flex align="center" css={{ mt: '7px', position: 'relative', height: '23px' }}>
									<Flex align="center">
										<Checkbox id="burn" size="1" onCheckedChange={handleSetBurn} checked={state.burn}>
											<CheckIcon />
										</Checkbox>
										<Flex align="center" css={{ mt: '1px' }}>
											<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="burn">
												Reduce fee with
											</Text>
											<HoverCard>
												<HoverCardTrigger asChild>
													<Flex align="center">
														<Box css={{ ml: '6px' }}>
															<StyledLink as="div" bubble css={{ padding: '5px 0px' }}>
																<Text bold css={{ pr: '$1' }}>
																	$Z3US
																</Text>
																<InfoCircledIcon />
															</StyledLink>
														</Box>
													</Flex>
												</HoverCardTrigger>
												<HoverCardContent side="top" sideOffset={5} css={{ maxWidth: '260px' }}>
													<Flex css={{ flexDirection: 'column', gap: 10 }}>
														<Text>
															<Text bold>Reduce swap fee.</Text>
														</Text>
														<Text>
															Reduce the Z3US wallet swap fee by 50% by burning $Z3US tokens.
															<StyledLink
																underline
																href="https://z3us.com/tokenomics"
																target="_blank"
																css={{ ml: '$1' }}
																onClick={() => {
																	// @NOTE: need to investigate, for some reason, a regular link did not work
																	window.open('https://z3us.com/tokenomics', '_blank').focus()
																}}
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
							</Box>
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
						/>
					</Box>
				</Box>
			</ScrollArea>
		</Box>
	)
}
