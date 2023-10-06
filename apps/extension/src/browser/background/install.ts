/* eslint-disable no-console */
import { Convert, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import { config } from 'ui/src/constants/config'
import { getNoneSharedStore } from 'ui/src/services/state'
import { sharedStore } from 'ui/src/store'
import { CURVE, KeystoreType, SCHEME } from 'ui/src/store/types'
import type { Account, AddressBookEntry, Keystore, NoneSharedState } from 'ui/src/store/types'

import { buildOlympiaDerivationPath } from '@src/crypto/derivation_path'

async function importAccount(
	idx: number,
	account: { address: string; name?: string },
	currentKeystoreState: NoneSharedState,
) {
	const { address: olympiaAddress, name: olympiaName } = account

	const publicKeyBuffer = await RadixEngineToolkit.Derive.publicKeyFromOlympiaAccountAddress(olympiaAddress)
	const publicKeyHex = Convert.Uint8Array.toHexString(publicKeyBuffer)
	const accountAddress = await RadixEngineToolkit.Derive.virtualAccountAddressFromOlympiaAccountAddress(
		olympiaAddress,
		config.defaultNetworkId,
	)
	const address = accountAddress.toString()

	const indexes = currentKeystoreState.accountIndexes[config.defaultNetworkId] || {}
	const current = indexes[address] || {}
	currentKeystoreState.accountIndexes[config.defaultNetworkId] = {
		...indexes,
		[address]: {
			...current,
			address,
			entityIndex: +idx,
			publicKeyHex,
			curve: CURVE.SECP256K1,
			scheme: SCHEME.BIP440OLYMPIA,
			derivationPath: buildOlympiaDerivationPath(idx),
			olympiaAddress,
		} as Account,
	}

	const addressBook = currentKeystoreState.addressBook[config.defaultNetworkId] || {}
	const entry = addressBook[address] || ({} as AddressBookEntry)
	currentKeystoreState.addressBook[config.defaultNetworkId] = {
		...addressBook,
		[address]: {
			...entry,
			address,
			name: olympiaName || entry.name || `Olympia derived: ${idx}`,
		} as AddressBookEntry,
	}
}

async function importKeystore(keystore: Keystore) {
	try {
		if (keystore.type !== KeystoreType.LOCAL && keystore.type !== KeystoreType.HARDWARE) return null

		const oldNoneSharedStore = await browser.storage.local.get(`z3us-store-${keystore.id}`)
		if (!oldNoneSharedStore[`z3us-store-${keystore.id}`]) return null

		const oldNoneSharedState = JSON.parse(oldNoneSharedStore[`z3us-store-${keystore.id}`] || {}).state
		if (!oldNoneSharedState) return null

		const olympiaAddresses: { [key: number]: { address: string; name?: string } } =
			oldNoneSharedState?.publicAddresses || {}

		const noneSharedStore = await getNoneSharedStore(keystore.id)
		await noneSharedStore.persist.rehydrate()

		const currentKeystoreState = noneSharedStore.getState()

		const promises = Object.keys(olympiaAddresses).map(idx =>
			importAccount(+idx, olympiaAddresses[idx], currentKeystoreState),
		)
		await Promise.all(promises)

		noneSharedStore.setState(currentKeystoreState)

		return {
			...keystore,
		} as Keystore
	} catch (error) {
		console.error(`migrateOlympiaAddresses: ${JSON.stringify(keystore)}: ${error}`)
	}
	return null
}

const migrateOlympiaAddresses = async () => {
	const oldSharedStore = await browser.storage.local.get(['z3us-store-shared'])
	if (!oldSharedStore['z3us-store-shared']) return

	const oldSharedState = JSON.parse(oldSharedStore['z3us-store-shared']).state
	if (!oldSharedState) return

	const promises = oldSharedState.keystores.map(importKeystore)
	const newKeystores = await Promise.all(promises)

	await sharedStore.persist.rehydrate()
	const currentState = sharedStore.getState()

	const keystoresMap: { [key: string]: Keystore } = {}
	newKeystores.forEach(keystore => {
		if (!keystore) return
		keystoresMap[keystore.id] = keystore
	})
	currentState.keystores.forEach(keystore => {
		if (!keystore) return
		keystoresMap[keystore.id] = keystore
	})

	currentState.keystores = Object.values(keystoresMap)
	sharedStore.setState(currentState)

	await Promise.all(
		oldSharedState.keystores.map(async keystore => {
			try {
				await browser.storage.local.remove(`z3us-store-${keystore.id}`)
			} catch (error) {
				console.error(`failed to remove none shared store for: ${JSON.stringify(keystore)}: ${error}`)
			}
		}),
	)

	try {
		await browser.storage.local.remove('z3us-store')
		await browser.storage.local.remove('z3us-store-shared')
	} catch (error) {
		console.error(`failed to remove old shared store: ${error}`)
	}
}

export const handleInstall = async (details: Runtime.OnInstalledDetailsType) => {
	if (details.reason === 'update') {
		await migrateOlympiaAddresses()
	}

	browser.runtime.setUninstallURL('https://z3us.com')
}
