import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { FormContext } from 'ui/src/components/form/context'
import { FieldContext } from 'ui/src/components/form/field-wrapper/context'
import { FieldsGroup } from 'ui/src/components/form/fields-group'
import { AccountSelect } from 'ui/src/components/form/fields/account-select'
import SelectField from 'ui/src/components/form/fields/select-field'
import TextField from 'ui/src/components/form/fields/text-field'
import { TokenAmountSelect } from 'ui/src/components/form/fields/token-amount-field'
import { useFieldValue } from 'ui/src/components/form/use-field-value'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { DECIMAL_STYLES, PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { DEX_ASTROLECENT, DEX_OCI, FEE_RATIO } from 'ui/src/constants/swap'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useTokens } from 'ui/src/hooks/queries/astrolescent'
import { findMetadataValue } from 'ui/src/services/metadata'

import { useAstrolecent } from '../hooks/use-astrolecent'
import { useOci } from '../hooks/use-oci'
import * as styles from '../styles.css'

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
	swap_lading_error: {
		defaultMessage: 'Swap preview is loading...',
		id: 'dgs4z4',
	},
	dex: {
		id: 'ifOb7y',
		defaultMessage: 'Dex',
	},
	dex_oci: {
		id: 'eyMKyf',
		defaultMessage: 'OCI',
	},
	dex_astrolecent: {
		id: 'CrAj8T',
		defaultMessage: 'Astrolecent',
	},
})

export const FormFields: React.FC = () => {
	const intl = useIntl()
	const inputRef = useRef(null)

	const supportedDexes = useMemo(
		() => [
			{
				id: DEX_OCI,
				title: intl.formatMessage(messages.dex_oci),
			},
			{
				id: DEX_ASTROLECENT,
				title: intl.formatMessage(messages.dex_astrolecent),
			},
		],
		[],
	)

	const { onFieldChange } = useContext(FormContext)
	const { name: parentName } = useContext(FieldContext)

	const dex = useFieldValue(`${parentName ? `${parentName}.` : ''}dex`)
	const account = useFieldValue(`${parentName ? `${parentName}.` : ''}account`) || ''
	const from = useFieldValue(`${parentName}${parentName ? '.' : ''}from[0]`)
	const to = useFieldValue(`${parentName}${parentName ? '.' : ''}to[0]`)

	const { data: tokens = {} } = useTokens()
	const { data: feeResource } = useEntityDetails(to?.address)
	const { fungibleBalances = [] } = useBalances([account])
	const symbol = findMetadataValue('symbol', feeResource?.metadata?.items)

	const source = useMemo(
		() => fungibleBalances.filter(b => !!tokens[b.address]).map(b => b.address),
		[fungibleBalances, tokens],
	)
	const target = useMemo(() => Object.keys(tokens), [tokens])
	const [side, setSide] = useState<'send' | 'receive'>('send')
	const swapAmount = useMemo(
		() => (side === 'send' ? Number.parseFloat(from?.amount || '0') : Number.parseFloat(to?.amount || '0')),
		[side, from, to],
	)
	const fee = useMemo(() => Number.parseFloat(to?.amount || '0') * FEE_RATIO, [to?.amount])

	const oci = useOci(dex, account, from?.address, to?.address, side, swapAmount)
	const astrolecent = useAstrolecent(dex, account, from?.address, to?.address, side, swapAmount)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [inputRef?.current])

	useEffect(() => {
		if (dex) return
		onFieldChange(`${parentName}${parentName ? '.' : ''}dex`, DEX_OCI)
	}, [dex])

	const {
		error,
		isFetching,
		priceImpact = 0,
		swapFee = 0,
	} = useMemo(() => {
		switch (dex) {
			case DEX_OCI:
				return oci
			case DEX_ASTROLECENT:
				return astrolecent
			default:
				return oci
		}
	}, [dex, oci, astrolecent])

	useEffect(() => {
		if (isFetching) {
			onFieldChange(`${parentName}${parentName ? '.' : ''}manifest`, '')
		}
	}, [isFetching])

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
				<SelectField
					name="dex"
					placeholder={intl.formatMessage(messages.dex)}
					sizeVariant="large"
					data={supportedDexes}
					fullWidth
					disabled={isFetching}
				/>
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

			<ValidationErrorMessage message={(error as any)?.message} />

			<Box className={styles.swapFormFeeWrapper}>
				{isFetching && <FallbackLoading />}
				{!isFetching && (
					<>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.price_impact)}</Text>}
							rightData={
								<ToolTip message={intl.formatMessage(messages.price_impact_info)}>
									<Box>
										<Text size="small" color="strong">
											{intl.formatNumber(priceImpact, PERCENTAGE_STYLES)}
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
									{intl.formatNumber(swapFee, DECIMAL_STYLES)} {symbol}
								</Text>
							}
						/>
					</>
				)}
			</Box>
		</Box>
	)
}

export default FormFields
