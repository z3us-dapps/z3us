import React from 'react'
import BigNumber from 'bignumber.js'
import { useQueryClient } from 'react-query'
import { useLocation } from 'wouter'
import { useEventListener } from 'usehooks-ts'
import { Pool, Token } from '@src/types'
import AlertCard from 'ui/src/components/alert-card'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { LeftArrowIcon } from 'ui/src/components/icons'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { BuiltTransactionReadyToSign } from '@radixdlt/application'
import { useTransaction } from '@src/hooks/use-transaction'
import { useImmer } from 'use-immer'
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
import { FeeBox } from '../fee-box'

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
	z3usBurn?: BigNumber
	txFee: BigNumber
	transaction: BuiltTransactionReadyToSign
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
	const [state, setState] = useImmer({
		txID: '',
		errorMessage: '',
		isSendingAlertOpen: false,
		isSendingTransaction: false,
		isModalOpen: false,
	})

	const address = account?.address?.toString()
	const entry = addressBook[address] || publicAddresses.find(_account => _account.address === address)
	const shortAddress = getShortAddress(address)

	const handleOnClick = () => {
		setState(draft => {
			draft.isModalOpen = !draft.isModalOpen
			draft.isSendingAlertOpen = false
		})
	}

	const handleCloseModal = () => {
		setState(draft => {
			draft.isSendingAlertOpen = false
			draft.isModalOpen = false
		})
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
			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setState(draft => {
				draft.txID = result.txID
				draft.errorMessage = ''
				draft.isSendingAlertOpen = false
				draft.isModalOpen = false
				draft.isSendingTransaction = false
			})
			setLocation(`/wallet/account/token/${toToken.rri}`)
		} catch (error) {
			setState(draft => {
				draft.isSendingTransaction = false
				draft.errorMessage = (error?.message || error).toString().trim()
			})
		}
	}

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setState(draft => {
				draft.isModalOpen = false
			})
		}
	})

	return (
		<Dialog open={state.isModalOpen}>
			<DialogTrigger asChild onClick={handleOnClick}>
				{trigger}
			</DialogTrigger>
			<DialogContent>
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
						overflowY: 'auto',
					}}
				>
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
						<Button color="ghost" iconOnly size="3" aria-label="go back" onClick={handleCloseModal} css={{ mt: '2px' }}>
							<LeftArrowIcon />
						</Button>
					</MotionBox>
					<HardwareWalletReconnect />
					<Box css={{ p: '$2', px: '23px', flex: '1' }}>
						<Box>
							<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Confirm send</Text>
							<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>
								Transaction details:
							</Text>
						</Box>
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

						<FeeBox fromToken={fromToken} txFee={txFee} poolFee={poolFee} z3usFee={z3usFee} z3usBurn={z3usBurn} />

						<Box>
							<AlertCard icon color="warning" css={{ mt: '$4' }}>
								<Flex justify="between" css={{ flex: 'auto' }}>
									<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
										Presented fees and rates are indicative and are subject to change. Once submitted to the network,
										wallet and transaction fees apply at all times and are not refundable. By confirming swap you agree
										to our{' '}
										<StyledLink underline href="https://z3us.com/terms" target="_blank">
											T&amp;C
										</StyledLink>{' '}
										{pool && (
											<>
												, additional T&amp;C of {pool.name} may apply, learn more{' '}
												<StyledLink underline href={pool.url} target="_blank">
													{pool.url}
												</StyledLink>
												.
											</>
										)}
									</Text>
								</Flex>
							</AlertCard>
						</Box>
					</Box>
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
											onClick={handleCloseModal}
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
				</Flex>
			</DialogContent>
		</Dialog>
	)
}

SwapModal.defaultProps = {
	z3usBurn: null,
}
