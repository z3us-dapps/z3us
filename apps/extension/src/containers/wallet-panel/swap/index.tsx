import React, { useEffect, useRef } from 'react'
import BigNumber from 'bignumber.js'
import { useTransaction } from '@src/hooks/use-transaction'
import { useMessage } from '@src/hooks/use-message'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useTimeout, useInterval } from 'usehooks-ts'
import { useDebounce } from 'use-debounce'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { usePools, usePoolTokens } from '@src/hooks/react-query/queries/swap'
import { BuiltTransactionReadyToSign } from '@radixdlt/application'
import {
	calculateCheapestPoolFeesFromAmount,
	calculateCheapestPoolFeesFromReceive,
	calculatePoolFeesFromAmount,
	calculatePoolFeesFromReceive,
	calculateTransactionFee,
	getZ3USFees,
} from '@src/services/swap'
import { OCI_RRI, XRD_RRI } from '@src/config'
import { Pool } from '@src/types'
import { ScrollArea } from 'ui/src/components/scroll-area'
import Button from 'ui/src/components/button'
import { AccountSelector } from '@src/components/account-selector'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { formatBigNumber } from '@src/utils/formatters'
import { TokenSelector } from '@src/components/token-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import Input from 'ui/src/components/input'
import { SwitchTokensButton } from './switch-tokens-button'
import { FeeBox } from './fee-box'
import { SwapModal } from './swap-modal'
import { strStripCommas, numberWithCommas, REGEX_INPUT } from './utils'

interface ImmerState {
	time: number
	pool: Pool | undefined
	fromRRI: string
	toRRI: string
	inputSide: 'from' | 'to'
	amount: BigNumber
	receive: BigNumber
	poolFee: BigNumber
	z3usFee: BigNumber
	z3usBurn: BigNumber
	transaction: BuiltTransactionReadyToSign
	fee: BigNumber
	minimum: boolean
	slippage: number
	burn: boolean
	isLoading: boolean
	isMounted: boolean
	inputFocused: 'from' | 'to' | null
	errorMessage: string
}

const refreshInterval = 15 * 1000 // 15 seconds
const debounceInterval = 1000 // 1 sec
const zero = new BigNumber(0)
const defaultNetworkFee = new BigNumber(2000) // asume avg tx 20 bytes

