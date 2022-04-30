import React, { useEffect } from 'react'
import { useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { useEventListener } from 'usehooks-ts'
import { onBoardingSteps } from '@src/store/onboarding'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import Button from 'ui/src/components/button'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import { isWebAuthSupported } from '@src/services/credentials'

export const CreatePassword = (): JSX.Element => {
	const { setPassword, setOnboradingStep, registerCredential, isRestoreWorkflow, removeCredential } = useStore(
		state => ({
			setPassword: state.setPasswordAction,
			setOnboradingStep: state.setOnboardingStepAction,
			registerCredential: state.registerCredentialAction,
			removeCredential: state.removeCredentialAction,
			isRestoreWorkflow: state.isRestoreWorkflow,
		}),
	)

	const [state, setState] = useImmer({
		password: '',
		confirmPassword: '',
		isButtonDisabled: true,
		isWebAuthSupported: false,
		showError: false,
		errorMessage: '',
	})

	useEffect(() => {
		const load = async () => {
			try {
				const isSupported = await isWebAuthSupported()
				setState(draft => {
					draft.isWebAuthSupported = isSupported
				})
				await removeCredential()
			} catch (error) {
				// eslint-disable-next-line no-console
				console.warn(error)
			}
		}
		load()
	}, [])

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.currentTarget.value
		setState(draft => {
			draft.password = password
			draft.showError = false
			draft.errorMessage = ''
		})
	}

	const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const confirmPassword = event.currentTarget.value
		setState(draft => {
			draft.confirmPassword = confirmPassword
			draft.showError = false
			draft.errorMessage = ''
			draft.isButtonDisabled = false
		})
	}

	const handleContinue = async () => {
		if (state.isButtonDisabled) return
		if (state.password === state.confirmPassword) {
			setPassword(state.confirmPassword)
			setOnboradingStep(onBoardingSteps.CREATE_WALLET)
		} else {
			setState(draft => {
				draft.showError = true
				draft.errorMessage = 'Passwords do not match!'
			})
		}
	}

	const handleRegisterCredentials = async () => {
		if (state.password === state.confirmPassword) {
			try {
				const password = await registerCredential('local', 'wallet@z3us.com', 'z3us credentials', state.confirmPassword)
				setPassword(password)
				setOnboradingStep(onBoardingSteps.CREATE_WALLET)
			} catch (error) {
				setState(draft => {
					draft.showError = true
					draft.errorMessage = error?.message || error
				})
			}
		} else {
			setState(draft => {
				draft.showError = true
				draft.errorMessage = 'Passwords do not match!'
			})
		}
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
			<form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
				<Box css={{ width: '100%' }}>
					<PageHeading>Create password</PageHeading>
					<PageSubHeading>
						You will use this password to unlock
						<br />
						your wallet.
					</PageSubHeading>
				</Box>
				<Box css={{ pt: '33px', flex: '1' }}>
					<Box css={{ width: '100%' }}>
						<Input type="password" size="2" placeholder="Enter password" onChange={handlePassword} />
					</Box>
					<Box css={{ marginTop: '$3', width: '100%' }}>
						<Input type="password" size="2" placeholder="Confirm password" onChange={handleConfirmPassword} />
					</Box>

					<InputFeedBack showFeedback={state.showError} animateHeight={31}>
						<Text color="red" medium>
							{state.errorMessage}
						</Text>
					</InputFeedBack>

					{/* @TODO: uncomment once webauthn is supported from extension/addon origin (xxxxxx is an invalid domain) */}
					{false && state.isWebAuthSupported && (
						<Box css={{ marginTop: '$3', width: '100%' }}>
							<Button
								fullWidth
								color="primary"
								size="6"
								disabled={state.isButtonDisabled}
								onClick={handleRegisterCredentials}
								css={{ flex: '1' }}
							>
								Add credentials
							</Button>
						</Box>
					)}
				</Box>
				<Flex css={{ width: '100%' }}>
					<Button
						fullWidth
						color="primary"
						size="6"
						type="submit"
						disabled={state.isButtonDisabled}
						css={{ flex: '1' }}
					>
						Save
					</Button>
				</Flex>
				<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
					<Text medium size="3" color="muted">
						{isRestoreWorkflow ? 'Step 3 of 4 ' : 'Step 2 of 3'}
					</Text>
				</Flex>
			</form>
		</PageWrapper>
	)
}
