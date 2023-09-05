import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { ChevronDown2Icon } from 'ui/src/components/icons'
import {
	SelectContent,
	SelectGroup,
	SelectIcon,
	SelectItem,
	SelectLabel,
	SelectRoot,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from 'ui/src/components/select'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { TokenPrice } from 'ui/src/components/token-price'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSupportedCurrencies } from 'ui/src/hooks/queries/market'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ResourceBalanceKind } from 'ui/src/types/types'

interface IProps {
	selectedToken: ResourceBalanceKind
	amount: number
}

const favoriteCurrencies = ['usd', 'eur', 'btc']

export const CurrencySelect: React.FC<IProps> = ({ selectedToken, amount }) => {
	const { data: currencies } = useSupportedCurrencies()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const [selectedCurrency, setCurrency] = useState<string>(currency)

	return (
		<SelectRoot value={selectedCurrency} onValueChange={setCurrency}>
			<SelectTrigger asChild aria-label="Currency">
				<Box
					component="button"
					display="inline-flex"
					alignItems="center"
					className={clsx(
						plainButtonStyles.plainButtonHoverWrapper,
						plainButtonStyles.plainButtonHoverUnderlineWrapper,
					)}
				>
					<SelectValue aria-label={selectedCurrency}>
						<Text truncate size="small">
							<Box display="flex">
								<Box component="span">
									<TokenPrice
										symbol={selectedToken?.symbol || selectedToken?.name}
										amount={new BigNumber(amount || 0)}
										currency={currency}
									/>
									&nbsp;
								</Box>
								<Box component="span" style={{ textTransform: 'uppercase' }}>
									{selectedCurrency}
								</Box>
							</Box>
						</Text>
					</SelectValue>
					<SelectIcon style={{ height: '24px' }}>
						<ChevronDown2Icon />
					</SelectIcon>
				</Box>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>
						<Text truncate size="small">
							<Translation capitalizeFirstLetter text="currency_select.favorite" />
						</Text>
					</SelectLabel>
					{favoriteCurrencies?.map(c => (
						<SelectItem key={c} value={c}>
							<Text truncate size="small" color="strong">
								{c.toUpperCase()}
							</Text>
						</SelectItem>
					))}
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>
						<Text size="small">
							<Translation capitalizeFirstLetter text="currency_select.reset" />
						</Text>
					</SelectLabel>
					{currencies?.map(c =>
						favoriteCurrencies.includes(c) ? null : (
							<SelectItem key={c} value={c}>
								<Text truncate size="small" color="strong">
									{c.toUpperCase()}
								</Text>
							</SelectItem>
						),
					)}
				</SelectGroup>
			</SelectContent>
		</SelectRoot>
	)
}
