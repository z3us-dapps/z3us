import React from 'react'
import { useSharedStore } from '@src/store'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectGroup,
	SelectItem,
	SelectIcon,
	SelectLabel,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
import Button from 'ui/src/components/button'
import { useSupportedCurrencies } from '@src/services/react-query/queries/market'

export const CurrencySelector: React.FC = () => {
	const { currency, setCurrency } = useSharedStore(state => ({
		currency: state.currency,
		setCurrency: state.setCurrencyAction,
	}))
	const { data: currencies } = useSupportedCurrencies()

	return (
		<Select defaultValue="USD" value={currency.toUpperCase()} onValueChange={setCurrency}>
			<SelectTrigger aria-label="Food" asChild>
				<Button color="input" size="4" fullWidth>
					<SelectValue />
					<SelectIcon>
						<ChevronDownIcon />
					</SelectIcon>
				</Button>
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUpButton>
					<ChevronUpIcon />
				</SelectScrollUpButton>
				<SelectViewport>
					<SelectGroup>
						<SelectLabel>Currencies</SelectLabel>
						{currencies?.map(cur => (
							<SelectItem key={cur} value={cur}>
								<SelectItemText>{cur.toUpperCase()}</SelectItemText>
								<SelectItemIndicator />
							</SelectItem>
						))}
					</SelectGroup>
				</SelectViewport>
				<SelectScrollDownButton>
					<ChevronDownIcon />
				</SelectScrollDownButton>
			</SelectContent>
		</Select>
	)
}
