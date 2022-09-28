import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useEventListener } from 'usehooks-ts'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { useLocation } from 'wouter'
import { useImmer } from 'use-immer'
import { onBoardingSteps } from '@src/store/onboarding'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import Button from 'ui/src/components/button'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { KeystoreType } from '@src/types'
import { generateId } from '@src/utils/generate-id'
import { getAccountStore } from '@src/services/state'

interface ImmerT {
	isButtonDisabled: boolean
	showError: boolean
	errorMessage: string
}

export const CreateWallet = (): JSX.Element => {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()

	const {
		secret,
		secretType,
		password,
		setPassword,
		setMnemomic,
		setPrivateKey,
		lock,
		addKeystore,
		createWallet,
		importingAddresses,
		workflowEntryStep,
		setOnboradingStep,
		setImportingAddresses,
	} = useSharedStore(state => ({
		secret: state.mnemonic ? state.mnemonic.entropy.toString('hex') : state.privateKey,
		secretType: state.mnemonic ? 'mnemonic' : 'key',
		password: state.password,
		keystoreId: state.selectKeystoreId,
		lock: state.lockAction,
		addKeystore: state.addKeystoreAction,
		createWallet: state.createWalletAction,
		setPassword: state.setPasswordAction,
		setMnemomic: state.setMnemomicAction,
		setPrivateKey: state.setPrivateKeyAction,

		importingAddresses: state.importingAddresses,
		workflowEntryStep: state.workflowEntryStep,
		setOnboradingStep: state.setOnboardingStepAction,
		setImportingAddresses: state.setImportingAddressesAction,
	}))
	const { setIsUnlocked } = useAccountStore(state => ({
		setIsUnlocked: state.setIsUnlockedAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		isButtonDisabled: true,
		showError: false,
		errorMessage: '',
	})

	useEffect(() => {
		setState(draft => {
			draft.isButtonDisabled = !secret || !password
		})
	}, [secret, password])

	const handleContinue = async () => {
		if (state.isButtonDisabled) {
			return
		}
		setState(draft => {
			draft.isButtonDisabled = true
		})
		try {
			await lock() // clear background memory

			const id = generateId()
			addKeystore(id, id, KeystoreType.LOCAL)
			setIsUnlocked(false)

			const store = await getAccountStore(id)
			store.getState().setPublicAddressesAction(importingAddresses)

			await createWallet(secretType as 'mnemonic' | 'key', secret, password, 0)

			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })

			setPassword(null)
			setMnemomic(null)
			setPrivateKey(null)
			setImportingAddresses({})
			setOnboradingStep(onBoardingSteps.START)
			setLocation('#/wallet/account')
		} catch (error) {
			setState(draft => {
				draft.showError = true
				draft.errorMessage = (error?.message || error).toString().trim()
			})
		}
		setState(draft => {
			draft.isButtonDisabled = false
		})
	}

	useEventListener('keypress', e => {
		if (e.code === 'Enter') {
			handleContinue()
		}
	})

	return (
		<PageWrapper
			css={{
				flex: '1',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				flexBasis: '100%',
			}}
		>
			<Box css={{ width: '100%' }}>
				<PageHeading>Created wallet</PageHeading>
				<PageSubHeading>
					Click &apos;Go to wallet&apos; below to complate setup and begin using your Z3US wallet.
				</PageSubHeading>
			</Box>
			<Box css={{ mt: '$8', flex: '1' }}>
				<InputFeedBack showFeedback={state.showError} animateHeight={31}>
					<Text color="red" medium>
						{state.errorMessage}
					</Text>
				</InputFeedBack>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					data-test-e2e="go-to-wallet-btn"
					fullWidth
					color="primary"
					size="6"
					onClick={handleContinue}
					css={{ flex: '1' }}
					disabled={state.isButtonDisabled}
					loading={state.isButtonDisabled}
				>
					Go to wallet
				</Button>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					{workflowEntryStep !== onBoardingSteps.GENERATE_PHRASE ? 'Step 4 of 4 ' : 'Step 3 of 3'}
				</Text>
			</Flex>
		</PageWrapper>
	)
}
