/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { InfoCircledIcon, CircleBackslashIcon } from '@radix-ui/react-icons'
import { Token, Pool, PoolType } from '@src/types'
import { useSharedStore } from '@src/store'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useNativeToken, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { swapServices, Z3US_RRI } from '@src/config'
import { PoolSelector } from '../pool-selector'
import { TermsHoverCard } from '../terms-hover-card'
import { SlippageSettings } from '../slippage-settings'
import { getSlippagePercentage } from '../utils'

interface ImmerState {
	rate: string
	estimatedFees: string
	amount: string
	receive: string
	poolFee: string
}

const defaultState: ImmerState = {
	rate: '',
	estimatedFees: '',
	amount: '',
	receive: '',
	poolFee: '',
}

interface IProps {
	isConfirmFeeBox?: boolean
	showFeeBreakDown?: boolean
	fromToken?: Token
	toToken?: Token
	amount: BigNumber
	receive: BigNumber
	poolFee: BigNumber
	z3usFee: BigNumber
	z3usBurn: BigNumber
	txFee: BigNumber
	pool?: Pool
	pools?: Array<Pool>
	onPoolChange?: (pool: Pool) => void
	minimum: boolean
	onMinimumChange?: (minimum: boolean) => void
	slippage: number
	onSlippageChange?: (slippage: number) => void
	css?: any
}

