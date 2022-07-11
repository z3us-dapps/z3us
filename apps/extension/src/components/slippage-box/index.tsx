import React from 'react'
import { formatBigNumber } from '@src/utils/formatters'
import BigNumber from 'bignumber.js'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { useTicker } from '@src/services/react-query/queries/tickers'
import { Token } from '@src/types'
import { useSharedStore } from '@src/store'

interface IProps {
	token?: Token
	amount?: BigNumber
	fee?: BigNumber
	css?: any
}

export const SlippageBox: React.FC<IProps> = ({ token, amount, fee, css }) => {
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: ticker } = useTicker(currency, token?.symbol)

	if (!ticker) {
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
			{token && ticker && (
				<Flex css={{ pt: '$1' }}>
					<Text medium css={{ flex: '1' }}>
						Rate
					</Text>
					<Text>
						1{token.symbol.toUpperCase()} = {ticker.last_price.toFixed(2).toLocaleString()} $USD
					</Text>
				</Flex>
			)}
			{fee && ticker && (
				<Flex css={{ pt: '$1' }}>
					<Text medium css={{ flex: '1' }}>
						Estimated fees
					</Text>
					<Text>{formatBigNumber(fee.multipliedBy(ticker.last_price), currency, 2)}</Text>
				</Flex>
			)}
			{amount && ticker && (
				<Flex css={{ pt: '$1' }}>
					<Text medium css={{ flex: '1' }}>
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
