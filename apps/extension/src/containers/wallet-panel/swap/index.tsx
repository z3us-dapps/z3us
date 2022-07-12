import React, { useEffect, useRef } from 'react'
import { Z3US_RRI } from '@src/config'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useQueryClient } from 'react-query'
import { useTransaction } from '@src/hooks/use-transaction'
import { useNativeToken, useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { usePools, usePool, usePoolCost } from '@src/hooks/react-query/queries/pools'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import BigNumber from 'bignumber.js'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import { AccountSelector } from '@src/components/account-selector'
import { getShortAddress } from '@src/utils/string-utils'
import { Box, Text, Flex, MotionBox } from 'ui/src/components/atoms'
import { formatBigNumber } from '@src/utils/formatters'
import { TokenSelector } from '@src/components/token-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { AnimatePresence } from 'framer-motion'
import { PoolSelector } from './pool-selector'

export const Swap: React.FC = () => {
	const inputAmountRef = useRef(null)
	const queryClient = useQueryClient()
	const { signTransaction, submitTransaction } = useTransaction()
	const { hw, seed, currency } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		currency: state.currency,
	}))
	const { account, accountAddress, selectAccount } = useStore(state => ({
		selectAccount: state.selectAccountAction,
		account: state.account,
		accountAddress: state.getCurrentAddressAction(),
	}))
	const pools = usePools()
	const { data: balances } = useTokenBalances()

	const [state, setState] = useImmer({
		txID: '',
		pool: '',
		fromRRI: '',
		toRRI: '',
		amount: '',
		poolAddress: '',
		burn: false,
		isLoading: false,
		errorMessage: '',
	})

	const { data: nativeToken } = useNativeToken()
	const { data: fromToken } = useTokenInfo(state.fromRRI)
	const { data: toToken } = useTokenInfo(state.toRRI)
	const { data: nativeTicker } = useTicker(currency, nativeToken?.symbol)
	const { data: fromTicker } = useTicker(currency, fromToken?.symbol)
	const { data: z3usTicker } = useTicker(currency, 'z3us')

	const shortAddress = getShortAddress(accountAddress)
	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === state.fromRRI)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const tokenSymbol = fromToken?.symbol.toUpperCase()

	const z3usToken = liquidBalances?.find(balance => balance.rri === Z3US_RRI)
	const z3usTokenAmmount = z3usToken ? new BigNumber(z3usToken.amount).shiftedBy(-18) : new BigNumber(0)

	const pool = usePool(state.pool)
	const cost = usePoolCost(pool, fromToken, toToken, new BigNumber(state.amount), z3usTokenAmmount, state.burn)

	useEffect(() => {
		if (!pool) return
		const { tokens } = pool
		const [firstToken, secondToken] = tokens
		setState(draft => {
			draft.fromRRI = firstToken || ''
			draft.toRRI = secondToken || ''
		})
	}, [pool])

	const handleSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.amount = event.currentTarget.value
		})
	}

	const handleSwap = async () => {
		if (!account) return

		setState(draft => {
			draft.isLoading = true
		})

		try {
			const { blob } = await signTransaction(fromToken.symbol, cost.transaction)
			const result = await submitTransaction(blob)
			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setState(draft => {
				draft.txID = result.txID
				draft.errorMessage = ''
			})
		} catch (error) {
			setState(draft => {
				draft.errorMessage = (error?.message || error).toString().trim()
			})
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
		setState(draft => {
			draft.amount = ''
		})
	}

	const handlePoolChange = (poolName: string) => {
		setState(draft => {
			draft.pool = poolName
		})
	}

	const handleSelectedTokenChange = (rri: string) => {
		const changeToken = liquidBalances?.find(balance => balance.rri === rri)
		setState(draft => {
			draft.amount = ''
			draft.fromRRI = changeToken.rri
		})
	}

	const handleDestinationTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.toRRI = rri
		})
	}

	const handleUseMax = () => {
		setState(draft => {
			draft.amount = selectedTokenAmmount.toString()
		})
		inputAmountRef.current.focus()
	}

	const handleSetBurn = checked => {
		setState(draft => {
			draft.burn = checked === true
		})
	}

	return (
		<AnimatePresence exitBeforeEnter>
			<MotionBox
				key={cost?.transaction ? 'confirm' : 'swap'}
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: 0 }}
				exit={{ opacity: 0, y: 0 }}
				transition={{ duration: 0.2 }}
			>
				<Flex
					direction="column"
					css={{
						bg: '$bgPanel',
						height: '600px',
						position: 'absolute',
						zIndex: '1',
						left: '0',
						right: '0',
						bottom: '0',
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
								<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', flex: '1' }}>Pool:</Text>
							</Flex>
							<Box css={{ mt: '13px', position: 'relative' }}>
								<PoolSelector pool={state.pool} pools={pools} onPoolChange={handlePoolChange} />
							</Box>
						</Box>

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
								<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', flex: '1' }}>Amount:</Text>
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
								{fromToken && (
									<TokenSelector
										triggerType="input"
										token={fromToken}
										tokens={pool.tokens || []}
										onTokenChange={handleSelectedTokenChange}
									/>
								)}
							</Box>
						</Box>

						<Box>
							<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
								<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', flex: '1' }}>Recieve:</Text>
							</Flex>
							<Box css={{ mt: '13px', position: 'relative' }}>
								<Input type="number" size="2" value={cost?.recieve?.toString()} placeholder="Recieve" disabled />
								{toToken && (
									<TokenSelector
										triggerType="input"
										token={toToken}
										tokens={pool.tokens || []}
										onTokenChange={handleDestinationTokenChange}
									/>
								)}
							</Box>
						</Box>

						<Box>
							<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
								<Flex>
									<Text medium css={{ fontSize: '14px', lineHeight: '17px', pr: '2px' }}>
										Reduce wallet fee:
									</Text>
								</Flex>
								<Flex align="center" justify="end">
									<Checkbox id="encrypt" size="1" onCheckedChange={handleSetBurn} checked={state.burn}>
										<CheckIcon />
									</Checkbox>
									<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="encrypt">
										Burn Z3US tokens
									</Text>
								</Flex>
							</Flex>
						</Box>

						{cost && (
							<Box
								css={{
									border: '1px solid $borderPanel',
									borderRadius: '8px',
									pt: '6px',
									pb: '10px',
									px: '12px',
									mt: '17px',
								}}
							>
								<Flex css={{ pt: '$1', flex: '1' }}>
									<Text medium>Transaction fees</Text>
									<Text>{formatBigNumber(cost.transactionFee, nativeToken.symbol)}</Text>
									<Text>{formatBigNumber(cost.transactionFee.multipliedBy(nativeTicker.last_price), currency, 2)}</Text>
								</Flex>
								<Flex css={{ pt: '$1', flex: '1' }}>
									<Text medium>Swap fee</Text>
									<Text>{formatBigNumber(cost.swapFee, fromToken.symbol)}</Text>
									{fromTicker && (
										<Text>{formatBigNumber(cost.transactionFee.multipliedBy(fromTicker.last_price), currency, 2)}</Text>
									)}
								</Flex>
								<Flex css={{ pt: '$1', flex: '1' }}>
									<Text medium>Wallet fee</Text>
									<Text>{formatBigNumber(cost.z3usFee, fromToken.symbol)}</Text>
									{fromTicker && (
										<Text>{formatBigNumber(cost.z3usFee.multipliedBy(fromTicker.last_price), currency, 2)}</Text>
									)}
								</Flex>
								<Flex css={{ pt: '$1', flex: '1' }}>
									<Text medium>Burn</Text>
									<Text>{formatBigNumber(cost.z3usBurn, fromToken.symbol)}</Text>
									{z3usTicker && (
										<Text>{formatBigNumber(cost.z3usBurn.multipliedBy(z3usTicker.last_price), currency, 2)}</Text>
									)}
								</Flex>
							</Box>
						)}

						<Box css={{ mt: '13px', position: 'relative' }}>
							<Button
								size="6"
								color="primary"
								aria-label="swap"
								css={{ flex: '1' }}
								onClick={handleSwap}
								fullWidth
								loading={state.isLoading}
								disabled={!account || !cost || !cost.transaction}
							>
								Swap
							</Button>
						</Box>
					</Box>
				</Flex>
			</MotionBox>
		</AnimatePresence>
	)
}
