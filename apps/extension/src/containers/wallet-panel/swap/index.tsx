import React, { useRef } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useTokenBalances, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import {
	usePools,
	usePoolTokens,
	useZ3USFees,
	usePoolFees,
	useTransactionFee,
} from '@src/hooks/react-query/queries/swap'
import { Pool } from '@src/types'
import BigNumber from 'bignumber.js'
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
	const { hw, seed } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
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
		minimum: false,
		burn: false,
		isLoading: false,
	})

	const possibleTokens = usePoolTokens()
	const { data: balances } = useTokenBalances()
	const { data: fromToken } = useTokenInfo(state.fromRRI)
	const { data: toToken } = useTokenInfo(state.toRRI)
	const pools = usePools(state.fromRRI, state.toRRI)

	const shortAddress = getShortAddress(accountAddress)
	const liquidBalances = balances?.account_balances?.liquid_balances || []
	const selectedToken = liquidBalances?.find(balance => balance.rri === state.fromRRI)
	const selectedTokenAmmount = selectedToken ? new BigNumber(selectedToken.amount).shiftedBy(-18) : new BigNumber(0)
	const tokenSymbol = fromToken?.symbol.toUpperCase()

	const handlePoolChange = (pool: Pool) => {
		setState(draft => {
			draft.pool = pool
		})
	}

	const z3usFee = useZ3USFees(new BigNumber(state.amount || 0), state.burn)
	const poolFee = usePoolFees(
		state.pool,
		pools,
		handlePoolChange,
		new BigNumber(z3usFee.amount),
		fromToken?.rri,
		toToken?.rri,
	)
	const txFee = useTransactionFee(
		state.pool,
		fromToken,
		toToken,
		poolFee.amount,
		poolFee.recieve,
		z3usFee.fee,
		z3usFee.burn,
		state.minimum,
	)

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
		setState(draft => {
			draft.amount = ''
		})
	}

	const handleFromTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.fromRRI = rri
			draft.pool = null
		})
	}

	const handleToTokenChange = (rri: string) => {
		setState(draft => {
			draft.amount = ''
			draft.toRRI = rri
			draft.pool = null
		})
	}

	const handleUseMax = () => {
		setState(draft => {
			draft.amount = selectedTokenAmmount.toString()
		})
		inputAmountRef.current.focus()
	}

	const handleSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.amount = event.currentTarget.value
		})
	}

	const handleSetMinimum = checked => {
		setState(draft => {
			draft.minimum = checked === true
		})
	}

	const handleSetBurn = checked => {
		setState(draft => {
			draft.burn = checked === true
		})
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
						<Input type="number" size="2" value={poolFee?.recieve?.toString()} placeholder="Recieve" disabled />
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
					poolFee={poolFee.fee}
					z3usFee={z3usFee.fee}
					z3usBurn={state.burn ? z3usFee.burn : null}
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
						receive={poolFee.recieve}
						txFee={txFee.fee}
						poolFee={poolFee.fee}
						z3usFee={z3usFee.fee}
						z3usBurn={state.burn ? z3usFee.burn : null}
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
