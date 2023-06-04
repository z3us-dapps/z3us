import type { BuiltTransactionReadyToSign } from '@radixdlt/application'
import BigNumber from 'bignumber.js'
import React, { useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'
import { useImmer } from 'use-immer'
import { useInterval, useTimeout } from 'usehooks-ts'

import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { ScrollArea } from 'ui/src/components/scroll-area'

import { AccountSelector } from '@src/components/account-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { TokenSelector } from '@src/components/token-selector'
import { OCI_RRI, XRD_RRI } from '@src/config'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { usePoolTokens, usePools } from '@src/hooks/react-query/queries/swap'
import { useMessage } from '@src/hooks/use-message'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { useTransaction } from '@src/hooks/use-transaction'
import { parseAccountAddress } from '@src/services/radix/serializer'
import {
	calculateCheapestPoolFeesFromAmount,
	calculateCheapestPoolFeesFromReceive,
	calculateTransactionFee,
	getZ3USFees,
} from '@src/services/swap'
import type { Pool } from '@src/types'
import { formatBigNumber } from '@src/utils/formatters'
import { getShortAddress } from '@src/utils/string-utils'

import { FeeBox } from './fee-box'
import { SwapModal } from './swap-modal'
import { SwitchTokensButton } from './switch-tokens-button'
import { REGEX_INPUT, numberWithCommas, strStripCommas } from './utils'

interface ImmerState {
	time: number
	pool: Pool | undefined
	pools: Pool[]
	fromRRI: string
	toRRI: string
	inputSide: 'from' | 'to'
	amountRaw: string
	receiveRaw: string
	amount: BigNumber
	receive: BigNumber
	rate: BigNumber
	poolFee: BigNumber
	z3usFee: BigNumber
	z3usBurn: BigNumber
	transaction: BuiltTransactionReadyToSign
	swapResponse: any
	fee: BigNumber
	minimum: boolean
	slippage: number
	priceImpact: number
	burn: boolean
	isLoading: boolean
	isMounted: boolean
	inputFocused: 'from' | 'to' | null
	errorMessage: string
}

const refreshInterval = 15 * 1000 // 15 seconds
const debounceInterval = 500 // 0.5 sec
const zero = new BigNumber(0)
const defaultNetworkFee = new BigNumber(2000) // asume avg tx 20 bytes

const defaultState: ImmerState = {
	time: Date.now(),
	pool: undefined,
	pools: [],
	fromRRI: XRD_RRI,
	toRRI: OCI_RRI,
	inputSide: 'from',
	amountRaw: '',
	receiveRaw: '',
	amount: zero,
	receive: zero,
	rate: zero,
	poolFee: zero,
	z3usFee: zero,
	z3usBurn: zero,
	transaction: null,
	swapResponse: null,
	fee: zero,
	minimum: true,
	slippage: 0.05,
	priceImpact: 0,
	burn: false,
	isLoading: false,
	isMounted: false,
	inputFocused: null,
	errorMessage: null,
}

export const Swap: React.FC = () => {
	const inputFromRef = useRef(null)
	const { buildTransactionFromActions } = useTransaction()
	const { createMessage } = useMessage()

	const { signingKey } = useSharedStore(state => ({
		signingKey: state.signingKey,
	}))
	const { accountAddress, selectAccount, accounts } = useNoneSharedStore(state => ({
		selectAccount: state.selectAccountAction,
		accountAddress: state.getCurrentAddressAction(),
		accounts: Object.values(state.publicAddresses).map((entry, index) => ({
			...entry,
			index,
			shortAddress: getShortAddress(entry.address),
		})),
	}))

	const [state, setState] = useImmer<ImmerState>(defaultState)
	const [debouncedAmount] = useDebounce(state.amountRaw, debounceInterval)
	const [debouncedReceive] = useDebounce(state.receiveRaw, debounceInterval)
	const possibleTokens = usePoolTokens()
	const availablePools = usePools(state.fromRRI, state.toRRI)
	const { data: balances } = useTokenBalances()
	const { data: fromToken } = useTokenInfo(state.fromRRI)
	const { data: toToken } = useTokenInfo(state.toRRI)

	const tokenSymbol = fromToken?.symbol.toUpperCase()
	const selectedAccount = accounts.find(_account => _account.address === accountAddress)
	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === state.fromRRI)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : zero

	const availableTokensMap = {}
	liquidBalances.forEach(balance => {
		if (balance.amount === '') return
		if (balance.amount === '0') return
		availableTokensMap[balance.rri] = true
	})

	const amountDisplay = numberWithCommas(state.amountRaw)
	const receiveDisplay = numberWithCommas(state.receiveRaw)

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
		amountRaw: string,
		receiveRaw: string,
		valueType: 'from' | 'to',
		slippage: number,
		pool?: Pool,
		minimum: boolean = false,
		burn: boolean = false,
	) => {
		if (!state.isMounted) return
		if (state.isLoading) return

		let amount = amountRaw ? new BigNumber(amountRaw) : zero
		let receive = receiveRaw ? new BigNumber(receiveRaw) : zero

		if (valueType === 'from' && amount.eq(0)) return
		if (valueType === 'to' && receive.eq(0)) return

		setState(draft => {
			draft.isLoading = true
		})

		let poolFee = zero
		let z3usFee = zero
		let z3usBurn = zero
		let priceImpact = 0
		let response

		try {
			if (valueType === 'from') {
				const walletQuote = getZ3USFees(amount, burn, liquidBalances)
				const poolQuote = await calculateCheapestPoolFeesFromAmount(
					availablePools,
					pool,
					walletQuote.amount,
					slippage,
					fromToken,
					toToken,
					accountAddress,
					liquidBalances,
				)
				pool = poolQuote.pool
				receive = poolQuote.receive
				priceImpact = poolQuote.priceImpact
				poolFee = poolQuote.fee
				z3usFee = walletQuote.fee
				z3usBurn = walletQuote.burn
				response = poolQuote.response
			} else if (valueType === 'to') {
				const poolQuote = await calculateCheapestPoolFeesFromReceive(
					availablePools,
					pool,
					receive,
					slippage,
					fromToken,
					toToken,
				)
				const walletQuote = getZ3USFees(poolQuote.amount, burn, liquidBalances)
				pool = poolQuote.pool
				amount = poolQuote.amount.plus(walletQuote.fee)
				priceImpact = poolQuote.priceImpact
				poolFee = poolQuote.fee
				z3usFee = walletQuote.fee
				z3usBurn = walletQuote.burn
				response = poolQuote.response
			}

			const { transaction, fee, transactionFeeError } = await calculateTransactionFee(
				pool,
				fromToken,
				toToken,
				amount,
				receive,
				z3usFee,
				z3usBurn,
				minimum,
				buildTransactionFromActions,
				createMessage,
				parseAccountAddress(accountAddress),
				response,
			)

			setState(draft => {
				draft.time = Date.now()
				draft.pool = pool
				draft.pools = [...availablePools].sort((a, b) => {
					if (a.id === pool?.id) return -1
					if (b.id === pool?.id) return 1
					if (!a.costRatio) return 1
					if (!b.costRatio) return -1
					return a.costRatio.minus(b.costRatio).toNumber()
				})

				if (valueType === 'from') {
					draft.receiveRaw = receive.toString()
				} else if (valueType === 'to') {
					draft.amountRaw = amount.toString()
				}

				if (receive.gt(0) && amount.gt(0)) {
					draft.rate = receive.dividedBy(amount)
				}

				draft.amount = amount
				draft.receive = receive
				draft.priceImpact = priceImpact
				draft.fee = fee
				draft.poolFee = poolFee
				draft.z3usFee = z3usFee
				draft.z3usBurn = z3usBurn
				draft.swapResponse = response
				draft.transaction = transaction
				draft.errorMessage = transactionFeeError
			})
		} catch (error) {
			setState(draft => {
				draft.fee = zero
				draft.poolFee = zero
				draft.z3usFee = zero
				draft.z3usBurn = zero
				draft.transaction = undefined
				draft.swapResponse = undefined
				draft.errorMessage = (error?.message || error).toString().trim()
			})
		}

		setState(draft => {
			draft.isLoading = false
		})
	}

	useEffect(() => {
		if (Date.now() - state.time < refreshInterval) return
		calculateSwap(
			state.amountRaw,
			state.receiveRaw,
			state.inputSide,
			state.slippage,
			state.pool,
			state.minimum,
			state.burn,
		)
	}, [state.time])

	useEffect(() => {
		if (state.inputSide !== 'from') return // do not want to race with calculateSwap
		calculateSwap(
			debouncedAmount,
			state.receiveRaw,
			state.inputSide,
			state.slippage,
			state.pool,
			state.minimum,
			state.burn,
		)
	}, [debouncedAmount])

	useEffect(() => {
		if (state.inputSide !== 'to') return // do not want to race with calculateSwap
		calculateSwap(
			state.amountRaw,
			debouncedReceive,
			state.inputSide,
			state.slippage,
			state.pool,
			state.minimum,
			state.burn,
		)
	}, [debouncedReceive])

	const handlePoolChange = async (pool: Pool) => {
		calculateSwap(state.amountRaw, state.receiveRaw, state.inputSide, state.slippage, pool, state.minimum, state.burn)
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex)
		setState(draft => {
			draft.amountRaw = ''
			draft.receiveRaw = ''
		})
	}

	const handleFromTokenChange = (rri: string) => {
		setState(draft => {
			draft.amountRaw = ''
			draft.receiveRaw = ''
			draft.fromRRI = rri
			draft.toRRI = Object.keys(possibleTokens[rri] || {}).find(_rri => _rri !== rri && _rri === state.toRRI) || XRD_RRI
			draft.pool = null
		})
	}

	const handleToTokenChange = (rri: string) => {
		setState(draft => {
			draft.amountRaw = ''
			draft.receiveRaw = ''
			draft.toRRI = rri
			draft.fromRRI =
				Object.keys(possibleTokens || {}).find(
					// eslint-disable-next-line no-underscore-dangle
					_rri => availableTokensMap[_rri] && _rri !== rri && _rri === state.fromRRI,
				) || XRD_RRI
			draft.pool = null
		})
	}

	const handleSwitchTokens = async () => {
		setState(draft => {
			draft.toRRI = state.fromRRI
			draft.fromRRI = state.toRRI
			draft.amountRaw = ''
			draft.receiveRaw = ''
			draft.pool = null
		})
	}

	const handleUseMax = async () => {
		let amount = selectedTokenAmmount
		if (selectedToken.rri === XRD_RRI) {
			const networkFeeMultiplier = 0.0002 // XRD per byte
			const networkFee = defaultNetworkFee.multipliedBy(networkFeeMultiplier)
			amount = selectedTokenAmmount.minus(networkFee)
		}

		setState(draft => {
			draft.amountRaw = amount.toString()
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
			draft.amountRaw = amount
			draft.inputSide = 'from'
		})
	}

	const handleSetReceive = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		const receive = strStripCommas(value)
		const isValid = REGEX_INPUT.test(receive)
		if (!isValid) return

		setState(draft => {
			draft.receiveRaw = receive
			draft.inputSide = 'to'
		})
	}

	const handleSetMinimum = async (checked: boolean) => {
		setState(draft => {
			draft.minimum = checked === true
		})

		calculateSwap(
			state.amountRaw,
			state.receiveRaw,
			state.inputSide,
			state.slippage,
			state.pool,
			checked === true,
			state.burn,
		)
	}

	const handleSetSlippage = async (slippage: number) => {
		setState(draft => {
			draft.slippage = slippage
		})

		calculateSwap(state.amountRaw, state.receiveRaw, state.inputSide, slippage, state.pool, state.minimum, state.burn)
	}

	// @TODO: implement when we have burn feature
	// const handleSetBurn = async (checked: boolean) => {
	// 	setState(draft => {
	// 		draft.burn = checked === true
	// 	})
	// }

	const resetImmerState = () => {
		setState(draft => {
			const { minimum, slippage } = draft
			Object.entries(defaultState).forEach(([key, value]) => {
				draft[key] = value
			})
			draft.isMounted = true
			draft.minimum = minimum
			draft.slippage = slippage
		})
	}

	const handleConfirmSend = () => {
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
				<Box css={{ pt: '$3', px: '$6', pb: '$1', position: 'relative' }}>
					<Text bold size="10">
						Swap
					</Text>
					<Box css={{ px: '0', mt: '-10px' }}>
						<HardwareWalletReconnect />
					</Box>
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
									{selectedAccount?.name ? `${selectedAccount.name} (${selectedAccount.shortAddress})` : accountAddress}
								</Text>
								<Text truncate size="5" color="help" css={{ pt: '4px' }}>
									{fromToken?.symbol ? (
										<>
											{numberWithCommas(selectedTokenAmmount.toString())} {fromToken?.symbol?.toUpperCase()} available
										</>
									) : (
										'From account'
									)}
								</Text>
							</Box>
							<Flex align="center" justify="end" css={{ flex: '1', pr: '3px' }}>
								<AccountSelector
									shortAddress={selectedAccount?.shortAddress || accountAddress}
									tokenAmount={formatBigNumber(selectedTokenAmmount)}
									tokenSymbol={tokenSymbol}
									onAccountChange={handleAccountChange}
									triggerType="minimal"
								/>
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
									value={amountDisplay}
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
										opacity: state.amountRaw ? 1 : 0,
										transform: `translate(${state.amountRaw ? '0' : '-10'}px)`,
										width: '253px',
										overflow: 'hidden',
									}}
								>
									<Box as="span" css={{ display: 'inline-flex', opacity: '0', maxWidth: '173px' }}>
										{amountDisplay}
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
									tokens={Object.keys(possibleTokens || {}).filter(
										rri => rri !== state.toRRI && availableTokensMap[rri],
									)}
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
									value={receiveDisplay}
									placeholder="Receive"
									onFocus={handleInputToFocus}
									onBlur={handleInputToBlur}
									onChange={handleSetReceive}
									autoComplete="off"
									css={{ height: '46px', width: '173px', input: { fontFamily: 'Arial, Helvetica, sans-serif' } }}
								/>

								<Flex css={{ mt: '-5px', position: 'relative' }}>
									<Text size="5" color="help" css={{ pe: 'none' }}>
										You receive
									</Text>
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
										opacity: state.receiveRaw ? 1 : 0,
										transform: `translate(${state.receiveRaw ? '0' : '-10'}px)`,
										width: '253px',
										overflow: 'hidden',
									}}
								>
									<Box as="span" css={{ display: 'inline-flex', opacity: '0', maxWidth: '173px' }}>
										{receiveDisplay}
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
					<Box css={{ mt: '13px', minHeight: '106px' }}>
						<FeeBox
							fromToken={fromToken}
							toToken={toToken}
							rate={state.rate}
							priceImpact={state.priceImpact}
							txFee={state.fee}
							poolFee={state.poolFee}
							z3usFee={state.z3usFee}
							z3usBurn={state.burn ? state.z3usBurn : zero}
							pool={state.pool}
							pools={state.pools.length > 0 ? state.pools : availablePools}
							onPoolChange={handlePoolChange}
							minimum={state.minimum}
							onMinimumChange={handleSetMinimum}
							slippage={state.slippage}
							onSlippageChange={handleSetSlippage}
						/>
					</Box>
					<Box css={{ mt: '10px', position: 'relative' }}>
						<SwapModal
							pool={state.pool}
							transaction={state.transaction}
							swapResponse={state.swapResponse}
							fromToken={fromToken}
							toToken={toToken}
							balance={selectedTokenAmmount}
							amount={state.amount}
							receive={state.receive}
							rate={state.rate}
							priceImpact={state.priceImpact}
							txFee={state.fee}
							poolFee={state.poolFee}
							z3usFee={state.z3usFee}
							z3usBurn={state.burn ? state.z3usBurn : zero}
							minimum={state.minimum}
							slippage={state.slippage}
							disabledButton={!signingKey || !state.pool || !state?.transaction}
							trigger={
								<Box>
									{state.errorMessage ? (
										<Button
											size="6"
											color="red"
											aria-label="swap"
											css={{ flex: '1' }}
											fullWidth
											disabled
											loading={state.isLoading}
										>
											{state.errorMessage}
										</Button>
									) : (
										<Button
											size="6"
											color="primary"
											aria-label="swap"
											css={{ flex: '1' }}
											fullWidth
											disabled={!signingKey || !state.pool}
											loading={state.isLoading}
										>
											Review swap
										</Button>
									)}
								</Box>
							}
							onConfirmSend={handleConfirmSend}
						/>
					</Box>
				</Box>
			</ScrollArea>
		</Box>
	)
}

export default Swap
