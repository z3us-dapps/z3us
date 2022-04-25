import { MnemomicT } from '@radixdlt/application'

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

export type OnBoardingStore = {
	onBoardingStep: string
	isRestoreWorkflow: boolean
	mnemonic: Mnemomic
	password: Password

	setOnboardingStepAction: (step: string) => void
	setMnemomicAction: (mnemonic: Mnemomic) => void
	setPasswordAction: (password: Password) => void
	setIsRestoreWorkflowAction: (restore: boolean) => void
}

export const createOnBoardingStore = set => ({
	onBoardingStep: onBoardingSteps.START,
	isRestoreWorkflow: false,
	mnemonic: null,
	password: null,
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
})
