import React from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { ReloadIcon } from '@radix-ui/react-icons'
import { steps } from '@src/store/hardware-wallet'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import ButtonTipFeedback from 'ui/src/components/button-tip-feedback'
import Transport from '@ledgerhq/hw-transport-webhid'
import { Flex, Box, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'

const isHIDSupported = !!window?.navigator?.hid

export const SelectDevice = (): JSX.Element => {
	const { setStep } = useStore(state => ({
		setStep: state.setHardwareWalletStepAction,
	}))

	const [state, setState] = useImmer({
		device: null,
		isLoading: false,
		errorMessage: '',
	})

	const handleRefreshDevices = async () => {
		setState(draft => {
			draft.isLoading = true
		})

		try {
			const device = await Transport.request()
			setState(draft => {
				draft.device = device
			})
		} catch (error) {
			setState(draft => {
				draft.device = null
			})
		}

		setState(draft => {
			draft.isLoading = false
		})
	}

	const handleContinue = () => {
		setStep(steps.IMPORT_ACCOUNTS)
	}

	return (
		<PageWrapper css={{ flex: '1', position: 'relative', display: 'flex', flexDirection: 'column' }}>
			{isHIDSupported ? (
				<Box>
					<PageHeading>Select device</PageHeading>
					<PageSubHeading>Please ensure your Ledger is connected and the Radix application is open.</PageSubHeading>
				</Box>
			) : (
				<Box>
					<PageHeading>Unsupported</PageHeading>
					<PageSubHeading>
						Your browser does not allow connection with USB device. Please update your brwoser to the latest version or
						use different one.
					</PageSubHeading>
				</Box>
			)}
			<Box css={{ mt: '$8', flex: '1', width: '100%' }}>
				<ButtonTipFeedback feedback="Refreshed">
					<Button
						fullWidth
						color="primary"
						size="6"
						loading={state.isLoading}
						disabled={!isHIDSupported}
						onClick={handleRefreshDevices}
						css={{ flex: '1' }}
					>
						<ReloadIcon />
						Connect
					</Button>
				</ButtonTipFeedback>
			</Box>
			<Flex css={{ width: '100%' }}>
				<Button
					fullWidth
					color="primary"
					size="6"
					onClick={handleContinue}
					loading={state.isLoading}
					disabled={!isHIDSupported || !state.device}
					css={{ flex: '1' }}
				>
					Next
				</Button>
			</Flex>
			<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
				<Text medium size="3" color="muted">
					Step 1 of 3
				</Text>
			</Flex>
		</PageWrapper>
	)
}
