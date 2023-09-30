import { messageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import {
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
	type WalletInteractionResponseItems,
} from '@radixdlt/radix-dapp-toolkit'
import { Convert, Curve } from '@radixdlt/radix-engine-toolkit'
import { blake2b } from 'blakejs'
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

import { MessageAction, WalletInteractionWithTabId } from '@src/browser/app/types'
import { Z3USEvent } from '@src/browser/messages/types'
import { signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { useAccounts } from '@src/hooks/use-accounts'
import { useMessageClient } from '@src/hooks/use-message-client'
import { usePersonas } from '@src/hooks/use-personas'
import { useSelectAccountsModal } from '@src/hooks/use-select-accounts-modal'
import { useSelectPersonaModal } from '@src/hooks/use-select-persona-modal'
import { useSendTransaction } from '@src/hooks/use-send-transaction'
import { useSignModal } from '@src/hooks/use-sign-modal'
import { getInteraction, removeInteraction } from '@src/radix/interaction'

const messages = defineMessages({
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
	const personas = usePersonas()
	const accounts = useAccounts()
	const { personaIndexes, accountIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes,
		accountIndexes: state.accountIndexes,
	}))

	const [isCanceled, setIsCanceled] = useState<boolean>(false)
	const [interaction, setInteraction] = useState<WalletInteractionWithTabId | undefined>()

	const { data } = useEntityMetadata(interaction?.metadata.dAppDefinitionAddress)
	const dappName = getStringMetadata('name', data)

	useEffect(() => {
		const listener = (event: Z3USEvent) => {
			const { detail } = event
			const { data } = detail

			if (interaction && data?.interactionId === interaction.interactionId) {
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
		reset: boolean,
	): Promise<AccountsRequestResponseItem | undefined> => {
		if (!req) {
			return
		}
		const { challenge, numberOfAccounts } = req
		const selectedIndexes = await selectAccounts(numberOfAccounts.quantity, numberOfAccounts.quantifier === 'exactly')
		if (!selectedIndexes || selectedIndexes.length === 0) {
			return
		}

		let proofs: AccountProof[]
		if (challenge) {
			proofs = await Promise.all<AccountProof>(
				Object.keys(accountIndexes).map(async (idx, position) => {
					if (!selectedIndexes.includes(+idx)) return null
					const account = accounts[position]
					const password = await confirm(intl.formatMessage(messages.account_proof_for_dapp, { dappName }))
					const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
						'account',
						password,
						getDataToSign(challenge, interaction.metadata.origin, interaction.metadata.dAppDefinitionAddress),
						+idx,
					)
					if (!signatureWithPublicKey) {
						throw new Error(intl.formatMessage(messages.login_declined))
					}
					const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)

					return {
						accountAddress: account.address,
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

		return { accounts, challenge, proofs }
	}

	const buildPersonaDataResponseItem = async (
		req?: PersonaDataRequestItem,
		reset: boolean,
	): Promise<PersonaDataRequestResponseItem> => {
		if (!req) {
			return
		}
		throw new Error('Not implemented')
	}

	const login = async (
		request: AuthUsePersonaRequestItem | AuthLoginWithChallengeRequestItem | AuthLoginWithoutChallengeRequestItem,
	): Promise<AuthRequestResponseItem> => {
		switch (request?.discriminator) {
			case 'usePersona':
				return await usePersona(request)
			case 'loginWithChallenge':
				return await loginWithChallenge(request)
			case 'loginWithoutChallenge':
				return await loginWithoutChallenge(request)
			default:
				return
		}
	}

	const usePersona = async (req: AuthUsePersonaRequestItem): Promise<AuthUsePersonaRequestResponseItem> => {
		return {
			discriminator: req.discriminator,
			persona: personas.find(persona => persona.identityAddress === req.identityAddress),
		}
	}

	const loginWithChallenge = async ({
		challenge,
		discriminator,
	}: AuthLoginWithChallengeRequestItem): Promise<AuthLoginWithChallengeRequestResponseItem> => {
		const selectedIndex = await selectPersona()
		const position = Object.keys(personaIndexes).findIndex(idx => +idx === selectedIndex)
		const persona = personas[position]
		if (!persona) {
			throw new Error(intl.formatMessage(messages.login_declined))
		}

		let proof: AuthLoginWithChallengeRequestResponseItem['proof']
		if (challenge) {
			const password = await confirm(intl.formatMessage(messages.login_challenge, { dappName }))
			const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
				'persona',
				password,
				getDataToSign(challenge, interaction.metadata.origin, interaction.metadata.dAppDefinitionAddress),
				selectedIndex,
			)
			if (!signatureWithPublicKey) {
				throw new Error(intl.formatMessage(messages.login_declined))
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
		const position = Object.keys(personaIndexes).findIndex(idx => +idx === selectedIndex)
		const persona = personas[position]
		if (!persona) {
			throw new Error(intl.formatMessage(messages.login_declined))
		}

		return {
			discriminator: req.discriminator,
			persona,
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
					console.error(`Unhandled wallet interaction: ${interaction.items.discriminator}`)
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
			window.close()
		}
	}

	return (
		<Box>
			<h1>{dappName}</h1>
			<Input value={JSON.stringify(interaction)} elementType="textarea" type="text" disabled />
			<Button onClick={handleInteraction} styleVariant="tertiary" sizeVariant="xlarge" fullWidth disabled={isCanceled}>
				{isCanceled ? intl.formatMessage(messages.canceled) : intl.formatMessage(messages.interact)}
			</Button>
		</Box>
	)
}

export default Home
