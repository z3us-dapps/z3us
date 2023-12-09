import { ToolTip } from 'packages/ui/src/components/tool-tip'
import { Text } from 'packages/ui/src/components/typography'
import { DECIMAL_STYLES, PERCENTAGE_STYLES } from 'packages/ui/src/constants/number'
import { useEntityMetadata } from 'packages/ui/src/hooks/dapp/use-entity-metadata'
import { findMetadataValue } from 'packages/ui/src/services/metadata'
import { generateId } from 'packages/ui/src/utils/generate-id'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FormContext } from 'ui/src/components/form/context'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import TextField from 'ui/src/components/form/fields/text-field'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { FEE_RATIO } from 'ui/src/constants/swap'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSwapPreview, useTokens } from 'ui/src/hooks/queries/oci'
import type { SwapPreview } from 'ui/src/services/oci'

const messages = defineMessages({
	fee_wallet: {
		id: 'PyXtpD',
		defaultMessage: 'Wallet fee',
	},
	fee_lp: {
		id: 'OS5a2i',
		defaultMessage: 'Pool fee',
	},
	price_impact: {
		id: 'WBB92z',
		defaultMessage: 'Price impact',
	},
	price_impact_info: {
		id: 'MoWYiJ',
		defaultMessage: `Price impact is the influence of user&apos;s individual trade over the market price of an underlying asset pair. It is directly correlated with the amount of liquidity in the pool. Price impact can be especially high for illiquid markets/pairs, and may cause a trader to lose a significant portion of their funds.`,
	},
	account_placeholder: {
		defaultMessage: 'Select account',
		id: '0+6+jP',
	},
})

export const FormFields: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const { onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)

	const account = useFieldValue(`${parentName ? `${parentName}.` : ''}account`) || ''
	const from = useFieldValue(`${parentName}${parentName ? '.' : ''}from[0]`)
	const to = useFieldValue(`${parentName}${parentName ? '.' : ''}to[0]`)

	const [side, setSide] = useState<'send' | 'receive'>('send')
	const swapAmount = useMemo(
		() => (side === 'send' ? Number.parseFloat(from?.amount || '0') : Number.parseFloat(to?.amount || '0')),
		[from, to],
	)
	const fee = useMemo(() => swapAmount * FEE_RATIO, [swapAmount])

	const { data: tokens = {} } = useTokens()
	const { data: feeResource } = useEntityMetadata(from?.address)
	const { data: balanceData } = useBalances(account)
	const { data: preview, error: previewError } = useSwapPreview(from?.address, to?.address, side, swapAmount)

	const { fungibleBalances = [] } = balanceData || {}
	const symbol = findMetadataValue('symbol', feeResource)

	const source = useMemo(
		() => fungibleBalances.filter(b => !!tokens[b.address]).map(b => b.address),
		[balanceData, tokens],
	)
	const target = useMemo(() => Object.keys(tokens), [tokens])

	useEffect(() => {
		onFieldChange(`${parentName}${parentName ? '.' : ''}dex`, 'oci')
	}, [onFieldChange])

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	useEffect(() => {
		if (!preview) return
		const s = preview.input_address === from?.address ? 'send' : 'receive'
		setSide(s)

		const fromKey = side === 'send' ? 'input' : 'output'
		if (s === 'send') {
			const toKey = side === 'send' ? 'output' : 'input'
			onFieldChange(`${parentName}${parentName ? '.' : ''}to[0].amount`, preview[`${toKey}_amount`].token)
		} else {
			onFieldChange(
				`${parentName}${parentName ? '.' : ''}from[0].amount`,
				(Number.parseFloat(preview[`${fromKey}_amount`].token) * (1 + FEE_RATIO)).toString(),
			)
		}

		const bucketId = generateId()
		const transactionManifest = preview.swaps.reduce(
			(manifest, swap) => `
		${manifest}
			CALL_METHOD
				Address("${account}")
				"withdraw"
				Address("${swap[`${fromKey}_address`]}")
				Decimal("${Number.parseFloat(swap[`${fromKey}_amount`].token) * (1 + FEE_RATIO)}")
			;
			TAKE_ALL_FROM_WORKTOP
				Address("${swap[`${fromKey}_address`]}")
				Bucket("bucket${bucketId}")
			;
			CALL_METHOD
				Address("${swap.pool_address}")
				"swap"
				Bucket("bucket${bucketId}")
			;
			CALL_METHOD
				Address("${account}")
				"deposit_batch"
				Expression("ENTIRE_WORKTOP")
			;
		`,
			'',
		)

		onFieldChange(`${parentName}${parentName ? '.' : ''}manifest`, transactionManifest)
	}, [preview])

	return (
		<Box width="full">
			<ValidationErrorMessage message={(previewError as any)?.message} />
			<Box display="flex" flexDirection="column" gap="medium" alignItems="center" justifyContent="center">
				<TextField name="dex" hidden />
				<TextField name="manifest" hidden />
				<AccountSelect placeholder={intl.formatMessage(messages.account_placeholder)} ref={inputRef} name="account" />
				<FieldsGroup name="from" defaultKeys={1} ignoreTriggers>
					<TokenAmountSelect balances={fungibleBalances} resourceAddresses={source} />
				</FieldsGroup>
				<FieldsGroup name="to" defaultKeys={1} ignoreTriggers>
					<TokenAmountSelect balances={fungibleBalances} resourceAddresses={target} />
				</FieldsGroup>
			</Box>

			{preview && (
				<Box>
					<AccountsTransactionInfo
						leftTitle={<Text size="small">{intl.formatMessage(messages.price_impact)}</Text>}
						rightData={
							<ToolTip message={intl.formatMessage(messages.price_impact_info)}>
								<Box>
									<Text size="small" color="strong">
										{intl.formatNumber(Number.parseFloat(preview.price_impact), PERCENTAGE_STYLES)}
									</Text>
								</Box>
							</ToolTip>
						}
					/>
					<AccountsTransactionInfo
						leftTitle={<Text size="small">{intl.formatMessage(messages.fee_wallet)}</Text>}
						rightData={
							<Text size="small" color="strong">
								{intl.formatNumber(fee, DECIMAL_STYLES)} {symbol}
							</Text>
						}
					/>
					<AccountsTransactionInfo
						leftTitle={<Text size="small">{intl.formatMessage(messages.fee_lp)}</Text>}
						rightData={
							<Text size="small" color="strong">
								{intl.formatNumber(Number.parseFloat(preview.input_fee_lp.token), DECIMAL_STYLES)} {symbol}
							</Text>
						}
					/>
				</Box>
			)}
		</Box>
	)
}

export default FormFields
