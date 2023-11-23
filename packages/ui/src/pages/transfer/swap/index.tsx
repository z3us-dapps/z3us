import { ToolTip } from 'packages/ui/src/components/tool-tip'
import { Text } from 'packages/ui/src/components/typography'
import { useEntityMetadata } from 'packages/ui/src/hooks/dapp/use-entity-metadata'
import { findMetadataValue } from 'packages/ui/src/services/metadata'
import React, { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { ZodError } from 'zod'
import { z } from 'zod'

import { Box } from 'ui/src/components/box'
import { Form } from 'ui/src/components/form'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { FEE_RATIO } from 'ui/src/constants/swap'
import { useSwapPreview } from 'ui/src/hooks/queries/oci'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'
import type { SwapPreview } from 'ui/src/services/oci'

import SwapFormFields from './components/swap-form-fields'

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
	validation_token_required: {
		id: 'IXFNmv',
		defaultMessage: 'Resource is required',
	},
	validation_token: {
		id: 'gO3ocF',
		defaultMessage: 'Please select token',
	},
	validation_amount_required: {
		id: 'jU3fsF',
		defaultMessage: 'Amount is required',
	},
	validation_amount: {
		id: 'FrNeCi',
		defaultMessage: 'Please enter a valid amount',
	},
	validation_account: {
		id: 'w2XWRt',
		defaultMessage: 'Please select account',
	},
	error_toast: {
		id: 'fjqZcw',
		defaultMessage: 'Failed submitting transaction to the network',
	},
	success_toast: {
		id: 'Gkt0d0',
		defaultMessage: 'Successfully submitted transaction to the network',
	},
	toast_action_label: {
		id: 'K7AkdL',
		defaultMessage: 'Show',
	},
})

const init = {
	account: '',
	from: [{ address: '', amount: 0 }],
	to: [{ address: '', amount: 0 }],
}

type SwapSettings = {
	from: string
	to: string
	side: 'send' | 'receive'
	amount: number
	fee: number
}

function getSwapSettingsFromFormValues(old: typeof init, values: typeof init): SwapSettings {
	const side = old.to[0].amount !== values.to[0].amount ? 'receive' : 'send'
	const amount = side === 'send' ? values.from[0].amount : values.to[0].amount
	const fee = amount * FEE_RATIO

	return {
		from: values.from[0].address,
		to: values.to[0].address,
		side,
		amount: amount + fee,
		fee,
	}
}

function getFormValuesFromPreview(settings: SwapSettings, values: typeof init, preview: SwapPreview): typeof init {
	const fromKey = settings.side === 'send' ? 'input' : 'output'
	const toKey = settings.side === 'send' ? 'output' : 'input'
	return {
		account: values.account,
		from: [{ address: preview[`${fromKey}_address`], amount: Number.parseFloat(preview[`${fromKey}_amount`].token) }],
		to: [{ address: preview[`${toKey}_address`], amount: Number.parseFloat(preview[`${toKey}_amount`].token) }],
	}
}

