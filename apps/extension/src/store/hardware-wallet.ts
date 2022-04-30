export const steps = {
	SELECT_DEVICE: 'generate_phrase',
	IMPORT_ACCOUNTS: 'import_accounts',
	COMPLETE: 'complete',
}

export type HardwareWalletStore = {
	hardwareWalletStep: string

	setHardwareWalletStepAction: (step: string) => void
}

export const createHardwareWalletStore = set => ({
	hardwareWalletStep: steps.SELECT_DEVICE,

	setHardwareWalletStepAction: (step: string): void =>
		set(state => {
			state.hardwareWalletStep = step
		}),
})
