import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React, { forwardRef, useContext, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import type { ResourceBalanceKind } from 'ui/src/types'

import { FormContext } from '../../context'
import { type IProps as WrapperProps } from '../../field-wrapper'
import { FieldContext } from '../../field-wrapper/context'
import { useFieldValue } from '../../use-field-value'
import NumberField from '../number-field'
import { TokenSelect } from '../token-select'
import { CurrencySelect } from './components/currency-selector'
import * as styles from './styles.css'

const messages = defineMessages({
	amount_placeholder: {
		id: '/0TOL5',
		defaultMessage: 'Amount',
	},
	max_amount: {
		id: 'YhAIjG',
		defaultMessage: 'Balance: {amount, number, ::.00################}',
	},
	divisibility: {
		defaultMessage: 'Max allowed decimals: {divisibility, number}',
		id: 'uhlXE7',
	},
})

function fullWideNumber(x: number) {
	return x.toLocaleString('fullwide', { useGrouping: true, maximumSignificantDigits: 18 })
}

function countDecimals(value: number) {
	if (!value) return 0
	if (value % 1 === 0) return 0
	return fullWideNumber(value).split('.')[1].length
}

interface IProps extends Omit<WrapperProps, 'name'> {
	balances: ResourceBalanceKind[]
	resourceAddresses: string[]
	amountKey?: string
	resourceKey?: string
}

export const TokenAmountSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const intl = useIntl()
	const { resourceAddresses, balances, amountKey = 'amount', resourceKey = 'address', ...rest } = props
	const { onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)

	const amount = useFieldValue(`${parentName}${parentName ? '.' : ''}${amountKey}`)
	const resource = useFieldValue(`${parentName}${parentName ? '.' : ''}${resourceKey}`)

	const { data } = useEntityDetails(resource)
	const details = data?.details as StateEntityDetailsResponseFungibleResourceDetails

	const selectedToken = useMemo(
		() => resourceAddresses.find(resourceAddress => resourceAddress === resource),
		[resourceAddresses, resource],
	)
	const selectedTokenAmount = useMemo(
		() => balances.find(b => b.address === resource)?.amount || 0,
		[resourceAddresses, resource],
	)

	const handleMaxValue = () => {
		onFieldChange(`${parentName}${parentName ? '.' : ''}${amountKey}`, fullWideNumber(selectedTokenAmount))
	}

	const validateDivisibility = (v: string) => {
		if (countDecimals(+v) > details?.divisibility) {
			return intl.formatMessage(messages.divisibility, { divisibility: details?.divisibility })
		}
		return ''
	}

	return (
		<Box disabled={resourceAddresses.length === 0} position="relative">
			<NumberField
				{...rest}
				step={
					details?.divisibility > 0
						? `.${Array(details.divisibility - 1)
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
			<TokenSelect name={resourceKey} resourceAddresses={resourceAddresses} />
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
						{intl.formatMessage(messages.max_amount, { amount: selectedTokenAmount })}
					</Text>
				</Box>
				<CurrencySelect resourceAddress={selectedToken} amount={amount} />
			</Box>
		</Box>
	)
})
