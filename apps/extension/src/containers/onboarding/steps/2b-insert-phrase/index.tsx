import React from 'react'
import { useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { onBoardingSteps } from '@src/store/onboarding'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import Button from 'ui/src/components/button'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import { Mnemonic } from '@radixdlt/crypto'

const errorMessages = {
	'Error: Invalid mnemonic': 'Enter a valid phrase.',
}

export const InsertPhrase = (): JSX.Element => {
	const { setMnemomic, setOnboardingStep } = useStore(state => ({
		setMnemomic: state.setMnemomicAction,
		setOnboardingStep: state.setOnboardingStepAction,
	}))

	const [state, setState] = useImmer({
		words: [],
		showError: false,
		errorMessage: '',
	})

	const isButtonDisabled = state.words.length === 0 || (state.words.length === 1 && state.words[0] === '')

	const handleWords = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const words = event.currentTarget.value.split(',')
		setState(draft => {
			draft.showError = false
			draft.errorMessage = ''
			draft.words = words
		})
	}

	const handleContinue = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (state.words.length > 0) {
			const mnemomicRes = await Mnemonic.fromEnglishWords(state.words)
			if (mnemomicRes.isErr()) {
				const errorString = mnemomicRes.error.toString().trim()
				setState(draft => {
					draft.showError = true
					draft.errorMessage = errorMessages[errorString] || errorString
				})
				throw mnemomicRes.error
			}
			setMnemomic(mnemomicRes.value)
		}

		setOnboardingStep(onBoardingSteps.IMPORT_ACCOUNTS)
	}

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			<Box>
				<PageHeading>Secret phrase</PageHeading>
				<PageSubHeading>Restore an existing wallet with your secret recovery phrase.</PageSubHeading>
			</Box>
			<form onSubmit={handleContinue} style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
				<Box css={{ mt: '$6', flex: '1' }}>
					<Input
						as="textarea"
						size="2"
						placeholder="Enter secret phrase"
						onChange={handleWords}
						error={state.showError}
						css={{ height: '140px' }}
					/>
					<InputFeedBack showFeedback={state.showError} animateHeight={31}>
						<Text medium color="red">
							{state.errorMessage}
						</Text>
					</InputFeedBack>
				</Box>
				<Flex css={{ width: '100%' }}>
					<Button fullWidth color="primary" size="6" disabled={isButtonDisabled} css={{ flex: '1' }} type="submit">
						Import recovery phrase
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
