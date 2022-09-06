import React from 'react'
import BigNumber from 'bignumber.js'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { useQueryClient } from 'react-query'
import { useLocation } from 'wouter'
import { useImmer } from 'use-immer'
import { Pool, Token } from '@src/types'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { ArrowLeftIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { LeftArrowIcon } from 'ui/src/components/icons'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui/src/components/hover-card'
import { BuiltTransactionReadyToSign } from '@radixdlt/application'
import { useTransaction } from '@src/hooks/use-transaction'
import { useSharedStore, useStore } from '@src/store'
import { formatBigNumber } from '@src/utils/formatters'
import { getShortAddress } from '@src/utils/string-utils'
import Button from 'ui/src/components/button'
import { InfoStatBlock } from '@src/components/info-stat-block'
import { Z3usSpinnerAnimation } from '@src/components/z3us-spinner-animation'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { EXPLORER_URL } from '@src/config'
import { MotionBox, Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from 'ui/src/components/alert-dialog'
import { confirmSwap } from '@src/services/swap'
import { FeeBox } from '../fee-box'

interface ImmerProps {
	txID: string
	errorMessage: string
	isSendingAlertOpen: boolean
	isSendingTransaction: boolean
	isTransactionSent: boolean
	isModalOpen: boolean
}

interface IProps {
	trigger: React.ReactNode
	pool: Pool
	fromToken: Token
	toToken: Token
	balance: BigNumber
	amount: BigNumber
	receive: BigNumber
	poolFee: BigNumber
	z3usFee: BigNumber
	z3usBurn: BigNumber
	txFee: BigNumber
	transaction: BuiltTransactionReadyToSign
	onCloseSwapModal: () => void
	slippage: number
	minimum: boolean
	disabledButton: boolean
	swapResponse: any
}

export const SwapModal: React.FC<IProps> = ({
	trigger,
	pool,
	fromToken,
	toToken,
	balance,
	amount,
	receive,
	poolFee,
	z3usFee,
	z3usBurn,
	txFee,
	transaction,
	onCloseSwapModal,
	minimum,
	slippage,
	disabledButton,
	swapResponse,
}) => {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()
	const { signTransaction, submitTransaction } = useTransaction()
	const { addressBook } = useSharedStore(state => ({
		addressBook: state.addressBook,
	}))
	const { account, publicAddresses } = useStore(state => ({
		account: state.account,
		publicAddresses: Object.values(state.publicAddresses),
	}))
	const [state, setState] = useImmer<ImmerProps>({
		txID: '',
		errorMessage: '',
		isSendingAlertOpen: false,
		isSendingTransaction: false,
		isTransactionSent: false,
		isModalOpen: false,
	})

	const address = account?.address?.toString()
	const entry = addressBook[address] || publicAddresses.find(_account => _account.address === address)
	const shortAddress = getShortAddress(address)

	const handleOnClick = () => {
		if (disabledButton) return
		setState(draft => {
			draft.isModalOpen = true
			draft.isSendingAlertOpen = false
		})
		setLocation('/wallet/swap/review')
	}

	const handleCloseModal = () => {
		setState(draft => {
			draft.isModalOpen = false
			draft.isSendingAlertOpen = false
			draft.isTransactionSent = false
		})
		setLocation('/wallet/swap')
		onCloseSwapModal()
	}

	const handleCloseIsSendingAlertModal = () => {
		setState(draft => {
			draft.isSendingAlertOpen = false
		})

		// @TODO: fix closing issue with alert and modal
		// Setting state to close the modal `state.isModalOpen` and the alert `state.isSendingAlertOpen` at the same time
		// causes an issue where the modals do not properly close and the body element has `pointer-events: none`
		setTimeout(() => {
			handleCloseModal()
		}, 20)
	}

	const handleConfirmSend = async () => {
		if (!account) return

		setState(draft => {
			draft.isSendingAlertOpen = true
			draft.isSendingTransaction = true
		})

		try {
			const { blob, txID } = await signTransaction(fromToken.symbol, transaction)
			setState(draft => {
				draft.txID = txID
			})
			const result = await submitTransaction(blob)

			try {
				await confirmSwap(pool, txID, swapResponse)
			} catch (error) {
				await confirmSwap(pool, txID, swapResponse) // retry confirm in case of error
			}

			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setState(draft => {
				draft.txID = result.txID
				draft.errorMessage = ''
				draft.isSendingTransaction = false
				draft.isTransactionSent = true
			})
		} catch (error) {
			setState(draft => {
				draft.isSendingTransaction = false
				draft.errorMessage = (error?.message || error).toString().trim()
				draft.isTransactionSent = false
			})
		}
	}

	return (
		<Dialog open={state.isModalOpen} modal={false}>
			<DialogTrigger asChild onClick={handleOnClick}>
				{trigger}
			</DialogTrigger>
			<DialogContent css={{ m: '0', height: '100%', width: '100%', border: 'none' }}>
				<Flex
					direction="column"
					css={{
						bg: '$bgPanel',
						height: '600px',
						position: 'absolute',
						zIndex: '1',
						left: '0',
						right: '0',
						bottom: '0',
						overflow: 'hidden',
						'.simplebar-content': {
							height: '100%',
						},
					}}
				>
					<ScrollArea>
						<Flex direction="column" css={{ height: '100%' }}>
							<Box css={{ flex: '1' }}>
								<MotionBox
									variants={{
										locked: {
											transform: `translateY(-50px)`,
											transition: {
												type: 'spring',
												stiffness: 200,
												damping: 20,
											},
										},
										unlocked: () => ({
											transform: 'translateY(0px)',
											transition: {
												delay: 0,
												type: 'spring',
												stiffness: 200,
												damping: 26,
											},
										}),
									}}
									css={{
										display: 'flex',
										position: 'relative',
										top: 0,
										left: 0,
										right: 0,
										height: '48px',
										pt: '6px',
										pl: '6px',
										pr: '6px',
									}}
								>
									<Button
										color="ghost"
										iconOnly
										size="3"
										aria-label="go back"
										onClick={handleCloseModal}
										css={{ mt: '2px' }}
									>
										<LeftArrowIcon />
									</Button>
								</MotionBox>
								<HardwareWalletReconnect />
								<Box css={{ pt: '12px', px: '23px', flex: '1' }}>
									<Text bold size="10">
										Confirm swap
									</Text>
									<InfoStatBlock
										addressBookBackground={entry?.background}
										statSubTitle={`From: ${shortAddress} (${balance}${fromToken?.symbol.toUpperCase()})`}
										statTitle={entry?.name || ''}
									/>
									{pool && <InfoStatBlock image={pool.image} statSubTitle="Pool:" statTitle={pool.name} />}
									<InfoStatBlock
										image={fromToken?.image || fromToken?.iconURL}
										statSubTitle="You pay:"
										statTitle={`${formatBigNumber(amount)} ${fromToken?.symbol.toUpperCase()}`}
									/>
									<InfoStatBlock
										image={toToken?.image || toToken?.iconURL}
										statSubTitle="You receive:"
										statTitle={`${formatBigNumber(receive)} ${toToken?.symbol.toUpperCase()}`}
									/>
									<FeeBox
										isConfirmFeeBox
										fromToken={fromToken}
										toToken={toToken}
										amount={amount}
										receive={receive}
										txFee={txFee}
										poolFee={poolFee}
										z3usFee={z3usFee}
										z3usBurn={z3usBurn}
										pool={pool}
										minimum={minimum}
										slippage={slippage}
										css={{ mt: '12px' }}
									/>
									<Box css={{ mt: '$1', display: 'none' }}>
										<HoverCard>
											<HoverCardTrigger asChild>
												<Flex css={{ color: '$txtHelp', display: 'inline-flex', textDecoration: 'underline' }}>
													<Text size="2" css={{ mr: '$1' }}>
														Swap {`T&C's`}
													</Text>
													<InfoCircledIcon />
												</Flex>
											</HoverCardTrigger>
											<HoverCardContent
												side="top"
												sideOffset={5}
												css={{ maxWidth: '240px', pointerEvents: 'auto', zIndex: '99' }}
											>
												<Flex css={{ flexDirection: 'column', gap: 10, color: '$txtHelp' }}>
													<Text size="2">
														Presented fees and rates are indicative and are subject to change. Once submitted to the
														network, wallet and transaction fees apply at all times and are not refundable. By
														confirming swap you agree to our{' '}
														<StyledLink
															underline
															href="https://z3us.com/terms"
															target="_blank"
															onMouseDown={() => {
																// @TODO: Seems to be an issue using a hover card inside a dialog
																// https://github.com/radix-ui/primitives/issues/920
																window.open('https://z3us.com/terms', '_blank').focus()
															}}
														>
															T&amp;C
														</StyledLink>{' '}
														{pool && (
															<>
																, additional T&amp;C of {pool.name} may apply, learn more{' '}
																<StyledLink
																	underline
																	href={pool.url}
																	target="_blank"
																	onMouseDown={() => {
																		// @TODO: Seems to be an issue using a hover card inside a dialog
																		// https://github.com/radix-ui/primitives/issues/920
																		window.open(pool.url, '_blank').focus()
																	}}
																>
																	{pool.url}
																</StyledLink>
																.
															</>
														)}
													</Text>
												</Flex>
											</HoverCardContent>
										</HoverCard>
									</Box>
								</Box>
							</Box>
							<Box>
								<Flex css={{ p: '$2' }}>
									<Button
										size="6"
										color="tertiary"
										aria-label="cancel send token"
										fullWidth
										css={{ px: '0', flex: '1', mr: '$1' }}
										onClick={handleCloseModal}
									>
										Cancel
									</Button>
									<AlertDialog open={state.isSendingAlertOpen}>
										<AlertDialogTrigger asChild>
											<Button
												size="6"
												color="primary"
												aria-label="confirm send token"
												css={{ px: '0', flex: '1', ml: '$1' }}
												onClick={handleConfirmSend}
												disabled={!account}
												fullWidth
											>
												Confirm swap
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
																	<Box as="span">
																		{state.isSendingTransaction ? 'Sending transaction' : 'Transaction sent'}
																	</Box>
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
														<InputFeedBack showFeedback={state.errorMessage !== ''} animateHeight={51}>
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
																<Button size="2" color="ghost" aria-label="go back" onClick={handleCloseModal}>
																	<ArrowLeftIcon />
																	Go back
																</Button>
															</Box>
														</InputFeedBack>
													</Flex>
												</Box>
												<Box css={{ mt: '$2' }}>
													<Button
														size="6"
														color="primary"
														aria-label="Close confirm send"
														css={{ px: '0', flex: '1' }}
														onClick={handleCloseIsSendingAlertModal}
														disabled={state.isSendingTransaction}
														fullWidth
													>
														Close
													</Button>
												</Box>
											</Flex>
										</AlertDialogContent>
									</AlertDialog>
								</Flex>
							</Box>
						</Flex>
					</ScrollArea>
				</Flex>
			</DialogContent>
		</Dialog>
	)
}
