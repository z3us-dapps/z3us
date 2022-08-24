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
import { Action, Pool } from '@src/types'
import { ScrollArea } from 'ui/src/components/scroll-area'
import Button from 'ui/src/components/button'
import { AccountSelector } from '@src/components/account-selector'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { formatBigNumber } from '@src/utils/formatters'
import { TokenSelector } from '@src/components/token-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { getSwapError, TSwapError } from '@src/utils/get-swap-error'
import Input from 'ui/src/components/input'
import { SwitchTokensButton } from './switch-tokens-button'
import { FeeBox } from './fee-box'
import { SwapModal } from './swap-modal'
import { strStripCommas, numberWithCommas, errorInfo, REGEX_INPUT } from './utils'

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
	transactionData?: {
		actions: Array<Action>
		message: string
	}
	minimum: boolean
	slippage: number
	burn: boolean
	isLoading: boolean
	isMounted: boolean
	inputFocused: 'from' | 'to' | null
	errorType: TSwapError
}

const refreshInterval = 5 * 1000 // 5 seconds
const debounceInterval = 1000 // 1 sec
const one = new BigNumber(1)
const aproxRadixNetworkFee = one.dividedBy(10)

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
	transactionData: undefined,
	minimum: true,
	slippage: 0.05,
	burn: false,
	isLoading: false,
	isMounted: false,
	inputFocused: null,
	errorType: null,
}

