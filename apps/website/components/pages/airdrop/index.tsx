/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import Confetti from 'react-confetti'
import { useImmer } from 'use-immer'
import { AccountAddress, sha256, Signature, AccountAddressT } from '@radixdlt/application'
import { copyTextToClipboard } from 'ui/src/utils/copy-to-clipboard'
import { getHeadTailString } from 'ui/src/utils/get-head-tail-string'
import { Dialog, DialogContent, DialogClose } from 'ui/src/components/dialog'
import Button from 'ui/src/components/button'
import Toast, { useToastControls } from 'ui/src/components/toasts'
import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import { useZ3usWallet } from 'hooks/use-z3us-wallet'
import Input from 'ui/src/components/input'

const signaturePayload = 'z3us-airdrop'

const telegramURL = 'tg://resolve?domain=z3us_dapps_bot'

interface ImmerAirdropState {
	hasWallet: boolean
	der: string
	errorMessage: string
	isSuccessModalOpen: boolean
}

const verifySignature = (address: AccountAddressT, signatureDER: string): boolean => {
	const signatureResult = Signature.fromDER(signatureDER)
	if (!signatureResult.isOk()) throw signatureResult.error

	return address.publicKey.isValidSignature({
		signature: signatureResult.value,
		hashedMessage: sha256(signaturePayload),
	})
}

