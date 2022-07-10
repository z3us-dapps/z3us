import React from 'react'
import { firstValueFrom } from 'rxjs'
import { HardwareWalletLedger } from '@radixdlt/hardware-ledger'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from 'ui/src/components/tool-tip'
import Button from 'ui/src/components/button'
import { Text, Flex } from 'ui/src/components/atoms'
import InputFeedback from 'ui/src/components/input/input-feedback'
import { useAPDU } from '@src/hooks/use-apdu'

export const HardwareWalletReconnect: React.FC = () => {
	const sendAPDU = useAPDU()
	const { isHardwareWallet, addToast, setHardwareWallet } = useSharedStore(state => ({
		isHardwareWallet: state.isHardwareWallet,
		addToast: state.addToastAction,
		setHardwareWallet: state.setHardwareWalletAction,
	}))
	const { account, selectAccount, accountIndex } = useStore(state => ({
		account: state.account,
		accountIndex: state.selectedAccountIndex,
		selectAccount: state.selectAccountAction,
	}))

	const [state, setState] = useImmer({
		isLoading: false,
	})

	const handleReconnectHW = async () => {
		if (!isHardwareWallet || account || state.isLoading) return
		setState(draft => {
			draft.isLoading = true
		})
		try {
			const hw = await firstValueFrom(HardwareWalletLedger.create({ send: sendAPDU }))
			setHardwareWallet(hw)
			await selectAccount(accountIndex, hw, null)
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

	if (!isHardwareWallet || account) {
		return null
	}

	return (
		<Flex align="center" css={{ mt: '14px', position: 'relative' }}>
			<InputFeedback showFeedback animateHeight={80}>
				<Text color="red" medium css={{ mb: '$4', display: 'block' }}>
					Unable to derive account, if you are using hard wallet ensure ledger is connected and Radix App is opened
				</Text>
			</InputFeedback>
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
		</Flex>
	)
}
