import React from 'react'
import { useStore } from '@src/store'
import { useQueryClient } from 'react-query'
import { useLocation } from 'wouter'
import { useImmer } from 'use-immer'
import { useEventListener } from 'usehooks-ts'
import { steps } from '@src/store/hardware-wallet'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import Button from 'ui/src/components/button'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import InputFeedBack from 'ui/src/components/input/input-feedback'

export const CompleteSync = (): JSX.Element => {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()

	const { addresses, setStep } = useStore(state => ({
		addresses: Object.values(state.hwPublicAddresses),
		setStep: state.setHardwareWalletStepAction,
	}))

	const [state, setState] = useImmer({
		isLoading: false,
		errorMessage: '',
	})

	const handleContinue = async () => {
		if (addresses.length < 1) {
			return
		}
		setState(draft => {
			draft.isLoading = true
		})
		try {
			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setStep(steps.IMPORT_ACCOUNTS)
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
				<PageHeading>Connect hardware wallet</PageHeading>
				<PageSubHeading>Click `Go to wallet` below, to go to your wallet and begin using z3us wallet.</PageSubHeading>
			</Box>
			<Box css={{ mt: '$8', flex: '1' }}>
				<InputFeedBack showFeedback={state.errorMessage !== ''} animateHeight={31}>
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
					Go to wallet
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
