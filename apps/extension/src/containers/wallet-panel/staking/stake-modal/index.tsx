import React from 'react'
import { useImmer } from 'use-immer'
import { useStore } from '@src/store'
import { useLocation } from 'wouter'
import { getShortAddress } from '@src/utils/string-utils'
import {
	FinalizeTransaction,
	SubmitSignedTransaction,
	UnstakeTokens,
	StakeTokens,
} from '@src/services/radix/transactions'
import { useEventListener } from 'usehooks-ts'
import { useNativeToken } from '@src/services/react-query/queries/radix'
import { CloseIcon } from 'ui/src/components/icons'
import Button from 'ui/src/components/button'
import Input from 'ui/src/components/input'
import { Tooltip, TooltipTrigger, TooltipContent } from 'ui/src/components/tool-tip'
import { Dialog, DialogTrigger, DialogContent } from 'ui/src/components/dialog'
import { Box, Text, Flex } from 'ui/src/components/atoms'
import { SlippageBox } from '@src/components/slippage-box'
import BigNumber from 'bignumber.js'

interface IProps {
	trigger: React.ReactNode
	validatorAddress?: string
	tooltipMessage?: string
	reduceStake?: boolean
}

export const StakeModal: React.FC<IProps> = ({ trigger, tooltipMessage, validatorAddress, reduceStake }: IProps) => {
	const stakeTitle = reduceStake ? 'Unstake' : 'Stake'

	const [, setLocation] = useLocation()
	const { data: token } = useNativeToken()

	const { addToast, account, addressBook, network } = useStore(state => ({
		addToast: state.addToastAction,
		account: state.account,
		addressBook: state.addressBook,
		network: state.networks[state.selectedNetworkIndex],
	}))

	const [state, setState] = useImmer({
		amount: '',
		validator: validatorAddress,
		fee: null,
		transaction: null,
		isLoading: false,
		isModalOpen: false,
	})

	const address = account?.address?.toString()
	const entry = addressBook[address]
	const shortAddress = getShortAddress(address)

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

	const handleSetValidator = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.validator = event.currentTarget.value
		})
	}

	const handleSetAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.amount = event.currentTarget.value
		})
	}

	const wrappedTrigger = tooltipMessage ? (
		<DialogTrigger asChild>
			<Tooltip>
				<TooltipTrigger asChild onClick={handleOnClick}>
					{trigger}
				</TooltipTrigger>
				<TooltipContent>
					{tooltipMessage}
					<TooltipContent />
				</TooltipContent>
			</Tooltip>
		</DialogTrigger>
	) : (
		<DialogTrigger asChild onClick={handleOnClick}>
			{trigger}
		</DialogTrigger>
	)

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			setState(draft => {
				draft.isModalOpen = false
			})
		}
	})

	const handlePrepareTx = async () => {
		if (!token) {
			return
		}
		setState(draft => {
			draft.isLoading = true
		})
		try {
			const method = reduceStake ? UnstakeTokens : StakeTokens
			const { transaction, fee } = await method(
				network.url,
				token.rri,
				account.address.toString(),
				state.validator,
				state.amount,
			)
			setState(draft => {
				draft.fee = fee
				draft.transaction = transaction
			})
		} catch (error) {
			setState(draft => {
				draft.isLoading = false
			})
			addToast({
				type: 'error',
				title: 'Failed to build transaction',
				subTitle: (error?.message || error).toString().trim(),
				duration: 8000,
			})
		}
	}

	const handleConfirm = async () => {
		setState(draft => {
			draft.isLoading = true
		})

		try {
			const { blob } = await await FinalizeTransaction(network.url, account, token.symbol, state.transaction)
			await SubmitSignedTransaction(network.url, account, blob)

			setLocation(`/account/token/${token.rri}`)
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
			{wrappedTrigger}
			<DialogContent>
				<Flex direction="column" css={{ p: '$2', position: 'relative' }}>
					<Button
						color="ghost"
						iconOnly
						aria-label="close stake modal"
						size="3"
						css={{ position: 'absolute', top: '16px', right: '16px' }}
						onClick={handleCloseModal}
					>
						<CloseIcon />
					</Button>

					<Box css={{ flex: '1' }}>
						<Flex direction="column" align="center" css={{ bg: '$bgPanel2', width: '100%', p: '$5', br: '$2' }}>
							<Box css={{ width: '50px', height: '50px', br: '50%', bg: 'grey', mt: '10px' }} />
							<Text medium size="9" bold css={{ mt: '20px' }}>
								{stakeTitle}
							</Text>
							<Text medium size="4" css={{ mt: '20px', mb: '5px' }}>
								{entry?.name ? `${entry.name} (${shortAddress})` : shortAddress}
							</Text>
						</Flex>
						<Box css={{ mt: '$3' }}>
							<Input
								value={state.validator}
								placeholder="Enter validator address"
								onChange={handleSetValidator}
								disabled={!!validatorAddress}
							/>
						</Box>
						<Box css={{ mt: '$2' }}>
							<Input placeholder="Enter amount" onChange={handleSetAmount} />
						</Box>
						<SlippageBox
							css={{ mt: '12px' }}
							token={token}
							amount={state.amount ? new BigNumber(state.amount) : null}
							fee={state.fee ? new BigNumber(state.fee).shiftedBy(-18) : null}
						/>
					</Box>
					<Flex css={{ mt: '$3' }}>
						{state.transaction ? (
							<Button
								size="6"
								color="red"
								aria-label="confirm"
								css={{ px: '0', flex: '1' }}
								onClick={handleConfirm}
								loading={state.isLoading}
							>
								Confirm
							</Button>
						) : (
							<Button
								size="6"
								color="primary"
								aria-label={stakeTitle}
								css={{ px: '0', flex: '1' }}
								onClick={handlePrepareTx}
								loading={state.isLoading}
							>
								{stakeTitle}
							</Button>
						)}
					</Flex>
				</Flex>
			</DialogContent>
		</Dialog>
	)
}

StakeModal.defaultProps = {
	validatorAddress: '',
	tooltipMessage: '',
	reduceStake: false,
}
