import React from 'react'
import { HDNode } from '@radixdlt/crypto'
import { useSharedStore } from '@src/hooks/use-store'
import { useImmer } from 'use-immer'
import { useEventListener } from 'usehooks-ts'
import { onBoardingSteps } from '@src/store/onboarding'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import Button from 'ui/src/components/button'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { Flex, Text, Box } from 'ui/src/components/atoms'

interface ImmerT {
	key: string
	showError: boolean
	errorMessage: string
}

const errorMessages = {
	'Error: Invalid private key': 'Enter a valid extended private key.',
}

export const InsertKey = (): JSX.Element => {
	const { setPrivateKey, setOnboardingStep } = useSharedStore(state => ({
		setPrivateKey: state.setPrivateKeyAction,
		setOnboardingStep: state.setOnboardingStepAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		key: '',
		showError: false,
		errorMessage: '',
	})

	const isButtonDisabled = !state.key

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setState(draft => {
			draft.showError = false
			draft.errorMessage = ''
			draft.key = event.currentTarget?.value || ''
		})
	}

	const handleContinue = async () => {
		if (isButtonDisabled) return
		if (state.key) {
			const hdNodeResult = HDNode.fromExtendedPrivateKey(state.key)
			if (hdNodeResult.isErr()) {
				const errorString = hdNodeResult.error.toString().trim()
				setState(draft => {
					draft.showError = true
					draft.errorMessage = errorMessages[errorString] || errorString
				})
			} else {
				setPrivateKey(state.key)
			}
		}

		setOnboardingStep(onBoardingSteps.IMPORT_ACCOUNTS)
	}

	const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		await handleContinue()
	}

	useEventListener('keypress', async e => {
		if (e.code === 'Enter') {
			await handleContinue()
		}
	})

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			<Box>
				<PageHeading>Private key</PageHeading>
				<PageSubHeading>Restore an existing wallet with your extended private key.</PageSubHeading>
			</Box>
			<form onSubmit={handleFormSubmit} style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
				<Box css={{ mt: '$6', flex: '1' }}>
					<Input
						as="textarea"
						size="2"
						data-test-e2e="private-key-input"
						placeholder="Enter extended private key"
						onChange={handleInputChange}
						error={state.showError}
						css={{ height: '140px' }}
					/>
					<InputFeedBack showFeedback={state.showError} animateHeight={31} data-test-e2e="private-key-import-error">
						<Text medium color="red">
							{state.errorMessage}
						</Text>
					</InputFeedBack>
				</Box>
				<Flex css={{ width: '100%' }}>
					<Button
						fullWidth
						color="primary"
						size="6"
						disabled={isButtonDisabled}
						css={{ flex: '1' }}
						type="submit"
						data-test-e2e="private-key-import"
					>
						Import private key
					</Button>
				</Flex>
			</form>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 1 of 4
				</Text>
			</Flex>
		</PageWrapper>
	)
}
