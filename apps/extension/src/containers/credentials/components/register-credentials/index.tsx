import React from 'react'
import { useImmer } from 'use-immer'
import { useEventListener } from 'usehooks-ts'
import { useLocation } from 'wouter'

import { Box, Flex, Text } from 'ui/src/components/atoms'
import InputFeedBack from 'ui/src/components/input/input-feedback'

import { RegisterCredentialsButton } from '@src/components/auth-register-credentials-button'
import { PageHeading, PageSubHeading, PageWrapper } from '@src/components/layout'

interface ImmerT {
	isLoading: boolean
	errorMessage: string
}

export const RegsiterCredentials = (): JSX.Element => {
	const [, setLocation] = useLocation()

	const [state, setState] = useImmer<ImmerT>({
		isLoading: false,
		errorMessage: '',
	})

	const handleContinue = async () => {
		setState(draft => {
			draft.isLoading = true
		})
		try {
			setLocation('#/wallet/account')
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
				<PageHeading>Register credentials</PageHeading>
				<PageSubHeading>Click `create credentials` below, to enable web auth features.</PageSubHeading>
			</Box>
			<Box css={{ mt: '$8', flex: '1' }}>
				<InputFeedBack showFeedback={state.errorMessage !== ''} animateHeight={31}>
					<Text color="red" medium>
						{state.errorMessage}
					</Text>
				</InputFeedBack>
			</Box>
			<Flex css={{ width: '100%' }}>
				<RegisterCredentialsButton
					fullWidth
					color="primary"
					size="6"
					onClick={handleContinue}
					css={{ flex: '1' }}
					loading={state.isLoading}
				>
					Create credentials
				</RegisterCredentialsButton>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 1 of 1
				</Text>
			</Flex>
		</PageWrapper>
	)
}
