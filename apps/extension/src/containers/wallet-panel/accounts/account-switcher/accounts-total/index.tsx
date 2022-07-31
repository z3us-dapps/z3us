import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useAllAccountsValue } from '@src/hooks/react-query/queries/account'
import { useSharedStore, useStore } from '@src/store'
import { Flex, Box, Text } from 'ui/src/components/atoms'
import PriceTicker from 'ui/src/components/price-ticker'
import { formatBigNumber } from '@src/utils/formatters'

export const AccountsTotal = (): JSX.Element => {
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))
	const { activeSlideIndex } = useStore(state => ({
		activeSlideIndex: state.activeSlideIndex,
	}))
	const { isLoading, value, change } = useAllAccountsValue()
	const [state, setState] = useImmer({
		accountValue: '',
	})
	const accountPercentageChange = !value.isEqualTo(0)
		? `${change.isGreaterThan(0) ? '+' : ''}${change.div(value).multipliedBy(100).toFixed(2).toLocaleString()}%`
		: '0.00%'

	useEffect(() => {
		if (isLoading) return

		// NOTE: set to this value, to force the ticker animation
		setState(draft => {
			draft.accountValue = '$4.44'
		})
		setTimeout(() => {
			setState(draft => {
				draft.accountValue = formatBigNumber(value, currency, 2)
			})
		}, 200)
	}, [activeSlideIndex])

	return (
		<Flex
			align="center"
			justify="center"
			css={{
				border: '1px solid $borderPanel2',
				height: '100%',
				borderRadius: '14px',
				boxShadow: '$shadowPanel2',
				position: 'relative',
				'&::after': {
					content: '""',
					borderRadius: '12px',
					position: 'absolute',
					top: '0',
					bottom: '0',
					left: '0',
					right: '0',
					border: '2px solid #fff',
					pointerEvents: 'none',
				},
			}}
		>
			<Box css={{ textAlign: 'center' }}>
				<Text medium size="5" css={{ pb: '$1' }}>
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
					<PriceTicker value={state.accountValue} refresh={activeSlideIndex} />
				</Text>
				<Flex justify="center" css={{ mt: '4px' }}>
					<Text size="7">
						<PriceTicker value={accountPercentageChange} refresh={activeSlideIndex} />
					</Text>
				</Flex>
			</Box>
		</Flex>
	)
}
