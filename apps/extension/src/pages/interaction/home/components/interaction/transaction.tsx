import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletTransactionItems } from '@radixdlt/radix-dapp-toolkit'
import type { Intent, PrivateKey } from '@radixdlt/radix-engine-toolkit'
import { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { DAPP_ADDRESS } from 'ui/src/constants/dapp'
import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useApprovedDapps } from 'ui/src/hooks/use-approved-dapps'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useIntent } from '@src/hooks/transaction/use-intent'
import { useSign } from '@src/hooks/transaction/use-sign'
import type { TransactionMeta, TransactionSettings } from '@src/types/transaction'

import { DappDetails } from '../dapp-details'
import { NetworkAlert } from '../network-alert'
import { Transaction } from '../transaction'
import * as styles from './styles.css'

const messages = defineMessages({
	submit: {
		id: 'wSZR47',
		defaultMessage: 'Submit',
	},
	unauthorized: {
		id: 'doWYaF',
		defaultMessage: `Transaction comes from unauthorized dApp and/or includes unauthorized accounts!`,
	},
	error: {
		id: 'LAqFJt',
		defaultMessage: `Failed to submit transaction{hasMessage, select,
			true {: {message}}
			other {, please try again}
		}`,
	},
})

interface IProps {
	interaction: WalletInteractionWithTabId
}

type State = {
	input: WalletTransactionItems['send']
	settings: TransactionSettings
	meta: TransactionMeta
	intent?: Intent
	notary?: PrivateKey
	isDappApproved?: boolean
	error?: string
	previewStatus: string
}

export const TransactionRequest: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const { transaction } = useGatewayClient()
	const accountIndexes = useAccountIndexes()
	const approvedDapps = useApprovedDapps()

	const buildIntent = useIntent()
	const sign = useSign()

	const [state, setState] = useImmer<State>({
		input: (interaction.items as WalletTransactionItems).send,
		settings: {
			tipPercentage: 0,
			padding: 0,
			lockAmount: 1,
		},
		meta: {
			needSignaturesFrom: [],
			isNotarySignatory: false,
			tokenGuaranteesCount: 0,
			nftGuaranteesCount: 0,
		},
		previewStatus: '',
	})

	useEffect(() => {
		buildIntent(state.input, state.settings)
			.then(response => {
				let { accounts = [] } = approvedDapps[interaction.metadata.dAppDefinitionAddress] || {}
				if (interaction.metadata.dAppDefinitionAddress === DAPP_ADDRESS) {
					accounts = Object.keys(accountIndexes)
				}
				const authorizedAccounts = new Set(accounts)
				if (
					state.settings.feePayer &&
					!authorizedAccounts.has(state.settings.feePayer) &&
					accountIndexes[state.settings.feePayer]
				) {
					authorizedAccounts.add(state.settings.feePayer)
				}
				setState(draft => {
					draft.error = ''
					draft.intent = response.intent
					draft.notary = response.notary
					draft.meta = response.meta
					draft.isDappApproved = response.meta.needSignaturesFrom.every(account => authorizedAccounts.has(account))
				})
			})
			.catch(err => {
				setState(draft => {
					draft.error = err.message
				})
			})
	}, [state.input, state.settings])

	useEffect(() => {
		if (!state.settings.feePayer && state.meta.needSignaturesFrom.length > 0) {
			setState(draft => {
				draft.settings = { ...draft.settings, feePayer: state.meta.needSignaturesFrom[0] }
			})
		}
	}, [state.meta.needSignaturesFrom])

	const handleSubmit = async () => {
		try {
			const notarizedTransaction = await sign(state.notary, state.intent, state.meta.needSignaturesFrom)
			await transaction.innerClient.transactionSubmit({
				transactionSubmitRequest: { notarized_transaction_hex: notarizedTransaction.toHex() },
			})

			await browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					walletResponse: {
						discriminator: 'success',
						items: {
							discriminator: 'transaction',
							send: {
								transactionIntentHash: notarizedTransaction.transactionId.id,
							},
						},
						interactionId,
					},
					metadata: interaction.metadata,
				}),
			)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					walletResponse: {
						discriminator: 'failure',
						error: intl.formatMessage(messages.error, { hasMessage: !!error?.message, message: error?.message }),
						interactionId,
					},
					metadata: interaction.metadata,
				}),
			)
		} finally {
			window.close()
		}
	}

	const handleManifestChange = (transactionManifest: string) => {
		setState(draft => {
			draft.input = { ...draft.input, transactionManifest }
		})
	}

	const handleSettingsChange = (settings: TransactionSettings) => {
		setState(draft => {
			draft.settings = settings
		})
	}

	const handlePreviewStatusChange = (status: string) => {
		setState(draft => {
			draft.previewStatus = status
		})
	}

	if (interaction.items.discriminator !== 'transaction') return null

	return (
		<>
			<ScrollArea className={styles.interactionScrollWrapper}>
				<Box className={styles.interactionLoginBodyWrapper}>
					<DappDetails {...interaction?.metadata} />
					<NetworkAlert {...interaction?.metadata} />
					<ValidationErrorMessage
						message={state.isDappApproved === false ? intl.formatMessage(messages.unauthorized) : ''}
					/>
					<ValidationErrorMessage message={state.error} />
					{state?.intent && (
						<Transaction
							intent={state.intent}
							settings={state.settings}
							meta={state.meta}
							onManifestChange={handleManifestChange}
							onSettingsChange={handleSettingsChange}
							onPreviewStatusChange={handlePreviewStatusChange}
						/>
					)}
				</Box>
			</ScrollArea>
			<Box className={styles.interactionLoginFooterWrapper}>
				<Button
					onClick={handleSubmit}
					styleVariant="primary"
					sizeVariant="xlarge"
					fullWidth
					disabled={!state?.intent || state.isDappApproved === false || state.previewStatus !== 'Succeeded'}
				>
					{intl.formatMessage(messages.submit)}
				</Button>
			</Box>
		</>
	)
}
