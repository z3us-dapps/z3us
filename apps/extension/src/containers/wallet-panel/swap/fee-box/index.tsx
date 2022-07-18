import React from 'react'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { Token } from '@src/types'
import { useSharedStore } from '@src/store'
import { useNativeToken } from '@src/hooks/react-query/queries/radix'

interface IProps {
	fromToken?: Token
	poolFee: BigNumber
	z3usFee: BigNumber
	z3usBurn?: BigNumber
	txFee: BigNumber
	css?: any
}

export const FeeBox: React.FC<IProps> = ({ fromToken, poolFee, z3usFee, z3usBurn, txFee, css }) => {
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: nativeToken } = useNativeToken()
	const { data: nativeTicker } = useTicker(currency, nativeToken?.symbol)
	const { data: fromTicker } = useTicker(currency, fromToken?.symbol)
	const { data: z3usTicker } = useTicker(currency, 'z3us')

	if (!fromToken) {
		return null
	}

	return (
		<Box
			css={{
				border: '1px solid $borderPanel',
				borderRadius: '8px',
				pt: '6px',
				pb: '10px',
				px: '12px',
				mt: '17px',
				...(css as any),
			}}
		>
			<Flex direction="row" css={{ pt: '$1', flex: '1', overflowX: 'auto' }}>
				<Text css={{ pl: '$1' }} medium>
					Transaction fee
				</Text>
				<Text css={{ pl: '$1' }}>{formatBigNumber(txFee, nativeToken?.symbol)}</Text>
				{nativeTicker && (
					<Text css={{ pl: '$1' }}>{formatBigNumber(txFee.multipliedBy(nativeTicker.last_price), currency, 2)}</Text>
				)}
			</Flex>
			<Flex direction="row" css={{ pt: '$1', flex: '1' }}>
				<Text css={{ pl: '$1' }} medium>
					Swap fee
				</Text>
				<Text css={{ pl: '$1' }}>{formatBigNumber(poolFee, fromToken?.symbol)}</Text>
				{fromTicker && (
					<Text css={{ pl: '$1' }}>{formatBigNumber(poolFee.multipliedBy(fromTicker.last_price), currency, 2)}</Text>
				)}
			</Flex>
			<Flex direction="row" css={{ pt: '$1', flex: '1' }}>
				<Text css={{ pl: '$1' }} medium>
					Wallet fee
				</Text>
				<Text css={{ pl: '$1' }}>{formatBigNumber(z3usFee, fromToken?.symbol)}</Text>
				{fromTicker && (
					<Text css={{ pl: '$1' }}>{formatBigNumber(z3usFee.multipliedBy(fromTicker.last_price), currency, 2)}</Text>
				)}
			</Flex>
			{z3usBurn !== null && (
				<Flex direction="row" css={{ pt: '$1', flex: '1' }}>
					<Text css={{ pl: '$1' }} medium>
						Burn
					</Text>
					<Text css={{ pl: '$1' }}>{formatBigNumber(z3usBurn, fromToken?.symbol)}</Text>
					{z3usTicker && (
						<Text css={{ pl: '$1' }}>{formatBigNumber(z3usBurn.multipliedBy(z3usTicker.last_price), currency, 2)}</Text>
					)}
				</Flex>
			)}
		</Box>
	)
}

FeeBox.defaultProps = {
	fromToken: null,
	z3usBurn: null,
	css: {},
}