export const Swap: React.FC = () => {
	const intl = useIntl()
	const sendTransaction = useSendTransaction()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const [formValues, setFormValues] = useState<typeof init>(init)
	const [localValues, setLocalValues] = useState<typeof init>(init)
	const [swap, setSwap] = useState<SwapSettings>(getSwapSettingsFromFormValues(formValues, formValues))
	const [validation, setValidation] = useState<ZodError>()

	const { data: preview, error: previewError } = useSwapPreview(swap.from, swap.to, swap.side, swap.amount)

	const { data } = useEntityMetadata(swap.from)
	const symbol = findMetadataValue('symbol', data)

	useEffect(() => {
		if (!preview) return
		const newValues = getFormValuesFromPreview(swap, localValues, preview)
		setLocalValues(newValues)
		setFormValues(newValues)
	}, [preview])

	const validationSchema = useMemo(() => {
		const tokenSchema = z.object({
			address: z
				.string({ required_error: intl.formatMessage(messages.validation_token_required) })
				.min(1, intl.formatMessage(messages.validation_token)),
			amount: z.coerce
				.number({ required_error: intl.formatMessage(messages.validation_amount_required) })
				.gt(0, { message: intl.formatMessage(messages.validation_amount) }),
		})

		return z.object({
			account: z.string().min(1, intl.formatMessage(messages.validation_account)),
			from: z.array(tokenSchema).length(1),
			to: z.array(tokenSchema).length(1),
		})
	}, [])

	const handleChange = (values: typeof init) => {
		if (
			localValues.from[0].address === values.from[0].address &&
			localValues.from[0].amount === values.from[0].amount &&
			localValues.to[0].address === values.to[0].address &&
			localValues.to[0].amount === values.to[0].amount
		)
			return
		setSwap(getSwapSettingsFromFormValues(localValues, values))
		setLocalValues(values)
	}

	const handleSubmit = async (values: typeof init) => {
		setValidation(undefined)
		const result = validationSchema.safeParse(values)
		if (result.success === false) {
			setValidation(result.error)
			return
		}

		const fromKey = swap.side === 'send' ? 'input' : 'output'
		const transactionManifest = preview.swaps.reduce(
			(manifest, s) => `
		${manifest}
			CALL_METHOD
				Address("${values.account}")
				"withdraw"
				Address("${s[`${fromKey}_address`]}")
				Decimal("${Number.parseFloat(s[`${fromKey}_amount`].token) * (1 + FEE_RATIO)}")
			;
			TAKE_ALL_FROM_WORKTOP
				Address("${s[`${fromKey}_address`]}")
				Bucket("bucket1")
			;
			CALL_METHOD
				Address("${s.pool_address}")
				"swap"
				Bucket("bucket1")
			;
			CALL_METHOD
				Address("${values.account}")
				"deposit_batch"
				Expression("ENTIRE_WORKTOP")
			;
		`,
			'',
		)

		await sendTransaction({
			version: 1,
			transactionManifest,
		}).then(res => {
			if (res.isErr()) {
				toast.error(intl.formatMessage(messages.error_toast), { description: res.error.message || res.error.error })
			} else {
				toast.success(intl.formatMessage(messages.success_toast), {
					description: res.value.status,
					action: {
						label: intl.formatMessage(messages.toast_action_label),
						onClick: () => {
							searchParams.set('tx', `${res.value.transactionIntentHash}`)
							navigate(`${location.pathname}?${searchParams}`)
						},
					},
				})
				setFormValues(init)
			}
		})
	}

	return (
		<Box width="full">
			<Form onSubmit={handleSubmit} onChange={handleChange} initialValues={formValues} errors={validation?.format()}>
				<ValidationErrorMessage message={validation?.flatten().formErrors[0] || (previewError as any)?.message} />
				<SwapFormFields />
				{preview && (
					<Box>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.price_impact)}</Text>}
							rightData={
								<ToolTip message={intl.formatMessage(messages.price_impact_info)}>
									<Box>
										<Text size="small" color="strong">
											{intl.formatNumber(Number.parseFloat(preview.price_impact), { style: 'percent' })}
										</Text>
									</Box>
								</ToolTip>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.fee_wallet)}</Text>}
							rightData={
								<Text size="small" color="strong">
									{intl.formatNumber(swap.fee, {
										style: 'decimal',
										maximumFractionDigits: 18,
									})}{' '}
									{symbol}
								</Text>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.fee_lp)}</Text>}
							rightData={
								<Text size="small" color="strong">
									{intl.formatNumber(Number.parseFloat(preview.input_fee_lp.token), {
										style: 'decimal',
										maximumFractionDigits: 18,
									})}{' '}
									{symbol}
								</Text>
							}
						/>
					</Box>
				)}
			</Form>
		</Box>
	)
}

export default Swap
