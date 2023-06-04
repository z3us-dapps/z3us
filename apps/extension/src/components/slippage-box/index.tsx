import type BigNumber from 'bignumber.js'
import React from 'react'

import { Box, Flex, Text } from 'ui/src/components/atoms'

import { useNativeToken } from '@src/hooks/react-query/queries/radix'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { useNoneSharedStore } from '@src/hooks/use-store'
import type { Token } from '@src/types'
import { formatBigNumber } from '@src/utils/formatters'

interface IProps {
	token?: Token
	amount?: BigNumber
	fee?: BigNumber
	css?: any
}

export const SlippageBox: React.FC<IProps> = ({ token, amount, fee, css }) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: ticker } = useTicker(currency, token?.symbol)
	const { data: nativeToken } = useNativeToken()
	const { data: nativeTicker } = useTicker(currency, nativeToken?.symbol)

	if (!ticker) {
		return null
	}

	return (
		<Box
			css={{
				border: '1px solid',
				borderColor: '$borderPanel',
				borderRadius: '8px',
				pt: '6px',
				pb: '10px',
				px: '12px',
				mt: '17px',
				...(css as any),
			}}
		>
			{token && ticker && (
				<Flex css={{ pt: '$1' }}>
					<Text medium css={{ flex: '1', color: '$txtHelp' }}>
						Rate
					</Text>
					<Text>
						1{token.symbol.toUpperCase()} = {ticker.last_price.toFixed(2).toLocaleString()} $USD
					</Text>
				</Flex>
			)}
			{fee && nativeTicker && (
				<Flex css={{ pt: '$1' }}>
					<Text medium css={{ flex: '1', color: '$txtHelp' }}>
						Estimated fees
					</Text>
					<Text>{formatBigNumber(fee.multipliedBy(nativeTicker.last_price), currency, 2)}</Text>
				</Flex>
			)}
			{amount && ticker && (
				<Flex css={{ pt: '$1' }}>
					<Text medium css={{ flex: '1', color: '$txtHelp' }}>
						Total USD
					</Text>
					<Text>{formatBigNumber(amount.multipliedBy(ticker.last_price), currency, 2)}</Text>
				</Flex>
			)}
		</Box>
	)
}

SlippageBox.defaultProps = {
	token: null,
	amount: null,
	fee: null,
	css: {},
}
