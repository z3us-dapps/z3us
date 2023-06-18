/* eslint-disable */
import React from 'react'

import { SelectSimple as SelectBox } from 'ui/src/components/select'

import { useSupportedCurrencies } from '@src/hooks/queries/market'
import { useNoneSharedStore } from '@src/hooks/use-store'

export const CurrencySelector: React.FC = () => {
	const { currency, setCurrency } = useNoneSharedStore(state => ({
		currency: state.currency,
		setCurrency: state.setCurrencyAction,
	}))
	const { data: currencies } = useSupportedCurrencies()

	return <div>select</div>

	// return (
	// 	<SelectBox
	// 		defaultValue="usd"
	// 		value={currency.toLowerCase()}
	// 		onValueChange={setCurrency}
	// 		buttonAriaLabel="select currency"
	// 		selectLabel="Currencies"
	// 		selectOptions={currencies?.map(c => ({ value: c, name: c }))}
	// 		selectNameFormatter={name => name.toUpperCase()}
	// 	/>
	// )
}
