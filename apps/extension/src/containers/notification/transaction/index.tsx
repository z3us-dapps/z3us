/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useTokenInfo } from '@src/hooks/react-query/queries/radix'
import { useTransaction } from '@src/hooks/use-transaction'
import { useMessage } from '@src/hooks/use-message'
import { EXPLORER_URL } from '@src/config'
import { Flex, Box, StyledLink, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { useSharedStore, useNoneSharedStore } from '@src/hooks/use-store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { CONFIRM } from '@src/lib/v1/actions'
import InputFeedback from 'ui/src/components/input/input-feedback'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from 'ui/src/components/alert-dialog'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { Z3usSpinnerAnimation } from '@src/components/z3us-spinner-animation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { ExtendedActionType } from '@src/types'
import { parseAccountAddress } from '@src/services/radix/serializer'
import ActionsPreview from './components/actions-preview'

interface ImmerT {
	fee: string | null
	transaction: {
		blob: string
		hashOfBlobToSign: string
	}
	txID: string
	errorMessage: string
	isSendingTransaction: boolean
}

export const Transaction = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/transaction/:id')
	const queryClient = useQueryClient()

	const {
		buildTransaction,
		// buildTransactionFromActions,
		// buildTransactionFromManifest,
		signTransaction,
		submitTransaction,
	} = useTransaction()
	const { createMessage } = useMessage()
	const { signingKey, sendResponse } = useSharedStore(state => ({
		signingKey: state.signingKey,
		sendResponse: state.sendResponseAction,
	}))
	const { address, action } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const [state, setState] = useImmer<ImmerT>({
		fee: null,
		transaction: null,
		txID: '',
		errorMessage: '',
		isSendingTransaction: false,
	})

	const { host, request = {} } = action
	const { manifest = '', actions = [], message = '', encryptMessage = false } = request

	const rri = actions.find(a => !!a?.amount?.token_identifier?.rri)?.amount?.token_identifier?.rri || ''
	const recipient = actions.find(a => !!a?.to_account)?.to_account?.address || ''

	const { data: token } = useTokenInfo(rri)

	useEffect(() => {
		if (!signingKey) return
		if (actions.length > 0) {
			const build = async () => {
				try {
					const accountAddress = parseAccountAddress(address)
					let disableTokenMintAndBurn = true
					actions.forEach(_action => {
						disableTokenMintAndBurn =
							disableTokenMintAndBurn ||
							_action === ExtendedActionType.MINT_TOKENS ||
							_action === ExtendedActionType.MINT_TOKENS
					})
					let msg: string
					if (message) {
						msg = await createMessage(message, encryptMessage ? recipient : undefined)
					}
					const { fee, transaction } = await buildTransaction({
						network_identifier: { network: accountAddress.network },
						actions,
						fee_payer: {
							address: accountAddress.toString(),
						},
						message: msg,
						disable_token_mint_and_burn: disableTokenMintAndBurn,
					})
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
	}, [signingKey?.id])

	const handleClose = async () => {
		sendResponse(CONFIRM, {
			id,
			host,
			payload: { request: action.request, value: { code: 500, error: state.errorMessage } },
		})
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
		if (!signingKey) return

		setState(draft => {
			draft.isSendingTransaction = true
		})

		if (!state.transaction && !manifest) {
			sendResponse(CONFIRM, {
				id,
				host,
				payload: { request: action.request, value: { code: 500, error: state.errorMessage || 'Invlaid transaction' } },
			})
			return
		}
		try {
			let result: any
			if (state.transaction) {
				const { blob } = await signTransaction(token.symbol, state.transaction)
				result = await submitTransaction(blob)
				setState(draft => {
					draft.txID = result.txID
					draft.errorMessage = ''
				})
			} else if (manifest) {
				// result = await buildTransactionFromManifest(manifest)
				throw new Error('Not supported yet.')
			}

			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			sendResponse(CONFIRM, { id, host, payload: { request: action.request, value: result } })
		} catch (error) {
			let errorMessage = (error?.message || error).toString().trim() || 'Failed to submit transaction'
			if (errorMessage.includes('"type":"HARDWARE"')) {
				errorMessage = JSON.parse(errorMessage)?.message
			}
			setState(draft => {
				draft.errorMessage = errorMessage
			})
		}
	}

	return (
		<>
			<PageWrapper css={{ flex: '1', overflowY: 'auto', maxHeight: '450px' }}>
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
				<Box css={{ mt: '$2', flex: '1' }}>
					<HardwareWalletReconnect />
				</Box>
				<ActionsPreview actions={actions} fee={state.fee} />
				{manifest && (
					<Box css={{ mt: '$2', flex: '1' }}>
						<Input
							value={manifest.length > 100000 ? 'Manifest is too large. Preview disabled' : manifest}
							as="textarea"
							size="2"
							css={{ height: '200px' }}
						/>
					</Box>
				)}
				<Box css={{ mt: '$2', flex: '1' }}>
					<InputFeedback
						showFeedback={state.errorMessage !== ''}
						animateHeight={60}
						css={{ display: 'flex', alignItems: 'center', overflow: 'auto' }}
					>
						<Text color="red" medium>
							{state.errorMessage}
						</Text>
					</InputFeedback>
				</Box>
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
				<AlertDialog open={state.isSendingTransaction}>
					<AlertDialogTrigger asChild>
						<Button
							onClick={handleConfirm}
							disabled={!signingKey || (!state.transaction && !manifest)}
							size="6"
							color="primary"
							aria-label="confirm transaction wallet"
							css={{ px: '0', flex: '1' }}
						>
							Confirm send
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<Flex direction="column" css={{ p: '$2', position: 'relative' }}>
							<Box css={{ flex: '1' }}>
								<Flex
									direction="column"
									align="center"
									css={{ bg: '$bgPanel2', width: '100%', pt: '$8', pb: '$6', br: '$2' }}
								>
									<Z3usSpinnerAnimation
										infinite
										animationPlayState={state.isSendingTransaction ? 'running' : 'paused'}
										animationTime="5000ms"
										bgColor="$bgPanel2"
									/>
									<Box css={{ pb: '$4', ta: 'center' }}>
										<Flex css={{ mt: '30px' }}>
											<Text medium size="6" bold css={{ position: 'relative' }}>
												<Box as="span">{state.isSendingTransaction ? 'Sending transaction' : 'Transaction sent'}</Box>
												<Box
													as="span"
													css={{
														position: 'absolute',
														top: '0',
														right: '-22px',
														width: '20px',
														ta: 'left',
														opacity: state.isSendingTransaction ? '1' : '0',
														transition: '$default',
													}}
												>
													<span className="ellipsis-anim">
														<span>.</span>
														<span>.</span>
														<span>.</span>
													</span>
												</Box>
											</Text>
										</Flex>
										<Text
											size="4"
											css={{
												mt: '10px',
												opacity: !state.isSendingTransaction ? '1' : '0',
												transition: '$default',
											}}
										>
											<StyledLink
												underline
												target="_blank"
												href={state.txID ? `${EXPLORER_URL}/transactions/${state.txID}` : ``}
												css={{ px: '$1' }}
											>
												View on explorer
											</StyledLink>
										</Text>
									</Box>
									<InputFeedback showFeedback={state.errorMessage !== ''} animateHeight={51}>
										<Box
											css={{
												display: 'block',
												width: '100%',
												textAlign: 'center',
												opacity: state.errorMessage !== '' ? '1' : '0',
												transition: '$default',
											}}
										>
											<Text size="3" css={{ pb: '$2' }}>
												Oh no! An
												<StyledLink
													underline
													target="_blank"
													href={state.txID ? `${EXPLORER_URL}/transactions/${state.txID}` : ``}
													css={{ px: '$1', color: 'red' }}
												>
													error
												</StyledLink>
												has occured.
											</Text>
											{!state.txID && state.errorMessage && (
												<Text size="3" css={{ pb: '$2' }}>
													{state.errorMessage}
												</Text>
											)}
											<Button size="2" color="ghost" aria-label="close" onClick={handleClose}>
												<ArrowLeftIcon />
												Close
											</Button>
										</Box>
									</InputFeedback>
								</Flex>
							</Box>
						</Flex>
					</AlertDialogContent>
				</AlertDialog>
			</PageWrapper>
		</>
	)
}

export default Transaction
