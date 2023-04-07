import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import React from 'react'
import { firstValueFrom } from 'rxjs'
import { useImmer } from 'use-immer'

import { Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import InputFeedback from 'ui/src/components/input/input-feedback'
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui/src/components/tool-tip'

import { useAPDU } from '@src/hooks/use-apdu'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { createHardwareSigningKey } from '@src/services/signing-key'
import { KeystoreType } from '@src/types'

interface ImmerT {
	isLoading: boolean
}

export const HardwareWalletReconnect: React.FC = () => {
	const sendAPDU = useAPDU()
	const { keystore, signingKey, setSigningKey, addToast } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
		signingKey: state.signingKey,
		setSigningKey: state.setSigningKeyAction,
		addToast: state.addToastAction,
	}))
	const { deriveIndex } = useNoneSharedStore(state => ({
		deriveIndex: +Object.keys(state.publicAddresses)[state.selectedAccountIndex] || 0,
		selectAccount: state.selectAccountAction,
	}))
	const [state, setState] = useImmer<ImmerT>({
		isLoading: false,
	})

	const isHW = keystore.type === KeystoreType.HARDWARE

	const handleReconnectHW = async () => {
		if (signingKey || state.isLoading || !isHW) return
		setState(draft => {
			draft.isLoading = true
		})
		try {
			const hw = await firstValueFrom(HardwareWalletLedger.create({ send: sendAPDU }))
			const newSigningKey = await createHardwareSigningKey(hw, deriveIndex)
			setSigningKey(newSigningKey)
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Failed to reconnect hardware wallet',
				subTitle: (error?.message || error).toString().trim(),
				duration: 8000,
			})
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	if (signingKey || !isHW) {
		return null
	}

	return (
		<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
			<InputFeedback showFeedback animateHeight={80}>
				<Text color="red" medium css={{ mb: '$4', display: 'block' }}>
					Unable to derive account, if you are using hard wallet ensure ledger is connected and Radix App is opened
				</Text>
			</InputFeedback>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							size="1"
							color="tertiary"
							css={{
								position: 'absolute',
								bottom: '-4px',
								right: '0',
								textTransform: 'uppercase',
							}}
							onClick={handleReconnectHW}
							disabled={state.isLoading}
						>
							Reconnect
						</Button>
					</TooltipTrigger>
					<TooltipContent sideOffset={3}>
						<TooltipArrow offset={15} />
						Reconnect hardware wallet
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</Flex>
	)
}
