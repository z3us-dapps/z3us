import { t } from 'i18next'
import { useBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import React, { forwardRef, useContext } from 'react'

import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

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

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { fromAccount, amountKey = 'amount', resourceKey = 'address', ...rest } = props
	const { name: parentName } = useContext(FieldContext)

	const { fungibleBalances = [], isLoading } = useBalances(fromAccount)
	const amount = useFieldValue(`${parentName}${parentName ? '.' : ''}${amountKey}`)
	const resource = useFieldValue(`${parentName}${parentName ? '.' : ''}${resourceKey}`)

	const selectedToken = fungibleBalances.find(b => b.address === resource)

	return (
		<Box disabled={!fromAccount || isLoading}>
			<NumberField
				{...rest}
				ref={ref}
				name={amountKey}
				placeholder={capitalizeFirstLetter(`${t('token_amount_select.amount')}`)}
				sizeVariant="large"
			/>
			<TokenSelect name={resourceKey} balances={fungibleBalances} />
			<CurrencySelect selectedToken={selectedToken} amount={amount} />
		</Box>
	)
})
