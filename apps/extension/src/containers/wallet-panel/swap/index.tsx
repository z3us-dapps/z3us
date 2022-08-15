/* @TODO */
/* eslint-disable */
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
import { RefreshIcon } from 'ui/src/components/icons'
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
	inputFocused: 'from' | 'to' | null
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
	inputFocused: null,
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

	// @TODO: refactor to a hook
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

	// @TODO: refactor to a hook
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
		inputFromRef.current.focus()
	}

	const handleSetAmount = async (event: React.ChangeEvent<HTMLInputElement>) => {
		let { value } = event.currentTarget
		console.log('value:', value)
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

					{/* @NOTE: Account selector */}
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
								<Text size="5" color="help" css={{ pt: '4px' }}>
									From account
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
							</Flex>
						</Flex>
					</Box>
					{/* @NOTE: You pay */}
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
							<Box css={{ width: '204px' }}>
								<Input
									ref={inputFromRef}
									theme="minimal"
									type="number"
									size="2"
									min="0"
									value={state.amount}
									placeholder="Enter amount"
									onFocus={handleInputFromFocus}
									onBlur={handleInputFromBlur}
									onChange={handleSetAmount}
									disabled={state.isLoading}
									css={{ height: '46px', width: '100%' }}
								/>
								<Text size="5" color="help" css={{ pe: 'none', mt: '-5px', position: 'relative' }}>
									You pay
								</Text>
							</Box>
							<Flex align="center" justify="end" css={{ flex: '1', pr: '4px', mt: '10px' }}>
								<Box
									as="button"
									css={{
										background: 'none',
										border: 'none',
										margin: 'none',
										padding: 'none',
										cursor: 'pointer',
										mt: '3px',
									}}
								>
									<Text size="3" color="purple" underline>
										Max
									</Text>
								</Box>
								<TokenSelector
									triggerType="minimal"
									token={fromToken}
									tokens={Object.keys(possibleTokens || {}).filter(rri => rri !== state.toRRI)}
									onTokenChange={handleFromTokenChange}
								/>
							</Flex>
						</Flex>
					</Box>
					{/* @NOTE: You receive */}
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
							<Box css={{ width: '204px' }}>
								<Input
									type="number"
									theme="minimal"
									size="2"
									min="0"
									value={state.receive}
									placeholder="Receive"
									onFocus={handleInputToFocus}
									onBlur={handleInputToBlur}
									onChange={handleSetReceive}
									disabled={state.isLoading}
								/>

								<Text size="5" color="help" css={{ pe: 'none', mt: '-5px', position: 'relative' }}>
									You receive
								</Text>
							</Box>
							<Flex align="center" justify="end" css={{ flex: '1', pr: '4px', mt: '10px' }}>
								<Box
									as="button"
									css={{
										background: 'none',
										border: 'none',
										margin: 'none',
										padding: 'none',
										cursor: 'pointer',
										mt: '3px',
									}}
								>
									<Text size="3" color="purple" underline>
										Min
									</Text>
								</Box>
								<TokenSelector
									triggerType="minimal"
									token={toToken}
									tokens={Object.keys(possibleTokens[state.fromRRI] || {}).filter(rri => rri !== state.fromRRI)}
									onTokenChange={handleToTokenChange}
								/>
							</Flex>
						</Flex>
						<Box
							as="button"
							onClick={handleSwitchTokens}
							css={{
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								top: '-17px',
								left: '50%',
								ml: '-16px',
								width: '32px',
								height: '32px',
								borderRadius: '50%',
								background: '$bgToolTip1',
								border: 'none',
								margin: 'none',
								padding: 'none',
								cursor: 'pointer',
								color: '$iconActive',
								boxShadow: '0px 10px 44px rgba(0, 0, 0, 0.35)',
							}}
						>
							<RefreshIcon />
						</Box>
					</Box>

					{/* @NOTE: Feebox */}
					<FeeBox
						fromToken={fromToken}
						toToken={toToken}
						txFee={txFee.fee}
						poolFee={new BigNumber(state.poolFee)}
						z3usFee={new BigNumber(state.z3usFee)}
						z3usBurn={state.burn ? new BigNumber(state.z3usBurn) : null}
						pool={state.pool}
						pools={pools}
						onPoolChange={handlePoolChange}
					/>

					{/* @NOTE: Continue swap button */}
					<Box css={{ mt: '16px', position: 'relative' }}>
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
