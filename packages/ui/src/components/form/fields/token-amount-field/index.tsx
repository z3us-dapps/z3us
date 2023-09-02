import { t } from 'i18next'
import React, { forwardRef, useContext } from 'react'

import type { ResourceBalance } from 'ui/src/types/types'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { FormContext } from '../../context'
import { type IProps as WrapperProps } from '../../field-wrapper'
import NumberField from '../number-field'
import { TokenSelect } from '../token-select'
import { CurrencySelect } from './components/currency-selector'

interface IProps extends WrapperProps {
	balances: ResourceBalance[]
}

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>(
	({ balances, name, parentName, ...rest }, ref) => {
		const { form } = useContext(FormContext)

		const amount = form[`${parentName ? `${parentName}.` : ``}${name}.amount`]
		const resource = form[`${parentName ? `${parentName}.` : ``}${name}.address`]
		const selectedToken = balances.find(b => b.address === resource)

		return (
			<>
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
			</>
		)
	},
)
