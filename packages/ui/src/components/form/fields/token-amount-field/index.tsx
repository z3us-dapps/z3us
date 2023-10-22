import clsx from 'clsx'
import React, { forwardRef, useContext } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'

import { FormContext } from '../../context'
import { type IProps as WrapperProps } from '../../field-wrapper'
import { FieldContext } from '../../field-wrapper/context'
import { useFieldValue } from '../../use-field-value'
import NumberField from '../number-field'
import { TokenSelect } from '../token-select'
import { CurrencySelect } from './components/currency-selector'
import * as styles from './styles.css'

interface IProps extends Omit<WrapperProps, 'name'> {
	fromAccount?: string
	amountKey?: string
	resourceKey?: string
}

const messages = defineMessages({
	amount_placeholder: {
		id: '/0TOL5',
		defaultMessage: 'Amount',
	},
	max_amount: {
		id: 'sg1Uvs',
		defaultMessage: 'Balance: {amount, number, ::.00#######}',
	},
	divisibility: {
		defaultMessage: 'Max allowed decimals: {divisibility, number}',
		id: 'uhlXE7',
	},
})

function countDecimals(value: number) {
	if (!value) return 0
	if (value % 1 === 0) return 0
	return value.toString().split('.')[1].length
}

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const intl = useIntl()
	const { fromAccount, amountKey = 'amount', resourceKey = 'address', ...rest } = props
	const { onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)

	const { data: balanceData, isLoading } = useBalances(fromAccount)
	const { fungibleBalances = [] } = balanceData || {}
	const amount = useFieldValue(`${parentName}${parentName ? '.' : ''}${amountKey}`)
	const resource = useFieldValue(`${parentName}${parentName ? '.' : ''}${resourceKey}`)

	const { data } = useEntityDetails(resource)

	const selectedToken = fungibleBalances.find(b => b.address === resource)

	const handleMaxValue = () => {
		onFieldChange(`${parentName}${parentName ? '.' : ''}${amountKey}`, selectedToken?.amount || 0)
	}

	const validateDivisibility = (v: string) => {
		if (countDecimals(+v) > data?.details?.divisibility) {
			return intl.formatMessage(messages.divisibility, { divisibility: data?.details?.divisibility })
		}
		return ''
	}

	return (
		<Box disabled={!fromAccount || isLoading} position="relative">
			<NumberField
				{...rest}
				step={
					data?.details?.divisibility > 0
						? `.${Array(data.details.divisibility - 1)
								.fill('0')
								.join('')}1`
						: '1'
				}
				ref={ref}
				name={amountKey}
				placeholder={intl.formatMessage(messages.amount_placeholder)}
				sizeVariant="large"
				validate={validateDivisibility}
			/>
			<TokenSelect name={resourceKey} balances={fungibleBalances} />
			<Box
				display="flex"
				justifyContent="space-between"
				flexGrow={1}
				flexShrink={0}
				alignItems="center"
				paddingTop="xsmall"
			>
				<Box
					component="button"
					display="inline-flex"
					alignItems="center"
					onClick={handleMaxValue}
					className={clsx(
						plainButtonStyles.plainButtonHoverWrapper,
						plainButtonStyles.plainButtonHoverUnderlineWrapper,
						styles.maxButtonWrapper,
					)}
				>
					<Text color="inherit" size="small" truncate>
						{intl.formatMessage(messages.max_amount, { amount: selectedToken?.amount || 0 })}
					</Text>
				</Box>
				<CurrencySelect selectedToken={selectedToken} amount={amount} />
			</Box>
		</Box>
	)
})
