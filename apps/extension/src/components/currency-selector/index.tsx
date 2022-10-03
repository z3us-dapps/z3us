import React from 'react'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { useSupportedCurrencies } from '@src/hooks/react-query/queries/market'
import { SelectBox } from 'ui/src/components/select'

export const CurrencySelector: React.FC = () => {
	const { currency, setCurrency } = useNoneSharedStore(state => ({
		currency: state.currency,
		setCurrency: state.setCurrencyAction,
	}))
	const { data: currencies } = useSupportedCurrencies()

	return (
		<SelectBox
			defaultValue="usd"
			value={currency.toLowerCase()}
			onValueChange={setCurrency}
			buttonAriaLabel="select currency"
			selectLabel="Currencies"
			selectOptions={currencies?.map(curr => ({ value: curr, name: curr }))}
			selectNameFormatter={name => name.toUpperCase()}
		/>
	)
}
