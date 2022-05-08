import React from 'react'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { useLocation } from 'wouter'
import { getShortAddress } from '@src/utils/string-utils'
import {
	FinalizeTransaction,
	SubmitSignedTransaction,
	CreateToken,
	DeriveToken,
} from '@src/services/radix/transactions'
import { useEventListener } from 'usehooks-ts'
import { CloseIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import { Checkbox, CheckIcon } from 'ui/src/components/checkbox'
import Input from 'ui/src/components/input'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { AccountSelector } from '@src/components/account-selector'

interface IProps {
	trigger: React.ReactNode
}

export const CreateTokenModal: React.FC<IProps> = ({ trigger }) => {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()

	const { addToast, selectAccount, account, accountAddress, network } = useStore(state => ({
		addToast: state.addToastAction,
		selectAccount: state.selectAccountAction,
		account: state.account,
		accountAddress: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))

	const [state, setState] = useImmer({
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
		await selectAccount(accountIndex)
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
			const rri = await DeriveToken(network.url, accountAddress, state.symbol)
			const { transaction, fee } = await CreateToken(network.url, rri, accountAddress, state.amount, {
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
			const { blob } = await FinalizeTransaction(network.url, account, state.symbol, state.transaction)
			await SubmitSignedTransaction(network.url, account, blob)
			await queryClient.invalidateQueries({ active: true, inactive: true, stale: true })
			setState(draft => {
				draft.fee = null
				draft.transaction = null
				draft.isModalOpen = false
			})
			setLocation(`/wallet/account/token/${state.rri}`)
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
		<Dialog open={state.isModalOpen} modal={false}>
			<DialogTrigger asChild onClick={handleOnClick}>
				{trigger}
			</DialogTrigger>
			<DialogContent>
				<Flex direction="column" css={{ p: '$2', position: 'relative', maxHeight: '400px', overflowX: 'scroll' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close create token modal"
						size="3"
						css={{ position: 'absolute', top: '16px', right: '16px' }}
						onClick={handleCloseModal}
					>
						<CloseIcon />
					</Button>

					<Box css={{ flex: '1' }}>
						<Box>
							<Text css={{ fontSize: '32px', lineHeight: '38px', fontWeight: '800' }}>Create</Text>
							<Text css={{ fontSize: '14px', lineHeight: '17px', fontWeight: '500', mt: '20px' }}>Owner:</Text>
						</Box>
						<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
						<HardwareWalletReconnect />
						<Box css={{ mt: '$2' }}>
							<Input placeholder="Enter name" onChange={handleSetValue('name')} />
						</Box>
						<Box css={{ mt: '$2' }}>
							<Input placeholder="Enter symbol" onChange={handleSetValue('symbol')} />
						</Box>
						<Box css={{ mt: '$2' }}>
							<Flex
								align="center"
								justify="end"
								css={{
									width: '105px',
									transition: '$default',
									pe: 'auto',
									opacity: 1,
								}}
							>
								<Checkbox id="mutable" size="1" onCheckedChange={handleSetMutable} checked={state.is_supply_mutable}>
									<CheckIcon />
								</Checkbox>
								<Text medium size="3" as="label" css={{ paddingLeft: '$2' }} htmlFor="mutable">
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
						<Box css={{ mt: '$2' }}>
							<Input
								as="textarea"
								size="2"
								placeholder="Enter description"
								onChange={handleSetValue('description')}
								css={{ height: '70px' }}
							/>
						</Box>
						<Box css={{ mt: '$2' }}>
							<Input placeholder="Enter icon URL" onChange={handleSetValue('icon_url')} />
						</Box>
						<Box css={{ mt: '$2' }}>
							<Input placeholder="Enter URL" onChange={handleSetValue('url')} />
						</Box>
					</Box>
					<Flex css={{ mt: '$3' }}>
						{state.transaction ? (
							<Button
								size="6"
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
								size="6"
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
				</Flex>
			</DialogContent>
		</Dialog>
	)
}
