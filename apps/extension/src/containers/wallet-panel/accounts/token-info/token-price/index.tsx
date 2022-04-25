import React from 'react'
import { useUSDTicker } from '@src/services/react-query/queries/bitfinex'
import { Text, Box, Flex } from 'ui/src/components/atoms'
import BigNumber from 'bignumber.js'
import { formatBigNumber } from '@src/utils/formatters'

interface Props {
	symbol: string
	ammount: BigNumber
}

export const TokenPrice = ({ symbol, ammount }: Props): JSX.Element => {
	const { isLoading, data: ticker } = useUSDTicker(symbol)

	if (isLoading) {
		return <Box css={{ minHeight: '70px' }} />
	}
	if (!ticker) {
		return <Box css={{ minHeight: '70px' }} />
	}

	return (
		<Flex direction="column" align="center" css={{ minHeight: '70px' }}>
			<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800', pt: '2px' }}>
				{formatBigNumber(ammount.multipliedBy(ticker.last_price), 'USD', 2)}
			</Text>

			<Flex align="center" css={{ mt: '$1' }}>
				<Text size="3" css={{ mr: '$2' }}>
					{formatBigNumber(new BigNumber(ticker.last_price), 'USD', 2)}
				</Text>
				<Flex align="center" css={{ bg: '$buttonBgInverse', height: '26px', px: '6px', br: '$2', pb: '1px' }}>
					<Text
						medium
						size="4"
						css={{
							color: ticker.change > 0 ? '$txtPriceGreen' : '$txtPriceRed',
						}}
					>{`${ticker.change < 0 ? '' : '+'}${ticker.change.toFixed(2).toLocaleString()}%`}</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}