export const FeeBox: React.FC<IProps> = ({
	isConfirmFeeBox,
	showFeeBreakDown,
	fromToken,
	toToken,
	amount,
	receive,
	poolFee,
	z3usFee,
	z3usBurn,
	txFee,
	pool,
	pools,
	onPoolChange,
	minimum,
	onMinimumChange,
	slippage,
	onSlippageChange,
	css,
}) => {
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))

	const [state, setState] = useImmer<ImmerState>(defaultState)
	const { data: nativeToken } = useNativeToken()
	const { data: z3usToken } = useTokenInfo(Z3US_RRI)
	const { data: nativeTicker } = useTicker(currency, nativeToken?.symbol)
	const { data: fromTicker } = useTicker(currency, fromToken?.symbol)
	const { data: z3usTicker } = useTicker(currency, z3usToken?.symbol)
	const totalFee = poolFee.plus(z3usFee).plus(txFee)
	const supportsSlippage = swapServices[pool?.type]?.supportsSlippage === true

	useEffect(() => {
		if (
			(amount.toString() !== state.amount && receive.toString() !== state.receive) ||
			(poolFee.toString() !== 'NaN' && poolFee.toString() !== state.poolFee)
		) {
			setState(draft => {
				draft.poolFee = poolFee.toString()
				draft.amount = amount.toString()
				draft.receive = receive.toString()
				draft.rate = receive.dividedBy(amount).toString() !== 'NaN' ? formatBigNumber(receive.dividedBy(amount)) : ''
				draft.estimatedFees = fromTicker
					? formatBigNumber(totalFee.multipliedBy(fromTicker.last_price), currency, 2)
					: `${formatBigNumber(totalFee, fromToken?.symbol)} ${fromToken?.symbol.toUpperCase()}`
			})
		}
	}, [amount.toString(), receive.toString(), poolFee.toString()])

	return (
		<Box
			css={{
				border: '1px solid $borderPanel',
				background: '$bgPanel2',
				borderRadius: '8px',
				pt: '12px',
				pb: '11px',
				px: '15px',
				...(css as any),
			}}
		>
			<Flex direction="column" css={{ gap: '6px' }}>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp' }} medium>
						Rate:
					</Text>
					<Text medium css={{ pl: '$1' }}>
						{pool &&
							`1 ${fromToken?.symbol.toUpperCase() || ''} ≈ ${state.rate} ${toToken?.symbol.toUpperCase() || ''}`}
					</Text>
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp' }} medium>
						Pool:
					</Text>
					{isConfirmFeeBox ? (
						<Text medium>{pool?.name}</Text>
					) : (
						<Flex css={{ height: '15px', mt: '-6px', mr: '-7px' }}>
							{fromToken && toToken && <PoolSelector pool={pool} pools={pools} onPoolChange={onPoolChange} />}
						</Flex>
					)}
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp' }} medium>
						Slippage:
					</Text>
					<Flex css={{ height: '15px', position: 'relative' }}>
						{isConfirmFeeBox &&
							((pool?.type === PoolType.OCI || pool?.type === PoolType.DOGECUBEX) && minimum ? (
								<Text medium>{getSlippagePercentage(slippage)}</Text>
							) : (
								<ToolTip message="Slippage not supported">
									<Flex css={{ color: '$txtHelp', display: 'inline-flex' }}>
										<CircleBackslashIcon />
									</Flex>
								</ToolTip>
							))}
						{!isConfirmFeeBox && pool && (
							<SlippageSettings
								pool={pool}
								minimum={minimum}
								onMinimumChange={onMinimumChange}
								slippage={slippage}
								onSlippageChange={onSlippageChange}
							/>
						)}
					</Flex>
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp', display: 'flex', alignItems: 'center', height: '15px' }} medium>
						Estimated Fees:
						{isConfirmFeeBox && <TermsHoverCard pool={pool} />}
						{showFeeBreakDown && pool && (
							<Box css={{ pl: '3px', transform: 'translateY(1px)', ...(css as any) }}>
								<HoverCard>
									<HoverCardTrigger asChild>
										<Flex css={{ color: '$txtHelp', display: 'inline-flex' }}>
											<InfoCircledIcon />
										</Flex>
									</HoverCardTrigger>
									<HoverCardContent
										side="top"
										sideOffset={5}
										css={{ maxWidth: '240px', pointerEvents: 'auto', zIndex: '99' }}
									>
										<Flex css={{ flexDirection: 'column', gap: '4px' }}>
											<Flex>
												<Text bold size="2">
													Fee breakdown
												</Text>
											</Flex>
											<Flex css={{ width: '100%' }}>
												<Text medium size="2" css={{ color: '$txtHelp' }}>
													Network fee:
												</Text>
												<Text size="2" css={{ display: 'flex', flex: '1', justifyContent: 'flex-end' }}>
													<Box css={{ pl: '$1' }}>{`${formatBigNumber(
														txFee,
														nativeToken?.symbol,
													)} ${nativeToken?.symbol.toUpperCase()}`}</Box>
													{nativeTicker && (
														<Box css={{ pl: '$1' }}>
															{formatBigNumber(txFee.multipliedBy(nativeTicker.last_price), currency, 2)}
														</Box>
													)}
												</Text>
											</Flex>
											<Flex>
												<Text medium size="2" css={{ color: '$txtHelp' }}>
													Exchange fee:
												</Text>
												<Text size="2" css={{ display: 'flex', flex: '1', justifyContent: 'flex-end' }}>
													{pool?.type === PoolType.DSOR ? (
														<Box css={{ pl: '$1' }}>Unknown</Box>
													) : (
														<>
															<Box css={{ pl: '$1' }}>{`${formatBigNumber(
																poolFee,
																fromToken?.symbol,
															)} ${fromToken?.symbol.toUpperCase()}`}</Box>
															{fromTicker && (
																<Box css={{ pl: '$1' }}>
																	{formatBigNumber(poolFee.multipliedBy(fromTicker.last_price), currency, 2)}
																</Box>
															)}
														</>
													)}
												</Text>
											</Flex>
											<Flex>
												<Text medium size="2" css={{ color: '$txtHelp' }}>
													Wallet fee:
												</Text>
												<Text size="2" css={{ display: 'flex', flex: '1', justifyContent: 'flex-end' }}>
													<Box css={{ pl: '$1' }}>{`${formatBigNumber(
														z3usFee,
														fromToken?.symbol,
													)} ${fromToken?.symbol.toUpperCase()}`}</Box>
													{fromTicker && (
														<Box css={{ pl: '$1' }}>
															{formatBigNumber(z3usFee.multipliedBy(fromTicker.last_price), currency, 2)}
														</Box>
													)}
												</Text>
											</Flex>
											{z3usBurn.gt(0) && (
												<Flex>
													<Text medium size="2" css={{ color: '$txtHelp' }}>
														Z3US burn fee:
													</Text>
													<Text size="2">
														<Box css={{ pl: '$1' }}>{`${formatBigNumber(
															z3usBurn,
															z3usToken?.symbol,
														)} ${z3usToken?.symbol.toUpperCase()}`}</Box>
														{z3usTicker && (
															<Box css={{ pl: '$1' }}>
																{formatBigNumber(z3usBurn.multipliedBy(z3usTicker.last_price), currency, 2)}
															</Box>
														)}
													</Text>
												</Flex>
											)}
										</Flex>
									</HoverCardContent>
								</HoverCard>
							</Box>
						)}
					</Text>
					<Text medium css={{ pl: '$1' }}>
						{pool && state.estimatedFees}
					</Text>
				</Flex>
			</Flex>
		</Box>
	)
}

FeeBox.defaultProps = {
	isConfirmFeeBox: false,
	showFeeBreakDown: false,
	fromToken: null,
	toToken: null,
	pool: null,
	pools: null,
	onPoolChange: undefined,
	onMinimumChange: undefined,
	onSlippageChange: undefined,
	css: {},
}