const defaultState: ImmerState = {
	time: Date.now(),
	pool: undefined,
	fromRRI: XRD_RRI,
	toRRI: OCI_RRI,
	inputSide: 'from',
	amount: zero,
	receive: zero,
	poolFee: zero,
	z3usFee: zero,
	z3usBurn: zero,
	transaction: null,
	fee: zero,
	minimum: true,
	slippage: 0.05,
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
	const { hw, seed } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
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
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : zero

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
		amount: BigNumber,
		receive: BigNumber,
		valueType: 'from' | 'to',
		slippage: number,
		pool?: Pool,
		minimum: boolean = false,
		burn: boolean = false,
	) => {
		if (state.isLoading) return

		setState(draft => {
			draft.isLoading = true
		})

		let poolFee = zero
		let z3usFee = zero
		let z3usBurn = zero
		let response

		try {
			if (valueType === 'from') {
				const walletQuote = getZ3USFees(amount, burn, liquidBalances)
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
					amount = poolQuote.amount
					receive = poolQuote.receive
					poolFee = poolQuote.fee
					z3usFee = walletQuote.fee
					z3usBurn = walletQuote.burn
					response = poolQuote.response
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
					amount = cheapestPoolQuote.amount
					pool = cheapestPoolQuote.pool
					receive = cheapestPoolQuote.receive
					poolFee = cheapestPoolQuote.fee
					z3usFee = walletQuote.fee
					z3usBurn = walletQuote.burn
					response = cheapestPoolQuote.response
				}
			} else if (valueType === 'to') {
				if (pool) {
					const poolQuote = await calculatePoolFeesFromReceive(
						pools,
						pool,
						receive,
						slippage,
						fromToken,
						toToken,
						accountAddress,
						liquidBalances,
					)
					const walletQuote = getZ3USFees(poolQuote.amount, burn, liquidBalances)
					receive = poolQuote.receive
					amount = poolQuote.amount.plus(walletQuote.fee)
					poolFee = poolQuote.fee
					z3usFee = walletQuote.fee
					z3usBurn = walletQuote.burn
					response = poolQuote.response
				} else {
					const cheapestPoolQuote = await calculateCheapestPoolFeesFromReceive(
						pools,
						receive,
						slippage,
						fromToken,
						toToken,
						accountAddress,
						liquidBalances,
					)
					const walletQuote = getZ3USFees(cheapestPoolQuote.amount, burn, liquidBalances)
					pool = cheapestPoolQuote.pool
					receive = cheapestPoolQuote.receive
					amount = cheapestPoolQuote.amount.plus(walletQuote.fee)
					poolFee = cheapestPoolQuote.fee
					z3usFee = walletQuote.fee
					z3usBurn = walletQuote.burn
					response = cheapestPoolQuote.response
				}
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
				account,
				response,
			)

			setState(draft => {
				draft.time = Date.now()
				draft.pool = pool

				if (valueType === 'from') {
					draft.receive = receive
				} else if (valueType === 'to') {
					draft.amount = amount
				}

				draft.poolFee = poolFee
				draft.z3usFee = z3usFee
				draft.z3usBurn = z3usBurn

				draft.fee = fee
				draft.transaction = transaction
				draft.errorMessage = transactionFeeError
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			const errorMessageStr = (error?.message || error).toString().trim()
			setState(draft => {
				draft.errorMessage = errorMessageStr
			})
		}

		setState(draft => {
			draft.isLoading = false
		})
	}

	useEffect(() => {
		if (!state.isMounted || state.isLoading) return
		if (Date.now() - state.time < refreshInterval) return
		calculateSwap(state.amount, state.receive, state.inputSide, state.slippage, state.pool, state.minimum, state.burn)
	}, [state.time])

	useEffect(() => {
		if (!state.isMounted || state.isLoading) return
		if (state.inputSide === 'from' && state.amount.eq(0)) return
		if (state.inputSide === 'to' && state.receive.eq(0)) return
		calculateSwap(state.amount, state.receive, state.inputSide, state.slippage, state.pool, state.minimum, state.burn)
	}, [debouncedAmount, debouncedReceive])

	const handlePoolChange = async (pool: Pool) => {
		setState(draft => {
			draft.pool = pool
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.errorMessage = null
		})

		calculateSwap(state.amount, state.receive, state.inputSide, state.slippage, pool, state.minimum, state.burn)
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
		setState(draft => {
			draft.amount = zero
			draft.receive = zero
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.errorMessage = null
		})
	}

	const handleFromTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = zero
			draft.receive = zero
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.fromRRI = rri
			draft.toRRI =
				Object.keys(possibleTokens[rri] || {})
					.filter(_rri => _rri !== rri)
					.find(_rri => _rri === state.toRRI) || XRD_RRI
			draft.pool = null
			draft.errorMessage = null
		})
	}

	const handleToTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = zero
			draft.receive = zero
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.toRRI = rri
			draft.fromRRI =
				Object.keys(possibleTokens || {})
					.filter(_rri => _rri !== rri)
					.find(_rri => _rri === state.fromRRI) || XRD_RRI
			draft.pool = null
			draft.errorMessage = null
		})
	}

	const handleSwitchTokens = async () => {
		setState(draft => {
			draft.toRRI = state.fromRRI
			draft.fromRRI = state.toRRI
			draft.amount = zero
			draft.receive = zero
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.pool = null
			draft.errorMessage = null
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
			draft.amount = amount
			draft.inputSide = 'from'
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.errorMessage = null
		})
		inputFromRef.current.focus()
	}

	const handleSetAmount = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		const amount = strStripCommas(value)
		const isValid = REGEX_INPUT.test(amount)
		if (!isValid) return

		setState(draft => {
			draft.amount = new BigNumber(amount || 0)
			draft.inputSide = 'from'
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.errorMessage = null
		})
	}

	const handleSetReceive = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		const receive = strStripCommas(value)
		const isValid = REGEX_INPUT.test(receive)
		if (!isValid) return

		setState(draft => {
			draft.receive = new BigNumber(receive || 0)
			draft.inputSide = 'to'
			draft.poolFee = zero
			draft.z3usFee = zero
			draft.z3usBurn = zero
			draft.transaction = undefined
			draft.fee = zero
			draft.errorMessage = null
		})
	}

	const handleSetMinimum = async (checked: boolean) => {
		setState(draft => {
			draft.minimum = checked === true
		})

		calculateSwap(
			state.amount,
			state.receive,
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

		calculateSwap(state.amount, state.receive, state.inputSide, slippage, state.pool, state.minimum, state.burn)
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
									value={numberWithCommas(state.amount.decimalPlaces(9).toString())}
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
										opacity: state.amount.gt(0) ? 1 : 0,
										transform: `translate(${state.amount.gt(0) ? '0' : '-10'}px)`,
										width: '253px',
										overflow: 'hidden',
									}}
								>
									<Box as="span" css={{ display: 'inline-flex', opacity: '0', maxWidth: '173px' }}>
										{numberWithCommas(state.amount.decimalPlaces(9).toString())}
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
									value={numberWithCommas(state.receive.decimalPlaces(9).toString())}
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
									{/* <Box
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
									</Box> */}
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
										opacity: state.receive.gt(0) ? 1 : 0,
										transform: `translate(${state.receive.gt(0) ? '0' : '-10'}px)`,
										width: '253px',
										overflow: 'hidden',
									}}
								>
									<Box as="span" css={{ display: 'inline-flex', opacity: '0', maxWidth: '173px' }}>
										{numberWithCommas(state.receive.decimalPlaces(9).toString())}
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
							amount={state.amount}
							receive={state.receive}
							txFee={state.fee}
							poolFee={state.poolFee}
							z3usFee={state.z3usFee}
							z3usBurn={state.burn ? state.z3usBurn : zero}
							pool={state.pool}
							pools={pools}
							onPoolChange={handlePoolChange}
							minimum={state.minimum}
							onMinimumChange={handleSetMinimum}
							slippage={state.slippage}
							onSlippageChange={handleSetSlippage}
							showFeeBreakDown
						/>
					</Box>
					<Box css={{ mt: '13px', position: 'relative' }}>
						<SwapModal
							pool={state.pool}
							transaction={state.transaction}
							fromToken={fromToken}
							toToken={toToken}
							balance={selectedTokenAmmount}
							amount={state.amount}
							receive={state.receive}
							txFee={state.fee}
							poolFee={state.poolFee}
							z3usFee={state.z3usFee}
							z3usBurn={state.burn ? state.z3usBurn : zero}
							minimum={state.minimum}
							slippage={state.slippage}
							disabledButton={!account || !state.pool || !state?.transaction}
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
											disabled={!account || !state.pool}
											loading={state.isLoading}
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
