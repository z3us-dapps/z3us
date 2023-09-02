import { t } from 'i18next'
import { useFungibleResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import React, { forwardRef, useContext } from 'react'

import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Box } from '../../../box'
import { FormContext } from '../../context'
import { type IProps as WrapperProps } from '../../field-wrapper'
import NumberField from '../number-field'
import { TokenSelect } from '../token-select'
import { CurrencySelect } from './components/currency-selector'

interface IProps extends WrapperProps {
	accountKey?: string
}

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>(
	({ accountKey, name, parentName, ...rest }, ref) => {
		const { form } = useContext<any>(FormContext)
		const { balances = [], isLoading } = useFungibleResourceBalances(form[accountKey])

		const amount = form[`${parentName ? `${parentName}.` : ``}${name}.amount`]
		const resource = form[`${parentName ? `${parentName}.` : ``}${name}.address`]
		const selectedToken = balances.find(b => b.address === resource)

		return (
			<Box disabled={!form.from || isLoading}>
				<NumberField
					{...rest}
					ref={ref}
					name="amount"
					parentName={parentName}
					placeholder={capitalizeFirstLetter(`${t('token_amount_field.transactionManifest')}`)}
					sizeVariant="large"
				/>
				<TokenSelect name="address" balances={balances} />
				<CurrencySelect selectedToken={selectedToken} amount={amount} />
			</Box>
		)
	},
)
