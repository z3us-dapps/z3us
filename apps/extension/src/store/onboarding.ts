import type { MnemomicT } from '@radixdlt/application'

import type { OnBoardingState } from './types'

type Mnemomic = MnemomicT | null
type Password = string | null

export const onBoardingSteps = {
	START: 'start',
	GENERATE_PHRASE: 'generate_phrase',
	INSERT_PHRASE: 'insert_phrase',
	INSERT_KEY: 'insert_key',
	IMPORT_ACCOUNTS: 'import_accounts',
	CREATE_PASSWORD: 'create_password',
	CREATE_WALLET: 'create_wallet',
}

export const connectHardwareWalletSteps = {
	IMPORT_ACCOUNTS: 'import_accounts',
	COMPLETE: 'complete',
}

export const factory = (set): OnBoardingState => ({
	onBoardingStep: onBoardingSteps.START,
	workflowEntryStep: onBoardingSteps.GENERATE_PHRASE,
	connectHardwareWalletStep: connectHardwareWalletSteps.IMPORT_ACCOUNTS,

	mnemonic: null,
	password: null,
	privateKey: null,

	importingAddresses: {},

	setMnemomicAction: (mnemonic: Mnemomic): void =>
		set(state => {
			state.mnemonic = mnemonic
		}),

	setPrivateKeyAction: (key: string): void =>
		set(state => {
			state.privateKey = key
		}),

	setPasswordAction: (password: Password): void =>
		set(state => {
			state.password = password
		}),

	setOnboardingStepAction: (step: string): void =>
		set(state => {
			state.onBoardingStep = step
		}),

	setWorkflowEntryStepAction: (step: string): void =>
		set(state => {
			state.workflowEntryStep = step
		}),

	setConnectHardwareWalletStepAction: (step: string): void =>
		set(state => {
			state.connectHardwareWalletStep = step
		}),

	setImportingAddressesAction: (addresses: { [key: number]: string }) => {
		set(state => {
			state.importingAddresses = addresses
		})
	},
})
