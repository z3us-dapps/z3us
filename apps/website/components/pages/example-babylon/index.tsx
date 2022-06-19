/* eslint-disable no-console */
import React from 'react'
import Button from 'ui/src/components/button'
import Toast, { useToastControls } from 'ui/src/components/toasts'
import Input from 'ui/src/components/input'
import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { useZ3usWallet } from 'hooks/use-z3us-wallet'
import Seperator from 'components/seperator'
import { ManifestBuilder } from 'pte-sdk'

const componentAddress = '0276b537d9fc474d86edd48bfaa2843e87b48765767357ab9e403d'

export const Example = () => {
	const { show } = useToastControls()
	const { address, connect, disconnect, submitTransaction } = useZ3usWallet()

	const manifest = new ManifestBuilder()
		.withdrawFromAccountByAmount(address, 1, '030000000000000000000000000000000000000000000000000004')
		.callMethod(componentAddress, 'buy_gumball', ['Decimal("1.0")'])
		.callMethodWithAllResources(address, 'deposit_batch')
		.build()
		.toString()

	const handleConnectWallet = () => {
		try {
			connect()
		} catch (error: unknown) {
			console.error(error)
		}
	}

	const handleDisconnect = () => {
		try {
			disconnect()
		} catch (error: unknown) {
			console.error(error)
		}
	}

	const handleTx = async () => {
		try {
			const response = await submitTransaction({ manifest })
			console.log(response)
			show('toast-first')
		} catch (error: unknown) {
			console.error(error)
		}
	}

	return (
		<Box>
			<Box css={{ maxWidth: '100%' }}>
				{!address ? (
					<AlertCard icon color="warning" css={{ mt: '$4', height: '40px' }}>
						<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
							Connect Z3US wallet before attempting to send a transaction.
						</Text>
					</AlertCard>
				) : null}

				<Seperator title="Connect Z3US wallet" />

				<Flex align="center" css={{ pt: '0' }}>
					<Button size="6" color="primary" onClick={!address ? handleConnectWallet : handleDisconnect}>
						{!address ? 'Connect' : 'Disconnect'}
					</Button>
				</Flex>

				<Seperator title="Submit with Z3US wallet" />

				<Box>
					<Flex css={{ pt: '$4', maxWidth: '600px', width: '100%' }}>
						<Input
							value={manifest}
							as="textarea"
							size="2"
							placeholder="Message"
							css={{ minHeight: '120px', width: '100%' }}
							disabled
						/>
					</Flex>
					<Flex css={{ pt: '$4' }}>
						<Button size="5" color="primary" onClick={handleTx} disabled={!address}>
							Send
						</Button>
					</Flex>
				</Box>
			</Box>
			<ul>
				<li>
					<Toast config={{ type: 'success', duration: 4000 }} uniqueId="toast-first">
						Transaction success
					</Toast>
				</li>
			</ul>
		</Box>
	)
}
