import React from 'react'
import { useAllAccountsValue } from '@src/services/react-query/queries/account'
import { Flex, Box, Text } from 'ui/src/components/atoms'
import PriceTicker from 'ui/src/components/price-ticker'
import PriceLabel from 'ui/src/components/price-label'
import { formatBigNumber } from '@src/utils/formatters'

export const AccountsTotal = (): JSX.Element => {
	const { isLoading, value, change } = useAllAccountsValue()
	const accountValue = formatBigNumber(value, 'USD', 2)
	const accountPercentageChange = !value.isEqualTo(0)
		? `${change.isGreaterThan(0) ? '+' : ''}${change.div(value).multipliedBy(100).toFixed(2).toLocaleString()}%`
		: '0.00%'

	return (
		<Flex
			align="center"
			justify="center"
			css={{ border: '1px solid $borderPanel2', height: '100%', borderRadius: '14px', boxShadow: '$shadowPanel2' }}
		>
			<Box css={{ textAlign: 'center' }}>
				<Text size="5" css={{ pb: '$1' }}>
					Total balance
				</Text>
				<Text
					bold
					as="h2"
					css={{
						fontSize: '32px',
						lineHeight: '38px',
						transition: '$default',
					}}
				>
					<PriceTicker value={accountValue} />
				</Text>
				<PriceLabel
					color={change.isGreaterThan(0) ? 'greenContrast' : 'redContrast'}
					css={{
						opacity: !isLoading ? '1' : '0',
						transition: '$default',
					}}
				>
					<Text size="2" bold>
						<PriceTicker value={accountPercentageChange} />
					</Text>
				</PriceLabel>
			</Box>
		</Flex>
	)
}
