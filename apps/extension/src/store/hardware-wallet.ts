export const steps = {
	IMPORT_ACCOUNTS: 'import_accounts',
	COMPLETE: 'complete',
}

export type HardwareWalletStore = {
	hardwareWalletStep: string

	setHardwareWalletStepAction: (step: string) => void
}

export const createHardwareWalletStore = set => ({
	hardwareWalletStep: steps.IMPORT_ACCOUNTS,

	setHardwareWalletStepAction: (step: string): void =>
		set(state => {
			state.hardwareWalletStep = step
		}),
})
