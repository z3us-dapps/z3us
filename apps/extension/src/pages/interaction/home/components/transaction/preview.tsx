/* eslint-disable no-nested-ternary */

/* eslint-disable react/no-array-index-key */
import type { TransactionPreviewResponse } from '@radixdlt/radix-dapp-toolkit'
import { type Instruction, type Intent } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import React, { useEffect } from 'react'
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
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { CURRENCY_STYLES, DECIMAL_STYLES } from 'ui/src/constants/number'
import { useXRDPriceOnDay } from 'ui/src/hooks/queries/coingecko'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useCustomizeFeeModal } from '@src/hooks/modal/use-customize-fee-modal'
import { usePreview } from '@src/hooks/transaction/use-preview'
import { summaryFromInstructions } from '@src/radix/manifest'
import {
	type Summary,
	type TransactionMeta,
	type TransactionReceipt,
	type TransactionSettings,
	fungibleGuaranteeInstructionCost,
	lockFeeInstructionCost,
	nonFungibleGuaranteeInstructionCost,
	notarizingCost,
	notarizingCostWhenNotaryIsSignatory,
	signatureCost,
} from '@src/types/transaction'

import { FEE_PADDING_MARGIN } from './consts'
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
})

interface Change {
	account: string
	resource: string
	amount: number
}

interface AccountChange {
	account: string
	changes: Array<{ resource: string; amount: number }>
}

interface AggregatedChange {
	type: string
	changes: AccountChange[]
}

function getType(account: string, amount: number): string {
	if (account.startsWith('account_')) {
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
				}),
			),
		)

	return changes.reduce<AggregatedChange[]>((aggregatedChanges, change) => {
		const { account, resource, amount } = change
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

		const lastChange = currentAccountChange.changes[currentAccountChange.changes.length - 1]
		if (!lastChange || lastChange.resource !== resource) {
			currentAccountChange.changes.push({ resource, amount })
		} else {
			lastChange.amount += amount
		}

		return aggregatedChanges
	}, [])
}

function getFeePaddingAmount(receipt: TransactionReceipt, walletCost: number): number {
	return (
		FEE_PADDING_MARGIN *
		(Number.parseFloat(receipt.fee_summary.xrd_total_execution_cost) +
			Number.parseFloat(receipt.fee_summary.xrd_total_finalization_cost) +
			Number.parseFloat(receipt.fee_summary.xrd_total_storage_cost) +
			walletCost)
	)
}

function walletExecutionCost(meta: TransactionMeta): number {
	return (
		lockFeeInstructionCost +
		meta.tokenGuaranteesCount * fungibleGuaranteeInstructionCost +
		meta.nftGuaranteesCount * nonFungibleGuaranteeInstructionCost +
		meta.needSignaturesFrom.length * signatureCost +
		(meta.isNotarySignatory ? notarizingCostWhenNotaryIsSignatory : notarizingCost)
	)
}

function getFeeToLockAmount(receipt: TransactionReceipt, padding: number, walletCost: number): number {
	return (
		Number.parseFloat(receipt.fee_summary.xrd_total_execution_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_finalization_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_royalty_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_storage_cost) +
		Number.parseFloat(receipt.fee_summary.xrd_total_tipping_cost) +
		walletCost +
		padding
	)
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

interface IProps {
	intent: Intent
	settings: TransactionSettings
	meta: TransactionMeta
	onSettingsChange: (settings: TransactionSettings) => void
	onStatusChange?: (status: string) => void
}

type State = {
	preview?: TransactionPreviewResponse
	aggregatedChanges?: AggregatedChange[]
	summary?: Summary
	currency: 'currency' | 'xrd'
	walletExecutionCost: number
	isLoading: boolean
	hasManualSettings: boolean
}

export const Preview: React.FC<IProps> = ({ intent, settings, meta, onSettingsChange, onStatusChange }) => {
	const intl = useIntl()
	const buildPreview = usePreview()

	const customize = useCustomizeFeeModal()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { data: xrdPrice } = useXRDPriceOnDay(currency, new Date())

	const [state, setState] = useImmer<State>({
		currency: 'xrd',
		walletExecutionCost: 0,
		isLoading: false,
		hasManualSettings: false,
	})
	const receipt = state.preview?.receipt as TransactionReceipt

	useEffect(() => {
		setState(draft => {
			draft.walletExecutionCost = walletExecutionCost(meta)
		})
	}, [meta])

	useEffect(() => {
		setState(draft => {
			draft.summary = summaryFromInstructions(intent.manifest.instructions.value as Instruction[])
		})

		buildPreview(intent, settings).then(preview => {
			setState(draft => {
				draft.preview = preview
				draft.aggregatedChanges = aggregateChanges(preview.resource_changes)
			})
			onStatusChange((preview?.receipt as TransactionReceipt).status)
		})
	}, [intent])

	useEffect(() => {
		if (!receipt) return
		if (state.hasManualSettings) return
		if (state.walletExecutionCost === 0) return
		if (settings.padding !== 0) return

		const padding = getFeePaddingAmount(receipt, state.walletExecutionCost + settings.padding)
		const lockAmount = getFeeToLockAmount(receipt, padding, state.walletExecutionCost)
		onSettingsChange({
			...settings,
			padding,
			lockAmount,
		})
	}, [settings.padding, state.hasManualSettings, state.walletExecutionCost, receipt])

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

	if (!state.preview) return <FallbackLoading />

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
							{accountChange.changes.map(resourceChange =>
								resourceChange.amount === 0 ? null : (
									<ResourceSnippet
										key={`${data.type}${accountChange.account}${resourceChange.resource}`}
										address={resourceChange.resource}
										change={resourceChange.amount}
										reversed
									/>
								),
							)}
						</Box>
					))}
				</Box>
			))}

			{state.summary?.proofs?.length > 0 &&
				state.summary?.proofs.map((proof, idx) => (
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
						<Box
							component="button"
							display="inline-flex"
							alignItems="center"
							onClick={handleClickCustomize}
							className={clsx(
								plainButtonStyles.plainButtonHoverWrapper,
								plainButtonStyles.plainButtonHoverUnderlineWrapper,
							)}
						>
							<Text color="inherit" size="xsmall" truncate>
								{intl.formatMessage(messages.customize_fee_button_title)}
							</Text>
						</Box>
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
							<Text color="inherit" size="xsmall" truncate>
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
