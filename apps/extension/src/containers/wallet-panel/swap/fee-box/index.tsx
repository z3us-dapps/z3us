/* @TODO */
/* eslint-disable */
import React from 'react'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { Token } from '@src/types'
import { useSharedStore } from '@src/store'
import { useNativeToken, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { Z3US_RRI } from '@src/config'
import { PoolSelector } from '../pool-selector'

interface IProps {
	showTc?: boolean
	fromToken?: Token
	toToken?: Token
	poolFee: BigNumber
	z3usFee: BigNumber
	z3usBurn?: BigNumber
	txFee: BigNumber
	/* @TODO: type */
	pool?: any
	pools?: any
	onPoolChange?: any
	css?: any
}

export const FeeBox: React.FC<IProps> = ({
	showTc,
	fromToken,
	toToken,
	poolFee,
	z3usFee,
	z3usBurn,
	txFee,
	pool,
	pools,
	onPoolChange,
	css,
}) => {
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: nativeToken } = useNativeToken()
	const { data: z3usToken } = useTokenInfo(Z3US_RRI)
	const { data: nativeTicker } = useTicker(currency, nativeToken?.symbol)
	const { data: fromTicker } = useTicker(currency, fromToken?.symbol)
	const { data: z3usTicker } = useTicker(currency, z3usToken?.symbol)

	if (!fromToken) {
		return null
	}

	return (
		<Box
			css={{
				border: '1px solid $borderPanel',
				background: '$bgPanel2',
				borderRadius: '8px',
				pt: '12px',
				pb: '11px',
				px: '15px',
				mt: '16px',
				...(css as any),
			}}
		>
			<Flex direction="column" css={{ gap: '5px' }}>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp' }} medium>
						Rate:
					</Text>
					<Text medium css={{ pl: '$1' }}>
						1 XRD = 2.34 OCI
					</Text>
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp' }} medium>
						Pool:
					</Text>
					<Flex css={{ height: '15px', mt: '-6px', mr: '-7px' }}>
						{fromToken && toToken && <PoolSelector pool={pool} pools={pools} onPoolChange={onPoolChange} />}
					</Flex>
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp' }} medium>
						Slippage:
					</Text>
					<Text medium css={{ pl: '$1' }}>
						1%
					</Text>
				</Flex>
				<Flex css={{ flex: '1', width: '100%' }}>
					<Text css={{ flex: '1', color: '$txtHelp', display: 'flex', alignItems: 'center' }} medium>
						Estimated Fees:
						{showTc && (
							<Box css={{ pl: '4px', mt: '1px' }}>
								<HoverCard>
									<HoverCardTrigger asChild>
										<Flex css={{ color: '$txtHelp', display: 'inline-flex', textDecoration: 'underline' }}>
											<Text medium size="2" css={{ mr: '$1' }}>
												{`T&C's`}
											</Text>
											<InfoCircledIcon />
										</Flex>
									</HoverCardTrigger>
									<HoverCardContent
										side="top"
										sideOffset={5}
										css={{ maxWidth: '240px', pointerEvents: 'auto', zIndex: '99' }}
									>
										<Flex css={{ flexDirection: 'column', gap: 10, color: '$txtHelp' }}>
											<Text medium size="2">
												Presented fees and rates are indicative and are subject to change. Once submitted to the
												network, wallet and transaction fees apply at all times and are not refundable. By confirming
												swap you agree to our{' '}
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
									</HoverCardContent>
								</HoverCard>
							</Box>
						)}
					</Text>
					<Text medium css={{ pl: '$1' }}>
						$0.0002
					</Text>
				</Flex>
			</Flex>
			{/* @NOTE: OLD */}

			<Box css={{ display: 'none' }}>
				<Flex direction="row" css={{ pt: '$1', flex: '1' }}>
					<Text css={{ flex: '1', pl: '$1', color: '$txtHelp' }} medium>
						Transaction fee:
					</Text>
					<Text css={{ pl: '$1' }}>{`${formatBigNumber(
						txFee,
						nativeToken?.symbol,
					)} ${nativeToken?.symbol.toUpperCase()}`}</Text>
					{nativeTicker && (
						<Text css={{ pl: '$1' }}>{formatBigNumber(txFee.multipliedBy(nativeTicker.last_price), currency, 2)}</Text>
					)}
				</Flex>
				<Flex direction="row" css={{ pt: '$1', flex: '1' }}>
					<Text css={{ pl: '$1', flex: '1', color: '$txtHelp' }} medium>
						Swap fee:
					</Text>
					<Text css={{ pl: '$1' }}>{`${formatBigNumber(
						poolFee,
						fromToken?.symbol,
					)} ${fromToken?.symbol.toUpperCase()}`}</Text>
					{fromTicker && (
						<Text css={{ pl: '$1' }}>{formatBigNumber(poolFee.multipliedBy(fromTicker.last_price), currency, 2)}</Text>
					)}
				</Flex>
				<Flex direction="row" css={{ pt: '$1', flex: '1' }}>
					<Text css={{ pl: '$1', flex: '1', color: '$txtHelp' }} medium>
						Wallet fee:
					</Text>
					<Text css={{ pl: '$1' }}>{`${formatBigNumber(
						z3usFee,
						fromToken?.symbol,
					)} ${fromToken?.symbol.toUpperCase()}`}</Text>
					{fromTicker && (
						<Text css={{ pl: '$1' }}>{formatBigNumber(z3usFee.multipliedBy(fromTicker.last_price), currency, 2)}</Text>
					)}
				</Flex>
				{z3usBurn !== null && (
					<Flex direction="row" css={{ pt: '$1', flex: '1' }}>
						<Text css={{ pl: '$1', flex: '1', color: '$txtHelp' }} medium>
							Burn:
						</Text>
						<Text css={{ pl: '$1' }}>{`${formatBigNumber(
							z3usBurn,
							z3usToken?.symbol,
						)} ${z3usToken?.symbol.toUpperCase()}`}</Text>
						{z3usTicker && (
							<Text css={{ pl: '$1' }}>
								{formatBigNumber(z3usBurn.multipliedBy(z3usTicker.last_price), currency, 2)}
							</Text>
						)}
					</Flex>
				)}
			</Box>
		</Box>
	)
}

FeeBox.defaultProps = {
	showTc: false,
	fromToken: null,
	z3usBurn: null,
	css: {},
}
