import type { Account, Persona } from '@radixdlt/radix-dapp-toolkit'
import { Convert, OlympiaNetwork, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import type { PublicKey } from '@radixdlt/radix-engine-toolkit'

import type { AddressBook, AddressIndexes } from 'ui/src/store/types'

import { newMessage } from './message'
import type { GetPublicKeyMessage } from './message-handlers'
import type { MessageHandler } from './types'
import { MessageAction, MessageSource } from './types'

const getPublicKey =
	(handler: MessageHandler) =>
	(index: number): Promise<PublicKey | null> =>
		handler(
			newMessage(MessageAction.GET_PUBLIC_KEY, MessageSource.BACKGROUND, MessageSource.BACKGROUND, {
				index,
			} as GetPublicKeyMessage),
		)

const personaReducer =
	(publicMessageHandler: MessageHandler, accountIndexes: AddressIndexes, networkId: number) =>
	async (container, idx) => {
		container = await container
		const publicKey = await getPublicKey(publicMessageHandler)(idx)
		if (!publicKey) return container

		const details = accountIndexes[idx]

		const virtualIdentityAddress = await RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(
			publicKey,
			networkId,
		)

		const identityAddress = virtualIdentityAddress.toString()

		container.push({
			identityAddress,
			label: details.label || `Unknown: ${idx}`,
		} as Persona)

		return container
	}

const accountReducer =
	(publicMessageHandler: MessageHandler, addressBook: AddressBook, networkId: number) => async (container, idx) => {
		container = await container
		const publicKey = await getPublicKey(publicMessageHandler)(idx)
		if (!publicKey) return container

		const accountAddress = await RadixEngineToolkit.Derive.virtualAccountAddressFromPublicKey(publicKey, networkId)
		const address = accountAddress.toString()

		container.push({
			address,
			label: addressBook[address]?.name || `Unknown: ${idx}`,
			appearanceId: container.length + 1,
		} as Account)
		return container
	}

const olympiaReducer =
	(publicMessageHandler: MessageHandler, accountIndexes: AddressIndexes, addressBook: AddressBook) =>
	async (container, idx) => {
		container = await container

		const details = accountIndexes[idx]
		let address = details.olympiaAddress
		let publicKeyHex = ''

		const publicKey = await getPublicKey(publicMessageHandler)(idx)
		if (publicKey) {
			const accountAddress = await RadixEngineToolkit.Derive.olympiaAccountAddressFromPublicKey(
				publicKey.publicKey,
				OlympiaNetwork.Mainnet,
			)
			address = accountAddress.toString()
			publicKeyHex = publicKey.hexString()
		} else if (address) {
			// its hardware wallet entry
			const publicKeyBuffer = await RadixEngineToolkit.Derive.publicKeyFromOlympiaAccountAddress(address)
			publicKeyHex = Convert.Uint8Array.toHexString(publicKeyBuffer)
		} else {
			return container
		}

		if (!publicKeyHex) return container

		container.push({
			index: idx,
			publicKey: publicKeyHex,
			address,
			label: addressBook[address]?.name || `From index: ${idx}`,
		})
		return container
	}

export const derivePersonas = (
	publicMessageHandler: MessageHandler,
	accountIndexes: AddressIndexes,
	networkId: number,
) => Object.keys(accountIndexes).reduce(personaReducer(publicMessageHandler, accountIndexes, networkId), [])

export const deriveAccounts = (
	publicMessageHandler: MessageHandler,
	addressBook: AddressBook,
	accountIndexes: AddressIndexes,
	networkId: number,
) => Object.keys(accountIndexes).reduce(accountReducer(publicMessageHandler, addressBook, networkId), [])

export const deriveOlympiaAddresses = (
	publicMessageHandler: MessageHandler,
	addressBook: AddressBook,
	accountIndexes: AddressIndexes,
) => Object.keys(accountIndexes).reduce(olympiaReducer(publicMessageHandler, accountIndexes, addressBook), [])
