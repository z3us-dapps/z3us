import { CircleBackslashIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import BigNumber from 'bignumber.js'
import React from 'react'

import { Box, Flex, StyledLink, Text } from 'ui/src/components/atoms'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import { ToolTip } from 'ui/src/components/tool-tip'

import { Z3US_RRI } from '@src/config'
import { useNativeToken, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { Pool, PoolType, Token } from '@src/types'
import { formatBigNumber } from '@src/utils/formatters'

import { PoolSelector } from '../pool-selector'
import { SlippageSettings } from '../slippage-settings'
import { getSlippagePercentage } from '../utils'

interface IProps {
	isConfirmFeeBox?: boolean
	fromToken?: Token
	toToken?: Token
	rate: BigNumber
	poolFee: BigNumber
	z3usFee: BigNumber
	z3usBurn: BigNumber
	txFee: BigNumber
	priceImpact: number
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
	fromToken,
	toToken,
	rate,
	poolFee,
	z3usFee,
	z3usBurn,
	txFee,
	priceImpact,
	pool,
	pools,
	onPoolChange,
	minimum,
	onMinimumChange,
	slippage,
	onSlippageChange,
	css,
}) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: nativeToken } = useNativeToken()
	const { data: z3usToken } = useTokenInfo(Z3US_RRI)
	const { data: nativeTicker } = useTicker(currency, nativeToken?.symbol)
	const { data: fromTicker } = useTicker(currency, fromToken?.symbol)
	const { data: z3usTicker } = useTicker(currency, z3usToken?.symbol)

	const totalFee = poolFee.plus(z3usFee).plus(txFee)
	const estimatedFees = fromTicker
		? formatBigNumber(totalFee.multipliedBy(fromTicker.last_price), currency, 2)
		: `${formatBigNumber(totalFee, fromToken?.symbol)} ${fromToken?.symbol.toUpperCase()}`

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
							`1 ${fromToken?.symbol.toUpperCase() || ''} ≈ ${formatBigNumber(rate, toToken?.symbol)} ${
								toToken?.symbol.toUpperCase() || ''
							}`}
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
					<Text css={{ flex: '1', color: '$txtHelp', display: 'flex', alignItems: 'center', height: '15px' }} medium>
						Price impact:
						<Box css={{ pl: '3px', transform: 'translateY(1px)' }}>
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
									<Flex>
										<Text size="2" color="help">
											Price impact is the influence of user&apos;s individual trade over the market price of an
											underlying asset pair. It is directly correlated with the amount of liquidity in the pool. Price
											impact can be especially high for illiquid markets/pairs, and may cause a trader to lose a
											significant portion of their funds.
										</Text>
									</Flex>
								</HoverCardContent>
							</HoverCard>
						</Box>
					</Text>
					<Text medium css={{ pl: '$1' }}>
						<Flex css={{ height: '15px', position: 'relative' }}>
							{priceImpact > 0 ? (
								<Text medium>{getSlippagePercentage(slippage)}</Text>
							) : (
								<ToolTip arrowOffset={3} message="Price impact not provided">
									<Flex css={{ color: '$txtHelp', display: 'inline-flex' }}>
										<CircleBackslashIcon />
									</Flex>
								</ToolTip>
							)}
						</Flex>
					</Text>
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp', display: 'flex', alignItems: 'center', height: '15px' }} medium>
						Slippage tolerance:
						<Box css={{ pl: '3px', transform: 'translateY(1px)' }}>
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
									<Flex>
										<Text size="2" color="help">
											Slippage tolerance is a setting for the amount of price slippage you are willing to accept for a
											trade. By setting slippage tolerance, you basically setting a minimum amount on how many tokens
											you will accept, in the event that the price increases or decreases.
										</Text>
									</Flex>
								</HoverCardContent>
							</HoverCard>
						</Box>
					</Text>
					<Text medium css={{ pl: '$1' }}>
						<Flex css={{ height: '15px', position: 'relative' }}>
							{isConfirmFeeBox &&
								((pool?.type === PoolType.OCI || pool?.type === PoolType.DOGECUBEX) && minimum ? (
									<Text medium>{getSlippagePercentage(slippage)}</Text>
								) : (
									<ToolTip arrowOffset={3} message="Slippage not supported">
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
					</Text>
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp', display: 'flex', alignItems: 'center', height: '15px' }} medium>
						Estimated Fees:
						{pool && (
							<Box css={{ pl: '3px', transform: 'translateY(1px)' }}>
								<HoverCard>
									<HoverCardTrigger asChild>
										<Flex css={{ color: '$txtHelp', display: 'inline-flex' }}>
											<InfoCircledIcon />
											{isConfirmFeeBox && (
												<Text size="1" underline medium css={{ ml: '4px', mt: '1px' }}>
													{`T&C's`}
												</Text>
											)}
										</Flex>
									</HoverCardTrigger>
									<HoverCardContent
										side="top"
										sideOffset={5}
										css={{ maxWidth: '255px', pointerEvents: 'auto', zIndex: '99' }}
									>
										<Flex css={{ flexDirection: 'column', gap: '4px' }}>
											<Flex>
												<Text bold size="2">
													Fee breakdown
												</Text>
											</Flex>
											<Flex css={{ width: '100%' }}>
												<Text medium size="2" css={{ color: '$txtHelp', width: '85px', flexShrink: '0' }}>
													Network fee:
												</Text>
												<Text size="2" css={{ display: 'flex', flex: '1', justifyContent: 'flex-end' }}>
													<Text css={{ pl: '$1' }}>{formatBigNumber(txFee, nativeToken?.symbol)}</Text>
													<Text truncate css={{ pl: '$1', maxWidth: '35px' }}>
														{nativeToken?.symbol.toUpperCase()}
													</Text>
													{nativeTicker && (
														<Box css={{ pl: '$1' }}>
															{formatBigNumber(txFee.multipliedBy(nativeTicker.last_price), currency, 2)}
														</Box>
													)}
												</Text>
											</Flex>
											<Flex>
												<Text medium size="2" css={{ color: '$txtHelp', width: '85px', flexShrink: '0' }}>
													Exchange fee:
												</Text>
												<Text size="2" css={{ display: 'flex', flex: '1', justifyContent: 'flex-end' }}>
													{pool?.type === PoolType.DSOR ? (
														<Box css={{ pl: '$1' }}>Unknown</Box>
													) : (
														<>
															<Text css={{ pl: '$1' }}>{formatBigNumber(poolFee, fromToken?.symbol)}</Text>
															<Text truncate css={{ pl: '$1', maxWidth: '35px' }}>
																{fromToken?.symbol.toUpperCase()}
															</Text>
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
												<Text medium size="2" css={{ color: '$txtHelp', width: '85px', flexShrink: '0' }}>
													Wallet fee:
												</Text>
												<Text size="2" css={{ display: 'flex', flex: '1', justifyContent: 'flex-end' }}>
													<Text css={{ pl: '$1' }}>{formatBigNumber(z3usFee, fromToken?.symbol)}</Text>
													<Text truncate css={{ pl: '$1', maxWidth: '35px' }}>
														{fromToken?.symbol.toUpperCase()}
													</Text>
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
											{isConfirmFeeBox && (
												<Flex css={{ borderTop: '1px solid', borderColor: '$borderPanel', mt: '$2', pt: '$2' }}>
													<Text size="2" color="help">
														Presented fees and rates are indicative and are subject to change. Once submitted to the
														network, wallet and transaction fees apply at all times and are not refundable. By
														confirming swap you agree to our{' '}
														<StyledLink
															underline
															href="https://z3us.com/terms"
															target="_blank"
															onMouseDown={() => {
																// @TODO: Seems to be an issue using a hover card inside a dialog
																// https://github.com/radix-ui/primitives/issues/920
																window.open('https://z3us.com/terms', '_blank').focus()
															}}
														>
															T&amp;C
														</StyledLink>{' '}
														{pool && (
															<>
																, additional T&amp;C of {pool.name} may apply, learn more{' '}
																<StyledLink
																	underline
																	href={pool.url}
																	target="_blank"
																	onMouseDown={() => {
																		// @TODO: Seems to be an issue using a hover card inside a dialog
																		// https://github.com/radix-ui/primitives/issues/920
																		window.open(pool.url, '_blank').focus()
																	}}
																>
																	{pool.url}
																</StyledLink>
																.
															</>
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
						{pool && estimatedFees}
					</Text>
				</Flex>
			</Flex>
		</Box>
	)
}

FeeBox.defaultProps = {
	isConfirmFeeBox: false,
	fromToken: null,
	toToken: null,
	pool: null,
	pools: null,
	onPoolChange: undefined,
	onMinimumChange: undefined,
	onSlippageChange: undefined,
	css: {},
}
