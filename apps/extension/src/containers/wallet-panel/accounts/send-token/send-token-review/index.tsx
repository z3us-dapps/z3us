import React from 'react'
import BigNumber from 'bignumber.js'
import { useQueryClient } from 'react-query'
import { useLocation } from 'wouter'
import { Token } from '@src/services/types'
import { FinalizeTransaction, SubmitSignedTransaction } from '@src/services/radix/transactions'
import { BuiltTransactionReadyToSign } from '@radixdlt/application'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { formatBigNumber } from '@src/utils/formatters'
import { getShortAddress } from '@src/utils/string-utils'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import { InfoStatBlock } from '@src/components/info-stat-block'
import { SlippageBox } from '@src/components/slippage-box'
import { Z3usSpinnerAnimation } from '@src/components/z3us-spinner-animation'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { EXPLORER_URL } from '@src/containers/wallet-panel/config'
import { Box, Text, Flex, StyledLink } from 'ui/src/components/atoms'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from 'ui/src/components/alert-dialog'
import { SendReceiveHeader } from '../../send-receive-header'

interface IProps {
	token: Token
	to: string
	totalTokenAmount: string
	amount: BigNumber
	fee: BigNumber
	transaction: BuiltTransactionReadyToSign
	onExit: () => void
}

export const SendTokenReview: React.FC<IProps> = ({
	token,
	to,
	totalTokenAmount,
	amount,
	transaction,
	fee,
	onExit,
}: IProps) => {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()
	const { account, addressBook, network } = useStore(state => ({
		account: state.account,
		addressBook: state.addressBook,
		network: state.networks[state.selectedNetworkIndex],
	}))
	const [state, setState] = useImmer({
		txID: '',
		errorMessage: '',
		isSendingAlertOpen: false,
		isSendingTransaction: false,
	})

	const address = account?.address?.toString()
	const shortAddress = getShortAddress(address)
	const toShort = getShortAddress(to)
	const tokenSymbol = token.symbol.toUpperCase()

	const handleCancelTransaction = () => {
		onExit()
	}

	const handleGoBack = () => {
		setState(draft => {
			draft.isSendingTransaction = false
			draft.isSendingAlertOpen = false
			draft.errorMessage = ''
		})
		onExit()
	}

	const handleConfirmSend = async () => {
		if (!account) return

		setState(draft => {
			draft.isSendingAlertOpen = true
			draft.isSendingTransaction = true
		})

		try {
			const { blob, txID } = await FinalizeTransaction(network.url, account, token.symbol, transaction)
			setState(draft => {
				draft.txID = txID
			})
			const result = await SubmitSignedTransaction(network.url, account, blob)
			await queryClient.invalidateQueries()
			setState(draft => {
				draft.txID = result.txID
				draft.errorMessage = ''
			})

			setLocation(`/account/token/${token.rri}`)
		} catch (error) {
			setState(draft => {
				draft.errorMessage = (error?.message || error).toString().trim()
			})
		}
		setState(draft => {
			draft.isSendingTransaction = false
		})
	}

	return (
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
			}}
		>
			<SendReceiveHeader />
			<HardwareWalletReconnect />
			<Box css={{ p: '$2', px: '23px', flex: '1' }}>
				<Box>
					<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Confirm send</Text>
					<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>
						Transaction details:
					</Text>
				</Box>
				<InfoStatBlock
					image=""
					statSubTitle={`From: ${shortAddress} (${totalTokenAmount}${tokenSymbol})`}
					statTitle={addressBook[address]?.name || ''}
				/>
				<InfoStatBlock image="" statSubTitle={`to: ${toShort}`} statTitle={addressBook[to]?.name || ''} />
				<InfoStatBlock
					image={token?.image || token?.iconURL}
					statSubTitle="Amount:"
					statTitle={`${formatBigNumber(amount, tokenSymbol)} ${tokenSymbol}`}
				/>
				<SlippageBox token={token} amount={amount} fee={fee} />
			</Box>
			<Flex css={{ p: '$2' }}>
				<Button
					size="6"
					color="tertiary"
					aria-label="cancel send token"
					fullWidth
					css={{ px: '0', flex: '1', mr: '$1' }}
					onClick={handleCancelTransaction}
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
							Confirm send
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<Flex direction="column" css={{ p: '$2', position: 'relative' }}>
							<Box css={{ flex: '1' }}>
								<Flex direction="column" align="center" css={{ bg: '$bgPanel2', width: '100%', py: '$8', br: '$2' }}>
									<Z3usSpinnerAnimation
										infinite={state.isSendingTransaction}
										showAnimation={state.isSendingTransaction}
										lightBgColor="$bgPanel2"
										darkBgColor="$bgPanel2"
									/>
									<Text medium size="7" bold css={{ mt: '30px' }}>
										{state.isSendingTransaction ? 'Sending transaction' : 'Transaction sent'}
									</Text>
									<Box
										css={{
											display: 'block',
											width: '100%',
											pt: '$4',
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
										<Button size="2" color="ghost" aria-label="go back" onClick={handleGoBack}>
											<ArrowLeftIcon />
											Go back
										</Button>
									</Box>
								</Flex>
							</Box>
						</Flex>
					</AlertDialogContent>
				</AlertDialog>
			</Flex>
		</Flex>
	)
}
