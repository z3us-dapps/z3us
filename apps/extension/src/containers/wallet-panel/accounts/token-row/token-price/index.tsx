import BigNumber from 'bignumber.js'
import React from 'react'

import { Box, Flex, Text } from 'ui/src/components/atoms'
import PriceLabel from 'ui/src/components/price-label'

import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { formatBigNumber } from '@src/utils/formatters'

interface Props {
	symbol: string
	amount: string | BigNumber
}

export const TokenPrice = ({ symbol, amount }: Props): JSX.Element => {
	const { currency } = useNoneSharedStore(state => ({
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
			<Box css={{ textAlign: 'right', mt: '12px', position: 'relative' }}>
				<Text
					truncate
					css={{
						fontSize: '13px',
						lineHeight: '20px',
						fontWeight: '700',
						position: 'absolute',
						top: '0',
						right: '0',
						maxWidth: '130px',
					}}
				>
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
					css={{ p: '2px 4px 0px 4px', height: '15px', mt: '23px' }}
				>
					<Text bold size="1">{`${ticker.change < 0 ? '' : '+'}${ticker.change.toFixed(2).toLocaleString()}%`}</Text>
				</PriceLabel>
			</Box>
		</Flex>
	)
}
