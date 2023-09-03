import { t } from 'i18next'
import get from 'lodash/get'
import { useFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import React, { forwardRef, useContext } from 'react'

import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Box } from '../../../box'
import { FieldContext } from '../../field-wrapper/context'
import { FormContext } from '../../context'
import { type IProps as WrapperProps } from '../../field-wrapper'
import NumberField from '../number-field'
import { TokenSelect } from '../token-select'
import { CurrencySelect } from './components/currency-selector'

interface IProps extends Omit<WrapperProps, 'name'> {
	accountKey?: string
	amountKey?: string
	resourceKey?: string
}

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { accountKey, amountKey = 'amount', resourceKey = 'address', ...rest } = props
	const { form } = useContext<any>(FormContext)
	const { name: parentName } = useContext(FieldContext)
	const { balances = [], isLoading } = useFungibleResourceBalances(form[accountKey])

	const amount = get(form, `${parentName}${parentName ? '.' : ''}${amountKey}`)
	const resource = get(form, `${parentName}${parentName ? '.' : ''}${resourceKey}`)
	const selectedToken = balances.find(b => b.address === resource)

	return (
		<Box disabled={!form.from || isLoading}>
			<NumberField
				{...rest}
				ref={ref}
				name="amount"
				placeholder={capitalizeFirstLetter(`${t('token_amount_field.transactionManifest')}`)}
				sizeVariant="large"
			/>
			<TokenSelect name="address" balances={balances} />
			<CurrencySelect selectedToken={selectedToken} amount={amount} />
		</Box>
	)
})
