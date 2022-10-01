import React from 'react'
import { useQueryClient } from 'react-query'
import { useImmer } from 'use-immer'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { PageHeading, PageSubHeading, PageWrapper } from '@src/components/layout'
import { useLocation } from 'wouter'
import { getShortAddress } from '@src/utils/string-utils'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useEventListener } from 'usehooks-ts'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { Box, Flex } from 'ui/src/components/atoms'
import { AccountSelector } from '@src/components/account-selector'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { useTokenMint } from '@src/hooks/use-token-mint'
import { useTokenDerive } from '@src/hooks/use-token-derive'
import { useTransaction } from '@src/hooks/use-transaction'

interface ImmerT {
	symbol: string
	amount: string
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

export const MintTokenModal: React.FC<IProps> = ({ trigger }) => {
	const [, setLocation] = useLocation()
	const queryClient = useQueryClient()

	const mint = useTokenMint()
	const derive = useTokenDerive()
	const { signTransaction, submitTransaction } = useTransaction()

	const { addToast } = useSharedStore(state => ({
		addToast: state.addToastAction,
	}))

	const { selectAccount, signingKey, accountAddress } = useAccountStore(state => ({
		selectAccount: state.selectAccountAction,
		signingKey: state.signingKey,
		accountAddress: state.getCurrentAddressAction(),
	}))

	const [state, setState] = useImmer<ImmerT>({
		symbol: '',
		amount: '',
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

	const handleSetValue = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft[key] = event.currentTarget.value
		})
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
			const { transaction, fee } = await mint(rri, state.amount)
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
		if (!signingKey) return
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
		<Dialog open={state.isModalOpen} modal={false}>
			<DialogTrigger asChild onClick={handleOnClick}>
				{trigger}
			</DialogTrigger>
			<DialogContent css={{ p: '0' }}>
				<PageWrapper css={{ position: 'relative' }}>
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
						<PageHeading>Mint</PageHeading>
						<PageSubHeading>To:</PageSubHeading>
					</Box>
					<AccountSelector shortAddress={shortAddress} onAccountChange={handleAccountChange} />
					<HardwareWalletReconnect />
					<Box css={{ mt: '$2' }}>
						<Input placeholder="Enter symbol" onChange={handleSetValue('symbol')} />
					</Box>
					<Box css={{ mt: '$2' }}>
						<Input placeholder="Enter amount" onChange={handleSetValue('amount')} />
					</Box>
					<Flex css={{ mt: '$4' }}>
						{state.transaction ? (
							<Button
								size="5"
								color="primary"
								aria-label="confirm"
								css={{ px: '0', flex: '1' }}
								onClick={handleConfirm}
								disabled={!signingKey}
								loading={state.isLoading}
							>
								Confirm
							</Button>
						) : (
							<Button
								size="5"
								color="primary"
								aria-label="mint"
								css={{ px: '0', flex: '1' }}
								onClick={handlePrepareTx}
								loading={state.isLoading}
							>
								Mint
							</Button>
						)}
					</Flex>
				</PageWrapper>
			</DialogContent>
		</Dialog>
	)
}
