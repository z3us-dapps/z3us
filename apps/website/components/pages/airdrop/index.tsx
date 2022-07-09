/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { AccountAddress, sha256, Signature, AccountAddressT } from '@radixdlt/application'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
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
import Button from 'ui/src/components/button'
import Toast, { useToastControls } from 'ui/src/components/toasts'
import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { useZ3usWallet } from 'hooks/use-z3us-wallet'
import Input from 'ui/src/components/input'
import usePortal from 'react-useportal'

const verifySignature = (address: AccountAddressT, signatureDER: string, payload: string): boolean => {
	const signatureResult = Signature.fromDER(signatureDER)
	if (!signatureResult.isOk()) throw signatureResult.error

	return address.publicKey.isValidSignature({
		signature: signatureResult.value,
		hashedMessage: sha256(payload),
	})
}

export const Airdrop = () => {
	const { show } = useToastControls()
	const { Portal, isOpen, openPortal, closePortal } = usePortal({
		onOpen({ portal }) {
			portal.current.style.cssText = `
		  position: fixed;
		  left: 50%;
		  top: 50%;
		  transform: translate(-50%,-50%);
		  z-index: 1000;
		`
		},
	})
	const { address, connect, disconnect, sign, hasWallet, accounts } = useZ3usWallet()
	const [state, setState] = useImmer({
		address: '',
		addresses: [],
		hasWallet: true,
		der: '',
		errorMessage: '',
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
			console.error(error)
			setState(draft => {
				draft.errorMessage = error?.message || 'Invalid signature'
			})
			show('toast-error')
		}
	}

	const handleSign = async e => {
		if (!address) return
		const result = AccountAddress.fromUnsafe(address)
		if (!result.isOk()) {
			console.error(result.error)
			return
		}
		try {
			const payload = `z3us-airdrop-${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}`
			const der = await sign(payload)
			if (verifySignature(result.value, der, payload)) {
				throw new Error('Invalid signature')
			}
			setState(draft => {
				draft.errorMessage = ''
				draft.der = der
			})
			openPortal(e)
		} catch (error) {
			console.error(error)
			setState(draft => {
				draft.errorMessage = error?.message || 'Invalid signature'
			})
			show('toast-error')
		}
	}

	return (
		<Box>
			<Box css={{ maxWidth: '100%' }}>
				{!address && (
					<AlertCard icon color="warning" css={{ mt: '$4', height: '40px' }}>
						<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
							{`${
								state.hasWallet ? 'Install and connect' : 'Connect'
							}  Z3US wallet in order to subscribe for community airdrop.`}
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
			{isOpen && (
				<Portal>
					<Box css={{ mt: '$4' }}>
						<Text>
							<a href="tg://resolve?domain=z3us_dapps_bot">Contact Z3US Bot</a> with following message:
						</Text>
						<Input
							value={`/subscribe ${state.address}`}
							as="textarea"
							size="2"
							placeholder="Message"
							css={{ minHeight: '120px', width: '100%', pt: '$2' }}
							disabled
						/>
						<Button
							size="5"
							color="primary"
							onClick={e => {
								closePortal(e)
								setState(draft => {
									draft.errorMessage = ''
									draft.der = ''
								})
							}}
						>
							Close
						</Button>
					</Box>
				</Portal>
			)}
		</Box>
	)
}
