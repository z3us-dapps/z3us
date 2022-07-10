/* eslint-disable no-console */
import React from 'react'
import BigNumber from 'bignumber.js'
import { useImmer } from 'use-immer'
import { Amount, AccountAddress } from '@radixdlt/application'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import Button from 'ui/src/components/button'
import Toast, { useToastControls } from 'ui/src/components/toasts'
import Input from 'ui/src/components/input'
import AlertCard from 'ui/src/components/alert-card'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import { useZ3usWallet } from 'hooks/use-z3us-wallet'
import Seperator from 'components/seperator'

const XRD = {
	symbol: 'xrd',
	rri: 'xrd_rr1qy5wfsfh',
}

export const safelyUnwrapAmount = (amount: number): string | null => {
	const bigAmount = new BigNumber(amount)
	const amountInput = bigAmount.shiftedBy(18) // Atto
	const amountResult = Amount.fromUnsafe(amountInput.toFixed())
	if (amountResult && amountResult.isErr()) {
		console.log('Invalid amount string, did you input a number?')
		return null
	}

	return amountResult ? amountInput.toFixed() : null
}

export const Example = () => {
	const { show } = useToastControls()
	const { address, connect, disconnect, submitTransaction } = useZ3usWallet()
	const [state, setState] = useImmer({
		to: '',
		amount: '',
		message: 'This is a test message',
		encrypt: false,
		isAddressValid: false,
	})

	const handleConnect = () => {
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
		if (!state.amount) {
			return
		}
		try {
			// https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/radixdlt/radixdlt-network-gateway/1.1.1/gateway-api-spec.yaml#tag/Transaction/paths/~1transaction~1build/post
			const tx = {
				actions: [
					{
						type: 'TransferTokens',
						from_account: {
							address: address.toString(),
						},
						to_account: {
							address: state.to,
						},
						amount: {
							token_identifier: {
								rri: XRD.rri,
							},
							value: state.amount,
						},
					},
				],
				message: state.message,
				encryptMessage: state.encrypt,
			}
			const response = await submitTransaction(tx)
			console.log(response)
			show('toast-first')
		} catch (error: unknown) {
			console.error(error)
		}
	}

	const handleAddressChange = e => {
		const result = AccountAddress.fromUnsafe(e.target.value)
		setState(draft => {
			draft.to = e.target.value
			draft.isAddressValid = result.isOk()
		})
	}

	const handleAmountChange = e => {
		setState(draft => {
			draft.amount = safelyUnwrapAmount(+e.target.value)
		})
	}

	const handleMessageChange = e => {
		setState(draft => {
			draft.message = e.target.value
		})
	}

	const handleSetEncrypt = checked => {
		setState(draft => {
			draft.encrypt = checked === true
		})
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
				) : (
					<AlertCard icon color="success" css={{ mt: '$4', height: '40px' }}>
						<Text medium size="4" css={{ mb: '3px', pl: '$3', mt: '8px' }}>
							Connected!
						</Text>
					</AlertCard>
				)}

				<Seperator title="Connect Z3US wallet" />

				<Flex align="center" css={{ pt: '0' }}>
					<Button size="6" color="primary" onClick={!address ? handleConnect : handleDisconnect}>
						{!address ? 'Connect' : 'Disconnect'}
					</Button>
				</Flex>

				<Seperator title="Build transaction, sign and send with Z3US wallet" />

				<Box>
					<Input value={address ? address.toString() : ''} size="2" placeholder="From address" disabled />
					<Input
						css={{ mt: '$3' }}
						value={state.to}
						size="2"
						placeholder="To address"
						onChange={handleAddressChange}
						disabled={!address}
					/>
					<Input
						type="number"
						css={{ mt: '$3' }}
						size="2"
						placeholder="Amount"
						onChange={handleAmountChange}
						disabled={!address}
					/>
					<Flex css={{ pt: '$4', maxWidth: '600px', width: '100%' }}>
						<Input
							value={state.message}
							as="textarea"
							size="2"
							placeholder="Message"
							css={{ minHeight: '120px', width: '100%' }}
							onChange={handleMessageChange}
							disabled={!address}
						/>
					</Flex>
					<Flex align="center" css={{ pt: '$3' }}>
						<Checkbox id="encrypt" size="1" onCheckedChange={handleSetEncrypt} checked={state.encrypt}>
							<CheckIcon />
						</Checkbox>
						<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="encrypt">
							Encrypt
						</Text>
					</Flex>

					<Flex css={{ pt: '$4' }}>
						<Button size="5" color="primary" onClick={handleTx} disabled={!address || !state.isAddressValid}>
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
