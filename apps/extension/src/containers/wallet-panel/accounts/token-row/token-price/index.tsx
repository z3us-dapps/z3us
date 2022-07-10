import React from 'react'
import BigNumber from 'bignumber.js'
import { formatBigNumber } from '@src/utils/formatters'
import { useTicker } from '@src/services/react-query/queries/tickers'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import PriceLabel from 'ui/src/components/price-label'
import { useSharedStore } from '@src/store'

interface Props {
	symbol: string
	amount: string | BigNumber
}

export const TokenPrice = ({ symbol, amount }: Props): JSX.Element => {
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))
	const { isLoading, data: ticker } = useTicker(currency, symbol)

	if (isLoading) {
		return null
	}
	if (!ticker) {
		return null
	}

	return (
		<Flex justify="end" css={{ flex: '1' }}>
			<Box css={{ textAlign: 'right', pt: '13px' }}>
				<Text css={{ fontSize: '14px', lineHeight: '20px', fontWeight: '700', pb: '2px' }}>
					{formatBigNumber(
						(amount instanceof BigNumber ? amount : new BigNumber(amount).shiftedBy(-18)).multipliedBy(
							ticker.last_price,
						),
						currency,
						8,
					)}
				</Text>
				<PriceLabel
					color={ticker.change >= 0 ? 'green' : 'red'}
					css={{ mt: '1px', p: '2px 4px 0px 4px', height: '15px' }}
				>
					<Text bold size="1">{`${ticker.change < 0 ? '' : '+'}${ticker.change.toFixed(2).toLocaleString()}%`}</Text>
				</PriceLabel>
			</Box>
		</Flex>
	)
}
