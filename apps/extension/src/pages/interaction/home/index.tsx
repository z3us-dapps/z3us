import { messageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type {
	AccountProof,
	AccountsRequestItem,
	AccountsRequestResponseItem,
	AuthLoginWithChallengeRequestItem,
	AuthLoginWithChallengeRequestResponseItem,
	AuthLoginWithoutChallengeRequestItem,
	AuthLoginWithoutChallengeRequestResponseItem,
	AuthRequestResponseItem,
	AuthUsePersonaRequestItem,
	AuthUsePersonaRequestResponseItem,
	PersonaDataRequestItem,
	PersonaDataRequestResponseItem,
	WalletInteractionResponseItems,
} from '@radixdlt/radix-dapp-toolkit'
import type { Curve } from '@radixdlt/radix-engine-toolkit'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { blake2b } from 'blakejs'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Input } from 'ui/src/components/input'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { getStringMetadata } from 'ui/src/services/metadata'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { MessageAction } from '@src/browser/app/types'
import type { Z3USEvent } from '@src/browser/messages/types'
import { signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { useMessageClient } from '@src/hooks/use-message-client'
import { useSelectAccountsModal } from '@src/hooks/use-select-accounts-modal'
import { useSelectPersonaModal } from '@src/hooks/use-select-persona-modal'
import { useSendTransaction } from '@src/hooks/use-send-transaction'
import { useSignModal } from '@src/hooks/use-sign-modal'
import { getInteraction, removeInteraction } from '@src/radix/interaction'

import { DappDetails } from './components/dapp-details'
import { NetworkAlert } from './components/network-alert'

const messages = defineMessages({
	unknown_account: {
		id: 'interaction.unknown_account',
		defaultMessage: 'Account: {appearanceId}',
	},
	interact: {
		id: 'interaction.button_interact',
		defaultMessage: 'Interact',
	},
	canceled: {
		id: 'interaction.canceled',
		defaultMessage: 'Canceled by dApp',
	},
	failure: {
		id: 'interaction.failure',
		defaultMessage: 'Interaction failed',
	},
	login_declined: {
		id: 'interaction.login_declined',
		defaultMessage: 'User declined to login',
	},
	signature_failed: {
		id: 'interaction.signature_failed',
		defaultMessage: 'Failed to generate signature',
	},
	account_proof_for_dapp: {
		id: 'interaction.account_proof_for_dapp',
		defaultMessage: 'dApp {dappName} requires proof of account ownership',
	},
	login_challenge: {
		id: 'interaction.login_challenge',
		defaultMessage: 'Login to dApp {dappName}',
	},
})

function proofCurve(curve: Curve): AuthLoginWithChallengeRequestResponseItem['proof']['curve'] {
	switch (curve) {
		case 'Secp256k1':
			return 'secp256k1'
		case 'Ed25519':
			return 'curve25519'
		default:
			throw new Error(`Unknown curve: ${curve}`)
	}
}

function hash(data: Uint8Array): Uint8Array {
	return blake2b(data, undefined, 32)
}

function getDataToSign(challengeHex: string, origin: string, dAppDefinitionAddress: string): Uint8Array {
	if (dAppDefinitionAddress.length > 255) {
		throw new Error('dAppDefinitionAddress length exceeds maximum value')
	}
	const ROLA_PAYLOAD_PREFIX = 0x52
	const challengeHexBytes = Convert.HexString.toUint8Array(challengeHex)
	const dAppDefinitionAddressLength = dAppDefinitionAddress.length
	const dAppDefinitionAddressBytes = dAppDefinitionAddress.split('').map(char => char.charCodeAt(0))
	const originBytes = origin.split('').map(char => char.charCodeAt(0))

	return hash(
		new Uint8Array([
			ROLA_PAYLOAD_PREFIX,
			...challengeHexBytes,
			dAppDefinitionAddressLength,
			...dAppDefinitionAddressBytes,
			...originBytes,
		]),
	)
}

export const Home: React.FC = () => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const client = useMessageClient()
	const sendTransaction = useSendTransaction()
	const confirm = useSignModal()
	const selectPersona = useSelectPersonaModal()
	const selectAccounts = useSelectAccountsModal()
	const networkId = useNetworkId()
	const { personaIndexes, accountIndexes, addressBook } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const [isCanceled, setIsCanceled] = useState<boolean>(false)
	const [interaction, setInteraction] = useState<WalletInteractionWithTabId | undefined>()

	const metadata: any = interaction?.metadata || {}
	const { data } = useEntityMetadata(metadata.dAppDefinitionAddress)
	const dappName = getStringMetadata('name', data)

	useEffect(() => {
		const listener = (event: Z3USEvent) => {
			const { detail } = event
			const { data: message } = detail

			if (interaction && message?.interactionId === interaction.interactionId) {
				setIsCanceled(true)
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.requestCancelSuccess,
						interactionId,
					),
				)
			} else {
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.requestCancelFail,
						interactionId,
					),
				)
			}
		}

		window.addEventListener(`z3us.${MessageAction.APP_INTERACTION_CANCEL}`, listener)
		return () => {
			window.removeEventListener(`z3us.${MessageAction.APP_INTERACTION_CANCEL}`, listener)
		}
	}, [interaction])

	useEffect(() => {
		if (!interactionId) return
		getInteraction(interactionId)
			.then(i => {
				setInteraction(i)
				return browser.tabs.sendMessage(
					i.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.receivedByWallet,
						interactionId,
					),
				)
			})
			.then(() => removeInteraction(interactionId))
	}, [interactionId])

	const buildAccountsResponseItem = async (
		req?: AccountsRequestItem,
		reset: boolean = false,
	): Promise<AccountsRequestResponseItem | undefined> => {
		if (!req) {
			return undefined
		}
		if (reset) {
			// eslint-disable-next-line no-console
			console.error('Need to reset stored values!')
		}
		const { challenge, numberOfAccounts } = req
		const selectedIndexes = await selectAccounts(numberOfAccounts.quantity, numberOfAccounts.quantifier === 'exactly')
		if (!selectedIndexes || selectedIndexes.length === 0) {
			return undefined
		}

		let proofs: AccountProof[]
		if (challenge) {
			proofs = await Promise.all<AccountProof>(
				selectedIndexes.map(async idx => {
					const password = await confirm(intl.formatMessage(messages.account_proof_for_dapp, { dappName }))
					const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
						'account',
						password,
						getDataToSign(challenge, metadata.origin, metadata.dAppDefinitionAddress),
						idx,
					)
					if (!signatureWithPublicKey) {
						throw new Error(intl.formatMessage(messages.signature_failed))
					}
					const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)

					return {
						accountAddress: accountIndexes[idx].address,
						proof: {
							signature: signature.signature,
							publicKey: signature.publicKey,
							curve: proofCurve(signature.curve),
						},
					}
				}),
			)
			proofs = proofs.filter(proof => proof !== null)
		}

		const accounts = selectedIndexes.map((idx, appearanceId) => ({
			address: accountIndexes[idx].address,
			label:
				addressBook[accountIndexes[idx].address]?.name ||
				intl.formatMessage(messages.unknown_account, { appearanceId }),
			appearanceId,
		}))

		return { accounts, challenge, proofs }
	}

	const buildPersonaDataResponseItem = async (
		req?: PersonaDataRequestItem,
		reset: boolean = false,
	): Promise<PersonaDataRequestResponseItem | undefined> => {
		if (!req) {
			return undefined
		}
		throw new Error(`Not implemented reset: ${reset}`)
	}

	const getPersona = async (req: AuthUsePersonaRequestItem): Promise<AuthUsePersonaRequestResponseItem> => ({
		discriminator: req.discriminator,
		persona: Object.values(personaIndexes).find(persona => persona.identityAddress === req.identityAddress),
	})

	const loginWithChallenge = async ({
		challenge,
		discriminator,
	}: AuthLoginWithChallengeRequestItem): Promise<AuthLoginWithChallengeRequestResponseItem> => {
		const selectedIndex = await selectPersona()
		const persona = personaIndexes[selectedIndex]
		if (!persona) {
			throw new Error(intl.formatMessage(messages.login_declined))
		}

		let proof: AuthLoginWithChallengeRequestResponseItem['proof']
		if (challenge) {
			const password = await confirm(intl.formatMessage(messages.login_challenge, { dappName }))
			const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
				'persona',
				password,
				getDataToSign(challenge, metadata.origin, metadata.dAppDefinitionAddress),
				selectedIndex,
			)
			if (!signatureWithPublicKey) {
				throw new Error(intl.formatMessage(messages.signature_failed))
			}
			const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)
			proof = {
				signature: signature.signature,
				publicKey: signature.publicKey,
				curve: proofCurve(signature.curve),
			}
		}

		return { discriminator, challenge, persona, proof }
	}

	const loginWithoutChallenge = async (
		req: AuthLoginWithoutChallengeRequestItem,
	): Promise<AuthLoginWithoutChallengeRequestResponseItem> => {
		const selectedIndex = await selectPersona()
		const persona = personaIndexes[selectedIndex]
		if (!persona) {
			throw new Error(intl.formatMessage(messages.login_declined))
		}

		return {
			discriminator: req.discriminator,
			persona,
		}
	}

	const login = async (
		request: AuthUsePersonaRequestItem | AuthLoginWithChallengeRequestItem | AuthLoginWithoutChallengeRequestItem,
	): Promise<AuthRequestResponseItem | undefined> => {
		switch (request?.discriminator) {
			case 'usePersona':
				return getPersona(request)
			case 'loginWithChallenge':
				return loginWithChallenge(request)
			case 'loginWithoutChallenge':
				return loginWithoutChallenge(request)
			default:
				return undefined
		}
	}

	const handleInteraction = async () => {
		const request = interaction.items
		if (request.discriminator === 'cancelRequest')
			throw Error(`Can not handle cancelRequest: ${JSON.stringify(interaction)}`)

		try {
			let response: WalletInteractionResponseItems
			switch (request.discriminator) {
				case 'transaction':
					// eslint-disable-next-line no-case-declarations
					const transactionIntentHash = await sendTransaction(request.send)
					response = {
						discriminator: 'transaction',
						send: {
							transactionIntentHash,
						},
					}
					break
				case 'authorizedRequest':
					response = {
						discriminator: 'authorizedRequest',
						auth: await login(request.auth),
						oneTimeAccounts: await buildAccountsResponseItem(request.oneTimeAccounts, request.reset?.accounts || false),
						oneTimePersonaData: await buildPersonaDataResponseItem(
							request.oneTimePersonaData,
							request.reset?.personaData || false,
						),
						ongoingAccounts: await buildAccountsResponseItem(request.ongoingAccounts, request.reset?.accounts || false),
						ongoingPersonaData: await buildPersonaDataResponseItem(
							request.ongoingPersonaData,
							request.reset?.personaData || false,
						),
					}
					break
				case 'unauthorizedRequest':
					response = {
						discriminator: 'unauthorizedRequest',
						oneTimeAccounts: await buildAccountsResponseItem(request.oneTimeAccounts, false),
						oneTimePersonaData: await buildPersonaDataResponseItem(request.oneTimePersonaData, false),
					}
					break
				default:
					throw new Error(`Unhandled wallet interaction: ${interaction.items.discriminator}`)
			}

			await browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'success',
					items: response,
					interactionId,
				}),
			)
		} catch (error) {
			await browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'failure',
					error: error?.message || intl.formatMessage(messages.failure),
					interactionId,
				}),
			)
		} finally {
			// window.close()
		}
	}

	return (
		<Box>
			<DappDetails {...interaction?.metadata} />
			<NetworkAlert {...interaction?.metadata} />

			<Input value={JSON.stringify(interaction)} elementType="textarea" type="text" disabled />

			<Button onClick={handleInteraction} styleVariant="tertiary" sizeVariant="xlarge" fullWidth disabled={isCanceled}>
				{isCanceled ? intl.formatMessage(messages.canceled) : intl.formatMessage(messages.interact)}
			</Button>
		</Box>
	)
}

export default Home
