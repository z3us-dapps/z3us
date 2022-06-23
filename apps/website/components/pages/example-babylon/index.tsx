/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import Button from 'ui/src/components/button'
import Toast, { useToastControls } from 'ui/src/components/toasts'
import Input from 'ui/src/components/input'
import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { useZ3usWallet } from 'hooks/use-z3us-wallet'
import Seperator from 'components/seperator'
import { ManifestBuilder } from 'pte-sdk'

const API_URL = 'https://pte01.radixdlt.com/'
const componentAddress = '0276b537d9fc474d86edd48bfaa2843e87b48765767357ab9e403d'

export const Example = () => {
	const { show } = useToastControls()
	const { connect, disconnect, submitTransaction } = useZ3usWallet()

	const [state, setState] = useImmer({
		time: new Date().getTime(),
		address: '',
		manifest: '',
		resources: null,
	})

	const fetchAssets = async address => {
		const response = await fetch(`${API_URL}component/${address}`)
		const component = await response.json()
		setState(draft => {
			draft.resources = component.owned_resources
		})
	}

	useEffect(() => {
		disconnect() // always disconnect for testing purpose since PTE is not rly valid connected network
	}, [])

	useEffect(() => {
		if (!state.address) return

		setState(draft => {
			draft.time = new Date().getTime()
			draft.manifest = new ManifestBuilder()
				.withdrawFromAccountByAmount(state.address, 1, '030000000000000000000000000000000000000000000000000004')
				.callMethod(componentAddress, 'buy_gumball', ['Decimal("1.0")'])
				.callMethodWithAllResources(state.address, 'deposit_batch')
				.build()
				.toString()
		})
	}, [state.address])

	useEffect(() => {
		if (!state.address) return

		fetchAssets(state.address)
	}, [state.time])

	const handleManifestChange = e => {
		setState(draft => {
			draft.manifest = e.target.value
		})
	}

	const handleConnectWallet = async () => {
		try {
			const address = await connect()
			setState(draft => {
				draft.address = address
			})
		} catch (error: unknown) {
			console.error(error)
		}
	}

	const handleTx = async () => {
		if (!state.manifest) return
		try {
			const response = await submitTransaction({ manifest: state.manifest })
			console.log(response)
			show('toast-first')
		} catch (error: unknown) {
			console.error(error)
		}

		setState(draft => {
			draft.time = new Date().getTime()
		})
	}

	return (
		<Box>
			<Box css={{ maxWidth: '100%' }}>
				{!state.address ? (
					<AlertCard icon color="warning" css={{ mt: '$4', height: '40px' }}>
						<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
							Connect Z3US wallet before attempting to send a transaction.
						</Text>
					</AlertCard>
				) : null}

				<Seperator title="Connect Z3US wallet" />

				<Flex align="center" css={{ pt: '0' }}>
					<Button size="6" color="primary" onClick={handleConnectWallet}>
						Connect to PTE
					</Button>
				</Flex>

				<Seperator title="Assets" />

				{state.resources &&
					state.resources.map(resource => (
						<Box key={resource.resource_address}>
							{resource.name} {Number(resource.amount).toLocaleString()}
						</Box>
					))}

				<Seperator title="Submit with Z3US wallet" />

				<Box>
					<Flex css={{ pt: '$4', maxWidth: '600px', width: '100%' }}>
						<Input
							onChange={handleManifestChange}
							value={state.manifest}
							as="textarea"
							size="2"
							placeholder="Message"
							css={{ minHeight: '120px', width: '100%' }}
							disabled={!state.address}
						/>
					</Flex>
					<Flex css={{ pt: '$4' }}>
						<Button size="5" color="primary" onClick={handleTx} disabled={!state.address}>
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
