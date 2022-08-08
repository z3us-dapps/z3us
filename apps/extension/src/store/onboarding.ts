import { MnemomicT } from '@radixdlt/application'
import { SetState } from 'zustand'
import { OnBoardingStore, SharedStore } from './types'

type Mnemomic = MnemomicT | null
type Password = string | null

export const onBoardingSteps = {
	START: 'start',
	GENERATE_PHRASE: 'generate_phrase',
	INSERT_PHRASE: 'insert_phrase',
	IMPORT_ACCOUNTS: 'import_accounts',
	CREATE_PASSWORD: 'create_password',
	CREATE_WALLET: 'create_wallet',
}

export const connectHardwareWalletSteps = {
	IMPORT_ACCOUNTS: 'import_accounts',
	COMPLETE: 'complete',
}

export const factory = (set: SetState<SharedStore>): OnBoardingStore => ({
	onBoardingStep: onBoardingSteps.START,
	isRestoreWorkflow: false,
	mnemonic: null,
	password: null,
	connectHardwareWalletStep: connectHardwareWalletSteps.IMPORT_ACCOUNTS,

	setMnemomicAction: (mnemonic: Mnemomic): void =>
		set(state => {
			state.mnemonic = mnemonic
		}),

	setPasswordAction: (password: Password): void =>
		set(state => {
			state.password = password
		}),

	setOnboardingStepAction: (step: string): void =>
		set(state => {
			state.onBoardingStep = step
		}),

	setIsRestoreWorkflowAction: (isRestore: boolean): void =>
		set(state => {
			state.isRestoreWorkflow = isRestore
		}),

	setConnectHardwareWalletStepAction: (step: string): void =>
		set(state => {
			state.connectHardwareWalletStep = step
		}),
})
