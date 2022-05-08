import React from 'react'
import { useStore } from '@src/store'

import AlertCard from 'ui/src/components/alert-card'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useEventListener } from 'usehooks-ts'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import Button from 'ui/src/components/button'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import InputFeedBack from 'ui/src/components/input/input-feedback'

export const CompleteSync = (): JSX.Element => {
	const queryClient = useQueryClient()

	const { addresses } = useStore(state => ({
		addresses: Object.values(state.hwPublicAddresses),
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
			await queryClient.invalidateQueries()

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
					Click the `Close` button below, to close this window, and begin using Z3US wallet with the connected hardware
					wallet connected.
				</PageSubHeading>
			</Box>
			<Box css={{ mt: '$8', flex: '1' }}>
				{addresses.length > 0 ? (
					<AlertCard icon color="success">
						<Text medium size="3" css={{ p: '$2' }}>
							Click the Z3US extension icon to begin
						</Text>
					</AlertCard>
				) : null}
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