export const Swap: React.FC = () => {
	const inputFromRef = useRef(null)
	const { hw, seed, addToast } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		addToast: state.addToastAction,
	}))
	const { account, accountAddress, selectAccount, accounts } = useStore(state => ({
		selectAccount: state.selectAccountAction,
		account: state.account,
		accountAddress: state.getCurrentAddressAction(),
		accounts: Object.values(state.publicAddresses).map((entry, index) => ({
			...entry,
			index,
			shortAddress: getShortAddress(entry.address),
		})),
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
	const selectedAccount = accounts.find(_account => _account.address === accountAddress)
	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === state.fromRRI)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const hasInputValue = state.amount.length > 0 || state.receive.length > 0

	const onTransactionError = (error: TSwapError) => {
		setState(draft => {
			draft.errorType = error
		})
	}

	const txFee = useTransactionFee(
		state.pool,
		fromToken,
		toToken,
		new BigNumber(state.amount || 0),
		new BigNumber(state.receive || 0),
		new BigNumber(state.z3usFee || 0),
		new BigNumber(state.z3usBurn || 0),
		state.minimum,
		onTransactionError,
		state.transactionData,
	)

	// @Note: the timeout is needed to focus the input, or else it will jank the route entry transition
	useTimeout(() => {
		if (!state.isMounted) {
			inputFromRef.current.focus()
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

	const calculateSwap = async (
		value: BigNumber,
		slippage: number,
		valueType: 'from' | 'to',
		pool?: Pool,
		burn: boolean = false,
	) => {
		if (state.isLoading) return
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
						slippage,
						fromToken,
						toToken,
						accountAddress,
						liquidBalances,
					)
					setState(draft => {
						draft.time = Date.now()
						draft.receive = poolQuote.receive.decimalPlaces(9).toString()
						draft.poolFee = poolQuote.fee.decimalPlaces(9).toString()
						draft.z3usFee = walletQuote.fee.decimalPlaces(9).toString()
						draft.z3usBurn = walletQuote.burn.decimalPlaces(9).toString()
					})
				} else {
					const cheapestPoolQuote = await calculateCheapestPoolFeesFromAmount(
						pools,
						walletQuote.amount,
						slippage,
						fromToken,
						toToken,
						accountAddress,
						liquidBalances,
					)
					setState(draft => {
						draft.time = Date.now()
						draft.pool = cheapestPoolQuote.pool
						draft.receive = cheapestPoolQuote.receive.decimalPlaces(9).toString()
						draft.poolFee = cheapestPoolQuote.fee.decimalPlaces(9).toString()
						draft.z3usFee = walletQuote.fee.decimalPlaces(9).toString()
						draft.z3usBurn = walletQuote.burn.decimalPlaces(9).toString()
					})
				}
			} else if (pool) {
				const poolQuote = await calculatePoolFeesFromReceive(
					pools,
					pool,
					value,
					slippage,
					fromToken,
					toToken,
					accountAddress,
					liquidBalances,
				)
				const walletQuote = getZ3USFees(poolQuote.amount, burn, liquidBalances)
				setState(draft => {
					draft.time = Date.now()
					draft.amount = poolQuote.amount.plus(walletQuote.fee).decimalPlaces(9).toString()
					draft.poolFee = poolQuote.fee.decimalPlaces(9).toString()
					draft.z3usFee = walletQuote.fee.decimalPlaces(9).toString()
					draft.z3usBurn = walletQuote.burn.decimalPlaces(9).toString()
				})
			} else {
				const cheapestPoolQuote = await calculateCheapestPoolFeesFromReceive(
					pools,
					value,
					slippage,
					fromToken,
					toToken,
					accountAddress,
					liquidBalances,
				)
				const walletQuote = getZ3USFees(cheapestPoolQuote.amount, burn, liquidBalances)
				setState(draft => {
					draft.time = Date.now()
					draft.pool = cheapestPoolQuote.pool
					draft.amount = cheapestPoolQuote.amount.plus(walletQuote.fee).decimalPlaces(9).toString()
					draft.poolFee = cheapestPoolQuote.fee.decimalPlaces(9).toString()
					draft.z3usFee = walletQuote.fee.decimalPlaces(9).toString()
					draft.z3usBurn = walletQuote.burn.decimalPlaces(9).toString()
				})
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			const errorMessageStr = (error?.message || error).toString().trim()
			const errorType = getSwapError(errorMessageStr)
			if (errorType) {
				onTransactionError(errorType)
			} else {
				addToast({
					type: 'error',
					title: 'Failed to calculate swap fees',
					subTitle: (error?.message || error).toString().trim(),
					duration: 5000,
				})
			}
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	useEffect(() => {
		if (!state.isMounted || state.isLoading) return
		if (Date.now() - state.time < refreshInterval) return

		if (state.inputSide === 'from' && state.amount) {
			calculateSwap(new BigNumber(state.amount || 0), state.slippage, state.inputSide, state.pool, state.burn)
		} else if (state.inputSide === 'to' && state.receive) {
			calculateSwap(new BigNumber(state.receive || 0), state.slippage, state.inputSide, state.pool, state.burn)
		}
	}, [state.time])

	useEffect(() => {
		if (!state.isMounted || state.isLoading) return
		if (state.inputSide === 'from' && state.amount) {
			calculateSwap(new BigNumber(state.amount || 0), state.slippage, state.inputSide, state.pool, state.burn)
		}
	}, [debouncedAmount])

	useEffect(() => {
		if (!state.isMounted || state.isLoading) return
		if (state.inputSide === 'to' && state.receive) {
			calculateSwap(new BigNumber(state.receive || 0), state.slippage, state.inputSide, state.pool, state.burn)
		}
	}, [debouncedReceive])

	const handlePoolChange = async (pool: Pool) => {
		setState(draft => {
			draft.pool = pool
		})

		calculateSwap(new BigNumber(state.amount || 0), state.slippage, state.inputSide, pool, state.burn)
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
			draft.toRRI = Object.keys(possibleTokens[rri] || {})
				.filter(_rri => _rri !== rri)
				.find(_rri => _rri === state.toRRI)
			draft.pool = null
		})
	}

	const handleToTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.receive = ''
			draft.toRRI = rri
			draft.fromRRI = Object.keys(possibleTokens || {})
				.filter(_rri => _rri !== rri)
				.find(_rri => _rri === state.fromRRI)
			draft.pool = null
		})
	}

	const handleSwitchTokens = async () => {
		setState(draft => {
			Object.entries(defaultState).forEach(([key, value]) => {
				draft[key] = value
			})
			draft.toRRI = state.fromRRI
			draft.fromRRI = state.toRRI
			draft.isMounted = true
		})
	}

	const handleUseMax = async () => {
		const networkFee = aproxRadixNetworkFee.multipliedBy(selectedTokenAmmount)
		const amount = selectedTokenAmmount.minus(networkFee).decimalPlaces(9).toString()

		setState(draft => {
			draft.amount = amount
			draft.inputSide = 'from'
		})
		inputFromRef.current.focus()
	}

	const handleSetAmount = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		const amount = strStripCommas(value)
		const isValid = REGEX_INPUT.test(amount)
		if (!isValid) return

		setState(draft => {
			draft.amount = amount
			draft.inputSide = 'from'
		})
	}

	const handleSetReceive = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		const receive = strStripCommas(value)
		const isValid = REGEX_INPUT.test(receive)
		if (!isValid) return
		setState(draft => {
			draft.receive = receive
			draft.inputSide = 'to'
		})
	}

	const handleSetMinimum = async (checked: boolean) => {
		setState(draft => {
			draft.minimum = checked === true
		})
	}

	const handleSetSlippage = async (slippage: number) => {
		setState(draft => {
			draft.slippage = slippage
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

	const handleInputFromFocus = () => {
		setState(draft => {
			draft.inputFocused = 'from'
		})
	}

	const handleInputFromBlur = () => {
		setState(draft => {
			draft.inputFocused = null
		})
	}

	const handleInputToFocus = () => {
		setState(draft => {
			draft.inputFocused = 'to'
		})
	}

	const handleInputToBlur = () => {
		setState(draft => {
			draft.inputFocused = null
		})
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
				<Box css={{ pt: '$3', px: '$6', pb: '$1' }}>
					<Text bold size="10">
						Swap
					</Text>
					<Box
						css={{
							pt: '13px',
							pb: '17px',
							borderBottom: '2px solid',
							borderColor: '$borderPanel',
							position: 'relative',
						}}
					>
						<Flex css={{ width: '100%' }}>
							<Box css={{ width: '244px' }}>
								<Text truncate css={{ fontSize: '22px', lineHeight: '25px', mt: '3px' }}>
									{selectedAccount?.name
										? `${selectedAccount.name} (${selectedAccount.shortAddress})`
										: selectedAccount.shortAddress}
								</Text>
								<Text truncate size="5" color="help" css={{ pt: '4px' }}>
									{fromToken?.symbol ? (
										<>
											{numberWithCommas(selectedTokenAmmount.decimalPlaces(9).toString())}{' '}
											{fromToken?.symbol?.toUpperCase()} available
										</>
									) : (
										'From account'
									)}
								</Text>
							</Box>
							<Flex align="center" justify="end" css={{ flex: '1', pr: '3px' }}>
								<AccountSelector
									shortAddress={selectedAccount.shortAddress}
									tokenAmount={formatBigNumber(selectedTokenAmmount)}
									tokenSymbol={tokenSymbol}
									onAccountChange={handleAccountChange}
									triggerType="minimal"
								/>
								<HardwareWalletReconnect />
							</Flex>
						</Flex>
					</Box>
					<Box
						css={{
							pt: '6px',
							pb: '17px',
							borderBottom: '2px solid',
							borderColor: state.inputFocused === 'from' ? '$borderInputFocus' : '$borderPanel',
							position: 'relative',
							transition: '$default',
						}}
					>
						<Flex css={{ width: '100%' }}>
							<Box css={{ width: '253px', position: 'relative' }}>
								<Input
									ref={inputFromRef}
									theme="minimal"
									type="text"
									size="2"
									value={numberWithCommas(state.amount)}
									placeholder="Enter amount"
									onFocus={handleInputFromFocus}
									onBlur={handleInputFromBlur}
									onChange={handleSetAmount}
									autoComplete="off"
									css={{ height: '46px', width: '173px', input: { fontFamily: 'Arial, Helvetica, sans-serif' } }}
								/>
								<Flex css={{ mt: '-5px', position: 'relative' }}>
									<Text size="5" color="help" css={{ pe: 'none' }}>
										You pay -{' '}
									</Text>
									<Box
										as="button"
										onClick={handleUseMax}
										css={{
											background: 'none',
											border: 'none',
											margin: 'none',
											padding: 'none',
											cursor: 'pointer',
										}}
									>
										<Text size="5" color="purple" underline>
											Max
										</Text>
									</Box>
								</Flex>
								<Text
									css={{
										fontFamily: 'Arial, Helvetica, sans-serif',
										letterSpacing: 'normal',
										fontSize: '22px',
										lineHeight: '22px',
										fontWeight: '400',
										pe: 'none',
										display: 'flex',
										left: '0px',
										top: '13px',
										position: 'absolute',
										transition: '$default',
										opacity: state.amount.length > 0 ? 1 : 0,
										transform: `translate(${state.amount.length > 0 ? '0' : '-10'}px)`,
										width: '253px',
										overflow: 'hidden',
									}}
								>
									<Box as="span" css={{ display: 'inline-flex', opacity: '0', maxWidth: '173px' }}>
										{numberWithCommas(state.amount)}
									</Box>
									<Text
										truncate
										css={{
											letterSpacing: '0',
											pl: '3px',
											fontSize: '22px',
											lineHeight: '22px',
											fontWeight: '400',
										}}
									>
										{fromToken?.symbol?.toUpperCase()}
									</Text>
								</Text>
							</Box>
							<Flex align="center" justify="end" css={{ flex: '1', pr: '4px', mt: '10px' }}>
								<TokenSelector
									triggerType="minimal"
									token={fromToken}
									tokens={Object.keys(possibleTokens || {}).filter(rri => rri !== state.toRRI)}
									onTokenChange={handleFromTokenChange}
								/>
							</Flex>
						</Flex>
					</Box>
					<Box
						css={{
							pt: '6px',
							pb: '17px',
							borderBottom: '2px solid',
							borderColor: state.inputFocused === 'to' ? '$borderInputFocus' : '$borderPanel',
							position: 'relative',
							transition: '$default',
						}}
					>
						<Flex css={{ width: '100%' }}>
							<Box css={{ width: '253px', position: 'relative' }}>
								<Input
									type="text"
									theme="minimal"
									size="2"
									value={numberWithCommas(state.receive)}
									placeholder="Receive"
									onFocus={handleInputToFocus}
									onBlur={handleInputToBlur}
									onChange={handleSetReceive}
									autoComplete="off"
									css={{ height: '46px', width: '173px', input: { fontFamily: 'Arial, Helvetica, sans-serif' } }}
								/>

								<Flex css={{ mt: '-5px', position: 'relative' }}>
									<Text size="5" color="help" css={{ pe: 'none' }}>
										You receive -{' '}
									</Text>
									<Box
										as="button"
										onClick={() => {}}
										css={{
											background: 'none',
											border: 'none',
											margin: 'none',
											padding: 'none',
											cursor: 'pointer',
										}}
									>
										<Text size="5" color="purple" underline>
											Min
										</Text>
									</Box>
								</Flex>
								<Text
									css={{
										fontFamily: 'Arial, Helvetica, sans-serif',
										letterSpacing: 'normal',
										fontSize: '22px',
										lineHeight: '22px',
										fontWeight: '400',
										display: 'flex',
										pe: 'none',
										left: '0px',
										top: '13px',
										position: 'absolute',
										transition: '$default',
										opacity: state.receive.length > 0 ? 1 : 0,
										transform: `translate(${state.receive.length > 0 ? '0' : '-10'}px)`,
										width: '253px',
										overflow: 'hidden',
									}}
								>
									<Box as="span" css={{ display: 'inline-flex', opacity: '0', maxWidth: '173px' }}>
										{numberWithCommas(state.receive)}
									</Box>
									<Text
										truncate
										css={{
											letterSpacing: '0',
											pl: '3px',
											fontSize: '22px',
											lineHeight: '22px',
											fontWeight: '400',
										}}
									>
										{toToken?.symbol?.toUpperCase()}
									</Text>
								</Text>
							</Box>
							<Flex align="center" justify="end" css={{ flex: '1', pr: '4px', mt: '10px' }}>
								<TokenSelector
									triggerType="minimal"
									token={toToken}
									tokens={Object.keys(possibleTokens[state.fromRRI] || {}).filter(rri => rri !== state.fromRRI)}
									onTokenChange={handleToTokenChange}
								/>
							</Flex>
						</Flex>
						<SwitchTokensButton onSwitchTokens={handleSwitchTokens} />
					</Box>
					<FeeBox
						fromToken={fromToken}
						toToken={toToken}
						amount={new BigNumber(state.amount || 0)}
						receive={new BigNumber(state.receive || 0)}
						txFee={txFee.fee}
						poolFee={new BigNumber(state.poolFee)}
						z3usFee={new BigNumber(state.z3usFee)}
						z3usBurn={new BigNumber(state.burn ? state.z3usBurn : 0)}
						pool={state.pool}
						pools={pools}
						onPoolChange={handlePoolChange}
						minimum={state.minimum}
						onMinimumChange={handleSetMinimum}
						slippage={state.slippage}
						onSlippageChange={handleSetSlippage}
						showFeeBreakDown
					/>
					<Box css={{ mt: '12px', position: 'relative' }}>
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
							z3usBurn={new BigNumber(state.burn ? state.z3usBurn : 0)}
							minimum={state.minimum}
							slippage={state.slippage}
							trigger={
								<Box>
									{errorInfo[state.errorType] && hasInputValue ? (
										<Button
											size="6"
											color="red"
											aria-label="swap"
											css={{ flex: '1' }}
											fullWidth
											disabled
											loading={state.isLoading}
										>
											{errorInfo[state.errorType].buttonMessage}
										</Button>
									) : (
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
									)}
								</Box>
							}
							onCloseSwapModal={handleCloseSwapModal}
						/>
					</Box>
				</Box>
			</ScrollArea>
		</Box>
	)
}
