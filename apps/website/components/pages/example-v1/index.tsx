/* eslint-disable no-console */
import React from 'react'
import BigNumber from 'bignumber.js'
import { useImmer } from 'use-immer'
import { Amount, AccountAddress, AccountAddressT, Message } from '@radixdlt/application'
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

// https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/radixdlt/radixdlt-network-gateway/1.1.1/gateway-api-spec.yaml#tag/Transaction/paths/~1transaction~1build/post
function newTxFromState(to: string, from: AccountAddressT, amount: string, message: string): object {
	return {
		network_identifier: {
			network: from.network,
		},
		actions: [
			{
				type: 'TransferTokens',
				from_account: {
					address: from.toString(),
				},
				to_account: {
					address: to,
				},
				amount: {
					token_identifier: {
						rri: XRD.rri,
					},
					value: amount,
				},
			},
		],
		fee_payer: {
			address: from.toString(),
		},
		message,
		disable_token_mint_and_burn: true,
	}
}

export const Example = () => {
	const { show } = useToastControls()
	//const { show, close, closeAll } = useToastControls()
	const { address, connect, disconnect, encrypt, sendTransaction } = useZ3usWallet()

	const [state, setState] = useImmer({
		to: '',
		amount: '',
		message: 'this is z3us test',
		encrypted: '',
		isAddressValid: false,
	})

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

	const handleEcrypt = async () => {
		try {
			const response = await encrypt(state.message, address.toString(), state.to)
			setState(draft => {
				draft.encrypted = response || ''
			})
		} catch (error: unknown) {
			console.error(error)
		}
	}

	const handleTx = async () => {
		if (!state.amount) {
			return
		}
		try {
			// eslint-disable-next-line no-nested-ternary
			const msg = state.encrypted
				? state.encrypted
				: state.message
				? Message.createPlaintext(state.message).bytes.toString('hex')
				: ''
			const tx = newTxFromState(state.to, address, state.amount, msg)
			const response = await sendTransaction({ symbol: XRD.symbol, transaction: tx, fromAddress: address.toString() })
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
			draft.encrypted = ''
		})
	}

	return (
		<Box>
			<Box css={{ p: '$8', maxWidth: '800px' }}>
				{!address ? (
					<AlertCard icon color="warning" css={{ mt: '$4' }}>
						<Text medium size="4" css={{ p: '$3' }}>
							Connect z3us wallet before sending transaction
						</Text>
					</AlertCard>
				) : null}

				<Seperator title="Connect z3us wallet" />

				<Flex align="center" css={{ pt: '0' }}>
					<Button size="5" color="primary" onClick={!address ? handleConnectWallet : handleDisconnect}>
						{!address ? 'Connect  ⚡' : 'Disconnect'}
					</Button>
				</Flex>

				<Seperator title="Build transaction, sign and send with z3us wallet" />

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
					<Flex css={{ pt: '$4', width: '600px' }}>
						<Input
							value={state.message}
							as="textarea"
							size="2"
							placeholder="Message"
							css={{ minHeight: '120px', width: '100%' }}
							onChange={handleMessageChange}
							disabled={!address}
						/>
						{state.to && (
							<Button
								size="5"
								css={{ ml: '$5' }}
								color="primary"
								onClick={handleEcrypt}
								disabled={!address || !!state.encrypted}
							>
								{state.encrypted ? 'Encrypted' : 'Encrypt'}
							</Button>
						)}
					</Flex>
					<Flex css={{ pt: '$4' }}>
						<Button size="5" color="primary" onClick={handleTx} disabled={!address || !state.isAddressValid}>
							Send
						</Button>
					</Flex>
				</Box>
			</Box>
			<ul className="controls-list">
				<li>
					<Toast config={{ type: 'success', duration: 4000 }} uniqueId="toast-first">
						Transaction success
					</Toast>
				</li>
			</ul>
		</Box>
	)
}
