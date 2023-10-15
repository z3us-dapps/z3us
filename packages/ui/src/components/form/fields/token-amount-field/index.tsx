import React, { forwardRef, useContext } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'

import { FormContext } from '../../context'
import { type IProps as WrapperProps } from '../../field-wrapper'
import { FieldContext } from '../../field-wrapper/context'
import { useFieldValue } from '../../use-field-value'
import NumberField from '../number-field'
import { TokenSelect } from '../token-select'
import { CurrencySelect } from './components/currency-selector'

interface IProps extends Omit<WrapperProps, 'name'> {
	fromAccount?: string
	amountKey?: string
	resourceKey?: string
}

const messages = defineMessages({
	amount_placeholder: {
		defaultMessage: 'Amount',
	},
	max_amount: {
		defaultMessage: 'Balance: {amount, number, ::.00#######}',
	},
})

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const intl = useIntl()
	const { fromAccount, amountKey = 'amount', resourceKey = 'address', ...rest } = props
	const { onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)

	const { data: balanceData, isLoading } = useBalances(fromAccount)
	const { fungibleBalances = [] } = balanceData || {}
	const amount = useFieldValue(`${parentName}${parentName ? '.' : ''}${amountKey}`)
	const resource = useFieldValue(`${parentName}${parentName ? '.' : ''}${resourceKey}`)

	const selectedToken = fungibleBalances.find(b => b.address === resource)

	const handleMaxValue = () => {
		onFieldChange(`${parentName}${parentName ? '.' : ''}${amountKey}`, selectedToken?.amount || 0)
	}

	return (
		<Box disabled={!fromAccount || isLoading}>
			<NumberField
				{...rest}
				ref={ref}
				name={amountKey}
				placeholder={intl.formatMessage(messages.amount_placeholder)}
				sizeVariant="large"
			/>
			<TokenSelect name={resourceKey} balances={fungibleBalances} />
			<Box marginLeft="small" display="flex" justifyContent="space-between" flexGrow={1} flexShrink={0}>
				<Button styleVariant="ghost" sizeVariant="small" onClick={handleMaxValue}>
					{intl.formatMessage(messages.max_amount, { amount: selectedToken?.amount || 0 })}
				</Button>
				<CurrencySelect selectedToken={selectedToken} amount={amount} />
			</Box>
		</Box>
	)
})
