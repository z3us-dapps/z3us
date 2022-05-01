import React from 'react'
import { useUSDTicker } from '@src/services/react-query/queries/bitfinex'
import { Text, Box, Flex } from 'ui/src/components/atoms'
import BigNumber from 'bignumber.js'
import PriceTicker from 'ui/src/components/price-ticker'
import PriceLabel from 'ui/src/components/price-label'
import LoaderBars from 'ui/src/components/loader-bars'
import { formatBigNumber } from '@src/utils/formatters'

interface Props {
	symbol: string
	ammount: BigNumber
}

export const TokenPrice = ({ symbol, ammount }: Props): JSX.Element => {
	const { isLoading, data: ticker } = useUSDTicker(symbol)
	const tokenPriceHeight = '70px'

	if (isLoading) {
		return (
			<Box css={{ minHeight: tokenPriceHeight }}>
				<LoaderBars />
			</Box>
		)
	}

	if (!ticker) {
		return <Box css={{ minHeight: tokenPriceHeight }} />
	}

	const tokenPercentageChange = `${ticker.change < 0 ? '' : '+'}${ticker.change.toFixed(2).toLocaleString()}%`
	const tokenPrice = formatBigNumber(new BigNumber(ticker.last_price), 'USD', 2)
	const accountTokenAmmount = formatBigNumber(ammount.multipliedBy(ticker.last_price), 'USD', 2)

	return (
		<Flex direction="column" align="center" css={{ minHeight: tokenPriceHeight }}>
			<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800', pt: '2px' }}>
				<PriceTicker value={accountTokenAmmount} />
			</Text>
			<Flex align="center" css={{ mt: '$2' }}>
				<Text bold size="4" css={{ mr: '$2', mt: '-1px' }}>
					{tokenPrice}
				</Text>
				<PriceLabel color={ticker.change > 0 ? 'green' : 'red'}>
					<Text size="2" bold>
						{tokenPercentageChange}
					</Text>
				</PriceLabel>
			</Flex>
		</Flex>
	)
}
