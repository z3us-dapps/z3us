import React from 'react'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { PageHeading, PageSubHeading, PageWrapper } from '@src/components/layout'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { useLocation } from 'wouter'
import { getShortAddress } from '@src/utils/string-utils'
import { useEventListener } from 'usehooks-ts'
import { Cross2Icon } from '@radix-ui/react-icons'
import Button from 'ui/src/components/button'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import Input from 'ui/src/components/input'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { AccountSelector } from '@src/components/account-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { useTokenCreate } from '@src/hooks/use-token-create'
import { useTokenDerive } from '@src/hooks/use-token-derive'
import { useTransaction } from '@src/hooks/use-transaction'

interface ImmerT {
	amount: string
	name: string
	symbol: string
	description: string
	icon_url: string
	url: string
	is_supply_mutable: boolean
	rri: string
	fee: string
	transaction: {
		blob: string
		hashOfBlobToSign: string
	}
	isLoading: boolean
	isModalOpen: boolean
}

interface IProps {
	trigger: React.ReactNode
}

export const CreateTokenModal: React.FC<IProps> = ({ trigger }) => {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()

	const { hw, seed, addToast } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		addToast: state.addToastAction,
	}))

	const create = useTokenCreate()
	const derive = useTokenDerive()
	const { signTransaction, submitTransaction } = useTransaction()

	const { selectAccount, account, accountAddress } = useAccountStore(state => ({
		selectAccount: state.selectAccountAction,
		account: state.account,
		accountAddress: state.getCurrentAddressAction(),
	}))

	const [state, setState] = useImmer<ImmerT>({
		amount: '',
		name: '',
		symbol: '',
		description: '',
		icon_url: '',
		url: '',
		is_supply_mutable: false,
		rri: '',
		fee: null,
		transaction: null,
		isLoading: false,
		isModalOpen: false,
	})

	const shortAddress = getShortAddress(accountAddress)

	const handleAccountChange = async (accountIndex: number) => {
		await selectAccount(accountIndex, hw, seed)
	}

	const handleOnClick = () => {
		setState(draft => {
			draft.isModalOpen = !draft.isModalOpen
		})
	}

	const handleCloseModal = () => {
		setState(draft => {
			draft.isModalOpen = false
		})
	}

	const handleSetValue = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft[key] = event.currentTarget.value
		})
	}

	const handleSetMutable = checked => {
		setState(draft => {
			draft.is_supply_mutable = checked === true
		})
	}

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setState(draft => {
				draft.isModalOpen = false
			})
		}
	})

	const handlePrepareTx = async () => {
		setState(draft => {
			draft.isLoading = true
		})

		try {
			const rri = await derive(accountAddress, state.symbol)
			const { transaction, fee } = await create(rri, state.amount, {
				name: state.name,
				description: state.description,
				icon_url: state.icon_url,
				url: state.url,
				symbol: state.symbol,
				is_supply_mutable: state.is_supply_mutable,
				granularity: '1',
			})
			setState(draft => {
				draft.rri = rri
				draft.fee = fee
				draft.transaction = transaction
			})
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Failed to build transaction',
				subTitle: (error?.message || error).toString().trim(),
				duration: 8000,
			})
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	const handleConfirm = async () => {
		if (!account) return
		setState(draft => {
			draft.isLoading = true
		})
		try {
			const { blob } = await signTransaction(state.symbol, state.transaction)
			await submitTransaction(blob)
			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setState(draft => {
				draft.fee = null
				draft.transaction = null
				draft.isModalOpen = false
			})
			setLocation(`/wallet/account/token/${state.rri}`)
			addToast({
				type: 'success',
				title: 'Succesfully submited transaction to the network',
				duration: 5000,
			})
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Failed to build transaction',
				subTitle: (error?.message || error).toString().trim(),
				duration: 8000,
			})
		}
		setState(draft => {
			draft.isLoading = false
		})
	}

	return (
		<Dialog open={state.isModalOpen}>
			<DialogTrigger asChild onClick={handleOnClick}>
				{trigger}
			</DialogTrigger>
			<DialogContent css={{ p: '0' }}>
				<Box css={{ height: '500px', position: 'relative' }}>
					<ScrollArea>
						<PageWrapper css={{ position: 'relative' }}>
							<Box>
								<Button
									color="ghost"
									iconOnly
									aria-label="close create token modal"
									size="2"
									css={{ position: 'absolute', top: '$3', right: '$3', zIndex: '1' }}
									onClick={handleCloseModal}
								>
									<Cross2Icon />
								</Button>
								<Box css={{ width: '100%' }}>
									<PageHeading>Create</PageHeading>
									<PageSubHeading>Owner</PageSubHeading>
								</Box>
								<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
								<HardwareWalletReconnect />
								<Box css={{ mt: '$4' }}>
									<Input placeholder="Enter name" onChange={handleSetValue('name')} />
								</Box>
								<Box css={{ mt: '$2' }}>
									<Input placeholder="Enter symbol" onChange={handleSetValue('symbol')} />
								</Box>
								<Box css={{ mt: '$2' }}>
									<Flex align="center" justify="start">
										<Checkbox
											id="mutable"
											size="1"
											onCheckedChange={handleSetMutable}
											checked={state.is_supply_mutable}
										>
											<CheckIcon />
										</Checkbox>
										<Text size="2" as="label" css={{ pl: '$2' }} htmlFor="mutable">
											Is mutable
										</Text>
									</Flex>
								</Box>
								{!state.is_supply_mutable && (
									<Box css={{ mt: '$2' }}>
										<Input
											placeholder="Enter amount"
											onChange={handleSetValue('amount')}
											disabled={state.is_supply_mutable}
										/>
									</Box>
								)}
								<Box css={{ flex: '1', mt: '$2' }}>
									<Input
										as="textarea"
										size="1"
										placeholder="Enter description"
										onChange={handleSetValue('description')}
										css={{ height: '80px' }}
									/>
								</Box>
								<Box css={{ mt: '$2' }}>
									<Input placeholder="Enter icon URL" onChange={handleSetValue('icon_url')} />
								</Box>
								<Box css={{ mt: '$2' }}>
									<Input placeholder="Enter URL" onChange={handleSetValue('url')} />
								</Box>
								<Box>
									<Flex css={{ mt: '$4' }}>
										{state.transaction ? (
											<Button
												size="5"
												color="primary"
												aria-label="confirm"
												css={{ px: '0', flex: '1' }}
												onClick={handleConfirm}
												disabled={!account}
												loading={state.isLoading}
											>
												Confirm
											</Button>
										) : (
											<Button
												size="5"
												color="primary"
												aria-label="create"
												css={{ px: '0', flex: '1' }}
												onClick={handlePrepareTx}
												loading={state.isLoading}
											>
												Create
											</Button>
										)}
									</Flex>
								</Box>
							</Box>
						</PageWrapper>
					</ScrollArea>
				</Box>
			</DialogContent>
		</Dialog>
	)
}
