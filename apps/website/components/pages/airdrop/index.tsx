/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import Confetti from 'react-confetti'
import { useImmer } from 'use-immer'
import { AccountAddress, sha256, Signature, AccountAddressT } from '@radixdlt/application'
import { ChevronDownIcon, ChevronUpIcon, CopyIcon } from '@radix-ui/react-icons'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import { copyTextToClipboard } from 'ui/src/utils/copy-to-clipboard'
import { getHeadTailString } from 'ui/src/utils/get-head-tail-string'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectGroup,
	SelectItem,
	SelectIcon,
	SelectLabel,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
import { Dialog, DialogContent, DialogClose } from 'ui/src/components/dialog'
import Button from 'ui/src/components/button'
import Toast, { useToastControls } from 'ui/src/components/toasts'
import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text, StyledLink } from 'ui/src/components/atoms'
import { useZ3usWallet } from 'hooks/use-z3us-wallet'
import Input from 'ui/src/components/input'
//import { config } from 'config'

const signaturePayload = 'z3us-airdrop'

interface ImmerAirdropState {
	address: string
	addresses: Array<string>
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
	const { address, connect, disconnect, sign, hasWallet, accounts } = useZ3usWallet()
	const [state, setState] = useImmer<ImmerAirdropState>({
		address: '',
		addresses: [],
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
				if (address) {
					const addresses = await accounts()
					setState(draft => {
						draft.address = address.toString()
						draft.addresses = addresses
					})
				}
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

	const setSelectedAddress = (addr: string) => {
		setState(draft => {
			draft.address = addr
		})
	}

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
				draft.address = ''
				draft.addresses = []
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
		if (!state.address) return
		const result = AccountAddress.fromUnsafe(state.address)
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

	return (
		<>
			<Box>
				<Box css={{ maxWidth: '100%' }}>
					{!address ? (
						<AlertCard icon color="warning" css={{ mt: '$4', height: '40px' }}>
							<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
								{`${
									state.hasWallet ? 'Install and connect' : 'Connect'
								}  Z3US wallet in order to subscribe for community airdrop.`}
							</Text>
						</AlertCard>
					) : (
						<AlertCard icon color="success" css={{ mt: '$4', height: '40px' }}>
							<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
								{`Wallet connected for Z3US airdrop ${getHeadTailString(state.address)}.`}
							</Text>
						</AlertCard>
					)}

					<Flex align="center" css={{ pt: '$4' }}>
						<Button size="6" color="primary" onClick={!address ? handleConnect : handleDisconnect}>
							{!address ? 'Connect' : 'Disconnect'}
						</Button>
					</Flex>

					{state.address && (
						<Box css={{ mt: '$4' }}>
							<Box css={{ maxWidth: '300px' }}>
								<Select defaultValue={address} value={state.address} onValueChange={setSelectedAddress}>
									<SelectTrigger aria-label="select address" asChild>
										<Button color="input" size="4" fullWidth>
											<SelectValue />
											<SelectIcon>
												<ChevronDownIcon />
											</SelectIcon>
										</Button>
									</SelectTrigger>
									<SelectContent>
										<SelectScrollUpButton>
											<ChevronUpIcon />
										</SelectScrollUpButton>
										<SelectViewport>
											<SelectGroup>
												<SelectLabel>Select account address</SelectLabel>
												{state.addresses.map(addr => (
													<SelectItem key={addr} value={addr}>
														<SelectItemText>{`${addr?.substring(0, 4)}...${addr?.slice(-4)}`}</SelectItemText>
														<SelectItemIndicator />
													</SelectItem>
												))}
											</SelectGroup>
										</SelectViewport>
										<SelectScrollDownButton>
											<ChevronDownIcon />
										</SelectScrollDownButton>
									</SelectContent>
								</Select>
							</Box>

							<Flex css={{ pt: '$4' }}>
								<Button size="5" color="primary" onClick={handleSign} disabled={!address}>
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
			<Dialog open={state.isSuccessModalOpen}>
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
								<StyledLink underline href={`${config.EXPLORER_URL}/accounts/${state.address}`} target="_blank">
									{getHeadTailString(state.address)}
								</StyledLink>
							</Text>*/}
							{state.der && (
								<Box css={{ py: '$4' }}>
									<Text css={{ pb: '$6', px: '$10', lineHeight: '20px' }}>
										For the final step to complete the Airdrop subscription, please go to the{` `}
										<StyledLink underline target="_blank" href="tg://resolve?domain=z3us_dapps_bot">
											Z3US Telegram Bot
										</StyledLink>{' '}
										and paste the following message:
									</Text>
									<Flex css={{ position: 'relative' }}>
										<Input
											value={`/subscribe ${state.address} ${state.der}`}
											as="textarea"
											size="1"
											placeholder="command"
											css={{ minHeight: '130px', width: '100%' }}
										/>
										<ButtonTipFeedback tooltip="Copy command">
											<Button
												onClick={() => copyTextToClipboard(`/subscribe ${state.address} ${state.der}`)}
												size="2"
												color="primary"
												css={{ position: 'absolute', bottom: '$2', right: '$2' }}
											>
												<CopyIcon />
												Copy
											</Button>
										</ButtonTipFeedback>
									</Flex>
								</Box>
							)}
							<Flex justify="end" css={{ mt: '5px' }}>
								<Button color="ghost" size="3" onClick={handleCloseModal}>
									Cancel
								</Button>
								<DialogClose asChild>
									<Button color="primary" size="3" onClick={handleCloseModal}>
										Close
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
