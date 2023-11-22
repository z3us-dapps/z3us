import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import { SubmitButton } from 'ui/src/components/form/fields/submit-button'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useTokens } from 'ui/src/hooks/queries/oci'

const messages = defineMessages({
	account_placeholder: {
		defaultMessage: 'Select account',
		id: '0+6+jP',
	},
	button_submit: {
		id: 's8BnAC',
		defaultMessage: 'Swap',
	},
})

export const SwapFormFields: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)
	const { name: parentName } = useContext(FieldContext)

	const account = useFieldValue(`${parentName ? `${parentName}.` : ''}account`) || ''

	const { data: tokens } = useTokens()

	const { data: balanceData } = useBalances(account)
	const { fungibleBalances = [] } = balanceData || {}

	const source = useMemo(
		() => fungibleBalances.filter(b => !!tokens[b.address]).map(b => b.address),
		[balanceData, tokens],
	)
	const target = useMemo(() => Object.keys(tokens), [tokens])

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	return (
		<Box display="flex" flexDirection="column" gap="medium" alignItems="center" justifyContent="center">
			<AccountSelect placeholder={intl.formatMessage(messages.account_placeholder)} ref={inputRef} name="account" />
			<FieldsGroup name="from" defaultKeys={1} ignoreTriggers>
				<TokenAmountSelect balances={fungibleBalances} resourceAddresses={source} />
			</FieldsGroup>
			<FieldsGroup name="to" defaultKeys={1} ignoreTriggers>
				<TokenAmountSelect balances={fungibleBalances} resourceAddresses={target} />
			</FieldsGroup>
			<SubmitButton>
				<Button sizeVariant="large" styleVariant="primary" fullWidth>
					{intl.formatMessage(messages.button_submit)}
				</Button>
			</SubmitButton>
		</Box>
	)
}

export default SwapFormFields
