/* eslint-disable no-nested-ternary */

/* eslint-disable react/no-array-index-key */
import type { TransactionPreviewResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { type Intent } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import React, { useEffect, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { AccountSnippet } from 'ui/src/components/snippet/account'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import type { TextProps } from 'ui/src/components/typography/text'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { DAPP_ADDRESS } from 'ui/src/constants/dapp'
import { CURRENCY_STYLES, DECIMAL_STYLES } from 'ui/src/constants/number'
import { useXRDCurrentPrice } from 'ui/src/hooks/queries/coingecko'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useCustomizeFeeModal } from '@src/hooks/modal/use-customize-fee-modal'
import { useCustomizeGuaranteesFeeModal } from '@src/hooks/modal/use-customize-guarantee-modal'
import { usePreview } from '@src/hooks/transaction/use-preview'
import {
	fungibleGuaranteeInstructionCost,
	lockFeeInstructionCost,
	nonFungibleGuaranteeInstructionCost,
	notarizingCost,
	notarizingCostWhenNotaryIsSignatory,
	signatureCost,
} from '@src/types/transaction'
import type {
	AggregatedChange,
	Change,
	TransactionMeta,
	TransactionReceipt,
	TransactionSettings,
} from '@src/types/transaction'

import { FEE_PADDING_MARGIN, FEE_PADDING_MARGIN_INCREMENT, MAX_PADDING_CALCULATION_RETRY } from './constants'
import { CustomizeGuaranteeTrigger } from './customize-guarantee-trigger'
import * as styles from './styles.css'

const messages = defineMessages({
	presenting_proofs_title: {
		id: 'EqXDVC',
		defaultMessage: 'Proofs',
	},
	fee_summary: {
		id: 'LXfC4n',
		defaultMessage: 'Fee summary',
	},
	change_currency_tooltip: {
		id: 'jv7oHw',
		defaultMessage: 'Change currency',
	},
	customize_fee_button_title: {
		id: 'TXpOBi',
		defaultMessage: 'Customize',
	},
	xrd_total_execution_cost: {
		id: '1leDN6',
		defaultMessage: 'Execution',
	},
	xrd_total_finalization_cost: {
		id: '28f5xS',
		defaultMessage: 'Finalization',
	},
	xrd_total_royalty_cost: {
		id: 'vTUL12',
		defaultMessage: 'Royalty',
	},
	xrd_total_storage_cost: {
		id: 'DUIDEq',
		defaultMessage: 'Storage',
	},
	xrd_total_tipping_cost: {
		id: 'MKZX2V',
		defaultMessage: 'Tipping',
	},
	xrd_total_wallet_cost: {
		id: 'hT8jY5',
		defaultMessage: 'Notarizing and guarantees',
	},
	xrd_padding_cost: {
		id: '7LHMo9',
		defaultMessage: 'Padding',
	},
	proof: {
		id: 'KBj2VM',
		defaultMessage: 'Presenting proof',
	},
	withdraw: {
		id: 'bAqUW1',
		defaultMessage: 'Withdrawing',
	},
	deposit: {
		id: '7BSUnP',
		defaultMessage: 'Depositing',
	},
	stake: {
		id: 'dOtWXt',
		defaultMessage: 'Staking/Unstaking',
	},
	usage: {
		id: '6bKmjV',
		defaultMessage: 'Using',
	},
	message: {
		id: 'T7Ry38',
		defaultMessage: 'Message',
	},
	fee_reserve_error: {
		id: 'Gzq2CU',
		defaultMessage: 'Try to {button} fees by increasing padding value',
	},
})

function getType(account: string, amount: number): string {
	if (account.startsWith('account_')) {
		if (account === DAPP_ADDRESS) return 'usage'
		return amount > 0 ? 'deposit' : 'withdraw'
	}
	if (account.startsWith('validator_')) {
		return 'stake'
	}
	// Add additional conditions for different types here if needed
	return 'usage'
}

function aggregateChanges(resourceChanges: TransactionPreviewResponse['resource_changes']): AggregatedChange[] {
	const changes: Change[] = []
	resourceChanges
		.filter((change: any) => change.amount !== 0)
		.map((group: any) =>
			group.resource_changes?.map((change: any) =>
				changes.push({
					account: change.component_entity.entity_address,
					resource: change.resource_address,
					amount: parseFloat(change.amount) || 0,
					index: group.index,
				}),
			),
		)

	return changes.reduce<AggregatedChange[]>((aggregatedChanges, change) => {
		const { account, amount } = change
		const type = getType(account, amount)

		let currentAggregatedChange = aggregatedChanges.find(item => item.type === type)
		if (!currentAggregatedChange) {
			currentAggregatedChange = { type, changes: [] }
			aggregatedChanges.push(currentAggregatedChange)
		}

		let currentAccountChange = currentAggregatedChange.changes.find(accChange => accChange.account === account)
		if (!currentAccountChange) {
			currentAccountChange = { account, changes: [] }
			currentAggregatedChange.changes.push(currentAccountChange)
		}

		currentAccountChange.changes.push(change)

		return aggregatedChanges
	}, [])
}

function isInsufficientBalanceFeeReserveError(error_message?: string): boolean {
	// SystemModuleError(CostingError(FeeReserveError(InsufficientBalance { required: 0.0050005, remaining: 0.0033562161779997 })))
	return ['FeeReserveError', 'InsufficientBalance'].every(substring => error_message.includes(substring))
}

function isFeeReserveError(error_message?: string): boolean {
	return error_message.includes('FeeReserveError')
}

function extractFeeReserveInsufficientBalanceValues(message: string): { required: number; remaining: number } | null {
	const regex = /required:\s*([\d.]+),\s*remaining:\s*([\d.]+)/
	const match = message.match(regex)

	if (match) {
		return {
			required: parseFloat(match[1]),
			remaining: parseFloat(match[2]),
		}
	}
	return null
}

function getFeePaddingAmount(paddingCalculation: number, receipt: TransactionReceipt, walletCost: number): number {
	const padding =
		FEE_PADDING_MARGIN *
		(1 + paddingCalculation * FEE_PADDING_MARGIN_INCREMENT) *
		(Number.parseFloat(receipt.fee_summary.xrd_total_execution_cost) +
			Number.parseFloat(receipt.fee_summary.xrd_total_finalization_cost) +
			Number.parseFloat(receipt.fee_summary.xrd_total_storage_cost) +
			walletCost)
	return 0.01
	if (isInsufficientBalanceFeeReserveError(receipt.error_message)) {
		const insufficientBalance = extractFeeReserveInsufficientBalanceValues(receipt.error_message)
		if (insufficientBalance.required > padding) return insufficientBalance.required
		return padding + (insufficientBalance.required - insufficientBalance.remaining)
	}
	return padding
}

function walletExecutionCost(meta: TransactionMeta): number {
	return (
		lockFeeInstructionCost +
		meta.summary.tokenGuaranteesCount * fungibleGuaranteeInstructionCost +
		meta.summary.nftGuaranteesCount * nonFungibleGuaranteeInstructionCost +
		meta.needSignaturesFrom.length * signatureCost +
		(meta.isNotarySignatory ? notarizingCostWhenNotaryIsSignatory : notarizingCost)
	)
}

function getFeeToLockAmount(receipt: TransactionReceipt, padding: number, walletCost: number): number {
	const lock =
		Number.parseFloat(receipt.fee_summary.xrd_total_execution_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_finalization_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_royalty_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_storage_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_tipping_cost) +
		walletCost +
		padding
	return lock
}

interface ICostProps {
	value: number
	xrdPrice: number
	format: 'currency' | 'xrd'
	currency: string
}

export const Cost: React.FC<ICostProps> = ({ value, xrdPrice, format, currency }) => {
	const intl = useIntl()

	return (
		<ToolTip
			message={
				format === 'currency'
					? `${intl.formatNumber(value, { maximumSignificantDigits: 3, ...DECIMAL_STYLES })} XRD`
					: intl.formatNumber(value * xrdPrice, { currency, ...CURRENCY_STYLES })
			}
		>
			<Box>
				<Text size="small" color="strong" truncate>
					{format === 'currency'
						? intl.formatNumber(value * xrdPrice, { currency, ...CURRENCY_STYLES })
						: `${intl.formatNumber(value, { maximumSignificantDigits: 3, ...DECIMAL_STYLES })} XRD`}
				</Text>
			</Box>
		</ToolTip>
	)
}

interface ICustomizeFeeButtonProps extends TextProps {
	onClick: () => void
}

const CustomizeFeeButton: React.FC<ICustomizeFeeButtonProps> = ({ onClick, ...props }) => {
	const intl = useIntl()

	return (
		<Box
			component="button"
			display="inline-flex"
			alignItems="center"
			onClick={onClick}
			className={clsx(plainButtonStyles.plainButtonHoverWrapper, plainButtonStyles.plainButtonHoverUnderlineWrapper)}
		>
			<Text color="inherit" size="xsmall" {...props}>
				{intl.formatMessage(messages.customize_fee_button_title)}
			</Text>
		</Box>
	)
}

interface IProps {
	intent: Intent
	settings: TransactionSettings
	meta: TransactionMeta
	onSettingsChange: (settings: TransactionSettings) => void
	onStatusChange?: (status: string) => void
}

type State = {
	isLoading: boolean
	preview?: TransactionPreviewResponse
	aggregatedChanges?: AggregatedChange[]
	currency: 'currency' | 'xrd'
	walletExecutionCost: number
	hasManualSettings: boolean
	paddingCalculationRetry: number
}

export const Preview: React.FC<IProps> = ({ intent, settings, meta, onSettingsChange, onStatusChange }) => {
	const intl = useIntl()
	const buildPreview = usePreview()
	const customize = useCustomizeFeeModal()
	const customizeGuarantees = useCustomizeGuaranteesFeeModal()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: xrdPrice } = useXRDCurrentPrice(currency)

	const [state, setState] = useImmer<State>({
		isLoading: true,
		currency: 'xrd',
		walletExecutionCost: 0,
		hasManualSettings: false,
		paddingCalculationRetry: 0,
	})

	const receipt = useMemo(() => state.preview?.receipt as TransactionReceipt, [state.preview])

	useEffect(() => {
		setState(draft => {
			draft.walletExecutionCost = walletExecutionCost(meta)
		})
	}, [meta])

	useEffect(() => {
		buildPreview(intent, settings).then(preview => {
			const newReceipt = preview.receipt as TransactionReceipt
			setState(draft => {
				if (
					newReceipt?.error_message &&
					state.paddingCalculationRetry < MAX_PADDING_CALCULATION_RETRY &&
					isInsufficientBalanceFeeReserveError(newReceipt?.error_message)
				) {
					draft.paddingCalculationRetry += 1
					draft.isLoading = true
				} else {
					draft.isLoading = false
				}
				draft.preview = preview
				draft.aggregatedChanges = aggregateChanges(preview.resource_changes)
			})
			onStatusChange(newReceipt.status)
		})
	}, [buildPreview, intent])

	useEffect(() => {
		if (!state.isLoading) return
		if (!receipt) return
		if (state.hasManualSettings) return
		if (state.walletExecutionCost === 0) return

		const padding = getFeePaddingAmount(state.paddingCalculationRetry, receipt, state.walletExecutionCost)
		const lockAmount = getFeeToLockAmount(receipt, padding, state.walletExecutionCost)
		onSettingsChange({
			...settings,
			padding,
			lockAmount,
		})
	}, [state.isLoading, state.hasManualSettings, state.paddingCalculationRetry, state.walletExecutionCost, receipt])

	const handleToggleValue = () => {
		setState(draft => {
			draft.currency = draft.currency === 'currency' ? 'xrd' : 'currency'
		})
	}

	const handleClickCustomize = () => {
		customize(settings).then(newSettings => {
			setState(draft => {
				draft.hasManualSettings = newSettings.padding !== 0
			})
			const lockAmount = getFeeToLockAmount(receipt, newSettings.padding, state.walletExecutionCost)
			onSettingsChange({
				...newSettings,
				lockAmount,
			})
		})
	}

	const handleCustomizeGuarantees = (change: Change) => {
		customizeGuarantees(meta.summary, change).then(newSummary =>
			onSettingsChange({
				...settings,
				guarantees: newSummary.guarantees,
			}),
		)
	}

	if (state.isLoading) return <FallbackLoading />

	return (
		<Box className={styles.transactionPreviewWrapper}>
			{receipt?.status !== 'Succeeded' && (
				<Box className={styles.transactionPreviewBlockWrapper}>
					<RedGreenText change={-1} color="strong" size="xsmall" weight="strong" align="center">
						{receipt?.status}
					</RedGreenText>
					{receipt?.error_message && (
						<Box className={clsx(styles.transactionPreviewBlock, styles.transactionPreviewBlockError)}>
							<ValidationErrorMessage align="center" message={receipt?.error_message} />
						</Box>
					)}
					{isFeeReserveError(receipt.error_message) && (
						<Text align="center" color="strong">
							{intl.formatMessage(messages.fee_reserve_error, {
								button: <CustomizeFeeButton color="strong" onClick={handleClickCustomize} />,
							})}
						</Text>
					)}
				</Box>
			)}

			{intent.message?.kind === 'PlainText' && (
				<Box className={styles.transactionPreviewBlockWrapper}>
					<Text color="strong" size="xsmall" weight="strong">
						{intl.formatMessage(messages.message)}
					</Text>
					<Box className={clsx(styles.transactionPreviewBlock, styles.transactionPreviewBlockError)}>
						<Text>{intent.message.value.message.value}</Text>
					</Box>
				</Box>
			)}

			{state.aggregatedChanges.map((data, index) => (
				<Box key={`${index}${data.type}`} className={styles.transactionPreviewBlockWrapper}>
					<Text color="strong" size="xsmall" weight="strong">
						{intl.formatMessage(messages[data.type])}
					</Text>
					{data.changes.map(accountChange => (
						<Box key={`${data.type}${accountChange.account}`} className={styles.transactionPreviewBlock}>
							<AccountSnippet address={accountChange.account} />
							{accountChange.changes.map((resourceChange, idx) => {
								switch (data.type) {
									case 'deposit':
										return (
											<Box
												display="flex"
												flexDirection="column"
												gap="small"
												alignItems="flex-end"
												key={`${idx}${resourceChange.resource}`}
											>
												<ResourceSnippet address={resourceChange.resource} change={resourceChange.amount} reversed />
												{meta.summary.predictedDepositIndexes[resourceChange.index] && (
													<CustomizeGuaranteeTrigger change={resourceChange} onClick={handleCustomizeGuarantees} />
												)}
											</Box>
										)
									case 'usage':
									case 'stake':
										return null
									default:
										return (
											<ResourceSnippet
												key={`${idx}${resourceChange.resource}`}
												address={resourceChange.resource}
												change={resourceChange.amount}
												reversed
											/>
										)
								}
							})}
						</Box>
					))}
				</Box>
			))}

			{meta.summary.proofs.map((proof, idx) => (
				// eslint-disable-next-line react/no-array-index-key
				<Box key={`${idx}`} className={styles.transactionPreviewBlockWrapper}>
					<Text color="strong" size="xsmall" weight="strong">
						{intl.formatMessage(messages.proof)}
					</Text>
					<Box className={styles.transactionPreviewBlock}>
						<Box display="flex" alignItems="center" width="full" gap="medium">
							<Box alignItems="center" display="flex" flexGrow={1} justifyContent="space-between" gap="small">
								<Box display="flex" flexDirection="column" gap="xsmall">
									<ResourceSnippet address={proof.resourceAddress} />
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			))}

			<Box className={styles.transactionPreviewBlockWrapper}>
				<Box display="flex" position="relative" width="full">
					<Text color="strong" size="xsmall" weight="strong">
						{intl.formatMessage(messages.fee_summary)}
					</Text>
					<Box className={styles.transactionPreviewFeeLinks}>
						<CustomizeFeeButton onClick={handleClickCustomize} />
						<Box className={styles.transactionPreviewLinSeparator} />
						<Box
							component="button"
							display="inline-flex"
							alignItems="center"
							onClick={handleToggleValue}
							className={clsx(
								plainButtonStyles.plainButtonHoverWrapper,
								plainButtonStyles.plainButtonHoverUnderlineWrapper,
							)}
						>
							<Text color="inherit" size="xsmall">
								{intl.formatMessage(messages.change_currency_tooltip)}
							</Text>
						</Box>
					</Box>
				</Box>

				<Box className={styles.transactionPreviewBlock}>
					<Box display="flex" flexDirection="column" gap="xsmall">
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.xrd_total_execution_cost)}</Text>}
							rightData={
								<Cost
									format={state.currency}
									currency={currency}
									value={Number.parseFloat(receipt.fee_summary.xrd_total_execution_cost)}
									xrdPrice={xrdPrice}
								/>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.xrd_total_finalization_cost)}</Text>}
							rightData={
								<Cost
									format={state.currency}
									currency={currency}
									value={Number.parseFloat(receipt.fee_summary.xrd_total_finalization_cost)}
									xrdPrice={xrdPrice}
								/>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.xrd_total_royalty_cost)}</Text>}
							rightData={
								<Cost
									format={state.currency}
									currency={currency}
									value={Number.parseFloat(receipt.fee_summary.xrd_total_royalty_cost)}
									xrdPrice={xrdPrice}
								/>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={<Text size="small">{intl.formatMessage(messages.xrd_total_storage_cost)}</Text>}
							rightData={
								<Cost
									format={state.currency}
									currency={currency}
									value={Number.parseFloat(receipt.fee_summary.xrd_total_storage_cost)}
									xrdPrice={xrdPrice}
								/>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={
								<Text truncate size="small">
									{intl.formatMessage(messages.xrd_total_tipping_cost)}
								</Text>
							}
							rightData={
								<Cost
									format={state.currency}
									currency={currency}
									value={Number.parseFloat(receipt.fee_summary.xrd_total_tipping_cost)}
									xrdPrice={xrdPrice}
								/>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={
								<Text truncate size="small">
									{intl.formatMessage(messages.xrd_total_wallet_cost)}
								</Text>
							}
							rightData={
								<Cost
									format={state.currency}
									currency={currency}
									value={state.walletExecutionCost}
									xrdPrice={xrdPrice}
								/>
							}
						/>
						<AccountsTransactionInfo
							leftTitle={
								<Text truncate size="small">
									{intl.formatMessage(messages.xrd_padding_cost)}
								</Text>
							}
							rightData={
								<Cost format={state.currency} currency={currency} value={settings.padding} xrdPrice={xrdPrice} />
							}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
