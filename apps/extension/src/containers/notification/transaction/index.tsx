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
import { useTokenInfo } from '@src/services/react-query/queries/radix'
import { useTransaction } from '@src/hooks/use-transaction'
import { useMessage } from '@src/hooks/use-message'
import ActionsPreview from './components/actions-preview'

export const Transaction = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/transaction/:id')
	const queryClient = useQueryClient()

	const { buildTransactionFromActions, buildTransactionFromManifest, signTransaction, submitTransaction } =
		useTransaction()
	const { createMessage } = useMessage()
	const { sendResponse } = useSharedStore(state => ({
		addressBook: state.addressBook,
		sendResponse: state.sendResponseAction,
	}))

	const { account, action } = useStore(state => ({
		account: state.account,
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const [state, setState] = useImmer({
		fee: null,
		transaction: null,
		errorMessage: '',
	})

	const { host, request = {} } = action
	const { manifest = '', actions = [], message = '', encryptMessage = false } = request

	const rri = actions.find(a => !!a?.rri)?.rri || ''
	const recipient = actions.find(a => !!a?.to_account)?.to_account || ''

	const { data: token } = useTokenInfo(rri)

	useEffect(() => {
		if (actions.length > 0) {
			const build = async () => {
				try {
					const msg = await createMessage(message, encryptMessage ? recipient : undefined)
					const { fee, transaction } = await buildTransactionFromActions(actions, msg)
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
			// eslint-disable-next-line no-console
			console.error(error)
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
						<Input
							value={manifest.length > 100000 ? 'Manifest is too large. Preview disabled' : manifest}
							as="textarea"
							size="2"
							css={{ height: '300px' }}
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