export const Airdrop = () => {
	const { show } = useToastControls()
	const { width, height } = useWindowSize()
	const { address, connect, disconnect, sign, hasWallet } = useZ3usWallet()
	const [state, setState] = useImmer<ImmerAirdropState>({
		hasWallet: true,
		der: '',
		errorMessage: '',
		isSuccessModalOpen: false,
	})

	useEffect(() => {
		const onLoad = async () => {
			try {
				const has = await hasWallet()
				setState(draft => {
					draft.hasWallet = has
				})
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				setState(draft => {
					draft.errorMessage = error?.message || 'Invalid signature'
				})
				show('toast-error')
			}
		}

		onLoad()
	}, [address])

	const handleConnect = () => {
		try {
			connect()
			setState(draft => {
				draft.errorMessage = ''
				draft.der = ''
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			setState(draft => {
				draft.errorMessage = error?.message || 'Invalid signature'
			})
			show('toast-error')
		}
	}

	const handleDisconnect = () => {
		try {
			disconnect()
			setState(draft => {
				draft.errorMessage = ''
				draft.der = ''
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			setState(draft => {
				draft.errorMessage = error?.message || 'Invalid signature'
			})
			show('toast-error')
		}
	}

	const handleSign = async () => {
		if (!address) return
		const result = AccountAddress.fromUnsafe(address)
		if (!result.isOk()) {
			console.error(result.error)
			return
		}
		try {
			const der = await sign(signaturePayload)
			if (!verifySignature(result.value, der)) {
				throw new Error('Invalid signature')
			}
			setState(draft => {
				draft.errorMessage = ''
				draft.der = der
				draft.isSuccessModalOpen = true
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			setState(draft => {
				draft.errorMessage = error?.message || 'Invalid signature'
			})
			show('toast-error')
		}
	}

	const handleCloseModal = () => {
		setState(draft => {
			draft.isSuccessModalOpen = false
		})
	}

	const handleOpenTelegram = async () => {
		setState(draft => {
			draft.isSuccessModalOpen = false
		})
		await copyTextToClipboard(`/subscribe ${address} ${state.der}`)
		window.open(telegramURL)
	}

	return (
		<>
			<Box>
				<Box css={{ maxWidth: '100%' }}>
					{!address ? (
						<AlertCard icon color="warning" css={{ mt: '$4', height: '40px' }}>
							<Flex justify="between" css={{ mt: '5px', flex: 'auto' }}>
								<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
									{`${
										state.hasWallet ? 'Install and connect' : 'Connect'
									}  Z3US wallet in order to subscribe for community airdrop.`}
								</Text>
								<Flex css={{ pl: '$4', pr: '$3' }}>
									<Button size="3" color="primary" onClick={handleConnect}>
										Connect
									</Button>
								</Flex>
							</Flex>
						</AlertCard>
					) : (
						<AlertCard icon color="success" css={{ mt: '$4', height: '40px' }}>
							<Flex justify="between" css={{ mt: '5px', flex: 'auto' }}>
								<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
									{`Connected with ${getHeadTailString(address)}.`}
								</Text>
								<Flex css={{ pl: '$4', pr: '$2' }}>
									<Button color="red" size="3" onClick={handleDisconnect}>
										Disconnect
									</Button>
								</Flex>
							</Flex>
						</AlertCard>
					)}

					{address && (
						<Box css={{ mt: '$4' }}>
							<AlertCard icon color="warning" css={{ mt: '$4', height: '40px' }}>
								<Flex justify="between" css={{ mt: '5px', flex: 'auto' }}>
									<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
										To change connected account, switch current address on your wallet and then click reconnect.
									</Text>
									<Flex css={{ pl: '$4', pr: '$2' }}>
										<Button color="primary" size="3" onClick={handleConnect}>
											Reconnect
										</Button>
									</Flex>
								</Flex>
							</AlertCard>
							<Flex css={{ pt: '$6' }}>
								<Button color="primary" size="5" onClick={handleSign}>
									Subscribe for public Airdrop!
								</Button>
							</Flex>
						</Box>
					)}
				</Box>
				<ul>
					<li>
						<Toast config={{ type: 'error', duration: 4000 }} uniqueId="toast-error">
							{state.errorMessage}
						</Toast>
					</li>
				</ul>
			</Box>
			<Dialog open={state.isSuccessModalOpen} modal={false}>
				<DialogContent css={{ maxWidth: '500px', position: 'relative' }}>
					<Flex direction="column" css={{ px: '$4', pt: '$8', pb: '$6' }}>
						<Box css={{ ta: 'center' }}>
							<Text bold size="9">
								Congratulations 🥳
							</Text>
							<Text size="6" css={{ mt: '20px' }}>
								You are elligable for the Z3US Airdrop.
							</Text>
							{/*<Text css={{ mt: '20px' }}>
								You will be receiving Z3US tokens in your wallet {` `}
								<StyledLink underline href={`${config.EXPLORER_URL}/accounts/${address}`} target="_blank">
									{getHeadTailString(address)}
								</StyledLink>
							</Text>*/}
							{state.der && (
								<Box css={{ py: '$4' }}>
									<Text css={{ pb: '$6', px: '$4', lineHeight: '20px' }}>
										For the final step to complete the Airdrop subscription, please go to the{` `}
										<StyledLink underline target="_blank" href={telegramURL}>
											Z3US Telegram Bot
										</StyledLink>{' '}
										and paste the following message:
									</Text>
									<Flex css={{ position: 'relative' }}>
										<Input
											value={`/subscribe ${address} ${state.der}`}
											as="textarea"
											size="1"
											placeholder="command"
											css={{ minHeight: '130px', width: '100%' }}
										/>
									</Flex>
								</Box>
							)}
							<Flex justify="end" css={{ mt: '5px' }}>
								<Button color="ghost" size="3" onClick={handleCloseModal}>
									Cancel
								</Button>
								<DialogClose asChild>
									<Button color="primary" size="3" onClick={handleOpenTelegram}>
										Copy and go to Telegram
									</Button>
								</DialogClose>
							</Flex>
						</Box>
					</Flex>
				</DialogContent>
			</Dialog>
			<Confetti
				width={width}
				height={height}
				style={{
					pointerEvents: 'none',
					zIndex: '4',
					position: 'fixed',
					top: '0',
					left: '0',
					right: '0',
					bottom: '0',
				}}
				numberOfPieces={state.isSuccessModalOpen ? 200 : 0}
				onConfettiComplete={confetti => {
					confetti.reset()
				}}
			/>
		</>
	)
}
