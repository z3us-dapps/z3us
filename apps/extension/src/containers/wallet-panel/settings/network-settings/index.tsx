import React from 'react'
import { useStore } from '@src/store'
import { useImmer } from 'use-immer'
import { RightArrowIcon, PlusIcon } from 'ui/src/components/icons'
import { InfoCircledIcon } from '@radix-ui/react-icons'
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
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectViewport,
	SelectGroup,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from 'ui/src/components/select'
import { RadixService } from '@src/services/radix'

export const NetworkSettings: React.FC = () => {
	const { networks, selectedNetworkIndex, selectNetwork, addNetwork, addToast } = useStore(state => ({
		networks: state.networks,
		selectedNetworkIndex: state.selectedNetworkIndex,
		selectNetwork: state.selectNetworkAction,
		addNetwork: state.addNetworkAction,
		addToast: state.addToastAction,
	}))

	const [state, setState] = useImmer({
		isAddNetworkDialogOpen: false,
		isLoading: false,
		value: '',
		errorMessage: '',
	})

	const handleSelectNetwork = async (value: string) => {
		await selectNetwork(+value)
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
				<Text medium css={{ pb: '1px' }}>
					Select network:
				</Text>
				<Select defaultValue={String(selectedNetworkIndex)} onValueChange={handleSelectNetwork}>
					<SelectTrigger aria-label="Select network" asChild>
						<Button
							css={{
								display: 'flex',
								align: 'center',
								justifyContent: 'flex-start',
								mt: '$2',
								bg: '$bgPanel2',
								borderRadius: '8px',
								height: '48px',
								position: 'relative',
								width: '100%',
								ta: 'left',
								'&:hover': {
									bg: '$bgPanelHover',
								},
							}}
						>
							<Box css={{ flex: '1' }}>
								<Flex>
									<Text medium css={{ pl: '$3' }}>
										Network:
									</Text>
									<Text bold uppercase css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', ml: '4px' }}>
										<SelectValue />
									</Text>
								</Flex>
							</Box>
							<Box css={{ pr: '$1' }}>
								<RightArrowIcon />
							</Box>
						</Button>
					</SelectTrigger>
					<SelectContent>
						<SelectScrollUpButton>{'>'}</SelectScrollUpButton>
						<SelectViewport>
							<SelectGroup>
								{networks?.map((network, idx) => (
									<SelectItem key={network.id} value={String(idx)}>
										<SelectItemText>
											<Text bold capitalize>
												{network.id}
											</Text>
										</SelectItemText>
										<SelectItemIndicator />
									</SelectItem>
								))}
							</SelectGroup>
						</SelectViewport>
						<SelectScrollDownButton>{'>'}</SelectScrollDownButton>
					</SelectContent>
				</Select>
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
									<Button size="1" color="ghost" iconOnly>
										<InfoCircledIcon />
									</Button>
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
