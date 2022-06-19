/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { Box, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { useSharedStore, useStore } from '@src/store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/actions'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { AccountSelector } from '@src/components/account-selector'
import { useTokenInfo } from '@src/services/react-query/queries/radix'
import { useTransaction } from '@src/hooks/use-transaction'
import { getShortAddress } from '@src/utils/string-utils'
import ActionsPreview from './components/actions-preview'

export const Transaction = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/transaction/:id')
	const queryClient = useQueryClient()

	const { buildTransactionFromActions, buildTransactionFromManifest, signTransaction, submitTransaction } =
		useTransaction()
	const { hw, seed, sendResponse } = useSharedStore(state => ({
		addressBook: state.addressBook,
		sendResponse: state.sendResponseAction,
		hw: state.hardwareWallet,
		seed: state.masterSeed,
	}))

	const { accountAddress, account, selectAccount, selectAccountForAddress, action } = useStore(state => ({
		accountAddress: state.getCurrentAddressAction(),
		account: state.account,
		selectAccount: state.selectAccountAction,
		selectAccountForAddress: state.selectAccountForAddressAction,
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const shortAddress = getShortAddress(accountAddress)
	const [state, setState] = useImmer({
		fee: null,
		transaction: null,
		errorMessage: '',
	})

	const {
		host,
		request: { actions = [], message = '', manifest = '' },
	} = action

	const { data: token } = useTokenInfo(actions.length > 0 ? actions[0]?.from_account?.rri : '')

	useEffect(() => {
		if (actions.length > 0) {
			selectAccountForAddress(actions[0]?.from_account?.address, hw, seed)
		}
	}, [actions])

	useEffect(() => {
		if (actions.length > 0) {
			const build = async () => {
				try {
					const { fee, transaction } = await buildTransactionFromActions(actions, message)
					setState(draft => {
						draft.fee = fee
						draft.transaction = transaction
						draft.errorMessage = ''
					})
				} catch (error) {
					setState(draft => {
						draft.errorMessage = (error?.message || error).toString().trim()
					})
				}
			}
			build()
		}
	}, [account])

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
	}

	const handleCancel = async () => {
		await sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: { code: 403, error: 'Declined' } },
		})
		window.close()
	}

	const handleConfirm = async () => {
		if (!account) return
		if (!state.transaction && !manifest) {
			sendResponse(CONFIRM, {
				id,
				host,
				payload: { request: action.request, value: { code: 500, error: state.errorMessage || 'Invlaid transaction' } },
			})
			return
		}
		try {
			let result: unknown
			if (state.transaction) {
				const { blob } = await signTransaction(token.symbol, state.transaction)
				result = await submitTransaction(blob)
			} else if (manifest) {
				result = await buildTransactionFromManifest(manifest)
			}

			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			sendResponse(CONFIRM, { id, host, payload: result })
		} catch (error) {
			const errorMessage = (error?.message || error).toString().trim() || 'Failed to submit transaction'
			setState(draft => {
				draft.errorMessage = errorMessage
			})
			sendResponse(CONFIRM, {
				id,
				host,
				payload: { request: action.request, value: { code: 500, error: errorMessage } },
			})
		}
	}

	return (
		<>
			<PageWrapper css={{ flex: '1' }}>
				<Box>
					<PageHeading>Approve</PageHeading>
					<PageSubHeading>
						Approve transaction from{' '}
						<StyledLink underline href={host} target="_blank">
							{host}
						</StyledLink>
						.
					</PageSubHeading>
				</Box>
				<Box css={{ mt: '$8', flex: '1' }}>
					<HardwareWalletReconnect />
				</Box>
				<Box>
					<ActionsPreview actions={actions} fee={state.fee} />
				</Box>
				{manifest && (
					<Box>
						<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
						<Input
							value={manifest.length > 100000 ? 'Manifest is too large. Preview disabled' : manifest}
							as="textarea"
							size="2"
							css={{ height: '140px', mt: '$8' }}
						/>
					</Box>
				)}
			</PageWrapper>

			<PageWrapper css={{ display: 'flex', gridGap: '8px', borderTop: '1px solid $borderPanel' }}>
				<Button
					onClick={handleCancel}
					size="6"
					color="tertiary"
					aria-label="cancel transaction wallet"
					css={{ px: '0', flex: '1' }}
				>
					Decline
				</Button>
				<Button
					onClick={handleConfirm}
					disabled={!account}
					size="6"
					color="primary"
					aria-label="confirm transaction wallet"
					css={{ px: '0', flex: '1' }}
				>
					Approve
				</Button>
			</PageWrapper>
		</>
	)
}
