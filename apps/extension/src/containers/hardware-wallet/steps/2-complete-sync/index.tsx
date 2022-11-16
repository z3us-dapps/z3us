import React from 'react'
import { useSharedStore } from '@src/hooks/use-store'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useEventListener } from 'usehooks-ts'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import Button from 'ui/src/components/button'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { KeystoreType } from '@src/types'
import { generateId } from '@src/utils/generate-id'
import { onBoardingSteps } from '@src/store/onboarding'
import { getNoneSharedStore } from '@src/services/state'

const isHIDSupported = !!window?.navigator?.hid

interface ImmerT {
	errorMessage: string
	isLoading: boolean
}

export const CompleteSync = (): JSX.Element => {
	const queryClient = useQueryClient()

	const { importingAddresses, lock, addKeystore, setOnboradingStep, setImportingAddresses, setIsUnlocked } =
		useSharedStore(state => ({
			importingAddresses: state.importingAddresses,
			lock: state.lockAction,
			addKeystore: state.addKeystoreAction,
			setOnboradingStep: state.setOnboardingStepAction,
			setImportingAddresses: state.setImportingAddressesAction,
			setIsUnlocked: state.setIsUnlockedAction,
		}))

	const addresses = Object.values(importingAddresses)

	const [state, setState] = useImmer<ImmerT>({
		isLoading: false,
		errorMessage: '',
	})

	const handleContinue = async () => {
		if (!isHIDSupported) return
		if (addresses.length < 1) return
		setState(draft => {
			draft.isLoading = true
		})
		try {
			await lock() // clear background memory

			const id = generateId()
			addKeystore(id, id, KeystoreType.HARDWARE)
			setIsUnlocked(false)

			const store = await getNoneSharedStore(id)
			store.getState().setPublicAddressesAction(importingAddresses)

			setImportingAddresses({})
			setOnboradingStep(onBoardingSteps.START)

			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })

			window.close()
		} catch (error) {
			setState(draft => {
				draft.errorMessage = error?.message || error
			})
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	useEventListener('keypress', e => {
		if (e.code === 'Enter') {
			handleContinue()
		}
	})

	return (
		<PageWrapper
			css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '600px' }}
		>
			<Box css={{ width: '100%' }}>
				<PageHeading>Hardware wallet connected</PageHeading>
				<PageSubHeading>
					Click &apos;Go to wallet&apos; below to complate setup and begin using your Z3US wallet with the connected
					hardware wallet connected.
				</PageSubHeading>
			</Box>
			<Box css={{ mt: '$8', flex: '1' }}>
				<InputFeedBack showFeedback={state.errorMessage !== ''} animateHeight={60}>
					<Text color="red" medium>
						{state.errorMessage}
					</Text>
				</InputFeedBack>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					fullWidth
					color="primary"
					size="6"
					onClick={handleContinue}
					css={{ flex: '1' }}
					disabled={addresses.length < 1}
					loading={state.isLoading}
				>
					Close
				</Button>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 2 of 2
				</Text>
			</Flex>
		</PageWrapper>
	)
}
