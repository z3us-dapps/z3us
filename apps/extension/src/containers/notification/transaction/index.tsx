/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import BigNumber from 'bignumber.js'
import { BuildTransaction, FinalizeTransaction, SubmitSignedTransaction } from '@src/services/radix/transactions'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import InputFeedback from 'ui/src/components/input/input-feedback'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { getShortAddress } from '@src/utils/string-utils'
import { useStore } from '@src/store'
import { useRoute } from 'wouter'
import { hexToJSON } from '@src/utils/encoding'
import { SlippageBox } from '@src/components/slippage-box'
import { CONFIRM } from '@src/lib/actions'
import { ActivityType } from '@src/components/activity-type'

export const Transaction = (): JSX.Element => {
	const [, { id }] = useRoute<{ id: string }>('/transaction/:id')

	const { account, sendResponse, network, action, selectAccountForAddress } = useStore(state => ({
		account: state.account,
		sendResponse: state.sendResponseAction,
		selectAccountForAddress: state.selectAccountForAddressAction,
		network: state.networks[state.selectedNetworkIndex],
		action:
			state.pendingActions[id] && state.pendingActions[id].payloadHex
				? hexToJSON(state.pendingActions[id].payloadHex)
				: {},
	}))

	const accountAddress = account.address.toString()

	const [state, setState] = useImmer({
		shortAddress: getShortAddress(account?.address?.toString()),
		fee: null,
		transaction: null,
		errorMessage: '',
	})

	const {
		host,
		request: { transaction: tx, symbol, fromAddress },
	} = action

	useEffect(() => {
		selectAccountForAddress(fromAddress)
	}, [fromAddress])

	useEffect(() => {
		if (account?.address) {
			setState(draft => {
				draft.shortAddress = getShortAddress(account?.address?.toString())
			})
		}
	}, [account])

	useEffect(() => {
		if (tx && account?.address.toString() === fromAddress) {
			const build = async () => {
				try {
					const { fee, transaction } = await BuildTransaction(network.url, tx)
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
		if (!state.transaction) {
			sendResponse(CONFIRM, {
				id,
				host,
				payload: { request: action.request, value: { code: 500, error: state.errorMessage || 'Invlaid transaction' } },
			})
			return
		}

		try {
			const { blob } = await FinalizeTransaction(network.url, account, symbol, state.transaction)
			const result = await SubmitSignedTransaction(network.url, account, blob)

			sendResponse(CONFIRM, { id, host, payload: result })
		} catch (error) {
			const message = (error?.message || error).toString().trim() || 'Failed to submit transaction'
			setState(draft => {
				draft.errorMessage = message
			})
			sendResponse(CONFIRM, {
				id,
				host,
				payload: { request: action.request, value: { code: 500, error: message } },
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
					<InputFeedback showFeedback={state.errorMessage !== ''} animateHeight={31}>
						<Text color="red" medium>
							{state.errorMessage}
						</Text>
					</InputFeedback>
				</Box>
				<Box>
					{tx && tx.actions && (
						<Box>
							{tx.actions.map((activity, i) => {
								const toAccount = activity?.to_account?.address
								const fromAccount = activity?.from_account?.address

								return (
									<Box
										key={i}
										css={{
											borderTop: '1px solid $borderPanel',
											mt: '$5',
											py: '$5',
										}}
									>
										<Flex css={{ position: 'relative', pb: '$3' }}>
											<Text css={{ flex: '1' }}>Transaction type:</Text>
											<Box css={{ position: 'relative', mt: '-3px' }}>
												<ActivityType activity={activity} accountAddress={accountAddress} />
											</Box>
										</Flex>
										{toAccount && (
											<Flex css={{ position: 'relative', pb: '15px' }}>
												<Text css={{ flex: '1' }}>From account:</Text>
												<Text>{getShortAddress(toAccount)}</Text>
											</Flex>)}
										{fromAccount && (
											<Flex css={{ position: 'relative', pb: '15px' }}>
												<Text css={{ flex: '1' }}>To account:</Text>
												<Text>{getShortAddress(fromAccount)}</Text>
											</Flex>)}
										{state.fee && (
											<Flex css={{ position: 'relative', pb: '15px' }}>
												<SlippageBox
													css={{ border: 'none' }}
													fee={new BigNumber(state.fee).shiftedBy(-18)}
												/>
											</Flex>
										)}
									</Box>
								)
							})}
						</Box>
					)}
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
				<Button
					onClick={handleConfirm}
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
