/* @TODO */
/* eslint-disable */
import React from 'react'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { Token } from '@src/types'
import { useSharedStore } from '@src/store'
import { useNativeToken, useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { Z3US_RRI } from '@src/config'
import { PoolSelector } from '../pool-selector'

interface IProps {
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
					<Text css={{ flex: '1', color: '$txtHelp' }} medium>
						Estimated Fees:
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
	fromToken: null,
	z3usBurn: null,
	css: {},
}
