import type {
	KeyParameters,
	LedgerDeriveAndDisplayAddressRequest,
	LedgerDevice,
	LedgerDeviceIdRequest,
	LedgerPublicKeyRequest,
	LedgerSignChallengeRequest,
	LedgerSignTransactionRequest,
} from '@radixdlt/connector-extension/src/ledger/schemas'

import type { Account, Keystore, Persona } from 'ui/src/store/types'

export const deviceFromSecret = (keystore: Keystore, secret: string): LedgerDevice => ({
	...JSON.parse(secret),
	name: keystore.name,
})

export const keyParametersFromSingers = (singers: Array<Account | Persona>): KeyParameters[] =>
	singers.map(singer => ({
		curve: singer.curve,
		derivationPath: singer.derivationPath,
	}))

export const getDeviceInfoPayload = (): LedgerDeviceIdRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'getDeviceInfo',
})

export const getDeriveAndDisplayPayload = (
	ledgerDevice: LedgerDevice,
	keyParameters: KeyParameters,
): LedgerDeriveAndDisplayAddressRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'deriveAndDisplayAddress',
	keyParameters,
	ledgerDevice,
})

export const getDerivePublicKeyPayload = (
	ledgerDevice: LedgerDevice,
	keysParameters: KeyParameters[],
): LedgerPublicKeyRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'derivePublicKeys',
	keysParameters,
	ledgerDevice,
})

export const getSignChallengePayload = (
	ledgerDevice: LedgerDevice,
	signers: KeyParameters[],
	challenge: string,
	metadata: { origin: string; dAppDefinitionAddress: string },
): LedgerSignChallengeRequest => ({
	...metadata,
	interactionId: crypto.randomUUID(),
	discriminator: 'signChallenge',
	signers,
	ledgerDevice,
	challenge,
})

export const getSignTxPayload = (
	ledgerDevice: LedgerDevice,
	signers: KeyParameters[],
	compiledTransactionIntent: string,
): LedgerSignTransactionRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'signTransaction',
	signers,
	ledgerDevice,
	displayHash: true,
	compiledTransactionIntent,
})
