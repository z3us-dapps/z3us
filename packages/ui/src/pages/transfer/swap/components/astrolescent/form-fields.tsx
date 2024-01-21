import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
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
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { DAPP_ADDRESS } from 'ui/src/constants/dapp'
import { DECIMAL_STYLES, PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { FEE_RATIO } from 'ui/src/constants/swap'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useSwapPreview, useTokens } from 'ui/src/hooks/queries/astrolescent'
import { findMetadataValue } from 'ui/src/services/metadata'
import { generateId } from 'ui/src/utils/generate-id'

import * as styles from '../../styles.css'

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

	const { data: tokens = {} } = useTokens()
	const { data: feeResource } = useEntityDetails(to?.address)
	const { data: balanceData } = useBalances([account])

	const { fungibleBalances = [] } = balanceData || {}
	const symbol = findMetadataValue('symbol', feeResource?.metadata?.items)

	const source = useMemo(
		() => fungibleBalances.filter(b => !!tokens[b.address]).map(b => b.address),
		[balanceData, tokens],
	)
	const target = useMemo(() => Object.keys(tokens), [tokens])
	const [side, setSide] = useState<'send' | 'receive'>('send')
	const swapAmount = useMemo(
		() => (side === 'send' ? Number.parseFloat(from?.amount || '0') : Number.parseFloat(to?.amount || '0')),
		[side, from, to],
	)
	const fee = useMemo(() => Number.parseFloat(to?.amount || '0') * FEE_RATIO, [to?.amount])

	const { data: preview, error: previewError } = useSwapPreview(account, from?.address, to?.address, side, swapAmount)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	useEffect(() => {
		onFieldChange(`${parentName}${parentName ? '.' : ''}dex`, 'astrolecent')
	}, [onFieldChange])

	useEffect(() => {
		if (!preview) return

		if (side === 'send') {
			onFieldChange(
				`${parentName}${parentName ? '.' : ''}to[0].amount`,
				(preview.outputTokens * (1 - FEE_RATIO)).toString(),
			)
		} else {
			onFieldChange(`${parentName}${parentName ? '.' : ''}from[0].amount`, preview.inputTokens.toString())
		}

		const { divisibility } = feeResource.details as StateEntityDetailsResponseFungibleResourceDetails
		const bucketId = generateId()
		const feeInstructions = `
			TAKE_FROM_WORKTOP
				Address("${to.address}")
				Decimal("${(preview.outputTokens * FEE_RATIO).toFixed(divisibility)}")
				Bucket("fee_bucket${bucketId}")
			;
			CALL_METHOD
				Address("${DAPP_ADDRESS}")
				"try_deposit_or_abort"
				Bucket("fee_bucket${bucketId}")
				Enum<0u8>()
			;
		`

		const idx = preview.manifest.lastIndexOf('CALL_METHOD')
		const transactionManifest = `${preview.manifest.substring(
			0,
			idx,
		)}\n${feeInstructions}\n${preview.manifest.substring(idx)}`

		onFieldChange(`${parentName}${parentName ? '.' : ''}manifest`, transactionManifest)
	}, [preview])

	const handleFromAmountChange = () => {
		setSide('send')
	}

	const handleToAmountChange = () => {
		setSide('receive')
	}

	return (
		<Box width="full">
			<Box className={styles.swapFormFieldWrapper}>
				<TextField name="dex" hidden />
				<TextField name="manifest" hidden />
				<AccountSelect placeholder={intl.formatMessage(messages.account_placeholder)} ref={inputRef} name="account" />
				<FieldsGroup name="from" defaultKeys={1} ignoreTriggers>
					<TokenAmountSelect
						balances={fungibleBalances}
						resourceAddresses={source}
						onAmountChange={handleFromAmountChange}
					/>
				</FieldsGroup>
				<FieldsGroup name="to" defaultKeys={1} ignoreTriggers>
					<TokenAmountSelect
						disabledAmount
						balances={fungibleBalances}
						resourceAddresses={target}
						onAmountChange={handleToAmountChange}
					/>
				</FieldsGroup>
			</Box>

			<ValidationErrorMessage message={(previewError as any)?.message} />

			{preview && (
				<Box width="full">
					<AccountsTransactionInfo
						leftTitle={<Text size="small">{intl.formatMessage(messages.price_impact)}</Text>}
						rightData={
							<ToolTip message={intl.formatMessage(messages.price_impact_info)}>
								<Box>
									<Text size="small" color="strong">
										{intl.formatNumber(preview.priceImpact, PERCENTAGE_STYLES)}
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
								{intl.formatNumber(preview.swapFee, DECIMAL_STYLES)} {symbol}
							</Text>
						}
					/>
				</Box>
			)}
		</Box>
	)
}

export default FormFields
