import React from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { PlusIcon } from 'ui/src/components/icons'
import { Box, Flex, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from 'ui/src/components/alert-dialog'
import { SelectBox } from 'ui/src/components/select'
import { RadixService } from '@src/services/radix'

interface ImmerT {
	isAddNetworkDialogOpen: boolean
	isLoading: boolean
	value: string
	errorMessage: string
}

export const NetworkSettings: React.FC = () => {
	const { hw, seed, addToast } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		addToast: state.addToastAction,
	}))

	const { networks, selectedNetworkIndex, selectNetwork, addNetwork } = useStore(state => ({
		networks: state.networks,
		selectedNetworkIndex: state.selectedNetworkIndex,
		selectNetwork: state.selectNetworkAction,
		addNetwork: state.addNetworkAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		isAddNetworkDialogOpen: false,
		isLoading: false,
		value: '',
		errorMessage: '',
	})

	const handleSelectNetwork = async (value: string) => {
		await selectNetwork(+value, hw, seed)
	}

	const handleOpenDialog = () => {
		setState(draft => {
			draft.isAddNetworkDialogOpen = true
		})
	}

	const handleCloseDialog = () => {
		setState(draft => {
			draft.isAddNetworkDialogOpen = false
			draft.errorMessage = ''
		})
	}

	const handleSubmitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		setState(draft => {
			draft.isLoading = true
		})

		try {
			const url = new URL(state.value)
			const service = new RadixService(url)
			const { network } = await service.gateway()

			addNetwork(network, url)

			setState(draft => {
				draft.value = ''
				draft.errorMessage = ''
				draft.isAddNetworkDialogOpen = false
			})
			addToast({
				type: 'success',
				title: 'Succesfully added network',
				duration: 5000,
			})
		} catch (error) {
			setState(draft => {
				draft.errorMessage = 'Please enter a valid network URL.'
			})
		}

		setState(draft => {
			draft.isLoading = false
		})
	}

	return (
		<Box css={{ px: '$3', py: '$3' }}>
			<Box>
				<Text medium css={{ pb: '4px' }}>
					Select network:
				</Text>
				<SelectBox
					defaultValue={String(selectedNetworkIndex)}
					onValueChange={handleSelectNetwork}
					buttonAriaLabel="Select network"
					selectOptions={networks?.map((network, idx) => ({ value: String(idx), name: network.id }))}
				/>
			</Box>
			<Box css={{ mt: '$3' }}>
				<AlertDialog open={state.isAddNetworkDialogOpen}>
					<AlertDialogTrigger asChild>
						<Button size="4" color="primary" fullWidth onClick={handleOpenDialog}>
							<PlusIcon />
							Add network
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<Box css={{ p: '$1' }}>
							<AlertDialogTitle>
								<Flex align="center">
									<Text medium size="5" css={{ pr: '2px' }}>
										Add custom network
									</Text>
								</Flex>
							</AlertDialogTitle>
							<AlertDialogDescription css={{ mt: '4px' }}>
								<Text size="3">Enter address of custom network.</Text>
							</AlertDialogDescription>
							<Box>
								<form onSubmit={handleSubmitForm}>
									<Box>
										<Input
											focusOnMount
											type="text"
											placeholder="Network URL"
											error={!!state.errorMessage}
											onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
												setState(draft => {
													draft.value = e.target.value
													draft.errorMessage = ''
												})
											}}
										/>
									</Box>
									<InputFeedBack
										showFeedback={!!state.errorMessage}
										animateHeight={24}
										css={{ display: 'flex', alignItems: 'flex-end', overflow: 'clip' }}
									>
										<Text color="red" medium>
											{state.errorMessage}
										</Text>
									</InputFeedBack>
									<Flex css={{ mt: '$4' }} justify="end" gap={2}>
										<AlertDialogAction asChild>
											<Button type="submit" size="2" color="primary" loading={state.isLoading}>
												<PlusIcon /> Add network
											</Button>
										</AlertDialogAction>
										<AlertDialogCancel asChild>
											<Button size="2" color="tertiary" onClick={handleCloseDialog}>
												Cancel
											</Button>
										</AlertDialogCancel>
									</Flex>
								</form>
							</Box>
						</Box>
					</AlertDialogContent>
				</AlertDialog>
			</Box>
		</Box>
	)
}
