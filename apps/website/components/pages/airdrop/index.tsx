/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { AccountAddress, sha256, Signature, AccountAddressT } from '@radixdlt/application'
import Button from 'ui/src/components/button'
import Toast, { useToastControls } from 'ui/src/components/toasts'
import Input from 'ui/src/components/input'
import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { useZ3usWallet } from 'hooks/use-z3us-wallet'
import Seperator from 'components/seperator'

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
	const { address, connect, disconnect, sign, hasWallet } = useZ3usWallet()
	const [state, setState] = useImmer({
		hasWallet: true,
		errorMessage: '',
	})

	useEffect(() => {
		const onLoad = async () => {
			try {
				const has = await hasWallet()
				setState(draft => {
					draft.hasWallet = has
				})
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

	const handleConnect = () => {
		try {
			connect()
			setState(draft => {
				draft.errorMessage = ''
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
			})
		} catch (error) {
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
			const payload = `z3us-airdrop-${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}`
			const der = await sign(payload)
			if (verifySignature(result.value, der, payload)) {
				throw new Error('Invalid signature')
			}
			window.open(`tg://resolve?domain=z3us_dapps_bot&text=${address}`)
			setState(draft => {
				draft.errorMessage = ''
			})
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

				<Flex align="center" css={{ pt: '0' }}>
					<Button size="6" color="primary" onClick={!address ? handleConnect : handleDisconnect}>
						{!address ? 'Connect' : 'Disconnect'}
					</Button>
				</Flex>

				<Seperator title="Subscribe for public Airdrop!" />

				<Box>
					<Input value={address ? address.toString() : ''} size="2" placeholder="With address" disabled />

					<Flex css={{ pt: '$4' }}>
						<Button size="5" color="primary" onClick={handleSign} disabled={!address}>
							Subscribe
						</Button>
					</Flex>
				</Box>
			</Box>
			<ul>
				<li>
					<Toast config={{ type: 'error', duration: 4000 }} uniqueId="toast-error">
						{state.errorMessage}
					</Toast>
				</li>
			</ul>
		</Box>
	)
}
