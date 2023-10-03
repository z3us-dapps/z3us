import type {
	KeyParameters,
	LedgerDeriveAndDisplayAddressRequest,
	LedgerDeviceIdRequest,
	LedgerPublicKeyRequest,
	LedgerSignChallengeRequest,
	LedgerSignTransactionRequest,
} from '@radixdlt/connector-extension/src/ledger/schemas'

export const getDeviceInfoPayload = (): LedgerDeviceIdRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'getDeviceInfo',
})

export const getDeriveAndDisplayPayload = (): LedgerDeriveAndDisplayAddressRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'deriveAndDisplayAddress',
	keyParameters: {
		curve: 'curve25519',
		derivationPath: 'm/44H/1022H/10H/525H/1460H/0H',
	},
	ledgerDevice: {
		name: 'My Ledger Device',
		model: 'nanoS',
		id: '02c66e1c1ee74b57d0e944d34f97cc07e6ddf08c70b9e71cf373fd1c191be85c',
	},
})

export const getDerivePublicKeyPayload = (): LedgerPublicKeyRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'derivePublicKeys',
	keysParameters: [
		{
			curve: 'curve25519',
			derivationPath: 'm/44H/1022H/10H/525H/1460H/0H',
		},
	],
	ledgerDevice: {
		name: 'My Ledger Device',
		model: 'nanoS',
		id: '02c66e1c1ee74b57d0e944d34f97cc07e6ddf08c70b9e71cf373fd1c191be85c',
	},
})

const getSignChallengePayload = (signers: KeyParameters[]): LedgerSignChallengeRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'signChallenge',
	signers,
	ledgerDevice: {
		name: 'My Ledger Device',
		model: 'nanoS',
		id: '41ac202687326a4fc6cb677e9fd92d08b91ce46c669950d58790d4d5e583adc0',
	},
	challenge: '17f3cb369f2632454f7f22c24e72b0adf7b95e36f2297467d3ff04010b2967e1',
	origin: 'https://dashboard.rdx.works',
	dAppDefinitionAddress: 'account_tdx_b_1p9dkged3rpzy860ampt5jpmvv3yl4y6f5yppp4tnscdslvt9v3',
})

const getSignTxPayload = (
	signers: KeyParameters[],
	compiledTransactionIntent: string,
): LedgerSignTransactionRequest => ({
	interactionId: crypto.randomUUID(),
	discriminator: 'signTransaction',
	signers,
	ledgerDevice: {
		name: 'My Ledger Device',
		model: 'nanoS',
		id: '41ac202687326a4fc6cb677e9fd92d08b91ce46c669950d58790d4d5e583adc0',
	},
	displayHash: true,
	compiledTransactionIntent,
})

export const getSignEd25519TransactionPayload = (compiledTransactionIntent: string): LedgerSignTransactionRequest =>
	getSignTxPayload(
		[
			{
				curve: 'curve25519',
				derivationPath: 'm/44H/1022H/10H/525H/1460H/0H',
			},
			{
				curve: 'curve25519',
				derivationPath: 'm/44H/1022H/10H/525H/1460H/1H',
			},
		],
		compiledTransactionIntent,
	)

export const getSignSecp256k1TransactionPayload = (compiledTransactionIntent: string): LedgerSignTransactionRequest =>
	getSignTxPayload(
		[
			{
				curve: 'secp256k1',
				derivationPath: 'm/44H/1022H/10H/525H/1238H',
			},
		],
		compiledTransactionIntent,
	)

export const getSignEd222519ChallengePayload = () =>
	getSignChallengePayload([
		{
			curve: 'curve25519',
			derivationPath: 'm/44H/1022H/12H/525H/1460H/0H',
		},
	])

export const getSignSecp256k1ChallengePayload = () =>
	getSignChallengePayload([
		{
			curve: 'secp256k1',
			derivationPath: 'm/44H/1022H/10H/525H/1238H',
		},
	])
