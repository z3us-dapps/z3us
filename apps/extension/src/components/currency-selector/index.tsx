import React from 'react'
import { useSharedStore } from '@src/store'
import { SelectBox } from 'ui/src/components/select'
import { useSupportedCurrencies } from '@src/services/react-query/queries/market'

export const CurrencySelector: React.FC = () => {
	const { currency, setCurrency } = useSharedStore(state => ({
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
