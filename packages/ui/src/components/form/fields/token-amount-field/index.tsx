import React, { forwardRef, useContext } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'

import { Box } from '../../../box'
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
		id: 'token_amount_select.amount.placeholder',
		defaultMessage: 'Amount',
	},
})

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const intl = useIntl()
	const { fromAccount, amountKey = 'amount', resourceKey = 'address', ...rest } = props
	const { name: parentName } = useContext(FieldContext)

	const { data: balanceData, isLoading } = useBalances(fromAccount)
	const { fungibleBalances = [] } = balanceData || {}
	const amount = useFieldValue(`${parentName}${parentName ? '.' : ''}${amountKey}`)
	const resource = useFieldValue(`${parentName}${parentName ? '.' : ''}${resourceKey}`)

	const selectedToken = fungibleBalances.find(b => b.address === resource)

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
			<CurrencySelect selectedToken={selectedToken} amount={amount} />
		</Box>
	)
})
