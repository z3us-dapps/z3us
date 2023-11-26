import clsx from 'clsx'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

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
import { Text } from 'ui/src/components/typography'
import { FAVORITE_CURRENCIES } from 'ui/src/constants/currency'
import { useSupportedCurrencies } from 'ui/src/hooks/queries/coingecko'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { CURRENCY } from 'ui/src/store/types'

interface IProps {
	resourceAddress: string
	amount: number
}

const messages = defineMessages({
	favorite: {
		id: '5Hzwqs',
		defaultMessage: 'Favorite',
	},
	reset: {
		id: 'jm/spn',
		defaultMessage: 'Reset',
	},
	label: {
		id: '55hdQy',
		defaultMessage: 'Currency',
	},
})

export const CurrencySelect: React.FC<IProps> = ({ resourceAddress, amount }) => {
	const intl = useIntl()
	const { data: currencies } = useSupportedCurrencies()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const [selectedCurrency, setCurrency] = useState<string>(currency)

	return (
		<SelectRoot value={selectedCurrency} onValueChange={setCurrency}>
			<SelectTrigger asChild aria-label={intl.formatMessage(messages.label)}>
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
						<Text truncate size="small" color="inherit">
							<Box display="flex">
								{resourceAddress && (
									<Box component="span">
										<TokenPrice address={resourceAddress} amount={amount} currency={currency} />
										&nbsp;
									</Box>
								)}
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
							{intl.formatMessage(messages.favorite)}
						</Text>
					</SelectLabel>
					{FAVORITE_CURRENCIES?.map(c => (
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
						<Text size="small">{intl.formatMessage(messages.reset)}</Text>
					</SelectLabel>
					{currencies?.map(c =>
						FAVORITE_CURRENCIES.includes(c.toUpperCase() as CURRENCY) ? null : (
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
