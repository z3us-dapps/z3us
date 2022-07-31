import React from 'react'
import { useTicker } from '@src/hooks/react-query/queries/tickers'
import { Text, Box, Flex } from 'ui/src/components/atoms'
import BigNumber from 'bignumber.js'
import PriceTicker from 'ui/src/components/price-ticker'
import PriceLabel from 'ui/src/components/price-label'
import LoaderBars from 'ui/src/components/loader-bars'
import { formatBigNumber } from '@src/utils/formatters'
import { useSharedStore } from '@src/store'

interface Props {
	symbol: string
	ammount: BigNumber
}

export const TokenPrice = ({ symbol, ammount }: Props): JSX.Element => {
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))
	const { isLoading, data: ticker } = useTicker(currency, symbol)
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
	const tokenPrice = formatBigNumber(new BigNumber(ticker.last_price), currency, 2)
	const accountTokenAmmount = formatBigNumber(ammount.multipliedBy(ticker.last_price), currency, 8)

	return (
		<Flex direction="column" align="center" css={{ minHeight: tokenPriceHeight }}>
			<Text size="8" bold css={{ pt: '2px' }}>
				<PriceTicker value={accountTokenAmmount} />
			</Text>
			<Flex align="center" css={{ mt: '$2' }}>
				<Text medium size="5" css={{ mr: '$2', mt: '-1px' }}>
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
